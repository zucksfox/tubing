import React, { useState } from 'react';
import { 
  FaTachometerAlt, 
  FaDollarSign, 
  FaImages, 
  FaVideo, 
  FaSignOutAlt, 
  FaBars,
  FaTimes,
  FaCog
} from 'react-icons/fa';
import { logout } from '../utils/auth';

const AdminLayout = ({ children, activeMenu, onMenuChange, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: FaTachometerAlt,
      description: 'Ringkasan data'
    },
    {
      id: 'prices',
      name: 'Kelola Harga',
      icon: FaDollarSign,
      description: 'Atur paket & harga'
    },
    {
      id: 'gallery',
      name: 'Kelola Gambar',
      icon: FaImages,
      description: 'Upload & edit gambar'
    },
    {
      id: 'video',
      name: 'Kelola Video',
      icon: FaVideo,
      description: 'Atur video profil'
    }
  ];

  const handleLogout = () => {
    if (window.confirm('Yakin ingin keluar dari dashboard?')) {
      logout();
      onLogout();
    }
  };

  const handleMenuClick = (menuId) => {
    onMenuChange(menuId);
    setSidebarOpen(false); // Close sidebar on mobile after selecting menu
  };

  return (
    <div className="min-h-screen bg-gray-100 lg:flex">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaBars className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">XG</span>
              </div>
              <span className="font-semibold text-gray-800">Admin Dashboard</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-500"
          >
            <FaSignOutAlt className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0 lg:z-0`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">XG</span>
            </div>
            <span className="font-semibold text-gray-800">Admin Panel</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 px-3">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeMenu === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-500 shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <IconComponent className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className={`text-xs ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>
                        {item.description}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="h-5 w-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:flex lg:flex-col">
        {/* Desktop Header */}
        <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {menuItems.find(item => item.id === activeMenu)?.name || 'Dashboard'}
              </h1>
              <p className="text-gray-600 text-sm">
                {menuItems.find(item => item.id === activeMenu)?.description || 'Kelola website XGono Adventure'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <FaCog className="h-5 w-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FaSignOutAlt className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 lg:overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
