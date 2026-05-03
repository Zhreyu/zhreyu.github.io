import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface ThemeContextType {
  isSwiss: boolean;
  isTransitioning: boolean;
  toggleAesthetic: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isSwiss, setIsSwiss] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isSwiss ? 'swiss' : 'dark');
  }, [isSwiss]);

  const toggleAesthetic = useCallback(async () => {
    setIsTransitioning(true);
    await new Promise(r => setTimeout(r, 300)); // blur phase
    setIsSwiss(prev => !prev);
    await new Promise(r => setTimeout(r, 50)); // render
    setIsTransitioning(false);
  }, []);

  return (
    <ThemeContext.Provider value={{ isSwiss, isTransitioning, toggleAesthetic }}>
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
