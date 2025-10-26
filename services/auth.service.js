import api from './api';

class AuthService {
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      const response = await api.post('/auth/logout');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async checkHealth() {
    try {
      const response = await api.get('/health');
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
