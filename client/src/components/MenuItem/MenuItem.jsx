import { useState } from 'react';
import s from './MenuItem.module.scss';
import { fmt } from '../../utils';
import { useLang, pick } from '../../LangContext';

export default function MenuItem({ item, onClick }) {
  const [imgError, setImgError] = useState(false);
  const lang = useLang();

  return (
    <div className={s.card} onClick={onClick}>
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
