import { useTheme } from './themeContext';
// Loaded with the app (small) so the hero appears together with the menu instead of popping in later.
import ChristmasHero from './christmas-premium/Hero';

// Hero section per theme.
const heroes = {
  'christmas-premium': ChristmasHero,
};

export default function SeasonalBanner() {
  const theme = useTheme();
  const Hero = heroes[theme];
  return Hero ? <Hero /> : null;
}
