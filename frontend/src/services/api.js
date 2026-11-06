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

export const getBlogs = () => api('/blogs');
export const getBlog = (slug) => api('/blogs/' + encodeURIComponent(slug));
export const getServices = () => api('/services');
export const getService = (slug) => api('/services/' + encodeURIComponent(slug));
