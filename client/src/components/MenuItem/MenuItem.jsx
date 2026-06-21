import { useState } from 'react';
import s from './MenuItem.module.scss';
import { fmt } from '../../utils';
import { useLang, pick } from '../../LangContext';

export default function MenuItem({ item, onClick }) {
  const [imgError, setImgError] = useState(false);
  const lang = useLang();
  const unavailable = item.status !== 'active';
  const statusLabels = {
    sold_out: lang === 'ar' ? 'نفد من المخزون' : 'אזל מהמלאי',
    coming_soon: lang === 'ar' ? 'قريباً' : 'בקרוב',
  };

  return (
    <div
      className={`${s.card} ${unavailable ? s.unavailable : ''}`}
      onClick={unavailable ? undefined : onClick}
      aria-disabled={unavailable}
    >
      <div className={s.imageWrapper}>
        {!imgError ? (
          <img
            className={s.image}
            src={item.img}
            alt={pick(item, 'name', lang)}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={s.imageFallback}>🥐</div>
        )}

        {item.sizes ? (
          <div className={s.splitPrice}>
            {item.sizes.map((size, i) => (
              <div key={i} className={s.splitSegment}>{fmt(size.price)}</div>
            ))}
          </div>
        ) : (
          <span className={s.price}>{fmt(item.price)}</span>
        )}
      </div>

      {statusLabels[item.status] && (
        <div className={`${s.statusBadge} ${s[item.status]}`}>
          {statusLabels[item.status]}
        </div>
      )}

      <div className={s.body}>
        <h3 className={s.name}>{pick(item, 'name', lang)}</h3>
        {pick(item, 'desc', lang) && <p className={s.desc}>{pick(item, 'desc', lang)}</p>}
        {pick(item, 'note', lang) && <span className={s.note}>{pick(item, 'note', lang)}</span>}
        <div className={s.footer}>
          {item.extras?.length > 0 && (
            <span className={s.extras}>
              {lang === 'ar' ? '+ إضافات' : '+ תוספות'}
            </span>
          )}
          <div className={s.dots}>
            <span /><span /><span />
          </div>
        </div>
      </div>
    </div>
  );
}
