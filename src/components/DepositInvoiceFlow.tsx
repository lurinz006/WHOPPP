import React, { useState } from "react";
import { companyConfig } from "../config/company";
import { whopApi } from "../services/whopApi";
import { WhopInvoiceResponse } from "../types";
import { ShieldCheck, CreditCard, CheckCircle2, ArrowRight, FileText, RefreshCw, Send, DollarSign, Sparkles } from "lucide-react";

interface DepositInvoiceFlowProps {
  onOpenDepositCheckout: () => void;
}

export const DepositInvoiceFlow: React.FC<DepositInvoiceFlowProps> = ({ onOpenDepositCheckout }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [depositCompleted, setDepositCompleted] = useState<boolean>(true);
  const [customerName, setCustomerName] = useState<string>("David Miller (Homeowner)");
  const [customerEmail, setCustomerEmail] = useState<string>("dmiller.dfw@example.com");
  const [totalJobCost, setTotalJobCost] = useState<number>(14500);
  const depositAmount = companyConfig.whop.plans.projectDeposit.amount; // $500
  const finalBalance = totalJobCost - depositAmount; // $14,000

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [createdInvoice, setCreatedInvoice] = useState<WhopInvoiceResponse | null>(null);

  const handleSimulateInvoice = async (autoCharge: boolean) => {
    setIsProcessing(true);
    try {
      const invoice = await whopApi.createFinalBalanceInvoice({
        customerName,
        customerEmail,
        depositPaid: depositAmount,
        totalJobCost,
        projectScope: "GAF Timberline HDZ® Architectural Roof Replacement (32 Squares)",
        autoChargeSavedCard: autoCharge,
      });
      setCreatedInvoice(invoice);
      setActiveStep(3);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="deposit-invoice-flow" className="section-padding" style={{
      background: "linear-gradient(180deg, rgba(13, 18, 28, 0.7) 0%, rgba(7, 9, 14, 0.95) 100%)",
      borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      position: "relative"
    }}>
      <div className="container">
        {/* Section Title */}
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3.5rem" }}>
          <div className="badge badge-emerald" style={{ marginBottom: "0.85rem" }}>
            <ShieldCheck size={13} /> High-Ticket Vertical Workflow
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.7rem)", marginBottom: "1rem" }}>
            Deposit &rarr; Job &rarr; Final Invoice Architecture
          </h2>
          <p style={{ color: "var(--color-text-muted)", fontSize: "1.05rem" }}>
            Roof replacements range from $10,000 to $40,000+. See how Whop solves the cash flow cycle: collect an initial $500 deposit with card-on-file authorization, execute the build, and bill the final balance automatically.
          </p>
        </div>

        {/* Step Navigation Pill Indicator */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "2.5rem",
          flexWrap: "wrap"
        }}>
          {[
            { num: 1, label: "1. Deposit & Card-On-File ($500)" },
            { num: 2, label: "2. Job Execution Milestones" },
            { num: 3, label: "3. Whop Final Invoices API" }
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              style={{
                background: activeStep === s.num ? "rgba(245, 158, 11, 0.18)" : "rgba(255, 255, 255, 0.04)",
                color: activeStep === s.num ? "#f59e0b" : "#94a3b8",
                border: activeStep === s.num ? "1px solid #f59e0b" : "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "var(--radius-full)",
                padding: "0.55rem 1.4rem",
                fontWeight: 700,
                fontSize: "0.88rem",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Interactive Flow Container */}
        <div className="glass-panel" style={{
          padding: "2.5rem",
          maxWidth: "960px",
          margin: "0 auto",
          border: "1px solid rgba(245, 158, 11, 0.25)"
        }}>
          {/* STEP 1: DEPOSIT & CARD-ON-FILE */}
          {activeStep === 1 && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
                <div>
                  <span className="badge badge-amber" style={{ marginBottom: "0.5rem" }}>Whop Setup Intent</span>
                  <h3 style={{ fontSize: "1.6rem" }}>Initial $500 Job Deposit & Card Authorization</h3>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem" }}>
                    Secures project schedule and saves payment method securely on Whop PCI-isolated vaults.
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 800, color: "#ffffff" }}>$500.00</div>
                  <div style={{ fontSize: "0.8rem", color: "#10b981", fontWeight: 600 }}>100% Deductible from Final Invoice</div>
                </div>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
                marginBottom: "2rem"
              }} className="flow-step-grid">
                <div style={{
                  background: "rgba(0, 0, 0, 0.3)",
                  padding: "1.5rem",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.06)"
                }}>
                  <h4 style={{ fontSize: "1rem", color: "#f59e0b", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CreditCard size={17} /> Customer Authorization
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", fontSize: "0.9rem" }}>
                    <div>
                      <span style={{ color: "#94a3b8" }}>Homeowner: </span>
                      <strong style={{ color: "#ffffff" }}>{customerName}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#94a3b8" }}>Email: </span>
                      <strong style={{ color: "#ffffff" }}>{customerEmail}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#94a3b8" }}>Project Total: </span>
                      <strong style={{ color: "#ffffff" }}>${totalJobCost.toLocaleString()} USD</strong>
                    </div>
                    <div>
                      <span style={{ color: "#94a3b8" }}>Deposit Plan: </span>
                      <strong style={{ color: "#38bdf8" }}>plan_roof_deposit_500</strong>
                    </div>
                  </div>
                </div>

                <div style={{
                  background: "rgba(16, 185, 129, 0.05)",
                  padding: "1.5rem",
                  borderRadius: "12px",
                  border: "1px solid rgba(16, 185, 129, 0.2)"
                }}>
                  <h4 style={{ fontSize: "1rem", color: "#34d399", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <ShieldCheck size={17} /> Vaulted Card-on-File
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "#cbd5e1", lineHeight: 1.5, marginBottom: "1rem" }}>
                    Whop Payment Elements handles tokenization without custom card inputs. A setup intent is registered, enabling auto-charge upon final municipal permit pass.
                  </p>
                  <div style={{
                    background: "rgba(0,0,0,0.4)",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "6px",
                    fontFamily: "monospace",
                    fontSize: "0.78rem",
                    color: "#a7f3d0"
                  }}>
                    Vaulted Token: seti_98af7b32... (Auto-Charge Capable)
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <button
                  onClick={onOpenDepositCheckout}
                  className="btn btn-primary"
                >
                  <CreditCard size={16} />
                  <span>Test Deposit Checkout with Payment Elements</span>
                </button>
                <button
                  onClick={() => setActiveStep(2)}
                  className="btn btn-secondary"
                >
                  <span>Proceed to Job Execution &rarr;</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: JOB EXECUTION MILESTONES */}
          {activeStep === 2 && (
            <div>
              <div style={{ marginBottom: "2rem" }}>
                <span className="badge badge-blue" style={{ marginBottom: "0.5rem" }}>Job Milestones</span>
                <h3 style={{ fontSize: "1.6rem" }}>Turnkey Roofing Construction Progress</h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem" }}>
                  Milestone tracking ensures work is completed before the final invoice balance is generated.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
                {[
                  { title: "Deposit Received ($500) & Permitting", desc: "City building permit #TX-2026-7489 approved. GAF materials scheduled.", status: "Completed", icon: CheckCircle2, color: "#10b981" },
                  { title: "Tear-off & Decking Inspection", desc: "Old 3-tab shingles removed, rotten plywood re-sheeted with 5/8' CDX.", status: "Completed", icon: CheckCircle2, color: "#10b981" },
                  { title: "Synthetic Underlayment & GAF Shingle Installation", desc: "WeatherWatch® leak barrier installed at eaves, valleys and flashing.", status: "Completed", icon: CheckCircle2, color: "#10b981" },
                  { title: "Final Municipal Inspection & Clean Up", desc: "Passed city building inspection. Magnet sweep completed. Job finished.", status: "Ready for Final Invoicing", icon: Sparkles, color: "#f59e0b" },
                ].map((m, idx) => (
                  <div key={idx} style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                    borderRadius: "10px",
                    padding: "1.1rem 1.4rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1rem"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <m.icon size={22} color={m.color} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{m.title}</div>
                        <div style={{ color: "#94a3b8", fontSize: "0.82rem" }}>{m.desc}</div>
                      </div>
                    </div>
                    <span className={`badge ${m.status === 'Completed' ? 'badge-emerald' : 'badge-amber'}`}>
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <button
                  onClick={() => setActiveStep(1)}
                  className="btn btn-secondary"
                >
                  &larr; Back to Deposit
                </button>
                <button
                  onClick={() => setActiveStep(3)}
                  className="btn btn-primary"
                >
                  <span>Bill Final Balance ($14,000) &rarr;</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: WHOP FINAL INVOICES API */}
          {activeStep === 3 && (
            <div>
              <div style={{ marginBottom: "2rem" }}>
                <span className="badge badge-emerald" style={{ marginBottom: "0.5rem" }}>Whop Invoices API</span>
                <h3 style={{ fontSize: "1.6rem" }}>Final Balance Billing & Settlement</h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem" }}>
                  Demonstrating the Whop Invoices API (`/api/v1/invoices`): auto-charge the stored card-on-file or send a payable link.
                </p>
              </div>

              {/* Financial Calculation Box */}
              <div style={{
                background: "rgba(245, 158, 11, 0.05)",
                border: "1px solid rgba(245, 158, 11, 0.2)",
                borderRadius: "12px",
                padding: "1.5rem",
                marginBottom: "2rem"
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.2rem", textAlign: "center" }}>
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Total Job Contract</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>${totalJobCost.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Deposit Collected</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#10b981" }}>-${depositAmount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "#f59e0b", fontWeight: 700 }}>FINAL BALANCE DUE</div>
                    <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#f59e0b" }}>${finalBalance.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Auto Charge or Manual Invoice */}
              {!createdInvoice ? (
                <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", justifyContent: "center" }}>
                  <button
                    disabled={isProcessing}
                    onClick={() => handleSimulateInvoice(true)}
                    className="btn btn-primary"
                    style={{ padding: "0.9rem 1.8rem" }}
                  >
                    {isProcessing ? <RefreshCw className="animate-spin" size={17} /> : <DollarSign size={18} />}
                    <span>Auto-Charge Stored Card (${finalBalance.toLocaleString()})</span>
                  </button>

                  <button
                    disabled={isProcessing}
                    onClick={() => handleSimulateInvoice(false)}
                    className="btn btn-secondary"
                    style={{ padding: "0.9rem 1.8rem" }}
                  >
                    <Send size={16} />
                    <span>Send Payable Whop Invoice Link</span>
                  </button>
                </div>
              ) : (
                /* Invoice Created Result Card */
                <div style={{
                  background: "rgba(16, 185, 129, 0.08)",
                  border: "1px solid rgba(16, 185, 129, 0.35)",
                  borderRadius: "12px",
                  padding: "1.8rem"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                    <CheckCircle2 size={24} color="#10b981" />
                    <h4 style={{ fontSize: "1.2rem", color: "#ffffff" }}>
                      Whop Invoice Successfully Created & Processed!
                    </h4>
                  </div>

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1rem",
                    fontSize: "0.88rem",
                    marginBottom: "1.5rem"
                  }}>
                    <div>
                      <span style={{ color: "#94a3b8" }}>Invoice ID: </span>
                      <strong style={{ color: "#38bdf8", fontFamily: "monospace" }}>{createdInvoice.id}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#94a3b8" }}>Billed Amount: </span>
                      <strong style={{ color: "#ffffff" }}>${createdInvoice.amount.toLocaleString()} USD</strong>
                    </div>
                    <div>
                      <span style={{ color: "#94a3b8" }}>Status: </span>
                      <span className={`badge ${createdInvoice.status === 'paid' ? 'badge-emerald' : 'badge-amber'}`}>
                        {createdInvoice.status.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: "#94a3b8" }}>Payment Method: </span>
                      <strong style={{ color: "#ffffff" }}>{createdInvoice.payment_method_id || "Customer Checkout Link"}</strong>
                    </div>
                  </div>

                  <div style={{
                    background: "rgba(0,0,0,0.4)",
                    padding: "0.8rem 1rem",
                    borderRadius: "8px",
                    fontFamily: "monospace",
                    fontSize: "0.8rem",
                    color: "#a7f3d0",
                    wordBreak: "break-all",
                    marginBottom: "1.2rem"
                  }}>
                    Whop Invoices API Endpoint: POST https://api.whop.com/api/v1/invoices &rarr; HTTP 200 OK
                  </div>

                  <button
                    onClick={() => setCreatedInvoice(null)}
                    className="btn btn-secondary"
                    style={{ fontSize: "0.85rem", padding: "0.5rem 1.2rem" }}
                  >
                    Reset Demo
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .flow-step-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
