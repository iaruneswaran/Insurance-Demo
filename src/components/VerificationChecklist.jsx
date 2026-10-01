import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';

export default function VerificationChecklist({ groups = [] }) {
  const [activeTab, setActiveTab] = useState('warnings'); // 'warnings' | 'passed'
  const [searchQuery, setSearchQuery] = useState('');

  // Flatten all items from groups
  const allItems = useMemo(() => {
    return groups.flatMap((group) => 
      (group.items || []).map((item) => ({
        ...item,
        groupId: group.id,
        groupTitle: group.title,
      }))
    );
  }, [groups]);

  // Filter items based on activeTab and searchQuery
  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      // 1. Tab filter
      if (activeTab === 'warnings') {
        if (item.status !== 'warning' && item.status !== 'failed') return false;
      } else if (activeTab === 'passed') {
        if (item.status !== 'passed') return false;
      }

      // 2. Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesQuestion = item.question?.toLowerCase().includes(query);
        const matchesDetail = item.detail?.toLowerCase().includes(query);
        const matchesGroup = item.groupTitle?.toLowerCase().includes(query);
        if (!matchesQuestion && !matchesDetail && !matchesGroup) return false;
      }

      return true;
    });
  }, [allItems, activeTab, searchQuery]);

  // Clean status badge rendering (equal width, no icons)
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'passed':
        return (
          <span className="pin-card-badge badge-passed">
            Passed
          </span>
        );
      case 'warning':
        return (
          <span className="pin-card-badge badge-warning">
            Flagged
          </span>
        );
      case 'failed':
        return (
          <span className="pin-card-badge badge-failed">
            Failed
          </span>
        );
      default:
        return (
          <span className="pin-card-badge badge-neutral">
            Standard
          </span>
        );
    }
  };

  return (
    <section className="verification-section">
      {/* Section Header */}
      <div className="section-header-row">
        <div>
          <h2 className="section-heading">Verification checklist</h2>
        </div>
      </div>

      {/* Controls Bar: 2 Tabs (Flags & Warnings, Passed) + Search */}
      <div className="pin-checklist-controls">
        {/* Two Tabs */}
        <div className="pin-main-tabs" role="tablist" aria-label="Verification checklist filter">
          <button 
            type="button"
            role="tab"
            aria-selected={activeTab === 'warnings'}
            className={`pin-tab-btn ${activeTab === 'warnings' ? 'active' : ''}`}
            onClick={() => setActiveTab('warnings')}
          >
            Flags & Warnings
          </button>

          <button 
            type="button"
            role="tab"
            aria-selected={activeTab === 'passed'}
            className={`pin-tab-btn ${activeTab === 'passed' ? 'active' : ''}`}
            onClick={() => setActiveTab('passed')}
          >
            Passed
          </button>
        </div>

        {/* Clean Search Input */}
        <div className="pin-search-box">
          <Search size={16} className="pin-search-icon" />
          <input 
            type="text" 
            placeholder="Search policy rules or findings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pin-search-input"
          />
          {searchQuery && (
            <button 
              type="button" 
              className="pin-search-clear" 
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Clean Minimal Card List */}
      <div className="pin-checklist-list">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="pin-checklist-card"
          >
            {/* Card Header: Question (Left), Single Equal-Width Status Badge (Right) */}
            <div className="pin-card-header">
              <h3 className="pin-card-title">{item.question}</h3>
              <div className="pin-card-badge-wrap">
                {renderStatusBadge(item.status)}
              </div>
            </div>

            {/* Card Body: Finding Detail */}
            <p className="pin-card-detail">{item.detail}</p>
          </div>
        ))}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="pin-empty-state">
            <p className="empty-title">No checks found matching current filters</p>
            <p className="empty-subtitle">Try adjusting your search terms or filter selection.</p>
            {searchQuery && (
              <button 
                type="button" 
                className="pin-reset-btn"
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('warnings');
                }}
              >
                Reset Search
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
