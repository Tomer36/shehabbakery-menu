import { useTheme } from './themeContext';
import { useLang } from '../LangContext';

// "Holiday pick" ribbon for items whose `tag` column in the items sheet is "holiday".
// Only shows while a seasonal theme is on; each theme styles .seasonal-tag its own way.
const labels = {
  he: 'מומלץ לחג',
  ar: 'مختارات العيد',
};

export default function SeasonalTag({ tag }) {
  const theme = useTheme();
  const lang = useLang();
  if (theme === 'none' || tag !== 'holiday') return null;

  return (
    <span className="seasonal-tag">
      <span aria-hidden="true">★</span> {labels[lang] ?? labels.he}
    </span>
  );
}
