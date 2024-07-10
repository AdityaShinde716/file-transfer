import axios from 'axios';
import { getAuthHeader } from './auth.js';

export const uploadFile = (fileData, onUploadProgress) => {
  return axios.post('/api/files/upload', fileData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...getAuthHeader().headers,
    },
    onUploadProgress,
  });
};

