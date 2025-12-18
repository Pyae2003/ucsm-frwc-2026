import { createRoute, Link } from '@tanstack/react-router';
import { HiViewBoards, HiUsers, HiTicket, HiChartBar, HiArrowRight } from 'react-icons/hi';
import { Route as dashboardRoute } from '../dashboard';

const stats = [
  {
    label: 'Categories',
    value: '6',
    icon: HiViewBoards,
    bgColor: 'bg-blue-500',
    change: '+2 this week',
  },
  {
    label: 'Candidates',
    value: '0',
    icon: HiUsers,
    bgColor: 'bg-green-500',
    change: 'No candidates yet',
  },
  {
    label: 'Tickets',
    value: '0',
    icon: HiTicket,
    bgColor: 'bg-purple-500',
    change: 'No tickets yet',
  },
  {
    label: 'Total Votes',
    value: '0',
    icon: HiChartBar,
    bgColor: 'bg-orange-500',
    change: 'Voting not started',
  },
];

const quickActions = [
  {
    title: 'Manage Categories',
    description: 'Add, edit, or remove voting categories',
    icon: HiViewBoards,
    href: '/dashboard/categories',
    color: 'blue',
  },
  {
    title: 'Add Candidates',
    description: 'Register new candidates for voting',
    icon: HiUsers,
    href: '/dashboard/candidates',
    color: 'green',
  },
  {
    title: 'Generate Tickets',
    description: 'Create voting tickets for participants',
    icon: HiTicket,
    href: '/dashboard/tickets',
    color: 'purple',
  },
];

function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-2">{stat.change}</p>
                </div>
                <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          <p className="text-sm text-gray-500 mt-1">Get started with common tasks</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const colorClasses = {
                blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100',
                green: 'bg-green-50 text-green-600 group-hover:bg-green-100',
                purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-100',
              };
              return (
                <Link
                  key={action.title}
                  to={action.href}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className={`p-3 rounded-lg transition-colors ${colorClasses[action.color as keyof typeof colorClasses]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {action.title}
                      </h3>
                      <HiArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiChartBar className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 font-medium">No activity yet</h3>
          <p className="text-sm text-gray-500 mt-1">Activity will appear here once voting begins.</p>
        </div>
      </div>
    </div>
  );
}

export const Route = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/',
  component: DashboardHome,
});
