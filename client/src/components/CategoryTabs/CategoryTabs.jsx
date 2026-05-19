import s from './CategoryTabs.module.scss';
import { categories, items } from '../../menuData';

export default function CategoryTabs({ active, onChange }) {
  return (
    <div className={s.wrapper}>
      <div className={s.list}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${s.tab} ${active === cat.id ? s.active : ''}`}
            onClick={() => onChange(cat.id)}
          >
            {cat.label}
            <span className={s.count}>
              {items.filter(i => i.categoryId === cat.id).length}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
