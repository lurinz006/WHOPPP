import React from "react";
import { companyConfig } from "../config/company";
import { Shield, Phone, Mail, MapPin, CheckCircle2, Lock } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer style={{
      background: "#05070a",
      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      padding: "4.5rem 0 2rem",
      color: "#94a3b8",
      fontSize: "0.88rem"
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr",
          gap: "3rem",
          marginBottom: "3.5rem"
        }} className="footer-grid">
          
          {/* Column 1: Company Profile */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.2rem" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #f59e0b, #b45309)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                color: "#07090e"
              }}>
                ▲
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 800, color: "#ffffff" }}>
                  {companyConfig.name}
                </div>
                <div style={{ fontSize: "0.68rem", color: "#f59e0b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Whop Enterprise Roofing Template
                </div>
              </div>
            </div>

            <p style={{ lineHeight: 1.6, marginBottom: "1.5rem", color: "#94a3b8" }}>
              Master Elite certified roofing contractors specializing in storm restoration, drone diagnostics, and architectural replacements. Authorized Whop merchant for secure deposits and transparent invoicing.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.82rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Shield size={14} color="#f59e0b" />
                <span>{companyConfig.licenseNumber}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <CheckCircle2 size={14} color="#10b981" />
                <span>{companyConfig.insuranceCoverage}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 style={{ color: "#ffffff", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1.2rem" }}>
              Services
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <li><a href="#services" style={{ color: "#94a3b8", textDecoration: "none" }}>Architectural Roof Replacement</a></li>
              <li><a href="#services" style={{ color: "#94a3b8", textDecoration: "none" }}>Standing Seam Metal Roofing</a></li>
              <li><a href="#services" style={{ color: "#94a3b8", textDecoration: "none" }}>21-Point Drone Inspection ($149)</a></li>
              <li><a href="#services" style={{ color: "#94a3b8", textDecoration: "none" }}>Skylight &amp; Flashing Repair ($799)</a></li>
              <li><a href="#services" style={{ color: "#94a3b8", textDecoration: "none" }}>24/7 Emergency Storm Tarping</a></li>
            </ul>
          </div>

          {/* Column 3: Service Areas */}
          <div>
            <h4 style={{ color: "#ffffff", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1.2rem" }}>
              Service Counties
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {companyConfig.serviceAreas.counties.map((c) => (
                <li key={c} style={{ color: "#cbd5e1" }}>{c}</li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Dispatch */}
          <div>
            <h4 style={{ color: "#ffffff", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1.2rem" }}>
              Emergency Dispatch
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <MapPin size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>{companyConfig.headquarters}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Phone size={16} color="#f59e0b" style={{ flexShrink: 0 }} />
                <a href={`tel:${companyConfig.emergencyPhone.replace(/\D/g, "")}`} style={{ color: "#ffffff", fontWeight: 700, textDecoration: "none" }}>
                  {companyConfig.emergencyPhone}
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Mail size={16} color="#f59e0b" style={{ flexShrink: 0 }} />
                <span>{companyConfig.email}</span>
              </div>
            </div>

            <div style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "8px",
              padding: "0.75rem",
              fontSize: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <Lock size={14} color="#10b981" />
              <span>Payments secured by Whop PCI DSS Level 1</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          paddingTop: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          fontSize: "0.8rem"
        }}>
          <div>
            &copy; {new Date().getFullYear()} {companyConfig.legalName}. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>GAF Master Elite #ME-748920</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};
