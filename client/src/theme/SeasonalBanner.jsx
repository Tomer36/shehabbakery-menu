import { lazy, Suspense } from 'react';
import { useTheme } from './themeContext';

// Hero section per theme (code-split, only loaded while that theme is on).
const heroes = {
  'christmas-premium': lazy(() => import('./christmas-premium/Hero')),
};

export default function SeasonalBanner() {
  const theme = useTheme();
  const Hero = heroes[theme];
  if (!Hero) return null;

  return (
    <Suspense fallback={null}>
      <Hero />
    </Suspense>
  );
}
