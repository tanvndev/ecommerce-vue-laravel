import { ref } from 'vue';
import { BaseService } from '@/services';

export default function useCRUD() {
  const loading = ref(false);
  const error = ref(null);
  const messages = ref(null);

  const getAll = async (endpoint, payload = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await BaseService.getAll(endpoint, payload);
      if (response.success) {
        return response.data;
      }
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const getOne = async (endpoint, id) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await BaseService.getOne(endpoint, id);
      if (response.success) {
        return response.data;
      }
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };
  const create = async (endpoint, payload) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await BaseService.create(endpoint, payload);
      messages.value = response.messages;
      return response.success;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };
  const update = async (endpoint, id, payload) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await BaseService.update(endpoint, id, payload);
      messages.value = response.messages;
      return response.success;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };
  return { getAll, getOne, create, update, loading, error, messages };
}
