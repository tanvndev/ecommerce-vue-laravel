import axios from '@/configs/axios';
import Cookies from 'js-cookie';

class AuthService {
  async login(payload) {
    try {
      const response = await axios.post('/auth/login', {
        email: payload.email,
        password: payload.password
      });

      if (response.status !== 200) {
        return {
          success: false,
          messages: response.messages
        };
      }

      const user = response.data;
      // set token to Cookie
      Cookies.set('user', JSON.stringify(user), {
        expires: parseInt(import.meta.env.VITE_REFRESHTOKEN_EXPIRES)
      });
      return {
        success: true,
        data: user,
        messages: response.messages
      };
    } catch (error) {
      return {
        success: false,
        messages: error.response.data.messages
      };
    }
  }
  async logout() {
    await axios.post('/auth/logout', {});
    Cookies.remove('user');
  }

  async refreshToken() {
    try {
      const user = JSON.parse(Cookies.get('user') ?? null);

      const response = await axios.post('/auth/refreshToken', {});

      if (response.status !== 200) {
        return {
          success: false,
          messages: response.messages
        };
      }

      const newAccessToken = response.data.access_token;
      user.access_token = newAccessToken;

      Cookies.set('user', JSON.stringify(user), {
        expires: parseInt(import.meta.env.VITE_REFRESHTOKEN_EXPIRES)
      });

      return {
        success: true,
        data: user
      };
    } catch (error) {
      return {
        success: false,
        messages: [error.message]
      };
    }
  }
}

export default new AuthService();
