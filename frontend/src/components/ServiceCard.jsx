import React from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Link2,
  PenTool,
  Target,
  Globe2,
  ChartNoAxesCombined,
  ArrowUpRight
} from 'lucide-react';
import './ServiceCard.scss';

const icons = {
  search: Search,
  link: Link2,
  content: PenTool,
  social: Target,
  globe: Globe2,
  analytics: ChartNoAxesCombined
};

export default function ServiceCard({ item, index = 0 }) {
  const Icon = icons[item.icon] || Search;

  return (
    <Link className="service-card" to={'/services/' + item.slug}>
      <span className="service-icon">
        <Icon size={25} />
      </span>
      <span className="service-count">{String(index + 1).padStart(2, '0')}</span>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <strong>
        Explore Service <ArrowUpRight size={16} />
      </strong>
    </Link>
  );
}
