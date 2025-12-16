import React, { useState } from 'react';
import { Plus, MoreVertical, Copy, Trash2, Eye, ExternalLink } from 'lucide-react';
import { dataService } from '../services/mockData';
import { LinkItem } from '../types';
import { CreateLinkModal } from '../components/CreateLinkModal';

export const LinksList: React.FC = () => {
  const [links, setLinks] = useState<LinkItem[]>(dataService.getLinks());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const refresh = () => setLinks(dataService.getLinks());

  const handleCreate = (data: Partial<LinkItem>) => {
    dataService.createLink(data as any);
    refresh();
    setIsModalOpen(false);
    showNotification('Link created successfully!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure? This will hide the content from existing leads.')) {
      dataService.deleteLink(id);
      refresh();
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const copyToClipboard = (id: string) => {
    const url = `${window.location.origin}/#/view/${id}`;
    navigator.clipboard.writeText(url);
    showNotification('Link copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm z-50 animate-fade-in-up">
          {notification}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Gated Links</h2>
          <p className="text-gray-500">Manage your content and sharing settings.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all font-medium shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Link
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <div key={link.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className="h-40 bg-gray-100 relative group">
              <img src={link.thumbnailUrl} alt={link.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <a 
                  href={`/#/view/${link.id}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" /> Preview
                </a>
              </div>
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-semibold text-gray-700">
                {link.type}
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 line-clamp-1" title={link.title}>{link.title}</h3>
                <div className="relative group/menu">
                   <button className="text-gray-400 hover:text-gray-600">
                     <MoreVertical className="w-5 h-5" />
                   </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{link.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-1">
                   <Eye className="w-4 h-4" /> {link.views}
                </div>
                <div className="flex items-center gap-1">
                   <span className={`w-2 h-2 rounded-full ${link.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                   {link.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => copyToClipboard(link.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Copy className="w-4 h-4" /> Copy Link
                </button>
                <button 
                  onClick={() => handleDelete(link.id)}
                  className="px-3 py-2 border border-red-100 text-red-600 rounded-lg hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {links.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 mb-2">You haven't created any gated links yet.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-pink-600 font-medium hover:underline"
            >
              Create your first link
            </button>
          </div>
        )}
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