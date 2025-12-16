import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';
import { Users, MousePointerClick, ArrowRight, Plus } from 'lucide-react';
import { dataService } from '../services/mockData';
import { CreateLinkModal } from '../components/CreateLinkModal';
import { LinkItem } from '../types';

export const DashboardHome: React.FC = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState(dataService.getLeads());
  const [links, setLinks] = useState(dataService.getLinks());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const refreshData = () => {
    setLeads(dataService.getLeads());
    setLinks(dataService.getLinks());
  };

  const handleCreate = (data: Partial<LinkItem>) => {
    dataService.createLink(data as any);
    refreshData();
    setIsModalOpen(false);
  };

  // Process data for chart (Last 7 days mock)
  const chartData = [
    { name: 'Mon', leads: 4 },
    { name: 'Tue', leads: 7 },
    { name: 'Wed', leads: 3 },
    { name: 'Thu', leads: 12 },
    { name: 'Fri', leads: 8 },
    { name: 'Sat', leads: 15 },
    { name: 'Sun', leads: leads.length }, 
  ];

  const StatCard = ({ title, value, icon: Icon, onClick, className }: any) => (
    <div 
      onClick={onClick}
      className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between transition-all ${onClick ? 'cursor-pointer hover:border-pink-200 hover:shadow-md' : ''} ${className}`}
    >
      <div>
        <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center text-pink-600 border border-pink-100">
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Overview</h2>
          <p className="text-gray-500">Your content performance at a glance.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all font-medium shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Link
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard 
            title="Total Leads" 
            value={leads.length} 
            icon={Users} 
            onClick={() => navigate('/dashboard/leads')}
            className="group"
        />
        <StatCard 
            title="Active Links" 
            value={links.filter(l => l.isActive).length} 
            icon={MousePointerClick}
            onClick={() => navigate('/dashboard/links')}
            className="group"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section - Added min-w-0 to fix Recharts responsiveness inside Grid */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Lead Growth</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#db2777" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#db2777" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#9ca3af', fontSize: 12}} 
                    dy={10} 
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#9ca3af', fontSize: 12}} 
                />
                <Tooltip 
                  cursor={{stroke: '#fce7f3', strokeWidth: 2}}
                  contentStyle={{
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      padding: '8px 12px'
                  }}
                  itemStyle={{ color: '#be185d', fontSize: '14px', fontWeight: 600 }}
                  labelStyle={{ display: 'none' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#db2777" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorLeads)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performing Content - Added min-w-0 */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Content</h3>
          <div className="space-y-6 flex-1">
            {links.sort((a,b) => b.views - a.views).slice(0, 4).map((link, idx) => (
              <div key={link.id} className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/dashboard/links')}>
                 <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${idx === 0 ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-50 text-gray-600 group-hover:bg-gray-100'}`}>
                   {idx + 1}
                 </span>
                 <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate group-hover:text-pink-600 transition-colors">{link.title}</p>
                    <p className="text-xs text-gray-500">{link.views} views</p>
                 </div>
                 <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-pink-600 transition-colors" />
              </div>
            ))}
            {links.length === 0 && <p className="text-sm text-gray-400 italic">No links yet.</p>}
          </div>
          <button 
            onClick={() => navigate('/dashboard/links')}
            className="mt-6 w-full py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Manage All Links
          </button>
        </div>
      </div>

      {isModalOpen && (
        <CreateLinkModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleCreate} 
        />
      )}
    </div>
  );
};