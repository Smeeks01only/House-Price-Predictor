import api from './api';

export const predictionService = {
  /**
   * Submit a house price prediction request to the Django backend.
   * @param {Object} data The formatted payload matching Django serializers
   * @returns {Promise<Object>} The response data containing predicted_price
   */
  async predictHousePrice(data) {
    const response = await api.post('/api/predict/', data);
    return response.data;
  }
};
