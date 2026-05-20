import s from './CategoryTabs.module.scss';
import { categories, items } from '../../menuData';
import { useLang, pick } from '../../LangContext';

export default function CategoryTabs({ active, onChange }) {
  const lang = useLang();

  const handleClick = (e, id) => {
    onChange(id);
    e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <div className={s.wrapper}>
      <div className={s.list}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${s.tab} ${active === cat.id ? s.active : ''}`}
            onClick={(e) => handleClick(e, cat.id)}
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
