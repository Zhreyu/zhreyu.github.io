import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Work from './pages/Work';
import CompanyDetail from './pages/CompanyDetail';
import TaskDetail from './pages/TaskDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'work',
        element: <Work />,
      },
      {
        path: 'work/:companyId',
        element: <CompanyDetail />,
      },
      {
        path: 'work/:companyId/task/:taskId',
        element: <TaskDetail />,
      },
    ],
  },
]);
