import React from 'react';
import { X, ShieldAlert, AlertTriangle, FileText, CheckCircle2, Download, Printer } from 'lucide-react';

export default function DossierDrawer({ metadata, onClose }) {
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="drawer-panel animate-fade" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-group">
            <div className="drawer-badge-row">
              <span className="badge badge-critical">
                <ShieldAlert size={13} />
                SIU Forensic Dossier
              </span>
              <span className="drawer-claim-id">ID: {metadata.id}</span>
            </div>
            <h2 className="drawer-title">Fraud Risk Investigation Summary</h2>
            <p className="drawer-subtitle">
              Comprehensive anomaly audit trail for <strong>{metadata.patientName}</strong> ({metadata.demographics})
            </p>
          </div>
          <button className="drawer-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          {/* Highlights Box */}
          <div className="dossier-stat-grid">
            <div className="dossier-stat-card">
              <span className="stat-label">Claimed Sum</span>
              <span className="stat-value">{metadata.claimedAmount}</span>
            </div>
            <div className="dossier-stat-card critical-bg">
              <span className="stat-label">Fraud Probability</span>
              <span className="stat-value text-critical">87% High</span>
            </div>
            <div className="dossier-stat-card">
              <span className="stat-label">Velocity Tier</span>
              <span className="stat-value">6.8x Benchmark</span>
            </div>
          </div>

          {/* 3 Major Fraud Signals */}
          <div className="drawer-section">
            <h4 className="drawer-section-title">
              <AlertTriangle size={15} className="text-warning" />
              Primary Forensic Vectors (3 Identified)
            </h4>
            <div className="fraud-signal-box">
              <div className="signal-item">
                <span className="signal-number">01</span>
                <div>
                  <strong>Duplicate Invoice Hash Collision:</strong>
                  <p>Pharmacy invoice lines exactly match previous claim #CLM-78391 settled 42 days ago.</p>
                </div>
              </div>
              <div className="signal-item">
                <span className="signal-number">02</span>
                <div>
                  <strong>Material Policy Modification:</strong>
                  <p>Sum insured expanded 300% from ₹5L to ₹15L merely 18 days prior to hospitalization.</p>
                </div>
              </div>
              <div className="signal-item">
                <span className="signal-number">03</span>
                <div>
                  <strong>Geospatial Entity Anomaly:</strong>
                  <p>Patient travelled past 6 high-tier network hospitals to seek care at unaccredited clinic.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Audit */}
          <div className="drawer-section">
            <h4 className="drawer-section-title">Case Adjudication Audit Log</h4>
            <div className="audit-timeline">
              <div className="timeline-node">
                <span className="node-dot passed"></span>
                <div className="node-content">
                  <span className="node-time">Today, 09:14 AM</span>
                  <span className="node-text">OCR & Clinical Rule Engine processed 53 verification checks.</span>
                </div>
              </div>
              <div className="timeline-node">
                <span className="node-dot alert"></span>
                <div className="node-content">
                  <span className="node-time">Today, 09:15 AM</span>
                  <span className="node-text">Automated high-risk flag raised: 24 warnings & 5 critical anomalies.</span>
                </div>
              </div>
              <div className="timeline-node">
                <span className="node-dot"></span>
                <div className="node-content">
                  <span className="node-time">Pending</span>
                  <span className="node-text">Awaiting human claim officer adjudication queries dispatch.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="drawer-footer">
          <button className="btn-secondary" onClick={() => window.print()}>
            <Printer size={15} />
            <span>Print Dossier</span>
          </button>
          <button className="btn-primary" onClick={onClose}>
            <Download size={15} />
            <span>Export Forensic PDF</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
