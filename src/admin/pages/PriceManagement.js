import React, { useState } from 'react';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSave, 
  FaTimes, 
  FaCheck, 
  FaStar,
  FaEye
} from 'react-icons/fa';

const PriceManagement = ({ siteData, onDataChange }) => {
  const [editingPackage, setEditingPackage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPackage, setNewPackage] = useState({
    name: '',
    price: '',
    duration: '',
    popular: false,
    features: ['']
  });

  // Handle edit package
  const handleEditPackage = (pkg) => {
    setEditingPackage({ ...pkg });
    setShowAddForm(false);
  };

  // Handle save edit
  const handleSaveEdit = () => {
    const updatedPackages = siteData.packages.map(pkg => 
      pkg.id === editingPackage.id ? editingPackage : pkg
    );
    
    onDataChange({
      ...siteData,
      packages: updatedPackages
    });
    
    setEditingPackage(null);
  };

  // Handle delete package
  const handleDeletePackage = (id) => {
    if (window.confirm('Yakin ingin menghapus paket ini?')) {
      const updatedPackages = siteData.packages.filter(pkg => pkg.id !== id);
      onDataChange({
        ...siteData,
        packages: updatedPackages
      });
    }
  };

  // Handle add new package
  const handleAddPackage = () => {
    if (!newPackage.name || !newPackage.price) {
      alert('Nama paket dan harga wajib diisi!');
      return;
    }

    const newId = Math.max(...siteData.packages.map(p => p.id), 0) + 1;
    const packageToAdd = {
      ...newPackage,
      id: newId,
      features: newPackage.features.filter(f => f.trim() !== '')
    };

    onDataChange({
      ...siteData,
      packages: [...siteData.packages, packageToAdd]
    });

    // Reset form
    setNewPackage({
      name: '',
      price: '',
      duration: '',
      popular: false,
      features: ['']
    });
    setShowAddForm(false);
  };

  // Handle feature change
  const handleFeatureChange = (index, value, isEditing = false) => {
    if (isEditing) {
      const updatedFeatures = [...editingPackage.features];
      updatedFeatures[index] = value;
      setEditingPackage({
        ...editingPackage,
        features: updatedFeatures
      });
    } else {
      const updatedFeatures = [...newPackage.features];
      updatedFeatures[index] = value;
      setNewPackage({
        ...newPackage,
        features: updatedFeatures
      });
    }
  };

  // Add feature
  const addFeature = (isEditing = false) => {
    if (isEditing) {
      setEditingPackage({
        ...editingPackage,
        features: [...editingPackage.features, '']
      });
    } else {
      setNewPackage({
        ...newPackage,
        features: [...newPackage.features, '']
      });
    }
  };

  // Remove feature
  const removeFeature = (index, isEditing = false) => {
    if (isEditing) {
      const updatedFeatures = editingPackage.features.filter((_, i) => i !== index);
      setEditingPackage({
        ...editingPackage,
        features: updatedFeatures
      });
    } else {
      const updatedFeatures = newPackage.features.filter((_, i) => i !== index);
      setNewPackage({
        ...newPackage,
        features: updatedFeatures
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Kelola Paket & Harga</h2>
          <p className="text-gray-600">Atur paket wisata dan harga yang ditawarkan</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FaPlus className="h-4 w-4" />
          <span>Tambah Paket</span>
        </button>
      </div>

      {/* Add Package Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Tambah Paket Baru</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Paket</label>
              <input
                type="text"
                value={newPackage.name}
                onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Contoh: Paket Premium"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Harga</label>
              <input
                type="text"
                value={newPackage.price}
                onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Contoh: Rp 150.000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Durasi</label>
              <input
                type="text"
                value={newPackage.duration}
                onChange={(e) => setNewPackage({ ...newPackage, duration: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Contoh: 1-1,5 Jam"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newPackage.popular}
                  onChange={(e) => setNewPackage({ ...newPackage, popular: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Tandai sebagai paket populer</span>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Fitur Paket</label>
            <div className="space-y-2">
              {newPackage.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Masukkan fitur paket"
                  />
                  {newPackage.features.length > 1 && (
                    <button
                      onClick={() => removeFeature(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTimes className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addFeature()}
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
              >
                <FaPlus className="h-3 w-3" />
                <span>Tambah Fitur</span>
              </button>
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
              onClick={handleAddPackage}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              <FaSave className="h-4 w-4" />
              <span>Simpan Paket</span>
            </button>
          </div>
        </div>
      )}

      {/* Packages List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {siteData.packages?.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Package Card Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-800">{pkg.name}</h3>
                  {pkg.popular && (
                    <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      <FaStar className="h-3 w-3" />
                      <span>Populer</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditPackage(pkg)}
                    className="text-blue-600 hover:text-blue-700 p-1"
                    title="Edit"
                  >
                    <FaEdit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePackage(pkg.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                    title="Hapus"
                  >
                    <FaTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="text-2xl font-bold text-blue-600">{pkg.price}</div>
                <div className="text-sm text-gray-500">{pkg.duration}</div>
              </div>
            </div>

            {/* Package Features */}
            <div className="p-6">
              <ul className="space-y-2">
                {pkg.features?.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <FaCheck className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
                {pkg.features?.length > 4 && (
                  <li className="text-sm text-gray-500">
                    +{pkg.features.length - 4} fitur lainnya
                  </li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Edit Paket: {editingPackage.name}</h3>
                <button
                  onClick={() => setEditingPackage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Paket</label>
                  <input
                    type="text"
                    value={editingPackage.name}
                    onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Harga</label>
                  <input
                    type="text"
                    value={editingPackage.price}
                    onChange={(e) => setEditingPackage({ ...editingPackage, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Durasi</label>
                  <input
                    type="text"
                    value={editingPackage.duration}
                    onChange={(e) => setEditingPackage({ ...editingPackage, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingPackage.popular}
                      onChange={(e) => setEditingPackage({ ...editingPackage, popular: e.target.checked })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Tandai sebagai paket populer</span>
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Fitur Paket</label>
                <div className="space-y-2">
                  {editingPackage.features?.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value, true)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {editingPackage.features.length > 1 && (
                        <button
                          onClick={() => removeFeature(index, true)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTimes className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addFeature(true)}
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
                  >
                    <FaPlus className="h-3 w-3" />
                    <span>Tambah Fitur</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setEditingPackage(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  <FaSave className="h-4 w-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceManagement;
