import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-500">
        <Outlet />
      </div>
    </ThemeProvider>
  );
}
