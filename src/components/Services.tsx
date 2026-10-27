import React from "react";
import { companyConfig } from "../config/company";
import { whopApi } from "../services/whopApi";
import { Shield, Hammer, FileSearch, Wrench, CheckCircle, ArrowRight, Zap, Sparkles } from "lucide-react";

interface ServicesProps {
  onSelectPlan: (planKey: "inspectionFee" | "projectDeposit" | "flatRateService") => void;
  onRequestEstimate: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectPlan, onRequestEstimate }) => {
  const handleServiceClick = (serviceId: string, name: string, price: number | string) => {
    // Fire Whop Pixel Event: service_viewed
    whopApi.trackEvent("service_viewed", {
      service_id: serviceId,
      service_name: name,
      price: price,
      currency: "USD",
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <section id="services" className="section-padding" style={{ position: "relative" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 4rem" }}>
          <div className="badge badge-amber" style={{ marginBottom: "0.85rem" }}>
            <Sparkles size={13} /> Engineered Craftsmanship
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", marginBottom: "1rem" }}>
            Comprehensive Roofing Services
          </h2>
          <p style={{ color: "var(--color-text-muted)", fontSize: "1.05rem" }}>
            From drone-certified inspections to turnkey roof replacements. Transparent pricing with instant online booking powered by Whop Payments.
          </p>
        </div>

        {/* 4 Core Services Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.8rem"
        }}>
          {/* 1. 21-Point Drone & Physical Inspection ($149 Plan) */}
          <div
            className="glass-panel"
            style={{
              padding: "2.2rem 1.8rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid rgba(245, 158, 11, 0.35)",
              position: "relative"
            }}
            onClick={() => handleServiceClick("plan_inspection_149", "21-Point Inspection", 149)}
          >
            <div style={{
              position: "absolute",
              top: "-12px",
              left: "20px",
              background: "#f59e0b",
              color: "#07090e",
              fontWeight: 800,
              fontSize: "0.7rem",
              padding: "0.25rem 0.75rem",
              borderRadius: "var(--radius-full)",
              textTransform: "uppercase"
            }}>
              Whop One-Time Plan
            </div>

            <div>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(245, 158, 11, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.2rem"
              }}>
                <FileSearch size={24} color="#f59e0b" />
              </div>

              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "2.2rem", fontWeight: 800, color: "#ffffff", fontFamily: "var(--font-heading)" }}>
                  ${companyConfig.whop.plans.inspectionFee.amount}
                </span>
                <span style={{ color: "var(--color-text-dim)", fontSize: "0.85rem" }}>one-time fee</span>
              </div>

              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
                21-Point Drone & Physical Inspection
              </h3>

              <p style={{ color: "var(--color-text-muted)", fontSize: "0.88rem", marginBottom: "1.5rem", lineHeight: 1.5 }}>
                {companyConfig.whop.plans.inspectionFee.description}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.8rem" }}>
                {[
                  "4K aerial drone shingle & flashing scan",
                  "Infrared moisture & attic insulation check",
                  "Official stamped insurance claim report",
                  "100% credited toward any future replacement"
                ].map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "#cbd5e1" }}>
                    <CheckCircle size={15} color="#10b981" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                handleServiceClick("plan_inspection_149", "21-Point Inspection", 149);
                onSelectPlan("inspectionFee");
              }}
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.8rem", fontSize: "0.92rem" }}
            >
              <span>Book Inspection ($149)</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* 2. Flat-Rate Service: Precision Skylight & Flashing Leak Repair ($799 Plan) */}
          <div
            className="glass-panel"
            style={{
              padding: "2.2rem 1.8rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid rgba(56, 189, 248, 0.35)",
              position: "relative"
            }}
            onClick={() => handleServiceClick("plan_skylight_799", "Skylight & Flashing Leak Repair", 799)}
          >
            <div style={{
              position: "absolute",
              top: "-12px",
              left: "20px",
              background: "#38bdf8",
              color: "#07090e",
              fontWeight: 800,
              fontSize: "0.7rem",
              padding: "0.25rem 0.75rem",
              borderRadius: "var(--radius-full)",
              textTransform: "uppercase"
            }}>
              Whop Flat-Rate Plan
            </div>

            <div>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(56, 189, 248, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.2rem"
              }}>
                <Wrench size={24} color="#38bdf8" />
              </div>

              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "2.2rem", fontWeight: 800, color: "#ffffff", fontFamily: "var(--font-heading)" }}>
                  ${companyConfig.whop.plans.flatRateService.amount}
                </span>
                <span style={{ color: "var(--color-text-dim)", fontSize: "0.85rem" }}>flat-rate</span>
              </div>

              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
                Skylight & Flashing Leak Repair
              </h3>

              <p style={{ color: "var(--color-text-muted)", fontSize: "0.88rem", marginBottom: "1.5rem", lineHeight: 1.5 }}>
                {companyConfig.whop.plans.flatRateService.description}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.8rem" }}>
                {[
                  "Complete perimeter curb membrane overhaul",
                  "Step & counter-flashing replacement",
                  "High-temp ice & water barrier installation",
                  "5-Year Watertight Zero-Leak Guarantee"
                ].map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "#cbd5e1" }}>
                    <CheckCircle size={15} color="#38bdf8" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                handleServiceClick("plan_skylight_799", "Skylight & Flashing Leak Repair", 799);
                onSelectPlan("flatRateService");
              }}
              className="btn btn-secondary"
              style={{ width: "100%", padding: "0.8rem", fontSize: "0.92rem", borderColor: "rgba(56, 189, 248, 0.3)" }}
            >
              <span>Instant Book ($799)</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* 3. Full Roof Replacement (Project Deposit Plan: $500) */}
          <div
            className="glass-panel"
            style={{
              padding: "2.2rem 1.8rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              position: "relative"
            }}
            onClick={() => handleServiceClick("service_replacement", "Full Roof Replacement", "Custom / $500 Deposit")}
          >
            <div style={{
              position: "absolute",
              top: "-12px",
              left: "20px",
              background: "rgba(255, 255, 255, 0.12)",
              color: "#ffffff",
              fontWeight: 800,
              fontSize: "0.7rem",
              padding: "0.25rem 0.75rem",
              borderRadius: "var(--radius-full)",
              textTransform: "uppercase"
            }}>
              High-Ticket Vertical
            </div>

            <div>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(16, 185, 129, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.2rem"
              }}>
                <Shield size={24} color="#10b981" />
              </div>

              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "2.2rem", fontWeight: 800, color: "#ffffff", fontFamily: "var(--font-heading)" }}>
                  ${companyConfig.whop.plans.projectDeposit.amount}
                </span>
                <span style={{ color: "var(--color-text-dim)", fontSize: "0.85rem" }}>deposit to start</span>
              </div>

              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
                Turnkey Roof Replacement
              </h3>

              <p style={{ color: "var(--color-text-muted)", fontSize: "0.88rem", marginBottom: "1.5rem", lineHeight: 1.5 }}>
                Architectural shingles, standing seam metal, or designer tile. Deposit locks crew, wholesale materials & permit. Final balance billed via Whop Invoices.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.8rem" }}>
                {[
                  "GAF Timberline HDZ® or Owens Corning Duration®",
                  "Full synthetic underlayment & drip edge",
                  "50-Year Non-Prorated Lifetime Manufacturer Warranty",
                  "0% APR monthly financing available via Whop"
                ].map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "#cbd5e1" }}>
                    <CheckCircle size={15} color="#10b981" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                handleServiceClick("service_replacement", "Turnkey Roof Replacement", 500);
                onSelectPlan("projectDeposit");
              }}
              className="btn btn-secondary"
              style={{ width: "100%", padding: "0.8rem", fontSize: "0.92rem" }}
            >
              <span>Pay $500 Deposit</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* 4. Emergency Storm & Leak Tarping */}
          <div
            className="glass-panel"
            style={{
              padding: "2.2rem 1.8rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              background: "radial-gradient(circle at 100% 0%, rgba(239, 68, 68, 0.08) 0%, rgba(19, 27, 41, 0.72) 70%)"
            }}
            onClick={() => handleServiceClick("service_emergency", "Emergency Leak Dispatch", "Instant Dispatch")}
          >
            <div>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(239, 68, 68, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.2rem"
              }}>
                <Zap size={24} color="#ef4444" />
              </div>

              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "#ef4444", fontFamily: "var(--font-heading)" }}>
                  24/7 Rapid
                </span>
                <span style={{ color: "var(--color-text-dim)", fontSize: "0.85rem" }}>dispatch</span>
              </div>

              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
                Emergency Storm & Leak Tarping
              </h3>

              <p style={{ color: "var(--color-text-muted)", fontSize: "0.88rem", marginBottom: "1.5rem", lineHeight: 1.5 }}>
                Active hail, tree strike, or hurricane wind breach? Our emergency disaster crew arrives within 2 hours to weather-seal your attic and stop structural damage.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.8rem" }}>
                {[
                  "Industrial heavy-gauge UV poly tarping",
                  "Insurance photo documentation & damage logs",
                  "Water mitigation coordination",
                  "Direct insurance billing assistance"
                ].map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "#cbd5e1" }}>
                    <CheckCircle size={15} color="#ef4444" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                handleServiceClick("service_emergency", "Emergency Storm Tarping", "Dispatch");
                onRequestEstimate();
              }}
              className="btn btn-emergency"
              style={{ width: "100%", padding: "0.8rem", fontSize: "0.92rem" }}
            >
              <span>Dispatch Crew Now</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
