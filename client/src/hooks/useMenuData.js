import { useState, useEffect } from 'react';

const SHEET_ID = '1pFEt3jHARmi4irwpVt-htl1giAysfpBt988HVFnDyg8';
const sheetUrl = (sheet) =>
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${sheet}`;

function parseCSV(text) {
  const rows = [];
  let current = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const nx = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && nx === '"') { field += '"'; i++; }
      else if (ch === '"') inQuotes = false;
      else field += ch;
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === ',') { current.push(field); field = ''; }
      else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && nx === '\n') i++;
        current.push(field); field = '';
        rows.push(current); current = [];
      } else field += ch;
    }
  }
  if (current.length) { current.push(field); rows.push(current); }

  const headers = rows[0];
  return rows.slice(1)
    .filter(r => r.some(f => f.trim()))
    .map(row => Object.fromEntries(headers.map((h, i) => [h.trim(), (row[i] ?? '').trim()])));
}

export function useMenuData() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(sheetUrl('categories')).then(r => r.text()),
      fetch(sheetUrl('items')).then(r => r.text()),
    ])
      .then(([catText, itemText]) => {
        const cats = parseCSV(catText)
          .map(c => ({
            id: c.id,
            label: c.label,
            labelAr: c.labelAr,
            order: Number(c.order),
          }))
          .sort((a, b) => a.order - b.order);

        const parsePiped = (str, strAr) => {
          if (!str) return undefined;
          return str.split('|').map((s, idx) => {
            const [label, price] = s.split(':');
            const arPart = strAr?.split('|')[idx] || '';
            const [labelAr] = arPart.split(':');
            return { label, labelAr, price: Number(price) };
          });
        };

        const normalizeStatus = (status) =>
          ['active', 'sold_out', 'hidden', 'coming_soon'].includes(status)
            ? status
            : 'active';

        const its = parseCSV(itemText)
          .map(i => ({ ...i, status: normalizeStatus(i.status) }))
          .filter(i => i.status !== 'hidden')
          .map(i => ({
            id: i.id,
            categoryId: i.categoryId,
            status: i.status,
            name: i.name,
            nameAr: i.nameAr,
            price: Number(i.price),
            img: i.img ? `/menu/${i.img}` : '',
            desc: i.desc || '',
            descAr: i.descAr || '',
            note: i.note || '',
            noteAr: i.noteAr || '',
            sizes: parsePiped(i.sizes, i.sizesAr),
            extras: parsePiped(i.extras, i.extrasAr),
          }));

        setCategories(cats);
        setItems(its);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { categories, items, loading, error };
}
