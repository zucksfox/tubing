import React from 'react';
import { 
  FaDollarSign, 
  FaImages, 
  FaVideo, 
  FaEye, 
  FaUsers,
  FaChartLine,
  FaCalendar,
  FaWhatsapp
} from 'react-icons/fa';

const Dashboard = ({ siteData }) => {
  // Statistics cards data
  const stats = [
    {
      id: 1,
      name: 'Total Paket',
      value: siteData.packages?.length || 0,
      icon: FaDollarSign,
      color: 'bg-blue-500',
      change: '+2.5%',
      changeType: 'positive'
    },
    {
      id: 2,
      name: 'Gambar Galeri',
      value: siteData.galleryImages?.length || 0,
      icon: FaImages,
      color: 'bg-green-500',
      change: '+12.3%',
      changeType: 'positive'
    },
    {
      id: 3,
      name: 'Video Profil',
      value: siteData.videoProfile ? 1 : 0,
      icon: FaVideo,
      color: 'bg-purple-500',
      change: 'Updated',
      changeType: 'neutral'
    },
    {
      id: 4,
      name: 'Pengunjung Hari Ini',
      value: '245',
      icon: FaEye,
      color: 'bg-orange-500',
      change: '+8.1%',
      changeType: 'positive'
    }
  ];

  // Recent activities (mock data)
  const recentActivities = [
    {
      id: 1,
      action: 'Paket Premium diperbarui',
      time: '2 jam yang lalu',
      icon: FaDollarSign,
      color: 'text-blue-500'
    },
    {
      id: 2,
      action: 'Gambar baru ditambahkan ke galeri',
      time: '5 jam yang lalu',
      icon: FaImages,
      color: 'text-green-500'
    },
    {
      id: 3,
      action: 'Video profil diperbarui',
      time: '1 hari yang lalu',
      icon: FaVideo,
      color: 'text-purple-500'
    },
    {
      id: 4,
      action: '15 pesan WhatsApp baru',
      time: '2 hari yang lalu',
      icon: FaWhatsapp,
      color: 'text-green-600'
    }
  ];

  // Popular packages (based on mock data)
  const popularPackages = siteData.packages?.map(pkg => ({
    ...pkg,
    bookings: Math.floor(Math.random() * 50) + 10, // Mock booking data
    revenue: parseInt(pkg.price.replace(/[^\d]/g, '')) * (Math.floor(Math.random() * 10) + 5) // Mock revenue
  })).sort((a, b) => b.bookings - a.bookings) || [];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Selamat Datang, Admin!</h2>
            <p className="text-blue-100">
              Dashboard XGono Tubing Adventure
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100">Hari ini</div>
            <div className="text-xl font-semibold">{new Date().toLocaleDateString('id-ID')}</div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div key={stat.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 ${stat.color} rounded-lg`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">dari bulan lalu</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Packages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Paket Populer</h3>
              <FaChartLine className="text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {popularPackages.slice(0, 3).map((pkg, index) => (
                <div key={pkg.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{pkg.name}</div>
                      <div className="text-sm text-gray-500">{pkg.bookings} pemesanan</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-800">{pkg.price}</div>
                    <div className="text-sm text-green-600">
                      Revenue: Rp {pkg.revenue?.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Aktivitas Terbaru</h3>
              <FaCalendar className="text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const IconComponent = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex-shrink-0">
                      <IconComponent className={`h-5 w-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Sistem</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Terakhir Login:</span>
            <span className="ml-2 font-medium">{new Date().toLocaleString('id-ID')}</span>
          </div>
          <div>
            <span className="text-gray-600">Status:</span>
            <span className="ml-2 text-green-600 font-medium">● Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
