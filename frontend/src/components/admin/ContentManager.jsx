import React, { useEffect, useState } from 'react';
import { adminApi } from '../../services/adminApi.js';
import './ContentManager.scss';

const empty = {
  name: '',
  title: '',
  slug: '',
  description: '',
  content: '',
  excerpt: '',
  category: '',
  icon: 'search',
  imageUrl: '',
  metaTitle: '',
  metaDescription: '',
  isPublished: false,
};

function slugify(v) {
  return v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function ContentManager({ type }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const blog = type === 'blogs';

  async function refresh() {
    setError('');
    setLoading(true);
    try {
      const data = await adminApi.list(type);
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, [type]);

  function open(item = {}) {
    setEdit(item);
    setForm({ ...empty, ...item });
  }

  function update(key, value) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const keys = blog
        ? [
            'title',
            'slug',
            'excerpt',
            'content',
            'category',
            'imageUrl',
            'metaTitle',
            'metaDescription',
            'isPublished',
          ]
        : [
            'name',
            'slug',
            'description',
            'content',
            'icon',
            'imageUrl',
            'metaTitle',
            'metaDescription',
            'isPublished',
          ];
      const payload = Object.fromEntries(keys.map((k) => [k, form[k]]));

      if (edit?.id) {
        await adminApi.update(type, edit.id, payload);
      } else {
        await adminApi.create(type, payload);
      }

      setEdit(null);
      await refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(item) {
    if (!window.confirm('Delete ' + (item.title || item.name) + ' permanently?')) return;
    setBusy(true);
    try {
      await adminApi.remove(type, item.id);
      await refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="content-manager">
      <div className="manager-head">
        <div>
          <span className="eyebrow">CONTENT MANAGEMENT</span>
          <h1>{blog ? 'Blogs' : 'Services'}</h1>
          <p>Add, edit, publish, and delete {blog ? 'articles' : 'services'}.</p>
        </div>
        <button className="button button-dark" onClick={() => open()}>
          + Add {blog ? 'Blog' : 'Service'}
        </button>
      </div>

      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}

      {edit && (
        <form className="content-form" onSubmit={save}>
          <div className="form-title">
            <h2>
              {edit.id ? 'Edit' : 'Create'} {blog ? 'Blog' : 'Service'}
            </h2>
            <button type="button" onClick={() => setEdit(null)}>
              ✕
            </button>
          </div>

          <div className="editor-grid">
            <label className="form-control">
              {blog ? 'Blog Title' : 'Service Name'}
              <input
                required
                value={blog ? form.title : form.name}
                onChange={(e) => {
                  const k = blog ? 'title' : 'name';
                  const v = e.target.value;
                  setForm((p) => ({
                    ...p,
                    [k]: v,
                    slug: p.slug || slugify(v),
                  }));
                }}
              />
            </label>

            <label className="form-control">
              Slug
              <input
                required
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                value={form.slug}
                onChange={(e) => update('slug', slugify(e.target.value))}
              />
            </label>

            {blog ? (
              <>
                <label className="form-control">
                  Category
                  <input
                    value={form.category || ''}
                    onChange={(e) => update('category', e.target.value)}
                  />
                </label>
                <label className="form-control">
                  Excerpt
                  <textarea
                    value={form.excerpt || ''}
                    onChange={(e) => update('excerpt', e.target.value)}
                  />
                </label>
              </>
            ) : (
              <>
                <label className="form-control">
                  Icon
                  <select
                    value={form.icon || 'search'}
                    onChange={(e) => update('icon', e.target.value)}
                  >
                    {['search', 'link', 'content', 'social', 'globe', 'analytics'].map(
                      (v) => (
                        <option key={v}>{v}</option>
                      )
                    )}
                  </select>
                </label>
                <label className="form-control">
                  Description
                  <textarea
                    minLength={10}
                    required
                    value={form.description || ''}
                    onChange={(e) => update('description', e.target.value)}
                  />
                </label>
              </>
            )}

            <label className="form-control span-two">
              Full Content
              <textarea
                required={blog}
                rows={7}
                value={form.content || ''}
                onChange={(e) => update('content', e.target.value)}
              />
            </label>

            <label className="form-control span-two">
              Image URL (HTTPS)
              <input
                type="url"
                value={form.imageUrl || ''}
                onChange={(e) => update('imageUrl', e.target.value)}
              />
            </label>

            <label className="form-control">
              Meta Title
              <input
                maxLength={180}
                value={form.metaTitle || ''}
                onChange={(e) => update('metaTitle', e.target.value)}
              />
            </label>

            <label className="form-control">
              Meta Description
              <textarea
                maxLength={320}
                value={form.metaDescription || ''}
                onChange={(e) => update('metaDescription', e.target.value)}
              />
            </label>

            <label className="publish">
              <input
                type="checkbox"
                checked={!!form.isPublished}
                onChange={(e) => update('isPublished', e.target.checked)}
              />{' '}
              Published
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="button button-light"
              onClick={() => setEdit(null)}
            >
              Cancel
            </button>
            <button disabled={busy} className="button button-dark">
              {busy ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      )}

      <div className="table-wrap">
        {loading ? (
          'Loading content...'
        ) : (
          <table>
            <thead>
              <tr>
                <th>{blog ? 'Blog Title' : 'Service'}</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.title || item.name}</td>
                  <td>{item.slug}</td>
                  <td>
                    <span className={item.isPublished ? 'published' : 'draft'}>
                      {item.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => open(item)}>Edit</button>
                    <button disabled={busy} onClick={() => remove(item)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!items.length && (
                <tr>
                  <td colSpan={4}>No items yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
