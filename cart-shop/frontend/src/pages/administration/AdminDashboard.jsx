import React, { useState } from 'react';
import { Users, Package, TrendingUp, Settings, ShoppingCart, DollarSign, Activity, ArrowUp, ArrowDown } from 'lucide-react';

export default function AdminDashboard() {
  const [activeCard, setActiveCard] = useState(null);

  const stats = [
    { label: 'Total Users', value: '12,458', change: '+12%', trend: 'up' },
    { label: 'Active Products', value: '1,234', change: '+5%', trend: 'up' },
    { label: 'Monthly Revenue', value: '$84,250', change: '+23%', trend: 'up' },
    { label: 'Orders Today', value: '156', change: '-3%', trend: 'down' }
  ];

  const tiles = [
    {
      id: 'users',
      title: 'User Management',
      description: 'Manage customers, roles, and permissions',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      stats: '12,458 active users'
    },
    {
      id: 'products',
      title: 'Product Management',
      description: 'Add, edit, and organize your product catalog',
      icon: Package,
      color: 'from-purple-500 to-purple-600',
      stats: '1,234 products'
    },
    {
      id: 'revenue',
      title: 'Revenue & Analytics',
      description: 'Track sales, revenue, and performance metrics',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      stats: '$84.2K this month'
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Configure store settings and preferences',
      icon: Settings,
      color: 'from-gray-500 to-gray-600',
      stats: 'System configuration'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-slate-400 text-sm">Welcome back, Administrator</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-400">Last login</p>
                <p className="text-sm font-medium text-white">Today at 9:42 AM</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-slate-600 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                {stat.trend === 'up' ? (
                  <ArrowUp className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-red-500" />
                )}
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change} from last month
              </p>
            </div>
          ))}
        </div>

        {/* Main Management Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {tiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <div
                key={tile.id}
                onMouseEnter={() => setActiveCard(tile.id)}
                onMouseLeave={() => setActiveCard(null)}
                className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-slate-600 ${
                  activeCard === tile.id ? 'ring-2 ring-blue-500/50' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`bg-gradient-to-br ${tile.color} p-4 rounded-xl shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <Activity className={`w-6 h-6 text-slate-600 transition-all duration-300 ${
                    activeCard === tile.id ? 'text-blue-500' : ''
                  }`} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{tile.title}</h2>
                <p className="text-slate-400 mb-4">{tile.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500 font-medium">{tile.stats}</p>
                  <button className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeCard === tile.id
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}>
                    Manage
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
              Add Product
            </button>
            <button className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
              New User
            </button>
            <button className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
              View Reports
            </button>
            <button className="bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
              Export Data
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}