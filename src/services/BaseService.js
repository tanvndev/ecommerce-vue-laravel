import axios from '@/configs/axios';

class BaseService {
  async changeStatus(payload) {
    try {
      const response = await axios.put('/dashboard/changeStatus', payload);

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
  async changeStatusAll(payload) {
    try {
      const response = await axios.put('/dashboard/changeStatusMultiple', payload);

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
  async deleteMultiple(payload) {
    try {
      const response = await axios.delete('/dashboard/deleteMultiple', { data: payload });
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

export default new BaseService();
