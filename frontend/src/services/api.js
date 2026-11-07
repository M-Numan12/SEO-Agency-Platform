import { defaultServices, defaultBlogs } from '../data/defaultContent.js';

const root = (import.meta.env.VITE_API_URL || 'http://localhost:8003/api').replace(/\/$/, '');

export async function api(path, options = {}) {
  const r = await fetch(root + path, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const text = await r.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { error: 'Unexpected server response' };
  }

  if (!r.ok) {
    throw new Error(data?.error || 'Request failed');
  }

  return data;
}

export const getServices = async () => {
  try {
    const res = await api('/services');
    if (Array.isArray(res) && res.length > 0) return res;
    return defaultServices;
  } catch (err) {
    console.info('Backend unavailable, using default services:', err.message);
    return defaultServices;
  }
};

export const getService = async (slug) => {
  try {
    const res = await api('/services/' + encodeURIComponent(slug));
    if (res && (res.name || res.title)) return res;
    const match = defaultServices.find((s) => s.slug === slug);
    if (match) return match;
    throw new Error('Service not found');
  } catch (err) {
    const match = defaultServices.find((s) => s.slug === slug);
    if (match) return match;
    throw err;
  }
};

export const getBlogs = async () => {
  try {
    const res = await api('/blogs');
    if (Array.isArray(res) && res.length > 0) return res;
    return defaultBlogs;
  } catch (err) {
    console.info('Backend unavailable, using default blogs:', err.message);
    return defaultBlogs;
  }
};

export const getBlog = async (slug) => {
  try {
    const res = await api('/blogs/' + encodeURIComponent(slug));
    if (res && res.title) return res;
    const match = defaultBlogs.find((b) => b.slug === slug);
    if (match) return match;
    throw new Error('Blog not found');
  } catch (err) {
    const match = defaultBlogs.find((b) => b.slug === slug);
    if (match) return match;
    throw err;
  }
};
