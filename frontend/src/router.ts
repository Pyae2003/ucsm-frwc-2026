import { createRouter } from '@tanstack/react-router';
import { rootRoute } from './routes/__root';
import { Route as indexRoute } from './routes/index';
import { Route as loginRoute } from './routes/login';
import { Route as dashboardRoute } from './routes/dashboard';
import { Route as dashboardIndexRoute } from './routes/dashboard/index';
import { Route as dashboardCategoriesRoute } from './routes/dashboard/categories';

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  dashboardRoute.addChildren([
    dashboardIndexRoute,
    dashboardCategoriesRoute,
  ]),
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

