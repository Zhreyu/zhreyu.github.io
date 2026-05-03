import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface LlmViewerContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const LlmViewerContext = createContext<LlmViewerContextType | undefined>(undefined);

export function LlmViewerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '.') {
        e.preventDefault();
        toggle();
      }
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggle, close]);

  return (
    <LlmViewerContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </LlmViewerContext.Provider>
  );
}

export function useLlmViewer() {
  const context = useContext(LlmViewerContext);
  if (!context) {
    throw new Error('useLlmViewer must be used within LlmViewerProvider');
  }
  return context;
}
