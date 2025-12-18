import { createRoute, useNavigate } from '@tanstack/react-router';
import { rootRoute } from './__root';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { HiExclamation } from 'react-icons/hi';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '../stores/auth.store';

const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth(data.data.token, data.data.admin);
      navigate({ to: '/dashboard' });
    },
  });

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">UCSM FRWC</h1>
          <p className="text-gray-500 mt-1">2026 Admin Panel</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">
            Sign in to your account
          </h2>

          {loginMutation.isError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <HiExclamation className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">Login failed!</p>
                <p className="text-sm text-red-600">
                  {loginMutation.error instanceof Error
                    ? loginMutation.error.message
                    : 'Invalid credentials'}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                {...register('username')}
                className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.username
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300'
                }`}
              />
              {errors.username && (
                <p className="mt-1.5 text-sm text-red-600">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register('password')}
                className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loginMutation.isPending ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          © 2026 UCSM Freshers' Welcome. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});
