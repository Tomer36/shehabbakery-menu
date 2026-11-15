import { useState } from 'react';
import st from './ItemImage.module.scss';

/**
 * Menu photo that fills its (sized, position: relative) parent.
 * - Photos roughly the box's shape are cropped to fill (object-fit: cover), as before.
 * - Photos noticeably narrower than the box (square or portrait shots of tall drink cups
 *   in a wide card) would lose their top and bottom, so they're shown whole (contain)
 *   over a blurred copy of themselves — nothing cut off, no empty bars.
 * - Missing/broken image → fallback placeholder.
 */
export default function ItemImage({ src, alt, className = '', fallbackClassName = '' }) {
  const [error, setError] = useState(false);
  const [narrow, setNarrow] = useState(false);

  if (!src || error) {
    return <div className={fallbackClassName} data-theme-slot="img-fallback">🥐</div>;
  }

  const onLoad = (e) => {
    const img = e.currentTarget;
    const box = img.parentElement;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const boxRatio = box.clientWidth / box.clientHeight;
    setNarrow(imgRatio < boxRatio * 0.85);
  };

  return (
    <>
      {narrow && <img className={st.backdrop} src={src} alt="" aria-hidden="true" />}
      <img
        className={`${className} ${narrow ? st.contain : ''}`}
        src={src}
        alt={alt}
        onLoad={onLoad}
        onError={() => setError(true)}
      />
    </>
  );
}
