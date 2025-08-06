import React, { useState } from 'react';
import { 
  FaSave, 
  FaEdit, 
  FaTimes, 
  FaVideo,
  FaYoutube,
  FaEye,
  FaCheck,
  FaExclamationTriangle
} from 'react-icons/fa';

const VideoManagement = ({ siteData, onDataChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedVideo, setEditedVideo] = useState({
    youtubeVideoId: siteData.videoProfile?.youtubeVideoId || '',
    title: siteData.videoProfile?.title || '',
    description: siteData.videoProfile?.description || ''
  });
  const [previewMode, setPreviewMode] = useState(false);

  // Extract YouTube video ID from various URL formats
  const extractVideoId = (url) => {
    if (!url) return '';
    
    // If it's already just an ID
    if (url.length === 11 && !url.includes('.') && !url.includes('/')) {
      return url;
    }
    
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : '';
  };

  // Handle save changes
  const handleSave = () => {
    const videoId = extractVideoId(editedVideo.youtubeVideoId);
    
    if (!videoId) {
      alert('Please enter a valid YouTube URL or video ID');
      return;
    }

    if (!editedVideo.title.trim()) {
      alert('Title is required');
      return;
    }

    const updatedVideoProfile = {
      youtubeVideoId: videoId,
      title: editedVideo.title.trim(),
      description: editedVideo.description.trim()
    };

    onDataChange({
      ...siteData,
      videoProfile: updatedVideoProfile
    });

    setIsEditing(false);
  };

  // Handle cancel edit
  const handleCancel = () => {
    setEditedVideo({
      youtubeVideoId: siteData.videoProfile?.youtubeVideoId || '',
      title: siteData.videoProfile?.title || '',
      description: siteData.videoProfile?.description || ''
    });
    setIsEditing(false);
  };

  // Generate thumbnail URL
  const getThumbnailUrl = (videoId) => {
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  // Get current video ID for display
  const currentVideoId = isEditing ? extractVideoId(editedVideo.youtubeVideoId) : siteData.videoProfile?.youtubeVideoId;
  const currentTitle = isEditing ? editedVideo.title : siteData.videoProfile?.title;
  const currentDescription = isEditing ? editedVideo.description : siteData.videoProfile?.description;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Kelola Video Profil</h2>
          <p className="text-gray-600">Atur video profil YouTube untuk website</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FaEdit className="h-4 w-4" />
            <span>Edit Video</span>
          </button>
        ) : (
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              <FaSave className="h-4 w-4" />
              <span>Simpan</span>
            </button>
          </div>
        )}
      </div>

      {/* Current Video Display */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Video Saat Ini</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Preview Video</label>
            {currentVideoId ? (
              <div className="space-y-4">
                {/* Thumbnail */}
                <div className="relative bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                  {previewMode ? (
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${currentVideoId}?rel=0&modestbranding=1&showinfo=0&controls=1`}
                      title="Video Profile Preview"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-900 flex items-center justify-center cursor-pointer"
                         onClick={() => setPreviewMode(true)}>
                      <img
                        src={getThumbnailUrl(currentVideoId)}
                        alt="Video Thumbnail"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center" style={{ display: 'none' }}>
                        <FaVideo className="h-16 w-16 text-white opacity-50" />
                      </div>
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors">
                          <FaYoutube className="h-10 w-10 text-white ml-1" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Controls */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Video ID: <code className="bg-gray-100 px-2 py-1 rounded">{currentVideoId}</code>
                  </div>
                  {previewMode ? (
                    <button
                      onClick={() => setPreviewMode(false)}
                      className="text-purple-600 hover:text-purple-700 text-sm"
                    >
                      Show Thumbnail
                    </button>
                  ) : (
                    <button
                      onClick={() => setPreviewMode(true)}
                      className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 text-sm"
                    >
                      <FaEye className="h-3 w-3" />
                      <span>Preview</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
                <FaVideo className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p>No video configured</p>
                <p className="text-sm">Add a YouTube video to get started</p>
              </div>
            )}
          </div>

          {/* Video Information */}
          <div className="space-y-6">
            {isEditing ? (
              <>
                {/* Edit Form */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube URL atau Video ID
                  </label>
                  <input
                    type="text"
                    value={editedVideo.youtubeVideoId}
                    onChange={(e) => setEditedVideo({ ...editedVideo, youtubeVideoId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="https://youtube.com/watch?v=... atau video ID"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Masukkan URL lengkap YouTube atau hanya video ID (11 karakter)
                  </p>
                  {editedVideo.youtubeVideoId && extractVideoId(editedVideo.youtubeVideoId) && (
                    <div className="mt-2 flex items-center space-x-1 text-green-600 text-sm">
                      <FaCheck className="h-3 w-3" />
                      <span>Video ID terdeteksi: {extractVideoId(editedVideo.youtubeVideoId)}</span>
                    </div>
                  )}
                  {editedVideo.youtubeVideoId && !extractVideoId(editedVideo.youtubeVideoId) && (
                    <div className="mt-2 flex items-center space-x-1 text-red-600 text-sm">
                      <FaExclamationTriangle className="h-3 w-3" />
                      <span>URL atau ID tidak valid</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Judul Video
                  </label>
                  <input
                    type="text"
                    value={editedVideo.title}
                    onChange={(e) => setEditedVideo({ ...editedVideo, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Judul untuk video profil"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    value={editedVideo.description}
                    onChange={(e) => setEditedVideo({ ...editedVideo, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    rows={4}
                    placeholder="Deskripsi video untuk ditampilkan di website"
                  />
                </div>
              </>
            ) : (
              <>
                {/* Display Mode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Judul Video</label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {currentTitle || <span className="text-gray-400 italic">Belum ada judul</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                  <div className="p-3 bg-gray-50 rounded-lg min-h-[100px]">
                    {currentDescription ? (
                      <p className="whitespace-pre-wrap">{currentDescription}</p>
                    ) : (
                      <span className="text-gray-400 italic">Belum ada deskripsi</span>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-medium text-blue-800 mb-3">Tips Mengelola Video</h4>
        <div className="space-y-2 text-sm text-blue-700">
          <div className="flex items-start space-x-2">
            <span className="font-medium">•</span>
            <span>Gunakan video berkualitas tinggi (minimal 720p) untuk hasil terbaik</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-medium">•</span>
            <span>Pastikan video sudah dipublikasi dan tidak private di YouTube</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-medium">•</span>
            <span>Video ID adalah 11 karakter setelah "v=" di URL YouTube</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-medium">•</span>
            <span>Contoh URL: https://www.youtube.com/watch?v=<strong>UuPaS81n0xg</strong></span>
          </div>
        </div>
      </div>

      {/* Actions */}
      {!isEditing && currentVideoId && (
        <div className="flex items-center justify-center space-x-4">
          <a
            href={`https://www.youtube.com/watch?v=${currentVideoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FaYoutube className="h-4 w-4" />
            <span>Lihat di YouTube</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoManagement;
