import axios from '@/configs/axios';

class UserCatalogueService {
  async getOne(id) {
    try {
      const response = await axios.get('/users/catalogues/' + id);

      return {
        success: true,
        messages: response.messages,
        data: response.data
      };
    } catch (error) {
      let messages = error.response ? error.response.messages : 'Unexpected error occurred';
      return {
        success: false,
        messages: messages
      };
    }
  }

  async getAll(payload, ...filers) {
    try {
      const response = await axios.get('/users/catalogues', {
        params: { ...payload, ...filers }
      });

      return {
        success: true,
        messages: response.messages,
        data: response.data
      };
    } catch (error) {
      let messages = error.response ? error.response.messages : 'Unexpected error occurred';
      return {
        success: false,
        messages: messages
      };
    }
  }
  async create(payload) {
    try {
      const response = await axios.post('/users/catalogues', payload);

      return {
        success: true,
        messages: response.messages
      };
    } catch (error) {
      let messages = error.response ? error.response.messages : 'Unexpected error occurred';
      return {
        success: false,
        messages: messages
      };
    }
  }

  async update(id, payload) {
    try {
      const response = await axios.put('/users/catalogues/' + id, payload);

      return {
        success: true,
        messages: response.messages
      };
    } catch (error) {
      let messages = error.response ? error.response.messages : 'Unexpected error occurred';
      return {
        success: false,
        messages: messages
      };
    }
  }
}

export default new UserCatalogueService();
