import apiClient from "/src/api/apiClient.js";

const apiAuth = {
  login: (email, password) => {
    return apiClient.post('/auth/login', { email, password });
  },

  register: (email, password, name) => {
    return apiClient.post('/auth/register', { email, password, name });
  },

  getCurrentUser: (token) => { // Add token parameter
    console.log('token in getCurrentUser =', token); 
    return apiClient.get('/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },
};

export default apiAuth;