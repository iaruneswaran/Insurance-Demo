import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  FileCheck2, 
  ShieldAlert, 
  Bell, 
  Settings,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('cases');

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'claimants', label: 'Claimants', icon: Users },
    { id: 'cases', label: 'Case Adjudication', icon: FileCheck2 },
    { id: 'audit', label: 'Fraud Shield & SIU', icon: ShieldAlert },
    { id: 'reports', label: 'Tariff Reports', icon: FileSpreadsheet },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
  ];

  return (
    <aside className="sidebar-rail">
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <div className="brand-dot-logo"></div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveItem(item.id)}
                title={item.label}
              >
                <Icon size={19} strokeWidth={isActive ? 2.2 : 1.8} />
                {item.badge && <span className="nav-badge-dot">{item.badge}</span>}
                <span className="tooltip-label">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <button className="sidebar-nav-item" title="Help & Protocol Guide">
          <HelpCircle size={18} strokeWidth={1.8} />
        </button>
        <button className="sidebar-nav-item" title="Settings & Tariffs">
          <Settings size={18} strokeWidth={1.8} />
        </button>
      </div>
    </aside>
  );
}
