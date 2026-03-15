import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  isSwiss: boolean;
  toggleAesthetic: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isSwiss, setIsSwiss] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isSwiss ? 'swiss' : 'dark');
  }, [isSwiss]);

  const toggleAesthetic = () => setIsSwiss(!isSwiss);

  return (
    <ThemeContext.Provider value={{ isSwiss, toggleAesthetic }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
