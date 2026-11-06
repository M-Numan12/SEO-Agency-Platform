import React from 'react';
import ContentManager from '../../components/admin/ContentManager.jsx';
import './AdminBlogs.scss';

export default function AdminBlogs() {
  return (
    <div className="admin-blogs">
      <ContentManager type="blogs" />
    </div>
  );
}
