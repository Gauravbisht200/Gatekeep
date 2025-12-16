import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Link2, Users, LogOut, Settings } from 'lucide-react';
import { dataService } from '../services/mockData';

export const Layout: React.FC = () => {
  const user = dataService.getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, clear tokens. Here we just redirect.
    navigate('/');
  };

  const navItems = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/dashboard/links', label: 'My Links', icon: Link2 },
    { to: '/dashboard/leads', label: 'Leads', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent flex items-center gap-2">
            GateKeep
          </h1>
        </div>
        
        <div 
          onClick={() => navigate('/dashboard/settings')}
          className="p-4 flex items-center gap-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors group"
        >
          <div className="p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 group-hover:scale-105 transition-transform">
             <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-white" />
          </div>
          <div className="overflow-hidden">
            <p className="font-medium text-gray-900 truncate group-hover:text-pink-600 transition-colors">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.handle}</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-pink-50 text-pink-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-pink-600' : 'text-gray-500'}`} />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-1">
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) => 
                `flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                    ? 'bg-pink-50 text-pink-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
            }
          >
            {({ isActive }) => (
              <>
                 <Settings className={`w-5 h-5 ${isActive ? 'text-pink-600' : 'text-gray-500'}`} /> 
                 Settings
              </>
            )}
          </NavLink>
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600"
          >
             <LogOut className="w-5 h-5 text-gray-500" /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header (simplified) */}
      <div className="flex-1 flex flex-col min-w-0">
         <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">GateKeep</h1>
            <button className="text-gray-500">
              <Users className="w-6 h-6" />
            </button>
         </header>

         {/* Main Content */}
         <main className="flex-1 overflow-auto p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
              <Outlet />
            </div>
         </main>
      </div>
    </div>
  );
};