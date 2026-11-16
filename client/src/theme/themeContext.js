import { createContext, useContext } from 'react';

export const ThemeContext = createContext('none');
export const useTheme = () => useContext(ThemeContext);
