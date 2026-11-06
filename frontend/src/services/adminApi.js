import { api } from './api.js';

export const authApi = {
  login: (email, password) =>
    api('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  me: () => api('/auth/me'),
  logout: () =>
    api('/auth/logout', {
      method: 'POST',
    }),
};

export const adminApi = {
  list: (type) => api('/admin/' + type),
  create: (type, data) =>
    api('/admin/' + type, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (type, id, data) =>
    api('/admin/' + type + '/' + id, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  remove: (type, id) =>
    api('/admin/' + type + '/' + id, {
      method: 'DELETE',
    }),
};
