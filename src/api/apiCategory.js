import apiClient from './apiClient';

const apiCategory = {
  getCategories: () => {
    return apiClient.get('/categories');
  },

  addCategory: (name) => {
    return apiClient.post('/categories', { name });  // Только для администратора
  },

  updateCategory: (id, name) => {
    return apiClient.put(`/categories/${id}`, { name });  // Только для администратора
  },

  deleteCategory: (id) => {
    return apiClient.delete(`/categories/${id}`);  // Только для администратора
  },
};

export default apiCategory;
