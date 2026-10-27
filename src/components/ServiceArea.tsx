import React, { useState } from "react";
import { companyConfig } from "../config/company";
import { MapPin, CheckCircle2, Clock, Search } from "lucide-react";

export const ServiceArea: React.FC = () => {
  const [zipInput, setZipInput] = useState("");
  const [zipResult, setZipResult] = useState<{ checked: boolean; covered: boolean; county?: string } | null>(null);

  const handleCheckZip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipInput.trim()) return;

    const trimmed = zipInput.trim();
    const isCovered = companyConfig.serviceAreas.zipCodes.includes(trimmed) || (trimmed.startsWith("75") || trimmed.startsWith("76"));
    setZipResult({
      checked: true,
      covered: isCovered,
      county: isCovered ? "Dallas/Fort Worth North Texas Service Zone" : undefined,
    });
  };

  return (
    <section id="service-area" className="section-padding" style={{ position: "relative" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3.5rem" }}>
          <div className="badge badge-blue" style={{ marginBottom: "0.85rem" }}>
            <MapPin size={13} /> Regional Dispatch Coverage
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.7rem)", marginBottom: "0.8rem" }}>
            Texas Service Area &amp; Dispatch Radius
          </h2>
          <p style={{ color: "var(--color-text-muted)", fontSize: "1.05rem" }}>
            Providing rapid emergency tarping and scheduled roof installations across the entire {companyConfig.serviceAreas.primaryMetro}.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "2.5rem",
          alignItems: "center"
        }} className="service-area-grid">
          
          {/* Counties & Coverage Details */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.5rem" }}>
              <div style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: "rgba(56, 189, 248, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Clock size={22} color="#38bdf8" />
              </div>
              <div>
                <h3 style={{ fontSize: "1.2rem", color: "#ffffff" }}>Guaranteed 2-Hour Rapid Response</h3>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Emergency storm tarping and hail assessment within our active counties.</p>
              </div>
            </div>

            {/* Counties Pill Badges */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "0.8rem",
              marginBottom: "2rem"
            }}>
              {companyConfig.serviceAreas.counties.map((county, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "8px",
                    padding: "0.8rem 1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem"
                  }}
                >
                  <CheckCircle2 size={16} color="#10b981" />
                  <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#cbd5e1" }}>{county}</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.6 }}>
              <strong style={{ color: "#ffffff" }}>Commercial &amp; Residential Hubs:</strong> Dallas, Fort Worth, Plano, Frisco, McKinney, Arlington, Irving, Garland, Southlake, Carrollton, Richardson, Grand Prairie, Denton, and Lewisville.
            </div>
          </div>

          {/* Interactive Zip Code Verification Box */}
          <div className="glass-panel" style={{
            padding: "2.2rem",
            border: "1px solid rgba(56, 189, 248, 0.25)"
          }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.4rem", color: "#ffffff" }}>
              Check Your Zip Code Coverage
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "1.4rem" }}>
              Enter your property zip code to verify immediate crew availability and inspection slots.
            </p>

            <form onSubmit={handleCheckZip} style={{ display: "flex", gap: "0.6rem", marginBottom: "1.2rem" }}>
              <input
                type="text"
                maxLength={5}
                placeholder="e.g. 75201"
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value)}
                style={{
                  flex: 1,
                  background: "rgba(0, 0, 0, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  borderRadius: "8px",
                  padding: "0.75rem 1rem",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  outline: "none"
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: "0.75rem 1.4rem", fontSize: "0.9rem" }}
              >
                <Search size={16} />
                <span>Verify</span>
              </button>
            </form>

            {zipResult && (
              <div style={{
                background: zipResult.covered ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                border: zipResult.covered ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "8px",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem"
              }}>
                <CheckCircle2 size={20} color={zipResult.covered ? "#10b981" : "#ef4444"} />
                <div style={{ fontSize: "0.85rem" }}>
                  {zipResult.covered ? (
                    <div>
                      <strong style={{ color: "#34d399", display: "block" }}>Full Coverage Confirmed!</strong>
                      <span style={{ color: "#cbd5e1" }}>
                        Crews are active in your area. Guaranteed 2-hr emergency dispatch and next-day inspections.
                      </span>
                    </div>
                  ) : (
                    <div>
                      <strong style={{ color: "#f87171", display: "block" }}>Extended Service Zone</strong>
                      <span style={{ color: "#cbd5e1" }}>
                        Please call dispatch directly at (800) 584-ROOF for custom regional scheduling.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .service-area-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};
