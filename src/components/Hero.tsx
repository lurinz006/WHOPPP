import React from "react";
import { companyConfig } from "../config/company";
import { ShieldCheck, Award, Star, Zap, ArrowRight, CheckCircle2, FileSearch, CreditCard } from "lucide-react";
import { whopApi } from "../services/whopApi";

interface HeroProps {
  onRequestEstimate: () => void;
  onBookInspection: () => void;
  onOpenDeposit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestEstimate, onBookInspection, onOpenDeposit }) => {
  return (
    <section style={{
      position: "relative",
      padding: "5rem 0 4.5rem",
      overflow: "hidden",
      borderBottom: "1px solid rgba(255, 255, 255, 0.06)"
    }}>
      {/* Background Architectural Grid & Subtle Radial Glow */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 20% 70%, rgba(56, 189, 248, 0.05) 0%, transparent 40%),
          linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 40px 40px, 40px 40px",
        pointerEvents: "none"
      }}></div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "3.5rem",
          alignItems: "center"
        }} className="hero-grid">
          
          {/* Left Column: Heading, Value Prop, CTAs */}
          <div>
            {/* Top Certification Pill */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.2rem" }}>
              <span className="badge badge-amber">
                <Award size={14} /> GAF Master Elite® Certified
              </span>
              <span className="badge badge-emerald">
                <CheckCircle2 size={13} /> BBB Accredited A+
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "1.25rem",
              letterSpacing: "-0.03em"
            }}>
              Premier US Roofing, <br />
              <span className="text-gradient-amber">Engineered for Decades.</span>
            </h1>

            <p style={{
              fontSize: "1.12rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.6,
              marginBottom: "2rem",
              maxWidth: "600px"
            }}>
              From comprehensive 21-point drone inspections to precision shingle & standing seam metal replacements. Powered by Whop for seamless <strong>$500 project deposits</strong>, <strong>0% APR financing</strong>, and transparent job-to-invoice balance billing.
            </p>

            {/* Quick Guarantees Row */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "0.85rem",
              marginBottom: "2.2rem"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem", color: "#e2e8f0" }}>
                <ShieldCheck size={18} color="#f59e0b" />
                <span>50-Year Non-Prorated Warranty</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem", color: "#e2e8f0" }}>
                <Zap size={18} color="#38bdf8" />
                <span>2-Hour Rapid Emergency Tarping</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem", color: "#e2e8f0" }}>
                <Star size={18} color="#f59e0b" />
                <span>4.96★ Rated Across 520+ Homeowners</span>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
              <button
                onClick={onRequestEstimate}
                className="btn btn-primary"
                style={{ padding: "0.95rem 1.8rem", fontSize: "1rem" }}
              >
                <span>Request Free Estimate</span>
                <ArrowRight size={17} />
              </button>

              <button
                onClick={onBookInspection}
                className="btn btn-secondary"
                style={{ padding: "0.95rem 1.6rem", fontSize: "1rem" }}
              >
                <FileSearch size={18} color="#f59e0b" />
                <span>Book $149 Roof Inspection</span>
              </button>

              <button
                onClick={onOpenDeposit}
                style={{
                  background: "transparent",
                  color: "#cbd5e1",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  textDecoration: "underline",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem"
                }}
              >
                <CreditCard size={15} color="#f59e0b" />
                <span>Pay $500 Project Deposit &rarr;</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Ticket Vertical Showcase Card */}
          <div>
            <div className="glass-panel" style={{
              padding: "2rem",
              border: "1px solid rgba(245, 158, 11, 0.25)",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                top: "-12px",
                right: "24px",
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "#090d16",
                fontWeight: 800,
                fontSize: "0.72rem",
                padding: "0.3rem 0.85rem",
                borderRadius: "var(--radius-full)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)"
              }}>
                Whop Verified Merchant
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.4rem" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(245, 158, 11, 0.12)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <ShieldCheck size={26} color="#f59e0b" />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.15rem", marginBottom: "0.15rem" }}>The Whop Roofing Flow</h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>Deposit &rarr; Job Milestone &rarr; Final Invoice</p>
                </div>
              </div>

              {/* 3 Step Visual Preview */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                  padding: "0.9rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#f59e0b", color: "#090d16", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.8rem" }}>
                      1
                    </div>
                    <div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#ffffff" }}>$500 Project Deposit</div>
                      <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Card-on-file Setup Intent via Whop Elements</div>
                    </div>
                  </div>
                  <span className="badge badge-amber" style={{ fontSize: "0.68rem" }}>Setup Intent</span>
                </div>

                <div style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                  padding: "0.9rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.1)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.8rem" }}>
                      2
                    </div>
                    <div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#ffffff" }}>Job Execution & Build</div>
                      <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Permits pulled, tear-off, and GAF shingles installed</div>
                    </div>
                  </div>
                  <span className="badge badge-blue" style={{ fontSize: "0.68rem" }}>In Progress</span>
                </div>

                <div style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                  padding: "0.9rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.1)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.8rem" }}>
                      3
                    </div>
                    <div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#ffffff" }}>Final Balance Invoice</div>
                      <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Auto-charge stored method via Whop Invoices API</div>
                    </div>
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: "0.68rem" }}>Invoices API</span>
                </div>
              </div>

              {/* Financing Callout footer in card */}
              <div style={{
                background: "rgba(245, 158, 11, 0.06)",
                border: "1px dashed rgba(245, 158, 11, 0.3)",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.82rem"
              }}>
                <span style={{ color: "#fef3c7" }}>Financing options surface automatically:</span>
                <span style={{ fontWeight: 700, color: "#f59e0b" }}>Klarna &bull; Splitit &bull; Affirm</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};
