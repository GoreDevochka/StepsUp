import apiClient from './apiClient';

const apiType = {
  getTypes: () => {
    return apiClient.get('/types');
  },

  addType: (name) => {
    return apiClient.post('/types', { name });  // Только для администратора
  },

  updateType: (id, name) => {
    return apiClient.put(`/types/${id}`, { name });  // Только для администратора
  },

  deleteType: (id) => {
    return apiClient.delete(`/types/${id}`);  // Только для администратора
  },
};

export default apiType;
