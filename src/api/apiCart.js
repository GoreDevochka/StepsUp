import apiClient from './apiClient';

const apiCart = {
    getCart: () => {
      const token = localStorage.getItem('token');
      return apiClient.get('/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },

  addToCart: (productId, size, quantity) => {
    return apiClient.post('/cart', { product_id: productId, size, quantity });
  },

  removeFromCart: (itemId) => {
    return apiClient.delete(`/cart/${itemId}`);
  },
};

export default apiCart;
