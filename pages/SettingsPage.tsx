import React from 'react';
import { CreditCard, Calendar, Mail, Shield, Instagram } from 'lucide-react';
import { dataService } from '../services/mockData';

export const SettingsPage: React.FC = () => {
  const user = dataService.getUser();

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500">Manage your profile and subscription details.</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>
        <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-6">
                 <div className="inline-block p-1 rounded-full bg-white">
                    <img 
                        src={user.avatarUrl} 
                        alt={user.name} 
                        className="w-32 h-32 rounded-full object-cover border-4 border-white"
                    />
                 </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
                    <p className="text-pink-600 font-medium flex items-center gap-1">
                        <Instagram className="w-4 h-4" /> {user.handle}
                    </p>
                </div>
                <button className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                    Edit Profile
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
                        <Mail className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-medium text-gray-900">{user.email}</p>
                    </div>
                </div>
                
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
                        <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Member Since</p>
                        <p className="font-medium text-gray-900">
                            {new Date(user.joinedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Subscription Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-pink-600" /> Subscription
        </h3>
        
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                     <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                        {user.subscriptionPlan} Plan
                     </span>
                     <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Active
                     </span>
                </div>
                <p className="text-gray-300 text-sm">
                    Next billing date: <span className="text-white font-medium">October 24, 2024</span>
                </p>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors border border-white/10">
                    Manage Billing
                </button>
                <button className="flex-1 md:flex-none px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors">
                    Upgrade Plan
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};