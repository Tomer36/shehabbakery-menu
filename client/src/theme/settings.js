import { sheetUrl, parseCSV } from '../hooks/useMenuData';

// Themes the app knows how to render. Anything else is treated as "none".
export const THEMES = ['none', 'christmas-premium'];

// Friendly names the sheet may use for a theme.
const ALIASES = { christmas: 'christmas-premium', xmas: 'christmas-premium' };

const PREVIEW_KEY = 'themePreview';

/**
 * Where the site settings come from.
 * Today: a "settings" tab in the menu Google Sheet (columns: key, value).
 * Later (VPS + admin dashboard): swap this for `fetch('/api/settings')`
 * returning the same { key: value } object — nothing else needs to change.
 */
export async function fetchSiteSettings() {
  const text = await fetch(sheetUrl('settings')).then(r => r.text());
  const rows = parseCSV(text);
  // gviz returns the first sheet when a tab doesn't exist — make sure this is really the settings tab.
  if (!rows.length || !('key' in rows[0]) || !('value' in rows[0])) return {};
  return Object.fromEntries(rows.map(r => [r.key.toLowerCase(), r.value]));
}

const today = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const normalize = (value) => {
  const raw = (value || '').trim().toLowerCase();
  const v = ALIASES[raw] ?? raw;
  return THEMES.includes(v) ? v : 'none';
};

/** Theme from settings, respecting the optional theme_start / theme_end window (YYYY-MM-DD, inclusive). */
export function themeFromSettings(settings) {
  const theme = normalize(settings.theme);
  if (theme === 'none') return 'none';
  const now = today();
  if (settings.theme_start && now < settings.theme_start) return 'none';
  if (settings.theme_end && now > settings.theme_end) return 'none';
  return theme;
}

/**
 * Preview override: ?theme=christmas (or ?theme=none) in the URL.
 * Remembered for the browser tab so it survives navigating between pages.
 */
export function readPreviewTheme() {
  const param = new URLSearchParams(window.location.search).get('theme');
  try {
    if (param !== null) {
      sessionStorage.setItem(PREVIEW_KEY, normalize(param));
      return normalize(param);
    }
    const stored = sessionStorage.getItem(PREVIEW_KEY);
    return stored ? normalize(stored) : null;
  } catch {
    return param !== null ? normalize(param) : null;
  }
}
