import React from 'react';
import ContentManager from '../../components/admin/ContentManager.jsx';
import './AdminServices.scss';

export default function AdminServices() {
  return (
    <div className="admin-services">
      <ContentManager type="services" />
    </div>
  );
}
