import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function AnomalyFindings({ findings, onRaiseQuery }) {
  const [expandedIds, setExpandedIds] = useState(new Set(findings.map(f => f.id)));

  const toggleExpand = (id) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="anomaly-section">
      <div className="section-header-row">
        <h2 className="section-heading">
          Flagged anomaly findings <span className="counter-paren">({findings.length})</span>
        </h2>
      </div>

      <div className="anomaly-list">
        {findings.map((item) => {
          const isExpanded = expandedIds.has(item.id);
          const isCritical = item.priorityType === 'critical';
          const isMedium = item.priorityType === 'medium';

          return (
            <div 
              key={item.id} 
              className={`anomaly-card ${isExpanded ? 'is-expanded' : ''}`}
            >
              <div 
                className="anomaly-card-header"
                onClick={() => toggleExpand(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(item.id);
                  }
                }}
              >
                <div className="anomaly-title-wrap">
                  <span className={`chevron-wrap ${isExpanded ? 'open' : ''}`}>
                    <ChevronDown size={15} />
                  </span>
                  <span className="anomaly-title">{item.title}</span>
                </div>

                <div className="anomaly-header-right">
                  <span className={`priority-badge ${
                    isCritical ? 'priority-critical' : isMedium ? 'priority-medium' : 'priority-high'
                  }`}>
                    {item.priority}
                  </span>
                </div>
              </div>

              {isExpanded && (
                <div className="anomaly-card-body animate-fade">
                  <p className="anomaly-description">{item.description}</p>
                  
                  {item.impact && (
                    <div className="anomaly-impact-box">
                      <div className="impact-left">
                        <span className="impact-label">Clinical / Financial Impact:</span>
                        <p className="impact-text">{item.impact}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
