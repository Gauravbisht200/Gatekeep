import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Lock, Unlock, CheckCircle, FileDown, ShieldCheck } from 'lucide-react';
import { dataService } from '../services/mockData';
import { LinkItem, ContentType } from '../types';

export const PublicGate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [link, setLink] = useState<LinkItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    if (id) {
      const foundLink = dataService.getLinkById(id);
      setLink(foundLink || null);
      setLoading(false);
      
      if(foundLink) {
          // Check session storage to see if already unlocked in this session
          const isSessionUnlocked = sessionStorage.getItem(`unlocked_${id}`);
          if(isSessionUnlocked) setUnlocked(true);
      }
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!link) return;

    // Simulate API delay
    setLoading(true);
    setTimeout(() => {
        dataService.addLead({
            linkId: link.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone
        });
        
        sessionStorage.setItem(`unlocked_${link.id}`, 'true');
        setUnlocked(true);
        setLoading(false);
    }, 800);
  };

  if (loading && !link) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div></div>;
  }

  if (!link || !link.isActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Content Unavailable</h1>
          <p className="text-gray-500">This link is either invalid, expired, or has been removed by the creator.</p>
        </div>
      </div>
    );
  }

  const user = dataService.getUser(); // In real app, we'd fetch the owner of the link

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Image */}
        <div className="h-48 bg-gray-200 relative">
          <img src={link.thumbnailUrl} alt={link.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
             <div className="text-white">
                <span className="inline-block px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-bold rounded mb-2 uppercase tracking-wide">
                    {unlocked ? 'Unlocked' : 'Locked Content'}
                </span>
                <h1 className="text-2xl font-bold leading-tight">{link.title}</h1>
             </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {!unlocked ? (
            /* LOCKED STATE */
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
                <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                <div>
                   <p className="text-sm text-gray-500">Exclusive content from</p>
                   <p className="font-semibold text-gray-900">{user.name}</p>
                </div>
              </div>
              
              <div className="text-gray-600">
                 <p>{link.description}</p>
                 <div className="mt-4 flex items-center gap-2 text-sm text-pink-700 font-medium bg-pink-50 p-3 rounded-lg">
                    <Lock className="w-4 h-4" />
                    Complete the form below to unlock access instantly.
                 </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold text-lg py-4 rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? 'Unlocking...' : (
                    <>
                       <Unlock className="w-5 h-5" /> Unlock Content
                    </>
                  )}
                </button>
                <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1">
                   <ShieldCheck className="w-3 h-3" /> Your information is secure and shared only with {user.name}.
                </p>
              </form>
            </div>
          ) : (
            /* UNLOCKED STATE */
            <div className="space-y-6 text-center animate-fade-in">
               <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
               </div>
               <h2 className="text-2xl font-bold text-gray-900">Access Granted!</h2>
               <p className="text-gray-500">Here is the exclusive content you requested.</p>

               <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  {link.type === ContentType.YOUTUBE ? (
                     <div className="aspect-w-16 aspect-h-9 w-full">
                        <iframe 
                            src={link.url} 
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="w-full h-64 rounded-lg shadow-sm"
                        ></iframe>
                     </div>
                  ) : (
                    <div className="text-center py-6">
                        <FileTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="font-medium text-gray-900 mb-4">{link.title}.pdf</h3>
                        <a 
                          href={link.url}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
                        >
                            <FileDown className="w-5 h-5" /> Download File
                        </a>
                    </div>
                  )}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Simple internal icon for file view
const FileTextIcon = ({className}: {className?: string}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
)