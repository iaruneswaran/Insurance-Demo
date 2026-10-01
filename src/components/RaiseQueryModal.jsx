import React, { useState } from 'react';
import { X, Send, Building2, User, Stethoscope, AlertTriangle } from 'lucide-react';

export default function RaiseQueryModal({ step, onClose, onSubmit }) {
  const [recipient, setRecipient] = useState('hospital');
  const [urgency, setUrgency] = useState('high');
  const [notes, setNotes] = useState(
    `Regarding claim #CLM-94021: ${step?.description || 'Clarification requested on clinical and billing documentation.'}`
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: step?.title,
      recipient,
      urgency,
      notes,
      timestamp: new Date().toLocaleTimeString(),
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card animate-fade" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="badge badge-warning">Adjudication Action</span>
            <h3 className="modal-title">Raise Official Query</h3>
            <p className="modal-subtitle">Issue formal clarification or document request for: <strong>{step?.title}</strong></p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Send Inquiry To:</label>
            <div className="recipient-selector-grid">
              <button
                type="button"
                className={`recipient-choice-btn ${recipient === 'hospital' ? 'selected' : ''}`}
                onClick={() => setRecipient('hospital')}
              >
                <Building2 size={16} />
                <span>Hospital TPA Desk</span>
              </button>
              <button
                type="button"
                className={`recipient-choice-btn ${recipient === 'member' ? 'selected' : ''}`}
                onClick={() => setRecipient('member')}
              >
                <User size={16} />
                <span>Insured (Elena Smith)</span>
              </button>
              <button
                type="button"
                className={`recipient-choice-btn ${recipient === 'doctor' ? 'selected' : ''}`}
                onClick={() => setRecipient('doctor')}
              >
                <Stethoscope size={16} />
                <span>Treating Physician</span>
              </button>
            </div>
          </div>

          <div className="form-row-duo">
            <div className="form-group flex-1">
              <label className="form-label">Action Required:</label>
              <input 
                type="text" 
                className="form-input read-only-input" 
                value={step?.suggestedAction || 'Clarification / Re-upload'} 
                readOnly 
              />
            </div>
            <div className="form-group flex-1">
              <label className="form-label">Resolution SLA Window:</label>
              <select 
                className="form-select"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
              >
                <option value="critical">24 Hours (Critical Claim)</option>
                <option value="high">48 Hours (High Priority)</option>
                <option value="standard">5 Business Days (Standard)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Formal Query Message:</label>
            <textarea
              className="form-textarea"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter official inquiry notes..."
              required
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Send size={14} />
              <span>Dispatch Query & Log Audit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
