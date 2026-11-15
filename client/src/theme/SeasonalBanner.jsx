import { lazy, Suspense } from 'react';
import { useTheme } from './themeContext';
import { useLang } from '../LangContext';

// Hero section per theme (code-split, only loaded while that theme is on).
const heroes = {
  'christmas-premium': lazy(() => import('./christmas-premium/Hero')),
};

export default function SeasonalBanner() {
  const theme = useTheme();
  const lang = useLang();
  const Hero = heroes[theme];
  if (!Hero) return null;

  return (
    <Suspense fallback={null}>
      <Hero lang={lang} />
    </Suspense>
  );
}
