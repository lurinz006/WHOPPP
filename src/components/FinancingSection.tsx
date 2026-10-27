import React, { useState } from "react";
import { companyConfig } from "../config/company";
import { CreditCard, Check, Zap } from "lucide-react";

interface FinancingSectionProps {
  onOpenCheckout: () => void;
}

export const FinancingSection: React.FC<FinancingSectionProps> = ({ onOpenCheckout }) => {
  const [projectAmount, setProjectAmount] = useState<number>(14000);
  const monthlyPayment = Math.round(projectAmount / 60);

  return (
    <section id="financing" className="section-padding" style={{
      background: "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.05) 0%, transparent 70%)",
      position: "relative"
    }}>
      <div className="container">
        <div className="glass-panel" style={{
          padding: "3.5rem 2.5rem",
          border: "1px solid rgba(245, 158, 11, 0.3)",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Background Ambient Glow */}
          <div style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)",
            pointerEvents: "none"
          }}></div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "3rem",
            alignItems: "center"
          }} className="financing-grid">
            
            {/* Left Content */}
            <div>
              <div className="badge badge-amber" style={{ marginBottom: "1rem" }}>
                <Zap size={13} /> Native Whop Financing
              </div>

              <h2 style={{ fontSize: "clamp(2rem, 3.8vw, 2.7rem)", marginBottom: "1rem" }}>
                Upgrade Your Roof Today with <span className="text-gradient-amber">0% APR Financing</span>
              </h2>

              <p style={{ color: "var(--color-text-muted)", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "1.8rem" }}>
                Don't delay crucial storm or leak repairs. Through Whop's integrated payment infrastructure, financing options like <strong>Klarna</strong>, <strong>Splitit</strong>, and <strong>Afterpay</strong> surface automatically at checkout for approved merchants.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "2rem" }}>
                {[
                  "Plans starting at 0% APR for up to 60 months",
                  "Instant digital pre-qualification with zero hard credit hit",
                  "No prepayment penalties or hidden lender origination fees",
                  "Checkout runs 100% on Whop with bank-level encryption"
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.92rem", color: "#e2e8f0" }}>
                    <div style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "rgba(245, 158, 11, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <Check size={13} color="#f59e0b" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Supported Provider Badges */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.78rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Supported at Whop Checkout:
                </span>
                {companyConfig.financing.providers.map((p) => (
                  <span
                    key={p}
                    style={{
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "6px",
                      padding: "0.3rem 0.75rem",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: "#ffffff"
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Interactive Payment Calculator */}
            <div>
              <div style={{
                background: "rgba(7, 9, 14, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "16px",
                padding: "2rem",
                boxShadow: "0 15px 40px rgba(0,0,0,0.6)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.2rem", color: "#ffffff" }}>Monthly Cost Estimator</h3>
                  <span className="badge badge-emerald">60 Mos @ 0% APR</span>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Estimated Roof Replacement:</span>
                    <strong style={{ fontSize: "1.1rem", color: "#f59e0b" }}>${projectAmount.toLocaleString()}</strong>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="35000"
                    step="1000"
                    value={projectAmount}
                    onChange={(e) => setProjectAmount(Number(e.target.value))}
                    style={{
                      width: "100%",
                      accentColor: "#f59e0b",
                      cursor: "pointer",
                      height: "6px"
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#64748b", marginTop: "0.3rem" }}>
                    <span>$5,000</span>
                    <span>$20,000</span>
                    <span>$35,000</span>
                  </div>
                </div>

                <div style={{
                  background: "rgba(245, 158, 11, 0.08)",
                  border: "1px solid rgba(245, 158, 11, 0.25)",
                  borderRadius: "12px",
                  padding: "1.4rem",
                  textAlign: "center",
                  marginBottom: "1.8rem"
                }}>
                  <div style={{ fontSize: "0.8rem", color: "#fef3c7", marginBottom: "0.3rem" }}>
                    ESTIMATED PAYMENT AS LOW AS
                  </div>
                  <div style={{ fontSize: "2.8rem", fontWeight: 900, color: "#ffffff", fontFamily: "var(--font-heading)", lineHeight: 1 }}>
                    ${monthlyPayment}
                    <span style={{ fontSize: "1rem", fontWeight: 500, color: "#94a3b8" }}>/mo</span>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#a3e635", marginTop: "0.5rem" }}>
                    Includes 50-Year Non-Prorated Warranty
                  </div>
                </div>

                <button
                  onClick={onOpenCheckout}
                  className="btn btn-primary"
                  style={{ width: "100%", padding: "0.9rem", fontSize: "0.95rem" }}
                >
                  <CreditCard size={17} />
                  <span>View Financing on Whop Elements</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .financing-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};
