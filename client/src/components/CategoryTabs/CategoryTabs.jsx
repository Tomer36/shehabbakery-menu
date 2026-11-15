import s from './CategoryTabs.module.scss';
import { useLang, pick } from '../../LangContext';
import { isSeasonalCategory } from '../../theme/seasonal';

export default function CategoryTabs({ active, onChange, categories, items }) {
  const lang = useLang();

  const handleClick = (e, id) => {
    onChange(id);
    e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <div className={s.wrapper} data-theme-slot="tabs">
      <div className={s.list}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${s.tab} ${active === cat.id ? s.active : ''}`}
            onClick={(e) => handleClick(e, cat.id)}
            aria-pressed={active === cat.id}
            data-seasonal={isSeasonalCategory(cat) || undefined}
          >
            {pick(cat, 'label', lang)}
            <span className={s.count}>
              {items.filter(i => i.categoryId === cat.id).length}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
