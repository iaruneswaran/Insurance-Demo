import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BaselineAssessment from './components/BaselineAssessment';
import AnomalyFindings from './components/AnomalyFindings';
import VerificationChecklist from './components/VerificationChecklist';
import RecommendedNextSteps from './components/RecommendedNextSteps';
import DossierDrawer from './components/DossierDrawer';
import './App.css';

import {
  claimMetadata,
  baselineAssessment,
  anomalyFindings,
  verificationGroups,
  recommendedNextSteps
} from './data/claimData';

export default function App() {
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  const [activeSectionTab, setActiveSectionTab] = useState('anomalies'); // 'anomalies' | 'checklist' | 'recommendations'

  const totalChecklistCount = verificationGroups.reduce(
    (acc, g) => acc + (g.totalCount || (g.items ? g.items.length : 0)),
    0
  ) || 25;

  const handleRaiseQuery = (step) => {
    // Action logged silently without disruptive popup banner
  };

  return (
    <div className="app-container">
      {/* Left Sidebar Rail */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-wrapper">
        {/* Header with Navigation and Claim Metadata */}
        <Header 
          metadata={claimMetadata} 
          onOpenDossier={() => setIsDossierOpen(true)} 
        />

        {/* Scrollable Main Content Canvas */}
        <main className="content-canvas">

          {/* Section 1: Baseline Assessment */}
          <BaselineAssessment 
            cards={baselineAssessment} 
            fraudActivitiesCount={claimMetadata.fraudActivitiesCount} 
            metadata={claimMetadata}
            onOpenDossier={() => setIsDossierOpen(true)}
          />

          {/* Tabbed View: Anomaly Findings | Verification Checklist | Recommended Next Steps */}
          <div className="section-tabs-wrapper">
            <div className="section-tabs-bar" role="tablist" aria-label="Investigation Sections">
              <button 
                type="button"
                role="tab"
                aria-selected={activeSectionTab === 'anomalies'}
                className={`section-tab-btn ${activeSectionTab === 'anomalies' ? 'active' : ''}`}
                onClick={() => setActiveSectionTab('anomalies')}
              >
                <span>Flagged anomaly findings</span>
                <span className="tab-pill-badge">{anomalyFindings.length}</span>
              </button>

              <button 
                type="button"
                role="tab"
                aria-selected={activeSectionTab === 'checklist'}
                className={`section-tab-btn ${activeSectionTab === 'checklist' ? 'active' : ''}`}
                onClick={() => setActiveSectionTab('checklist')}
              >
                <span>Verification checklist</span>
                <span className="tab-pill-badge">{totalChecklistCount}</span>
              </button>

              <button 
                type="button"
                role="tab"
                aria-selected={activeSectionTab === 'recommendations'}
                className={`section-tab-btn ${activeSectionTab === 'recommendations' ? 'active' : ''}`}
                onClick={() => setActiveSectionTab('recommendations')}
              >
                <span>Recommended next steps</span>
                <span className="tab-pill-badge">{recommendedNextSteps.length}</span>
              </button>
            </div>

            <div className="section-tab-panel">
              {activeSectionTab === 'anomalies' && (
                <AnomalyFindings 
                  findings={anomalyFindings} 
                  onRaiseQuery={handleRaiseQuery} 
                />
              )}

              {activeSectionTab === 'checklist' && (
                <VerificationChecklist 
                  groups={verificationGroups} 
                />
              )}

              {activeSectionTab === 'recommendations' && (
                <RecommendedNextSteps 
                  steps={recommendedNextSteps} 
                  onRaiseQuery={handleRaiseQuery}
                />
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Forensic High Risk Dossier Drawer */}
      {isDossierOpen && (
        <DossierDrawer 
          metadata={claimMetadata}
          onClose={() => setIsDossierOpen(false)}
        />
      )}
    </div>
  );
}
