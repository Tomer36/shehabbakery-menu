import { useState, useEffect } from 'react';
import s from './ItemModal.module.scss';
import { fmt } from '../../utils';
import { useLang, pick } from '../../LangContext';

export default function ItemModal({ item, onClose }) {
  const [imgError, setImgError] = useState(false);
  const lang = useLang();

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const ui = {
    sizes:  lang === 'ar' ? 'أحجام'   : 'גדלים',
    extras: lang === 'ar' ? 'إضافات'  : 'תוספות',
  };

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>

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
          <button className={s.close} onClick={onClose}>✕</button>
        </div>

        <div className={s.body}>
          <div className={s.header}>
            <h2 className={s.name}>{pick(item, 'name', lang)}</h2>
            {!item.sizes && <span className={s.price}>{fmt(item.price)}</span>}
          </div>

          {pick(item, 'desc', lang) && <p className={s.desc}>{pick(item, 'desc', lang)}</p>}
          {pick(item, 'note', lang) && <span className={s.note}>{pick(item, 'note', lang)}</span>}

          {item.sizes?.length > 0 && (
            <div className={s.sizesSection}>
              <span className={s.sizesLabel}>{ui.sizes}</span>
              <div className={s.sizesList}>
                {item.sizes.map((size, i) => (
                  <div key={i} className={s.sizePill}>
                    <span className={s.sizeLabel}>{pick(size, 'label', lang)}</span>
                    <span className={s.sizePrice}>{fmt(size.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {item.extras?.length > 0 && (
            <div className={s.extrasSection}>
              <span className={s.extrasLabel}>{ui.extras}</span>
              <div className={s.extrasList}>
                {item.extras.map((extra, i) => (
                  <span key={i} className={s.extraPill}>
                    {pick(extra, 'label', lang)} +{fmt(extra.price)}
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
