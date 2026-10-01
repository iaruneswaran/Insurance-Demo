import React from 'react';
import { FileText, Image as ImageIcon, Check } from 'lucide-react';

function getDocMeta(docStr) {
  if (!docStr) return null;
  const isNoDoc = docStr.toLowerCase().includes('no documents');
  if (isNoDoc) {
    return { isNoDoc: true, displayName: 'No documents attached' };
  }

  let displayName = docStr;
  let fileName = '';
  let size = '1.4 MB';
  let ext = 'pdf';

  // Extract custom filename if in parentheses: e.g. "Hospital Final Bill (bill-final.pdf)"
  const match = docStr.match(/^(.*?)\s*\((.*?)\)$/);
  if (match) {
    displayName = match[1].trim();
    fileName = match[2].trim();
  } else {
    fileName = docStr.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.pdf';
  }

  if (fileName.endsWith('.png') || fileName.endsWith('.jpg')) {
    ext = 'img';
    size = '1.8 MB';
  } else if (fileName.includes('bill-final')) {
    size = '3.2 MB';
  } else if (fileName.includes('discharge')) {
    size = '2.8 MB';
  } else if (fileName.includes('pan')) {
    size = '850 KB';
  } else if (fileName.includes('insurance')) {
    size = '620 KB';
  } else if (fileName.includes('prescription')) {
    size = '1.4 MB';
  } else if (fileName.includes('referral')) {
    size = '1.1 MB';
  } else {
    size = '1.5 MB';
  }

  return {
    isNoDoc: false,
    displayName,
    fileName,
    size,
    ext,
    original: docStr
  };
}

export default function RecommendedNextSteps({ steps, onRaiseQuery }) {
  return (
    <section className="recommendations-section">
      {/* Header Row */}
      <div className="section-header-row">
        <div>
          <h2 className="section-heading">Recommended next steps</h2>
        </div>
      </div>

      {/* Cards List */}
      <div className="recommendations-list">
        {steps.map((step) => {
          const isSettled = step.status === 'settled';
          const docList = (step.attachedDocs || []).map(getDocMeta).filter(Boolean);
          const validDocs = docList.filter(d => !d.isNoDoc);

          return (
            <div key={step.id} className={`recommendation-card ${isSettled ? 'card-settled' : ''}`}>
              <div className="card-main-content">
                {/* Header Line */}
                <div className="card-header-line">
                  <h3 className="step-title">{step.title}</h3>
                  
                  <div className="step-actions-cluster">
                    {isSettled ? (
                      <span className="badge-settled-pill">
                        <Check size={12} strokeWidth={2.5} />
                        Verified & Settled
                      </span>
                    ) : (
                      <>
                        <span className="suggested-pill-tag">
                          Suggested: <strong>{step.suggestedAction}</strong>
                        </span>
                        <button 
                          type="button"
                          className="raise-query-pill-btn"
                          onClick={() => onRaiseQuery(step)}
                          title={`Raise official query for: ${step.title}`}
                        >
                          Raise Query
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="step-description">{step.description}</p>

                {/* Attached Files Gallery */}
                <div className="attached-files-container">
                  <div className="files-section-header">
                    <span className="files-section-label">
                      Supporting Documents
                    </span>
                  </div>

                  <div className="attached-files-grid">
                    {docList.map((docMeta, idx) => {
                      if (docMeta.isNoDoc) {
                        return (
                          <div key={idx} className="file-tile-empty">
                            <span className="empty-file-text">No documents attached for this check</span>
                          </div>
                        );
                      }

                      return (
                        <div 
                          key={idx} 
                          className="file-attachment-tile"
                        >
                          <div className={`file-icon-unwrapped file-type-${docMeta.ext}`}>
                            {docMeta.ext === 'img' ? (
                              <ImageIcon size={18} />
                            ) : (
                              <FileText size={18} />
                            )}
                          </div>

                          <div className="file-meta-col">
                            <span className="file-primary-name">{docMeta.displayName}</span>
                            <span className="file-sub-meta">
                              <span className="file-raw-name">{docMeta.fileName}</span>
                              <span className="file-size-dot">•</span>
                              <span className="file-size-text">{docMeta.size}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


