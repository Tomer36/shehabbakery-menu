// A category counts as seasonal when its id or name mentions Christmas (any of our languages).
const SEASONAL = /christmas|xmas|כריסמס|ميلاد|كريسمس/i;

export const isSeasonalCategory = (cat) =>
  SEASONAL.test(`${cat.id} ${cat.label} ${cat.labelAr ?? ''}`);
