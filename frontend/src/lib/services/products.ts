import api from '../api';
import { Product } from '../types';

export const ProductService = {
  /**
   * Fetch public products (without pricing)
   */
  getPublicProducts: async (): Promise<Product[]> => {
    // Mock implementation until backend is ready
    // const response = await api.get('/products');
    // return response.data.data;
    
    return [];
  },

  /**
   * Fetch B2B products (with personalized pricing and stock)
   */
  getB2BProducts: async (): Promise<Product[]> => {
    // const response = await api.get('/b2b/products');
    // return response.data.data;
    
    return [];
  }
};
