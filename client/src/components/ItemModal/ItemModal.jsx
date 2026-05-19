import { useState, useEffect } from 'react';
import s from './ItemModal.module.scss';
import { fmt } from '../../utils';

export default function ItemModal({ item, onClose }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>

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
          <button className={s.close} onClick={onClose}>✕</button>
        </div>

        <div className={s.body}>
          <div className={s.header}>
            <h2 className={s.name}>{item.name}</h2>
            {!item.sizes && <span className={s.price}>{fmt(item.price)}</span>}
          </div>

          {item.desc && <p className={s.desc}>{item.desc}</p>}
          {item.note && <span className={s.note}>{item.note}</span>}

          {item.sizes?.length > 0 && (
            <div className={s.sizesSection}>
              <span className={s.sizesLabel}>גדלים</span>
              <div className={s.sizesList}>
                {item.sizes.map((size, i) => (
                  <div key={i} className={s.sizePill}>
                    <span className={s.sizeLabel}>{size.label}</span>
                    <span className={s.sizePrice}>{fmt(size.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {item.extras?.length > 0 && (
            <div className={s.extrasSection}>
              <span className={s.extrasLabel}>תוספות</span>
              <div className={s.extrasList}>
                {item.extras.map((extra, i) => (
                  <span key={i} className={s.extraPill}>
                    {extra.label} +{fmt(extra.price)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
