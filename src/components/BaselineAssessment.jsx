import React from 'react';
import { FileText } from 'lucide-react';
import { claimMetadata as fallbackMetadata } from '../data/claimData';

function SegmentedBar({ percentage, totalBars = 34 }) {
  const activeCount = Math.round((percentage / 100) * totalBars);

  return (
    <div className="segmented-bar-track" aria-label={`Score: ${percentage}%`}>
      {Array.from({ length: totalBars }).map((_, index) => {
        const isActive = index < activeCount;

        return (
          <div
            key={index}
            className={`segmented-pill ${isActive ? 'pill-active' : 'pill-inactive'}`}
            style={{ width: '5px', minWidth: '5px', maxWidth: '5px', height: '34px' }}
          />
        );
      })}
    </div>
  );
}

function SegmentedRadialGauge({ percentage = 87, label = "Risk Probability", totalSegments = 26 }) {
  const activeCount = Math.round((percentage / 100) * totalSegments);
  const cx = 135;
  const cy = 130;
  const R = 118; // outer radius
  const r = 86; // inner radius
  const pillHeight = R - r; // exact 32px height
  const pillWidth = 5; // exact 5px width

  return (
    <div className="segmented-radial-container">
      <svg
        viewBox="0 0 270 142"
        width="270"
        height="142"
        shapeRendering="geometricPrecision"
        className="segmented-radial-svg"
        style={{ width: '270px', height: '142px', display: 'block', margin: '4px auto' }}
      >
        {Array.from({ length: totalSegments }).map((_, i) => {
          // Angle from -90° (left horizontal) to +90° (right horizontal)
          const angleDeg = -90 + (i * (180 / (totalSegments - 1)));
          const isActive = i < activeCount;

          return (
            <rect
              key={i}
              x={cx - pillWidth / 2}
              y={cy - R}
              width={pillWidth}
              height={pillHeight}
              rx="2.5"
              ry="2.5"
              transform={`rotate(${angleDeg}, ${cx}, ${cy})`}
              fill={isActive ? "#B8F600" : "#EDEDF0"}
              className={isActive ? "radial-pill-active" : "radial-pill-inactive"}
            />
          );
        })}

        {/* Center Text */}
        <text
          x={cx}
          y={cy - 12}
          textAnchor="middle"
          fill="#111827"
          fontSize="34"
          fontWeight="800"
          letterSpacing="-0.03em"
          fontFamily="var(--font-sans)"
        >
          {percentage}%
        </text>

        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          fill="#475569"
          fontSize="13"
          fontWeight="600"
          fontFamily="var(--font-sans)"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}

export default function BaselineAssessment({ 
  cards, 
  fraudActivitiesCount, 
  metadata = fallbackMetadata,
  onOpenDossier 
}) {
  const meta = metadata || fallbackMetadata;

  return (
    <section className="baseline-section">
      {/* 
        ========================================================================
        TOP CONTAINER: Claim Overview (Left) + Overall Risk (Right)
        ========================================================================
      */}
      <div className="claim-overview-risk-card">
        {/* Left Section: Claim Overview */}
        <div className="overview-left-panel">
          <div className="overview-top-header">
            <div className="overview-title-cluster">
              <FileText className="overview-header-icon" size={34} />
              <div>
                <h2 className="overview-main-title">Claim Overview</h2>
                <div className="overview-sub-id">
                  <span>Claim Reference: </span>
                  <strong className="overview-id-highlight">{meta.id}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Key Claim Details Grid */}
          <div className="overview-meta-grid">
            <div className="overview-meta-cell">
              <span className="meta-cell-label">Patient Information</span>
              <div className="meta-cell-value-strong">
                {meta.patientName} <span className="meta-cell-sub">({meta.demographics})</span>
              </div>
            </div>

            <div className="overview-meta-cell">
              <span className="meta-cell-label">Policy Number</span>
              <div className="meta-cell-value-mono">{meta.policyNumber}</div>
            </div>

            <div className="overview-meta-cell">
              <span className="meta-cell-label">Total Claimed</span>
              <div className="meta-cell-value-amount">{meta.claimedAmount}</div>
            </div>

            <div className="overview-meta-cell">
              <span className="meta-cell-label">Hospital / Center</span>
              <div className="meta-cell-value" title={meta.hospitalName}>{meta.hospitalName}</div>
            </div>

            <div className="overview-meta-cell">
              <span className="meta-cell-label">Hospitalization Stay</span>
              <div className="meta-cell-value">
                {meta.admissionDate} – {meta.dischargeDate} <span className="meta-cell-sub">(4 days)</span>
              </div>
            </div>

            <div className="overview-meta-cell">
              <span className="meta-cell-label">Adjudication Tier</span>
              <div className="meta-cell-value meta-cell-danger">
                <span className="bullet-dot critical-dot"></span>
                <span>{meta.dossierType}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="overview-risk-divider" />

        {/* Right Section: Overall Risk */}
        <div className="overview-right-risk">
          <div className="card-top-row">
            <div className="risk-title-wrap">
              <span className="bullet-dot critical-dot"></span>
              <h3 className="card-title">Overall Risk: High</h3>
            </div>
          </div>

          {/* Radial Gauge Graph (Exact graph preserved) */}
          <SegmentedRadialGauge percentage={87} label="Risk Probability" totalSegments={26} />

          <p className="card-description risk-card-desc">
            Risk detected with 87% confidence, requiring immediate human investigation.
          </p>
        </div>
      </div>

      {/* 
        ========================================================================
        BOTTOM ROW OF CARDS: Diagnosis & Procedures | Medication | Reports & Test Results
        ========================================================================
      */}
      <div className="baseline-cards-grid">
        {/* Card 1: Diagnosis & Procedures */}
        <div className="assessment-card">
          <div className="card-top-row">
            <h3 className="card-title">Diagnosis & Procedures</h3>
          </div>
          <div className="ideal-score-meta">
            Ideal score: 70+ • Protocol match
          </div>

          <div className="segmented-graph-container">
            <SegmentedBar percentage={94} totalBars={34} />

            <div className="segmented-score-footer">
              <span className="segmented-score-num">94%</span>
              <span className="segmented-score-label label-match">Match</span>
            </div>
          </div>

          <p className="card-description">
            High alignment with doctor's plan, minimal differences in diagnostic tests or treatment.
          </p>
        </div>

        {/* Card 2: Medication */}
        <div className="assessment-card">
          <div className="card-top-row">
            <h3 className="card-title">Medication</h3>
          </div>
          <div className="ideal-score-meta">
            Ideal score: 70+ • Protocol match
          </div>

          <div className="segmented-graph-container">
            <SegmentedBar percentage={62} totalBars={34} />

            <div className="segmented-score-footer">
              <span className="segmented-score-num">62%</span>
              <span className="segmented-score-label label-low-match">Low Match</span>
            </div>
          </div>

          <p className="card-description">
            Major differences in prescribed vs. AI-suggested medications, including drug dosages and combinations.
          </p>
        </div>

        {/* Card 3: Reports & Test Results */}
        <div className="assessment-card">
          <div className="card-top-row">
            <h3 className="card-title">Reports & Test Results</h3>
          </div>
          <div className="ideal-score-meta">
            Ideal score: 70+ • Protocol match
          </div>

          <div className="segmented-graph-container">
            <SegmentedBar percentage={48} totalBars={34} />

            <div className="segmented-score-footer">
              <span className="segmented-score-num">48%</span>
              <span className="segmented-score-label label-match">Match</span>
            </div>
          </div>

          <p className="card-description">
            Variations in test results or excessive repeats may be a sign of data manipulation or efforts to overcharge.
          </p>
        </div>
      </div>
    </section>
  );
}
