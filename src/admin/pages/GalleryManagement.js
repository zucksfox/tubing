import React, { useState, useEffect } from 'react';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSave, 
  FaTimes, 
  FaUpload,
  FaEye,
  FaImage
} from 'react-icons/fa';

const GalleryManagement = ({ siteData, onDataChange }) => {
  const [editingImage, setEditingImage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newImage, setNewImage] = useState({
    src: '',
    alt: '',
    title: ''
  });
  const [previewImage, setPreviewImage] = useState(null);

  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (previewImage || editingImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [previewImage, editingImage]);


  // Handle edit image
  const handleEditImage = (img) => {
    setEditingImage({ ...img });
    setShowAddForm(false);
  };

  // Handle save edit
  const handleSaveEdit = () => {
    if (!editingImage?.src || !editingImage?.title) {
      alert('URL gambar dan judul wajib diisi!');
      return;
    }

    const existingImages = siteData.galleryImages || [];
    const updatedImages = existingImages.map(img => 
      img.id === editingImage.id ? {
        ...editingImage,
        alt: editingImage.alt || editingImage.title
      } : img
    );
    
    onDataChange({
      ...siteData,
      galleryImages: updatedImages
    });
    
    setEditingImage(null);
  };

  // Handle delete image
  const handleDeleteImage = (id) => {
    if (window.confirm('Yakin ingin menghapus gambar ini?')) {
      const existingImages = siteData.galleryImages || [];
      const updatedImages = existingImages.filter(img => img.id !== id);
      onDataChange({
        ...siteData,
        galleryImages: updatedImages
      });
    }
  };

  // Handle add new image
  const handleAddImage = () => {
    if (!newImage.src || !newImage.title) {
      alert('URL gambar dan judul wajib diisi!');
      return;
    }

    // Handle case when galleryImages is empty or undefined
    const existingImages = siteData.galleryImages || [];
    const newId = existingImages.length > 0 ? Math.max(...existingImages.map(img => img.id), 0) + 1 : 1;
    const imageToAdd = {
      ...newImage,
      id: newId,
      alt: newImage.alt || newImage.title
    };

    onDataChange({
      ...siteData,
      galleryImages: [...existingImages, imageToAdd]
    });

    // Reset form
    setNewImage({
      src: '',
      alt: '',
      title: ''
    });
    setShowAddForm(false);
  };

  // Handle file upload (for demonstration, using URL input instead)
  const handleImageUpload = (event, isEditing = false) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target.result;
        if (isEditing) {
          setEditingImage({
            ...editingImage,
            src: imageSrc
          });
        } else {
          setNewImage({
            ...newImage,
            src: imageSrc
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Kelola Galeri Gambar</h2>
          <p className="text-gray-600">Upload dan atur gambar galeri website</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FaPlus className="h-4 w-4" />
          <span>Tambah Gambar</span>
        </button>
      </div>

      {/* Add Image Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Tambah Gambar Baru</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Gambar</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                    className="hidden"
                    id="upload-image"
                  />
                  <label htmlFor="upload-image" className="cursor-pointer">
                    <FaUpload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Klik untuk upload gambar</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG hingga 10MB</p>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Atau URL Gambar</label>
                <input
                  type="url"
                  value={newImage.src}
                  onChange={(e) => setNewImage({ ...newImage, src: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Gambar</label>
                <input
                  type="text"
                  value={newImage.title}
                  onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Judul untuk gambar"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
                <input
                  type="text"
                  value={newImage.alt}
                  onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Deskripsi gambar untuk SEO"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
              <div className="border border-gray-200 rounded-lg p-4 h-64 flex items-center justify-center">
                {newImage.src ? (
                  <img
                    src={newImage.src}
                    alt={newImage.title}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    onError={() => setNewImage({ ...newImage, src: '' })}
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <FaImage className="h-16 w-16 mx-auto mb-2" />
                    <p>Preview gambar akan muncul di sini</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Batal
            </button>
            <button
              onClick={handleAddImage}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              <FaSave className="h-4 w-4" />
              <span>Simpan Gambar</span>
            </button>
          </div>
        </div>
      )}

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {siteData.galleryImages?.map((img) => (
          <div key={img.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            {/* Image Preview */}
            <div className="aspect-w-16 aspect-h-12 bg-gray-100">
              <img
                src={img.src?.startsWith('http') ? img.src : `/src/assets/images/tubing/${img.src}`}
                alt={img.alt}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  // Create a simple data URL fallback image
                  const canvas = document.createElement('canvas');
                  canvas.width = 400;
                  canvas.height = 300;
                  const ctx = canvas.getContext('2d');
                  
                  // Fill background
                  ctx.fillStyle = '#e5e7eb';
                  ctx.fillRect(0, 0, 400, 300);
                  
                  // Add text
                  ctx.fillStyle = '#9ca3af';
                  ctx.font = '16px Arial';
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  const text = img.title || 'Image';
                  ctx.fillText(text, 200, 150);
                  
                  e.target.src = canvas.toDataURL();
                }}
              />
            </div>

            {/* Image Info */}
            <div className="p-4">
              <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">{img.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-3">{img.alt}</p>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditImage(img)}
                    className="text-blue-600 hover:text-blue-700 p-1"
                    title="Edit"
                  >
                    <FaEdit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPreviewImage(img)}
                    className="text-green-600 hover:text-green-700 p-1"
                    title="Preview"
                  >
                    <FaEye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteImage(img.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                    title="Hapus"
                  >
                    <FaTrash className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-400">ID: {img.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Edit Gambar</h3>
                <button
                  onClick={() => setEditingImage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Gambar Baru</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, true)}
                        className="hidden"
                        id="edit-upload-image"
                      />
                      <label htmlFor="edit-upload-image" className="cursor-pointer">
                        <FaUpload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Klik untuk ganti gambar</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG hingga 10MB</p>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL Gambar</label>
                    <input
                      type="url"
                      value={editingImage?.src || ''}
                      onChange={(e) => setEditingImage({ ...editingImage, src: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Judul Gambar</label>
                    <input
                      type="text"
                      value={editingImage?.title || ''}
                      onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
                    <input
                      type="text"
                      value={editingImage?.alt || ''}
                      onChange={(e) => setEditingImage({ ...editingImage, alt: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                  <div className="border border-gray-200 rounded-lg p-4 h-64 flex items-center justify-center">
                    {editingImage.src ? (
                      <img
                        src={editingImage.src?.startsWith('http') ? editingImage.src : `/src/assets/images/tubing/${editingImage.src}`}
                        alt={editingImage.title}
                        className="max-w-full max-h-full object-contain rounded-lg"
                        onError={(e) => {
                          // Create a simple data URL fallback image for edit modal
                          const canvas = document.createElement('canvas');
                          canvas.width = 400;
                          canvas.height = 300;
                          const ctx = canvas.getContext('2d');
                          
                          // Fill background
                          ctx.fillStyle = '#e5e7eb';
                          ctx.fillRect(0, 0, 400, 300);
                          
                          // Add text
                          ctx.fillStyle = '#9ca3af';
                          ctx.font = '16px Arial';
                          ctx.textAlign = 'center';
                          ctx.textBaseline = 'middle';
                          const text = editingImage.title || 'Image';
                          ctx.fillText(text, 200, 150);
                          
                          e.target.src = canvas.toDataURL();
                        }}
                      />
                    ) : (
                      <div className="text-center text-gray-400">
                        <FaImage className="h-16 w-16 mx-auto mb-2" />
                        <p>Preview gambar akan muncul di sini</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setEditingImage(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  <FaSave className="h-4 w-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewImage && (
        <div 
          className="modal-overlay"
          style={{ zIndex: 10000 }}
          onClick={(e) => {
            // Close modal when clicking on backdrop
            if (e.target === e.currentTarget) {
              setPreviewImage(null);
            }
          }}
        >
          <div className="relative flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 z-30 bg-white bg-opacity-20 hover:bg-opacity-40 text-white rounded-full p-3 transition-all duration-200"
              type="button"
              title="Tutup"
            >
              <FaTimes className="h-5 w-5" />
            </button>
            
            {/* Image container */}
            <div className="modal-content">
              <img
                src={previewImage.src?.startsWith('http') ? previewImage.src : `/src/assets/images/tubing/${previewImage.src}`}
                alt={previewImage.alt}
                className="preview-image"
                onError={(e) => {
                  // Create a simple data URL fallback image for preview modal
                  const canvas = document.createElement('canvas');
                  canvas.width = 800;
                  canvas.height = 600;
                  const ctx = canvas.getContext('2d');
                  
                  // Fill background
                  ctx.fillStyle = '#e5e7eb';
                  ctx.fillRect(0, 0, 800, 600);
                  
                  // Add text
                  ctx.fillStyle = '#9ca3af';
                  ctx.font = '24px Arial';
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  const text = previewImage.title || 'Image';
                  ctx.fillText(text, 400, 300);
                  
                  e.target.src = canvas.toDataURL();
                }}
                onLoad={() => {
                  console.log('Preview image loaded:', previewImage.title);
                }}
              />
              
              {/* Image info overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent text-white p-4">
                <h3 className="font-semibold text-lg mb-1">{previewImage.title}</h3>
                <p className="text-sm opacity-90 line-clamp-2">{previewImage.alt}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!siteData.galleryImages || siteData.galleryImages.length === 0) && (
        <div className="text-center py-12">
          <FaImage className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">Belum ada gambar</h3>
          <p className="text-gray-600 mb-4">Mulai tambahkan gambar ke galeri website Anda</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mx-auto"
          >
            <FaPlus className="h-4 w-4" />
            <span>Tambah Gambar Pertama</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
