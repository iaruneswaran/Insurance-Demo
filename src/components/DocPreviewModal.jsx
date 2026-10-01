import React from 'react';
import { X, FileText, Download, CheckCircle, AlertTriangle, Eye } from 'lucide-react';

export default function DocPreviewModal({ docName, onClose }) {
  if (!docName) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card doc-preview-modal animate-fade" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="badge badge-info">Document Inspection</span>
            <h3 className="modal-title">{docName}</h3>
            <p className="modal-subtitle">OCR Extracted Text & Digital Signature Analysis</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="doc-preview-body">
          <div className="doc-inspection-sheet">
            <div className="sheet-top-banner">
              <span className="sheet-watermark">CONFIDENTIAL CLINICAL RECORD</span>
              <span className="sheet-stamp">PROCESSED BY GOODDOC AI</span>
            </div>

            <div className="sheet-content-preview">
              <div className="doc-placeholder-header">
                <strong>Apex Multi-Specialty Medical Center</strong>
                <p>Department of Internal Medicine & Pulmonology</p>
                <div className="sheet-divider"></div>
              </div>

              <div className="doc-details-grid">
                <div>
                  <span className="doc-label">Document:</span>
                  <strong>{docName}</strong>
                </div>
                <div>
                  <span className="doc-label">Claim Reference:</span>
                  <span>#CLM-94021</span>
                </div>
                <div>
                  <span className="doc-label">Upload Timestamp:</span>
                  <span>18 Feb 2026, 17:42 IST</span>
                </div>
                <div>
                  <span className="doc-label">OCR Status:</span>
                  <span className="text-warning font-medium">Flagged (Stamp Missing / Discrepant)</span>
                </div>
              </div>

              <div className="doc-sample-text">
                <p><strong>Clinical Notes Excerpt:</strong></p>
                <p>
                  Patient admitted with severe acute wheezing, dyspnea on exertion. Prescribed broad-spectrum IV ceftriaxone 1g BID, nebulization Q4H. Invasive bronchoscopy advised despite non-refractory response.
                </p>
              </div>

              <div className="doc-stamp-box">
                <span className="missing-stamp-notice">
                  ⚠️ [MISSING PHYSICIAN MEDICAL REGISTRATION STAMP OR HOSPITAL SEAL]
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close Viewer</button>
          <button className="btn-primary" onClick={() => alert(`Downloading verified copy of ${docName}`)}>
            <Download size={14} />
            <span>Download Original File</span>
          </button>
        </div>
      </div>
    </div>
  );
}
