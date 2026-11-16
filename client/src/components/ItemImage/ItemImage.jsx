import { useState } from 'react';
import st from './ItemImage.module.scss';

// Every .png/.jpg menu photo has a small .webp copy made by `npm run images` (≈20× lighter).
// Load that first; if it's missing (a new photo not optimized yet) fall back to the original.
const toWebp = (src) => src.replace(/\.(png|jpe?g)$/i, '.webp');

/**
 * Menu photo that fills its (sized, position: relative) parent.
 * - Loads the light .webp copy, lazily (only when the card nears the screen).
 * - Shows a soft shimmer until the photo is ready, then fades it in — no half-drawn photos.
 * - Photos roughly the box's shape are cropped to fill (object-fit: cover), as before.
 * - Photos noticeably narrower than the box (square or portrait shots of tall drink cups
 *   in a wide card) would lose their top and bottom, so they're shown whole (contain)
 *   over a blurred copy of themselves — nothing cut off, no empty bars.
 * - Missing/broken image → fallback placeholder.
 */
export default function ItemImage({ src, alt, className = '', fallbackClassName = '' }) {
  const webp = src ? toWebp(src) : '';
  const [current, setCurrent] = useState(webp);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [narrow, setNarrow] = useState(false);

  // Item changed (component reused): start again from the new photo's webp.
  const [prevSrc, setPrevSrc] = useState(src);
  if (src !== prevSrc) {
    setPrevSrc(src);
    setCurrent(webp);
    setError(false);
    setLoaded(false);
    setNarrow(false);
  }

  if (!src || error) {
    return <div className={fallbackClassName} data-theme-slot="img-fallback">🥐</div>;
  }

  const onLoad = (e) => {
    const img = e.currentTarget;
    const box = img.parentElement;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const boxRatio = box.clientWidth / box.clientHeight;
    setNarrow(imgRatio < boxRatio * 0.85);
    setLoaded(true);
  };

  const onError = () => {
    if (current !== src) setCurrent(src); // no webp copy — use the original photo
    else setError(true);
  };

  return (
    <>
      {!loaded && <span className={st.shimmer} aria-hidden="true" />}
      {narrow && <img className={st.backdrop} src={current} alt="" aria-hidden="true" />}
      <img
        className={`${className} ${narrow ? st.contain : ''} ${loaded ? st.ready : st.pending}`}
        src={current}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={onLoad}
        onError={onError}
      />
    </>
  );
}
