import React from "react";
import { companyConfig } from "../config/company";
import { Star, ShieldCheck, CheckCircle2, Award, ThumbsUp } from "lucide-react";

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      author: "Marcus & Sarah Sterling",
      location: "Frisco, TX",
      project: "Full Roof Replacement (GAF Timberline HDZ®)",
      contractAmount: "$17,200",
      depositPaid: "$500 via Whop Apple Pay",
      rating: 5,
      date: "2 weeks ago",
      comment: "Following the April hail storm, Apex Summit was at our door within 3 hours. Paying the $500 project deposit through Apple Pay on Whop took 10 seconds. The crew replaced 34 squares of roofing in a single day and passed city inspection with zero defects."
    },
    {
      author: "Dr. Arthur Vance",
      location: "Highland Park, Dallas, TX",
      project: "Standing Seam 24-Gauge Metal Roof",
      contractAmount: "$28,500",
      depositPaid: "$500 via Whop Card Vault",
      rating: 5,
      date: "1 month ago",
      comment: "High-end craftsmanship. Loved the transparency of the Whop invoice system: after the final walk-through, our remaining balance was billed directly to our vaulted card without cumbersome bank wire hassles. Truly 5-star service."
    },
    {
      author: "Elena Rostova",
      location: "Fort Worth, TX",
      project: "21-Point Drone Inspection & Skylight Flashing",
      contractAmount: "$799 Flat-Rate",
      depositPaid: "Instant Whop Checkout",
      rating: 5,
      date: "3 weeks ago",
      comment: "Booked their $149 drone inspection online directly through Whop. The 4K infrared thermal report found our skylight leak immediately. They credited the $149 towards the $799 flashing overhaul. No more attic leaks!"
    }
  ];

  return (
    <section id="reviews" className="section-padding" style={{
      background: "radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.04) 0%, transparent 60%)",
      position: "relative"
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 3.5rem" }}>
          <div className="badge badge-amber" style={{ marginBottom: "0.85rem" }}>
            <Award size={13} /> Verified Homeowner Trust
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.7rem)", marginBottom: "0.8rem" }}>
            4.96★ Rated by Over 520+ Texas Homeowners
          </h2>
          <p style={{ color: "var(--color-text-muted)", fontSize: "1.05rem" }}>
            Real reviews from customers who experienced our seamless Whop deposit &rarr; job milestone &rarr; final invoice workflow.
          </p>
        </div>

        {/* Reviews Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
          gap: "1.8rem",
          marginBottom: "3.5rem"
        }}>
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid rgba(255, 255, 255, 0.08)"
              }}
            >
              <div>
                {/* Star rating */}
                <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={17} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>

                <p style={{ color: "#cbd5e1", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "1.5rem", fontStyle: "italic" }}>
                  "{rev.comment}"
                </p>
              </div>

              <div>
                <div style={{
                  background: "rgba(0, 0, 0, 0.3)",
                  borderRadius: "8px",
                  padding: "0.75rem",
                  fontSize: "0.78rem",
                  marginBottom: "1rem",
                  display: "flex",
                  justifyContent: "space-between"
                }}>
                  <span style={{ color: "#94a3b8" }}>Project: {rev.project}</span>
                  <span style={{ color: "#38bdf8", fontWeight: 700 }}>{rev.contractAmount}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", color: "#ffffff", fontWeight: 700 }}>{rev.author}</h4>
                    <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>{rev.location} &bull; {rev.date}</span>
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: "0.68rem" }}>
                    Verified Whop Buyer
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Industry Trust Strip */}
        <div style={{
          background: "rgba(13, 18, 28, 0.7)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "14px",
          padding: "1.5rem 2rem",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#f59e0b" }}>18+ Years</div>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase" }}>Local Texas Track Record</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff" }}>4,200+</div>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase" }}>Roofs Built &amp; Restored</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#10b981" }}>$2,000,000</div>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase" }}>General Liability Protection</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#38bdf8" }}>50-Year</div>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase" }}>Non-Prorated Warranty</div>
          </div>
        </div>
      </div>
    </section>
  );
};
