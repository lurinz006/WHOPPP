import React, { useState } from "react";
import { companyConfig } from "../config/company";
import { whopApi } from "../services/whopApi";
import { LeadPayload, WhopLeadResponse } from "../types";
import { FileText, Send, CheckCircle2, ShieldCheck, Clock, MapPin, Sparkles, RefreshCw } from "lucide-react";

export const EstimateForm: React.FC = () => {
  const [formData, setFormData] = useState<LeadPayload>({
    name: "",
    phone: "",
    email: "",
    propertyAddress: "",
    roofAge: "11-15 years",
    serviceCategory: "replacement",
    insuranceClaim: false,
    preferredDate: "Earliest Available",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<WhopLeadResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.propertyAddress) {
      alert("Please fill in your name, phone, email, and address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await whopApi.submitLead(formData);
      setSubmittedLead(response);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="estimate" className="section-padding" style={{ position: "relative" }}>
      <div className="container">
        <div style={{
          maxWidth: "880px",
          margin: "0 auto",
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="badge badge-amber" style={{ marginBottom: "0.85rem" }}>
              <Sparkles size={13} /> Whop Leads API Integration
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.7rem)", marginBottom: "0.8rem" }}>
              Request an Instant Roofing Estimate
            </h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "1.05rem" }}>
              Quotes land directly as actionable leads on the Whop account. A licensed estimator will review your aerial pitch and roof footprint.
            </p>
          </div>

          <div className="glass-panel" style={{
            padding: "2.5rem",
            border: "1px solid rgba(245, 158, 11, 0.25)"
          }}>
            {!submittedLead ? (
              <form onSubmit={handleSubmit}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.2rem",
                  marginBottom: "1.2rem"
                }} className="form-grid">
                  {/* Full Name */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.4rem" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Robert Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: "100%",
                        background: "rgba(0, 0, 0, 0.4)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "8px",
                        padding: "0.75rem 1rem",
                        color: "#ffffff",
                        fontSize: "0.92rem",
                        outline: "none"
                      }}
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.4rem" }}>
                      Phone Number (For Rapid Dispatch) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. (214) 555-0194"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: "100%",
                        background: "rgba(0, 0, 0, 0.4)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "8px",
                        padding: "0.75rem 1rem",
                        color: "#ffffff",
                        fontSize: "0.92rem",
                        outline: "none"
                      }}
                    />
                  </div>
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.2rem",
                  marginBottom: "1.2rem"
                }} className="form-grid">
                  {/* Email */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.4rem" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. robert@vance-refrigeration.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: "100%",
                        background: "rgba(0, 0, 0, 0.4)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "8px",
                        padding: "0.75rem 1rem",
                        color: "#ffffff",
                        fontSize: "0.92rem",
                        outline: "none"
                      }}
                    />
                  </div>

                  {/* Property Address */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.4rem" }}>
                      Property Address (Street, City, Zip) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 4821 Elm Street, Dallas, TX 75201"
                      value={formData.propertyAddress}
                      onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                      style={{
                        width: "100%",
                        background: "rgba(0, 0, 0, 0.4)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "8px",
                        padding: "0.75rem 1rem",
                        color: "#ffffff",
                        fontSize: "0.92rem",
                        outline: "none"
                      }}
                    />
                  </div>
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "1.2rem",
                  marginBottom: "1.2rem"
                }} className="form-grid-three">
                  {/* Service Needed */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.4rem" }}>
                      Primary Service Needed
                    </label>
                    <select
                      value={formData.serviceCategory}
                      onChange={(e: any) => setFormData({ ...formData, serviceCategory: e.target.value })}
                      style={{
                        width: "100%",
                        background: "#0d121c",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "8px",
                        padding: "0.75rem",
                        color: "#ffffff",
                        fontSize: "0.9rem",
                        outline: "none"
                      }}
                    >
                      <option value="replacement">Full Roof Replacement</option>
                      <option value="repair">Emergency / Leak Repair</option>
                      <option value="inspection">21-Point Drone Inspection ($149)</option>
                      <option value="commercial">Commercial Flat / TPO Roof</option>
                    </select>
                  </div>

                  {/* Approximate Roof Age */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.4rem" }}>
                      Approximate Roof Age
                    </label>
                    <select
                      value={formData.roofAge}
                      onChange={(e) => setFormData({ ...formData, roofAge: e.target.value })}
                      style={{
                        width: "100%",
                        background: "#0d121c",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "8px",
                        padding: "0.75rem",
                        color: "#ffffff",
                        fontSize: "0.9rem",
                        outline: "none"
                      }}
                    >
                      <option value="0-5 years">0 - 5 years</option>
                      <option value="6-10 years">6 - 10 years</option>
                      <option value="11-15 years">11 - 15 years</option>
                      <option value="16-20+ years">16 - 20+ years (End of Life)</option>
                      <option value="Unknown">Unknown / Recently Purchased</option>
                    </select>
                  </div>

                  {/* Insurance Claim in Progress */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.4rem" }}>
                      Insurance Claim Status
                    </label>
                    <select
                      value={formData.insuranceClaim ? "yes" : "no"}
                      onChange={(e) => setFormData({ ...formData, insuranceClaim: e.target.value === "yes" })}
                      style={{
                        width: "100%",
                        background: "#0d121c",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "8px",
                        padding: "0.75rem",
                        color: "#ffffff",
                        fontSize: "0.9rem",
                        outline: "none"
                      }}
                    >
                      <option value="no">No Claim Filed (Out of Pocket)</option>
                      <option value="yes">Active Storm / Hail Claim Filed</option>
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div style={{ marginBottom: "1.8rem" }}>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.4rem" }}>
                    Notes or Specific Leak Areas
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe any active leaks, missing shingles, attic water spots, or storm dates..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{
                      width: "100%",
                      background: "rgba(0, 0, 0, 0.4)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "8px",
                      padding: "0.75rem 1rem",
                      color: "#ffffff",
                      fontSize: "0.9rem",
                      outline: "none",
                      resize: "vertical"
                    }}
                  />
                </div>

                {/* Submit Button */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "#94a3b8" }}>
                    <ShieldCheck size={16} color="#10b981" />
                    <span>Your data is protected &bull; Creates verified Lead on Whop</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    style={{ padding: "0.95rem 2rem", fontSize: "1rem" }}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="animate-spin" size={17} />
                        <span>Transmitting to Whop Leads API...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Submit Quote &amp; Create Lead</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Success Lead Confirmation Card */
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <div style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "2px solid #10b981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.2rem",
                  boxShadow: "0 0 25px rgba(16, 185, 129, 0.25)"
                }}>
                  <CheckCircle2 size={34} color="#10b981" />
                </div>

                <span className="badge badge-emerald" style={{ marginBottom: "0.8rem" }}>
                  Whop Lead Registered Successfully
                </span>

                <h3 style={{ fontSize: "1.8rem", color: "#ffffff", marginBottom: "0.5rem" }}>
                  Estimate Request Landed on Whop!
                </h3>

                <p style={{ color: "#94a3b8", fontSize: "0.95rem", maxWidth: "520px", margin: "0 auto 1.8rem" }}>
                  Thank you, <strong>{formData.name}</strong>. Your estimate request has been created via the Whop Leads API and logged to account <strong>{companyConfig.whop.accountId}</strong>.
                </p>

                <div style={{
                  background: "rgba(0,0,0,0.35)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                  padding: "1.2rem",
                  textAlign: "left",
                  fontSize: "0.85rem",
                  marginBottom: "1.8rem"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#94a3b8" }}>Whop Lead ID:</span>
                    <strong style={{ color: "#38bdf8", fontFamily: "monospace" }}>{submittedLead.id}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#94a3b8" }}>Pixel Event Fired:</span>
                    <strong style={{ color: "#10b981" }}>whop.track("estimate_requested")</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#94a3b8" }}>Service Category:</span>
                    <strong style={{ color: "#ffffff", textTransform: "capitalize" }}>{formData.serviceCategory}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#94a3b8" }}>Property Address:</span>
                    <strong style={{ color: "#ffffff" }}>{formData.propertyAddress}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSubmittedLead(null);
                    setFormData({
                      name: "",
                      phone: "",
                      email: "",
                      propertyAddress: "",
                      roofAge: "11-15 years",
                      serviceCategory: "replacement",
                      insuranceClaim: false,
                      preferredDate: "Earliest Available",
                      notes: "",
                    });
                  }}
                  className="btn btn-secondary"
                  style={{ padding: "0.7rem 1.6rem" }}
                >
                  Submit Another Quote Request
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .form-grid, .form-grid-three {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
