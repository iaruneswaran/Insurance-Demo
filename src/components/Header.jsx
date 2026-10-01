import React from 'react';
import { 
  ShieldAlert, 
  ChevronLeft, 
  User, 
  Home, 
  ArrowUpRight, 
  FileText, 
  Activity, 
  ExternalLink 
} from 'lucide-react';

export default function Header({ metadata, onOpenDossier }) {
  return (
    <header className="header-container">
      {/* Top Utility Bar */}
      <div className="top-utility-bar">
        <div className="brand-group">
          <div className="brand-logo-badge">
            <span className="brand-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#E11D48" />
                <path d="M10 8L15 12L10 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div className="brand-titles">
              <span className="brand-name">FastTrack</span>
              <span className="brand-sub">by GoodDoc</span>
            </div>
          </div>

          <div className="brand-divider" />

          <div className="module-title-box">
            <span className="module-name">Med Focus</span>
            <span className="module-sub">Claims Adjudication & Fraud Shield</span>
          </div>
        </div>

        <div className="top-actions-group">
          <span className="view-mode-badge">
            <span className="status-dot-blue"></span>
            Insurer View
          </span>

          <button className="top-nav-btn">
            <User size={15} />
            <span>My Account</span>
          </button>

          <button className="top-nav-btn">
            <Home size={15} />
            <span>Home</span>
          </button>
        </div>
      </div>

      {/* Claim Metadata & Navigation Bar */}
      <div className="claim-metadata-bar">
        <div className="claim-left-meta">
          <button className="back-link-btn" title="Return to claims queue">
            <ChevronLeft size={16} />
            <span>Back to Claim Details</span>
          </button>
        </div>

      </div>
    </header>
  );
}
