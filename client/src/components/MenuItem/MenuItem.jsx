import { useState } from 'react';
import s from './MenuItem.module.scss';
import { fmt } from '../../utils';

export default function MenuItem({ item, onClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={s.card} onClick={onClick}>
      <div className={s.imageWrapper}>
        {!imgError ? (
          <img
            className={s.image}
            src={item.img}
            alt={item.name}
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
        <h3 className={s.name}>{item.name}</h3>
        {item.desc && <p className={s.desc}>{item.desc}</p>}
        {item.note && <span className={s.note}>{item.note}</span>}
        <div className={s.footer}>
          {item.extras?.length > 0 && (
            <span className={s.extras}>+ תוספות</span>
          )}
          <div className={s.dots}>
            <span /><span /><span />
          </div>
        </div>
      </div>
    </div>
  );
}
