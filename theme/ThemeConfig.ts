
import React, { createContext, useContext, ReactNode } from 'react';
import { M3_SPACING, M3_TYPOGRAPHY, M3_SHAPE } from './tokens';

interface ThemeContextType {
  spacing: typeof M3_SPACING;
  typography: typeof M3_TYPOGRAPHY;
  shape: typeof M3_SHAPE;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Logic for dark mode could be injected here
  const value: ThemeContextType = {
    spacing: M3_SPACING,
    typography: M3_TYPOGRAPHY,
    shape: M3_SHAPE,
    isDarkMode: false,
  };

  return React.createElement(ThemeContext.Provider, { value }, children);
};

export const useM3Theme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useM3Theme must be used within a ThemeProvider');
  }
  return context;
};
