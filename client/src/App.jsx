import { useState, useEffect } from 'react';
import s from './App.module.scss';
import Header from './components/Header/Header';
import CategoryTabs from './components/CategoryTabs/CategoryTabs';
import MenuItem from './components/MenuItem/MenuItem';
import ItemModal from './components/ItemModal/ItemModal';
import { useMenuData } from './hooks/useMenuData';
import { useLang } from './LangContext';

export default function App() {
  const { categories, items, loading, error } = useMenuData();
  const [activeCategory, setActiveCategory] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const lang = useLang();

  useEffect(() => {
    if (categories.length && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [categories]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCategoryChange = (id) => {
    setActiveCategory(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return (
    <div className={s.page}>
      <Header />
      <div className={s.loading}>{lang === 'ar' ? 'جاري تحميل القائمة...' : 'טוען תפריט...'}</div>
    </div>
  );

  if (error) return (
    <div className={s.page}>
      <Header />
      <div className={s.loading}>{lang === 'ar' ? 'خطأ في تحميل القائمة' : 'שגיאה בטעינת התפריט'}</div>
    </div>
  );

  return (
    <div className={s.page}>
      <Header />
      <CategoryTabs
        active={activeCategory}
        onChange={handleCategoryChange}
        categories={categories}
        items={items}
      />

      <main className={s.main}>
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
