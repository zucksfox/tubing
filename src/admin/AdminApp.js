import React, { useState, useEffect } from 'react';
import { isAuthenticated, validateToken } from './utils/auth';
import { loadData, saveData } from '../data/siteData';

// Import pages
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import PriceManagement from './pages/PriceManagement';
import GalleryManagement from './pages/GalleryManagement';
import VideoManagement from './pages/VideoManagement';

const AdminApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize data and check authentication
  useEffect(() => {
    // Load site data
    const data = loadData();
    setSiteData(data);

    // Check authentication
    const authenticated = isAuthenticated() && validateToken();
    setIsLoggedIn(authenticated);
    
    setLoading(false);
  }, []);

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveMenu('dashboard');
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveMenu('dashboard');
  };

  // Handle menu change
  const handleMenuChange = (menuId) => {
    setActiveMenu(menuId);
  };

  // Handle data change
  const handleDataChange = (newData) => {
    setSiteData(newData);
    saveData(newData);
    
    // Show success message
    const event = new CustomEvent('showNotification', {
      detail: {
        type: 'success',
        message: 'Data berhasil disimpan!'
      }
    });
    window.dispatchEvent(event);
  };

  // Render current page based on active menu
  const renderCurrentPage = () => {
    if (!siteData) return <div>Loading...</div>;

    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard siteData={siteData} />;
      case 'prices':
        return (
          <PriceManagement 
            siteData={siteData} 
            onDataChange={handleDataChange}
          />
        );
      case 'gallery':
        return (
          <GalleryManagement 
            siteData={siteData} 
            onDataChange={handleDataChange}
          />
        );
      case 'video':
        return (
          <VideoManagement 
            siteData={siteData} 
            onDataChange={handleDataChange}
          />
        );
      default:
        return <Dashboard siteData={siteData} />;
    }
  };

  // Show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  // Show main admin interface
  return (
    <div>
      <AdminLayout
        activeMenu={activeMenu}
        onMenuChange={handleMenuChange}
        onLogout={handleLogout}
      >
        {renderCurrentPage()}
      </AdminLayout>
      
      {/* Notification Component */}
      <NotificationManager />
    </div>
  );
};

// Simple notification manager component
const NotificationManager = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleNotification = (event) => {
      const { type, message } = event.detail;
      const id = Date.now();
      
      setNotifications(prev => [...prev, { id, type, message }]);
      
      // Auto remove after 3 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 3000);
    };

    window.addEventListener('showNotification', handleNotification);
    return () => window.removeEventListener('showNotification', handleNotification);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`px-4 py-3 rounded-lg shadow-lg text-white max-w-sm transform transition-all duration-300 ${
            notification.type === 'success' 
              ? 'bg-green-600' 
              : notification.type === 'error' 
                ? 'bg-red-600' 
                : 'bg-blue-600'
          }`}
        >
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminApp;
