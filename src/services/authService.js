import API from './api';

export const authService = {
  // POST /api/v1/auth/login
  login: async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    // Assuming your backend returns token directly or inside data wrap: { token: '...' }
    const token = response.token || response.data?.token;
    
    if (token) {
      localStorage.setItem('mh_nexus_token', token);
    }
    return response;
  },

  // POST /api/v1/auth/register
  register: (data) => API.post('/auth/register', data),

  // GET /api/v1/auth/me
  getMe: () => API.get('/auth/me'),

  // Clear local session storage on sign out
  logout: () => {
    localStorage.removeItem('mh_nexus_token');
    window.location.href = '/login';
  }
};