import { useState, useEffect, useRef } from 'react';
import s from './App.module.scss';
import Header from './components/Header/Header';
import CategoryTabs from './components/CategoryTabs/CategoryTabs';
import MenuItem from './components/MenuItem/MenuItem';
import ItemModal from './components/ItemModal/ItemModal';
import { useMenuData } from './hooks/useMenuData';
import { useLang } from './LangContext';
import SeasonalBanner from './theme/SeasonalBanner';
import { useTheme } from './theme/themeContext';
import { isSeasonalCategory } from './theme/seasonal';

export default function App() {
  const { categories, items, loading, error } = useMenuData();
  const [activeCategory, setActiveCategory] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const lang = useLang();
  const theme = useTheme();
  const userPicked = useRef(false);

  // Open on the first category — or on the seasonal one (e.g. Christmas drinks) while a theme is on,
  // until the visitor picks a tab themselves.
  useEffect(() => {
    if (!categories.length || userPicked.current) return;
    const seasonal = theme !== 'none' ? categories.find(isSeasonalCategory) : null;
    setActiveCategory((seasonal ?? categories[0]).id);
  }, [categories, theme]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCategoryChange = (id) => {
    userPicked.current = true;
    setActiveCategory(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return (
    <div className={s.page} data-theme-slot="page">
      <Header />
      <div className={s.loading} data-theme-slot="loading">{lang === 'ar' ? 'جاري تحميل القائمة...' : 'טוען תפריט...'}</div>
    </div>
  );

  if (error) return (
    <div className={s.page} data-theme-slot="page">
      <Header />
      <div className={s.loading} data-theme-slot="loading">{lang === 'ar' ? 'خطأ في تحميل القائمة' : 'שגיאה בטעינת התפריט'}</div>
    </div>
  );

  return (
    <div className={s.page} data-theme-slot="page">
      <Header />
      <CategoryTabs
        active={activeCategory}
        onChange={handleCategoryChange}
        categories={categories}
        items={items}
      />

      <main className={s.main}>
        <SeasonalBanner />
        <div className={s.grid}>
          {items.filter(item => item.categoryId === activeCategory).map((item) => (
            <MenuItem key={item.id} item={item} onClick={() => setSelectedItem(item)} />
          ))}
        </div>
      </main>

      <footer className={s.footer} data-theme-slot="footer">
        © 2026 Powered by{' '}
        <a href="https://web-reflect.com/" target="_blank" rel="noreferrer">Web Reflect</a>
      </footer>

      {showScrollTop && (
        <button
          className={s.scrollTop}
          data-theme-slot="scroll-top"
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
