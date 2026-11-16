import { useState, useEffect } from 'react';

export const SHEET_ID = '1pFEt3jHARmi4irwpVt-htl1giAysfpBt988HVFnDyg8';
export const sheetUrl = (sheet) =>
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${sheet}`;

export function parseCSV(text) {
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

const CACHE_KEY = 'menuCache'; // last menu from the sheet — shown instantly on the next visit

/** Turns the two sheet CSVs into { categories, items }. */
function buildMenu(catText, itemText) {
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
    // Skip half-filled rows (e.g. only a category typed in) — they render as empty ₪0 cards.
    .filter(i => i.name && i.name.replace(/[\u200e\u200f]/g, '').trim())
    .map((i, idx) => ({
      // Rows without an id would share a React key and render duplicated/stale cards.
      id: i.id || `row-${idx}`,
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
      tag: (i.tag || '').toLowerCase(),
      sizes: parsePiped(i.sizes, i.sizesAr),
      extras: parsePiped(i.extras, i.extrasAr),
    }));

  return { categories: cats, items: its };
}

function readCache() {
  try {
    const c = JSON.parse(localStorage.getItem(CACHE_KEY));
    return c ? buildMenu(c.cat, c.items) : null;
  } catch {
    return null;
  }
}

/** Sheet CSVs: reuses the request index.html already started (in parallel with the app download). */
function fetchSheets() {
  const early = window.__menuSheets;
  window.__menuSheets = undefined; // only use it once
  return (early ?? Promise.reject()).catch(() => Promise.all([
    fetch(sheetUrl('categories')).then(r => r.text()),
    fetch(sheetUrl('items')).then(r => r.text()),
  ]));
}

export function useMenuData() {
  // Returning visitors see the last menu immediately (photos start loading right away);
  // the sheet is still fetched every time and replaces it, so edits show up on this visit.
  const [cached] = useState(readCache);
  const [categories, setCategories] = useState(cached?.categories ?? []);
  const [items, setItems] = useState(cached?.items ?? []);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSheets()
      .then(([catText, itemText]) => {
        const menu = buildMenu(catText, itemText);
        setCategories(menu.categories);
        setItems(menu.items);
        setError(null);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ cat: catText, items: itemText }));
        } catch {
          // storage full/blocked — just no instant menu next time
        }
      })
      .catch(err => { if (!cached) setError(err); }) // offline: keep showing the cached menu
      .finally(() => setLoading(false));
  }, [cached]);

  return { categories, items, loading, error };
}
