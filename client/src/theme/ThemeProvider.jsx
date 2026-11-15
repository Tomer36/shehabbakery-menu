import { lazy, Suspense, useEffect, useState } from 'react';
import { ThemeContext } from './themeContext';
import { fetchSiteSettings, themeFromSettings, readPreviewTheme } from './settings';

// Decorations are code-split: their JS + CSS are only downloaded when the theme is on.
const decorations = {
  'christmas-premium': lazy(() => import('./christmas-premium/PremiumDecor')),
};

// Phone browser bar colour (<meta name="theme-color">) per theme, so the browser UI blends with the header.
const browserBarColors = {
  'christmas-premium': '#1F4430',
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

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.dataset.default ??= meta.content; // remember the normal brand colour from index.html
      meta.content = browserBarColors[theme] ?? meta.dataset.default;
    }
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
