import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileSearch,
  FileCheck,
  PenTool,
  Link2,
  Globe,
  FilePlus2,
  Network,
  Megaphone,
  Search,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import './ServiceCard.scss';

const icons = {
  audit: FileSearch,
  onpage: FileCheck,
  writing: PenTool,
  link: Link2,
  guestpost: Globe,
  insertion: FilePlus2,
  pbn: Network,
  pr: Megaphone,
  search: Search,
  content: PenTool,
  social: Megaphone,
  globe: Globe,
  analytics: FileSearch,
};

export default function ServiceCard({ item, index = 0 }) {
  const Icon = icons[item.icon] || icons[item.slug] || Search;

  return (
    <Link className="service-card" to={'/services/' + item.slug}>
      <div className="card-top-row">
        <span className="service-icon">
          <Icon size={24} />
        </span>
        {item.badge ? (
          <span className="service-badge">
            <Sparkles size={12} /> {item.badge}
          </span>
        ) : (
          <span className="service-count">{String(index + 1).padStart(2, '0')}</span>
        )}
      </div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <strong className="service-link-label">
        Explore Architecture <ArrowUpRight size={16} />
      </strong>
    </Link>
  );
}
