import { lazy, Suspense, useEffect, useState } from 'react';
import { ThemeContext } from './themeContext';
import { fetchSiteSettings, themeFromSettings, readPreviewTheme } from './settings';

// Decorations are code-split: their JS + CSS are only downloaded when the theme is on.
const decorations = {
  'christmas-premium': lazy(() => import('./christmas-premium/PremiumDecor')),
};

export default function ThemeProvider({ children }) {
  const [preview] = useState(readPreviewTheme);
  const [theme, setTheme] = useState(preview ?? 'none');

  useEffect(() => {
    if (preview) return; // URL preview wins over the sheet
    fetchSiteSettings()
      .then(settings => setTheme(themeFromSettings(settings)))
      .catch(() => setTheme('none'));
  }, [preview]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'none') delete root.dataset.theme;
    else root.dataset.theme = theme;
  }, [theme]);

  const Decor = decorations[theme];

  return (
    <ThemeContext.Provider value={theme}>
      {children}
      {Decor && (
        <Suspense fallback={null}>
          <Decor />
        </Suspense>
      )}
    </ThemeContext.Provider>
  );
}
