import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LlmViewerProvider } from './context/LlmViewerContext';
import LlmViewer from './components/LlmViewer';

export default function App() {
  return (
    <ThemeProvider>
      <LlmViewerProvider>
        <div className="min-h-screen flex flex-col transition-colors duration-500">
          <Outlet />
        </div>
        <LlmViewer />
      </LlmViewerProvider>
    </ThemeProvider>
  );
}
