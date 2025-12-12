import { createRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../stores/auth.store';
import { DashboardLayout } from '../components/layouts/DashboardLayout';
import { rootRoute } from './__root';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
  component: DashboardLayout,
});

