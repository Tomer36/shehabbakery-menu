import { useState, useEffect } from 'react';
import s from './App.module.scss';
import Header from './components/Header/Header';
import CategoryTabs from './components/CategoryTabs/CategoryTabs';
import MenuItem from './components/MenuItem/MenuItem';
import ItemModal from './components/ItemModal/ItemModal';
import { categories, items } from './menuData';
import { useLang, pick } from './LangContext';

export default function App() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const lang = useLang();
  const activeLabel = pick(categories.find(c => c.id === activeCategory) ?? {}, 'label', lang);

  return (
    <div className={s.page}>
      <Header />
      <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

      <main className={s.main}>
        <div className={s.categoryHeader}>
          <h2>{activeLabel}</h2>
          <div className={s.accent} />
        </div>

        <div className={s.grid}>
          {items.filter(item => item.categoryId === activeCategory).map((item) => (
            <MenuItem key={item.id} item={item} onClick={() => setSelectedItem(item)} />
          ))}
        </div>
      </main>

      <footer className={s.footer}>
        © 2026 Powered by{' '}
        <a href="https://web-reflect.com/" target="_blank" rel="noreferrer">Web Reflect</a>
      </footer>

      {showScrollTop && (
        <button
          className={s.scrollTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="חזור למעלה"
        >
          ↑
        </button>
      )}

      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
