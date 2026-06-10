import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  LayoutDashboard, FileText, Mail, Star,
  Settings, Menu, X, LogOut, Briefcase, ChevronRight
} from 'lucide-react';
import './AdminLayout.css';

const NAV = [
  { path: '/admin',          label: 'Dashboard', Icon: LayoutDashboard },
  { path: '/admin/quotes',   label: 'Quotes',    Icon: FileText },
  { path: '/admin/messages', label: 'Messages',  Icon: Mail },
  { path: '/admin/reviews',  label: 'Reviews',   Icon: Star },
  { path: '/admin/services', label: 'Services',  Icon: Briefcase },
  { path: '/admin/settings', label: 'Settings',  Icon: Settings },
];

export default function AdminLayout({ children }) {
  const { admin, logout } = useAdminAuth();
  const [open, setOpen]   = useState(false);
  const location          = useLocation();
  const navigate          = useNavigate();

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const isActive = (path) =>
    path === '/admin'
      ? location.pathname === '/admin'
      : location.pathname.startsWith(path);

  return (
    <div className="al-wrap">
      {/* Sidebar */}
      <aside className={`al-sidebar ${open ? 'al-sidebar--open' : ''}`}>
        <div className="al-logo">
          <span className="al-logo-name">MBPSS</span>
          <span className="al-logo-sub">Admin Panel</span>
        </div>

        <nav className="al-nav">
          {NAV.map(({ path, label, Icon }) => (
            <Link
              key={path}
              to={path}
              className={`al-nav-item ${isActive(path) ? 'al-nav-item--active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <Icon size={17} />
              <span>{label}</span>
              {isActive(path) && <ChevronRight size={13} className="al-arrow" />}
            </Link>
          ))}
        </nav>

        <button className="al-logout" onClick={handleLogout}>
          <LogOut size={15} /> Sign Out
        </button>
      </aside>

      {open && <div className="al-overlay" onClick={() => setOpen(false)} />}

      {/* Main content */}
      <div className="al-main">
        <header className="al-topbar">
          <button className="al-burger" onClick={() => setOpen(o => !o)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="al-page-title">
            {NAV.find(n => isActive(n.path))?.label || 'Admin'}
          </span>
          <div className="al-topbar-right">
            <a href="/" target="_blank" rel="noopener noreferrer" className="al-site-link">
              ↗ View Site
            </a>
            <div className="al-user">
              <div className="al-avatar">{admin?.name?.charAt(0) || 'A'}</div>
              <span className="al-username">{admin?.name || 'Admin'}</span>
            </div>
          </div>
        </header>

        <main className="al-content">{children}</main>
      </div>
    </div>
  );
}
