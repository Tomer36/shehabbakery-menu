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
        {/* placeholders while the menu loads, so the bar keeps its height and doesn't jump */}
        {categories.length === 0 && [76, 96, 84, 104, 88].map((w, i) => (
          <span key={i} className={`${s.tab} ${s.placeholder}`} style={{ width: w }} aria-hidden="true" />
        ))}
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
