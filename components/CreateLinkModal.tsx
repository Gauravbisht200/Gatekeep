import React, { useState } from 'react';
import { X, Youtube, FileText, UploadCloud, Image as ImageIcon } from 'lucide-react';
import { ContentType, LinkItem } from '../types';

interface CreateLinkModalProps {
  onClose: () => void;
  onSubmit: (data: Partial<LinkItem>) => void;
}

export const CreateLinkModal: React.FC<CreateLinkModalProps> = ({ onClose, onSubmit }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [type, setType] = useState<ContentType | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    thumbnailUrl: '',
  });

  const handleTypeSelect = (selectedType: ContentType) => {
    setType(selectedType);
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type) return;

    // Simulate file upload or Youtube parsing
    let finalUrl = formData.url;
    // Use custom thumbnail if provided, otherwise fallback to defaults
    let finalThumbnail = formData.thumbnailUrl;

    if (type === ContentType.YOUTUBE) {
      // Basic YT embed logic
       if (!finalUrl.includes('embed')) {
         finalUrl = finalUrl.replace('watch?v=', 'embed/');
       }
       if (!finalThumbnail) {
         finalThumbnail = 'https://picsum.photos/seed/yt/800/600';
       }
    } else {
        // Mock file upload
        finalUrl = '#mock-file-download';
        if (!finalThumbnail) {
            finalThumbnail = 'https://picsum.photos/seed/doc/800/600';
        }
    }

    onSubmit({
      ...formData,
      type,
      url: finalUrl,
      thumbnailUrl: finalThumbnail,
      isActive: true,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">
            {step === 1 ? 'Select Content Type' : 'Link Details'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {step === 1 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleTypeSelect(ContentType.FILE)}
                className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-pink-500 hover:bg-pink-50 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="font-medium text-gray-900">Upload File</span>
                <span className="text-xs text-gray-500 mt-1">PDF, DOC, PPT</span>
              </button>

              <button
                onClick={() => handleTypeSelect(ContentType.YOUTUBE)}
                className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all group"
              >
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Youtube className="w-6 h-6" />
                </div>
                <span className="font-medium text-gray-900">YouTube Video</span>
                <span className="text-xs text-gray-500 mt-1">Embed URL</span>
              </button>
              
               <button
                onClick={() => handleTypeSelect(ContentType.COURSE)}
                className="sm:col-span-2 flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
              >
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <span className="font-medium text-gray-900">Create Course Bundle</span>
                <span className="text-xs text-gray-500 mt-1">Multiple files & videos</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                  placeholder="e.g., Ultimate Strategy Guide 2024"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                  rows={3}
                  placeholder="What will they get?"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {type === ContentType.YOUTUBE ? (
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
                    <input
                      type="url"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                      placeholder="https://youtube.com/watch?v=..."
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    />
                 </div>
              ) : (
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center hover:bg-gray-100 transition-colors cursor-pointer">
                    <p className="text-sm text-gray-500">Drag & drop your file here or click to browse</p>
                    <button type="button" className="mt-2 text-pink-600 text-sm font-medium">Browse Files</button>
                    {/* Mock hidden input */}
                </div>
              )}

              {/* Added Custom Thumbnail Section */}
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-gray-500" />
                    Custom Thumbnail URL <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                    placeholder="https://example.com/my-cover-image.jpg"
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                  />
                  <p className="text-xs text-gray-400 mt-1">Leave empty to auto-generate based on content type.</p>
              </div>

              <div className="pt-4 flex gap-3">
                 <button 
                   type="button" 
                   onClick={() => setStep(1)}
                   className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                 >
                   Back
                 </button>
                 <button 
                   type="submit" 
                   className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-medium shadow-sm"
                 >
                   Create Link
                 </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
