import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Change this to your server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadJobApplication = async (formData: FormData) => {
  try {
    const response = await api.post('/api/generate-cv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to generate CV');
    }
    throw error;
  }
};

export default api;