import apiClient from './apiClient';

const apiProduct = {
  getProducts: () => {
    return apiClient.get('/products');
  },

  getProductById: (id) => {
    return apiClient.get(`/products/${id}`);
  },

  addProduct: (data) => {
    return apiClient.post('/products', data);  // Только для администратора
  },

  updateProduct: (id, data) => {
    return apiClient.put(`/products/${id}`, data);  // Только для администратора
  },

  deleteProduct: (id) => {
    return apiClient.delete(`/products/${id}`);  // Только для администратора
  },
};

export default apiProduct;
