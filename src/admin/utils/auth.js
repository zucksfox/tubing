// Konfigurasi admin credentials (dalam production gunakan database dan hash password)
const ADMIN_CREDENTIALS = {
  username: 'adminxgono',
  password: 'xgono2025' // Ganti dengan password yang lebih aman
};

// Local storage key untuk menyimpan status login
const AUTH_TOKEN_KEY = 'xgono_admin_token';

// Fungsi untuk login
export const login = (username, password) => {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const token = btoa(`${username}:${Date.now()}`); // Simple token
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    return { success: true, token };
  }
  return { success: false, message: 'Username atau password salah' };
};

// Fungsi untuk logout
export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  return true;
};

// Fungsi untuk mengecek apakah user sudah login
export const isAuthenticated = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return !!token;
};

// Fungsi untuk mendapatkan token
export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

// Fungsi untuk validasi token (sederhana, dalam production gunakan JWT)
export const validateToken = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const decoded = atob(token);
    const [username, timestamp] = decoded.split(':');
    
    // Token valid jika masih dalam 24 jam
    const tokenTime = parseInt(timestamp);
    const currentTime = Date.now();
    const timeDiff = currentTime - tokenTime;
    const hoursValid = 24 * 60 * 60 * 1000; // 24 jam
    
    return username === ADMIN_CREDENTIALS.username && timeDiff < hoursValid;
  } catch (error) {
    return false;
  }
};
