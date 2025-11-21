import axiosInstance from '../axiosConfig';
import { API_ENDPOINTS } from '../endpoints';

export const carbonService = {
  // Calculate carbon footprint
  calculateCarbon: async (data) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.CALCULATE_CARBON,
        data
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get calculation history
  getCalculations: async (params = {}) => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.GET_CALCULATIONS,
        { params }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single calculation
  getCalculationById: async (id) => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.GET_CALCULATION_BY_ID(id)
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};