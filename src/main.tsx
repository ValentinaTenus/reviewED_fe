import '~/assets/styles/index.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './app/App.tsx';
import { AppRoute } from './common/enums/app-route.enum.ts';
import { HomePage } from './pages/index.ts';

const routes = createBrowserRouter([
  {
    path: AppRoute.ROOT,
    element: <App/>,
    children: [
      {
        path: AppRoute.ROOT,
        element: <HomePage />
      },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
