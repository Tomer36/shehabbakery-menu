import { useEffect } from 'react';
import './premium.scss';
import Snowfall from '../shared/Snowfall';

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Suez+One&family=Reem+Kufi:wght@600;700&display=swap';

// Display fonts for the hero headline (Hebrew: Suez One, Arabic: Reem Kufi),
// loaded only while this theme is on.
function useHolidayFonts() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONTS_HREF;
    document.head.appendChild(link);
    return () => link.remove();
  }, []);
}

// Everything for the premium Christmas look lives in this folder. Header lights, colours,
// cards, tabs, modal and footer are CSS in premium.scss, scoped to html[data-theme="christmas-premium"].
// The hero section is ./Hero.jsx, rendered by theme/SeasonalBanner.jsx.
export default function PremiumDecor() {
  useHolidayFonts();
  return <Snowfall variant="depth" />;
}
