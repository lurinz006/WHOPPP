import React, { useState, useEffect } from "react";
import { companyConfig } from "../config/company";
import { Phone, Shield, Clock, FileText, CreditCard, Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  onRequestEstimate: () => void;
  onOpenDepositFlow: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRequestEstimate, onOpenDepositFlow }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Emergency Ticker */}
      <div style={{
        background: "linear-gradient(90deg, #1e293b, #0f172a)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        fontSize: "0.82rem",
        padding: "0.45rem 1rem",
        color: "#cbd5e1"
      }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              color: "#34d399",
              fontWeight: 700,
              fontSize: "0.75rem",
              background: "rgba(16, 185, 129, 0.12)",
              padding: "0.15rem 0.5rem",
              borderRadius: "4px"
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>
              STORM DISPATCH ACTIVE
            </span>
            <span>24/7 Emergency Tarping & Hail Damage Response Across DFW</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", fontSize: "0.8rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Shield size={13} color="#f59e0b" />
              {companyConfig.licenseNumber}
            </span>
            <a
              href={`tel:${companyConfig.emergencyPhone.replace(/\D/g, "")}`}
              style={{ color: "#f59e0b", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.35rem" }}
            >
              <Phone size={13} />
              {companyConfig.emergencyPhone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className="glass-nav"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          transition: "all 0.3s ease",
          padding: scrolled ? "0.75rem 0" : "1.1rem 0"
        }}
      >
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo / Brand */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: "0.8rem", textDecoration: "none" }}>
            <div style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #f59e0b, #b45309)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(245, 158, 11, 0.4)",
              fontWeight: 900,
              fontSize: "1.25rem",
              color: "#07090e"
            }}>
              ▲
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 800, color: "#ffffff", lineHeight: 1.1 }}>
                APEX SUMMIT
              </div>
              <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", color: "#f59e0b", textTransform: "uppercase" }}>
                Roofing & Restoration
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav style={{ display: "none", alignItems: "center", gap: "2rem" }} className="desktop-nav">
            <a href="#services" style={{ color: "#cbd5e1", textDecoration: "none", fontWeight: 600, fontSize: "0.92rem", transition: "color 0.2s" }}>
              Services
            </a>
            <a href="#service-area" style={{ color: "#cbd5e1", textDecoration: "none", fontWeight: 600, fontSize: "0.92rem", transition: "color 0.2s" }}>
              Service Area
            </a>
            <a href="#financing" style={{ color: "#cbd5e1", textDecoration: "none", fontWeight: 600, fontSize: "0.92rem", transition: "color 0.2s" }}>
              0% Financing
            </a>
            <a href="#deposit-invoice-flow" style={{ color: "#cbd5e1", textDecoration: "none", fontWeight: 600, fontSize: "0.92rem", transition: "color 0.2s" }}>
              Whop Job Flow
            </a>
            <a href="#reviews" style={{ color: "#cbd5e1", textDecoration: "none", fontWeight: 600, fontSize: "0.92rem", transition: "color 0.2s" }}>
              Reviews
            </a>
          </nav>

          {/* Action CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <button
              onClick={onOpenDepositFlow}
              className="btn btn-secondary"
              style={{ fontSize: "0.85rem", padding: "0.6rem 1.1rem" }}
            >
              <CreditCard size={15} color="#f59e0b" />
              <span>Project Deposit ($500)</span>
            </button>

            <button
              onClick={onRequestEstimate}
              className="btn btn-primary"
              style={{ fontSize: "0.85rem", padding: "0.6rem 1.25rem" }}
            >
              <FileText size={15} />
              <span>Request Estimate</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle"
              style={{
                display: "none",
                background: "transparent",
                border: "none",
                color: "#ffffff",
                cursor: "pointer",
                padding: "0.4rem"
              }}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{
            background: "rgba(13, 18, 28, 0.98)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem"
          }}>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "#ffffff", textDecoration: "none", fontWeight: 600, fontSize: "1.05rem" }}
            >
              Services (Repair, Replace, Inspect)
            </a>
            <a
              href="#service-area"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "#ffffff", textDecoration: "none", fontWeight: 600, fontSize: "1.05rem" }}
            >
              Service Area & Counties
            </a>
            <a
              href="#financing"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "#ffffff", textDecoration: "none", fontWeight: 600, fontSize: "1.05rem" }}
            >
              0% Financing via Whop BNPL
            </a>
            <a
              href="#deposit-invoice-flow"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "#ffffff", textDecoration: "none", fontWeight: 600, fontSize: "1.05rem" }}
            >
              Deposit → Job → Invoice Flow
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "#ffffff", textDecoration: "none", fontWeight: 600, fontSize: "1.05rem" }}
            >
              Customer Reviews (4.9★)
            </a>
          </div>
        )}
      </header>

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
        }
        @media (max-width: 899px) {
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};
