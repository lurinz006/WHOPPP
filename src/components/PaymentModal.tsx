import React, { useState, useEffect } from "react";
import { companyConfig } from "../config/company";
import { whopApi } from "../services/whopApi";
import { X, ShieldCheck, CheckCircle2, Lock, CreditCard, ArrowRight, RefreshCw, Zap } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlanKey?: "inspectionFee" | "projectDeposit" | "flatRateService";
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  initialPlanKey = "projectDeposit",
}) => {
  const [selectedPlanKey, setSelectedPlanKey] = useState<"inspectionFee" | "projectDeposit" | "flatRateService">(initialPlanKey);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [customerEmail, setCustomerEmail] = useState<string>("customer@roofingdemo.com");
  const [customerName, setCustomerName] = useState<string>("Jane Doe (Homeowner)");
  const [selectedMethod, setSelectedMethod] = useState<"card" | "apple_pay" | "klarna">("apple_pay");

  useEffect(() => {
    setSelectedPlanKey(initialPlanKey);
    setPaymentSuccess(false);
  }, [initialPlanKey, isOpen]);

  if (!isOpen) return null;

  const currentPlan = companyConfig.whop.plans[selectedPlanKey];

  const handleStartCheckout = () => {
    // Fire Whop Pixel Event
    if (selectedPlanKey === "projectDeposit") {
      whopApi.trackEvent("deposit_started", {
        plan_id: currentPlan.id,
        plan_name: currentPlan.name,
        amount: currentPlan.amount,
        currency: currentPlan.currency,
        customer_email: customerEmail,
        timestamp: new Date().toISOString(),
      });
    } else {
      whopApi.trackEvent("checkout_started", {
        plan_id: currentPlan.id,
        plan_name: currentPlan.name,
        amount: currentPlan.amount,
        currency: currentPlan.currency,
      });
    }
  };

  const handleCompleteTestCheckout = () => {
    setIsProcessing(true);
    handleStartCheckout();

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // Track Whop Pixel Event: purchase / payment_completed
      whopApi.trackEvent("purchase", {
        plan_id: currentPlan.id,
        plan_name: currentPlan.name,
        amount: currentPlan.amount,
        currency: currentPlan.currency,
        confirmation_token: "conf_tok_" + Math.random().toString(36).substring(2, 10),
        method: selectedMethod,
        customer_email: customerEmail,
      });
    }, 1200);
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.85)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem"
    }}>
      <div className="glass-panel" style={{
        width: "100%",
        maxWidth: "580px",
        maxHeight: "90vh",
        overflowY: "auto",
        padding: "2.2rem",
        border: "1px solid rgba(245, 158, 11, 0.35)",
        position: "relative",
        boxShadow: "0 25px 60px -15px rgba(0,0,0,0.8)"
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.2rem",
            right: "1.2rem",
            background: "rgba(255, 255, 255, 0.08)",
            border: "none",
            color: "#ffffff",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
          aria-label="Close Modal"
        >
          <X size={18} />
        </button>

        {!paymentSuccess ? (
          <div>
            {/* Header */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div className="badge badge-amber" style={{ marginBottom: "0.5rem" }}>
                <Lock size={12} /> Whop Payment Elements
              </div>
              <h3 style={{ fontSize: "1.6rem", color: "#ffffff", marginBottom: "0.3rem" }}>
                Official Whop Checkout
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                PCI DSS Level 1 Certified &bull; No custom card forms &bull; Buy Now Pay Later Enabled
              </p>
            </div>

            {/* Plan Selector Pills */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "0.5rem",
              background: "rgba(0,0,0,0.3)",
              padding: "0.35rem",
              borderRadius: "10px",
              marginBottom: "1.5rem"
            }}>
              {(["inspectionFee", "projectDeposit", "flatRateService"] as const).map((key) => {
                const plan = companyConfig.whop.plans[key];
                const isSelected = selectedPlanKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSelectedPlanKey(key);
                      handleStartCheckout();
                    }}
                    style={{
                      background: isSelected ? "rgba(245, 158, 11, 0.2)" : "transparent",
                      border: isSelected ? "1px solid #f59e0b" : "1px solid transparent",
                      color: isSelected ? "#f59e0b" : "#94a3b8",
                      borderRadius: "8px",
                      padding: "0.6rem 0.4rem",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={{ fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700 }}>
                      {key === "inspectionFee" ? "Inspection" : key === "projectDeposit" ? "Deposit" : "Repair"}
                    </div>
                    <div style={{ fontSize: "1.05rem", fontWeight: 800, color: isSelected ? "#ffffff" : "#cbd5e1" }}>
                      ${plan.amount}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Plan Summary */}
            <div style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "10px",
              padding: "1rem",
              marginBottom: "1.5rem"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>{currentPlan.name}</span>
                <span style={{ fontWeight: 800, fontSize: "1.2rem", color: "#f59e0b" }}>${currentPlan.amount}.00</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "#94a3b8", lineHeight: 1.4 }}>
                {currentPlan.description}
              </p>
            </div>

            {/* Customer Inputs */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", marginBottom: "1.4rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#94a3b8", marginBottom: "0.3rem" }}>
                  Customer Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(0, 0, 0, 0.4)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "6px",
                    padding: "0.6rem 0.8rem",
                    color: "#ffffff",
                    fontSize: "0.85rem"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#94a3b8", marginBottom: "0.3rem" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(0, 0, 0, 0.4)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "6px",
                    padding: "0.6rem 0.8rem",
                    color: "#ffffff",
                    fontSize: "0.85rem"
                  }}
                />
              </div>
            </div>

            {/* 1. WHOP EXPRESS CHECKOUT ELEMENT (Apple Pay / Google Pay) */}
            <div style={{ marginBottom: "1.2rem" }}>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                &bull; Whop ExpressCheckoutElement
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedMethod("apple_pay");
                  handleCompleteTestCheckout();
                }}
                disabled={isProcessing}
                style={{
                  width: "100%",
                  background: "#000000",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  padding: "0.85rem",
                  fontSize: "1rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.5)"
                }}
              >
                <span>Pay with</span>
                <span style={{ fontWeight: 800, fontSize: "1.1rem" }}>Pay / GPay</span>
              </button>
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              margin: "1.2rem 0",
              color: "#64748b",
              fontSize: "0.75rem",
              textAlign: "center"
            }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(255, 255, 255, 0.08)" }}></div>
              <span>OR PAY WITH CARD &amp; FINANCING</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(255, 255, 255, 0.08)" }}></div>
            </div>

            {/* 2. WHOP PAYMENT ELEMENT CONTAINER (Card & BNPL Klarna / Splitit) */}
            <div style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "10px",
              padding: "1.2rem",
              marginBottom: "1.5rem"
            }}>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: "0.6rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                &bull; Whop PaymentElement (PCI-Isolated Vault)
              </div>

              {/* Method Tiles */}
              <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setSelectedMethod("card")}
                  style={{
                    flex: 1,
                    background: selectedMethod === "card" ? "rgba(245, 158, 11, 0.15)" : "rgba(255, 255, 255, 0.04)",
                    border: selectedMethod === "card" ? "1px solid #f59e0b" : "1px solid rgba(255, 255, 255, 0.08)",
                    color: selectedMethod === "card" ? "#f59e0b" : "#cbd5e1",
                    borderRadius: "6px",
                    padding: "0.6rem",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem"
                  }}
                >
                  <CreditCard size={15} /> Card
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod("klarna")}
                  style={{
                    flex: 1,
                    background: selectedMethod === "klarna" ? "rgba(255, 179, 198, 0.15)" : "rgba(255, 255, 255, 0.04)",
                    border: selectedMethod === "klarna" ? "1px solid #ffb3c6" : "1px solid rgba(255, 255, 255, 0.08)",
                    color: selectedMethod === "klarna" ? "#ffb3c6" : "#cbd5e1",
                    borderRadius: "6px",
                    padding: "0.6rem",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem"
                  }}
                >
                  <Zap size={15} /> Klarna / Splitit (0% APR)
                </button>
              </div>

              {/* Hosted Card Fields Preview */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                <div style={{
                  background: "rgba(0,0,0,0.5)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "6px",
                  padding: "0.65rem 0.85rem",
                  fontSize: "0.85rem",
                  color: "#cbd5e1",
                  display: "flex",
                  justifyContent: "space-between"
                }}>
                  <span>4242 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4242</span>
                  <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>TEST MODE</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem" }}>
                  <div style={{
                    background: "rgba(0,0,0,0.5)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "6px",
                    padding: "0.65rem 0.85rem",
                    fontSize: "0.85rem",
                    color: "#cbd5e1"
                  }}>
                    12 / 28
                  </div>
                  <div style={{
                    background: "rgba(0,0,0,0.5)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "6px",
                    padding: "0.65rem 0.85rem",
                    fontSize: "0.85rem",
                    color: "#cbd5e1"
                  }}>
                    CVC: 123
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Payment Button */}
            <button
              onClick={handleCompleteTestCheckout}
              disabled={isProcessing}
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.95rem", fontSize: "1rem", marginBottom: "1.2rem" }}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="animate-spin" size={18} />
                  <span>Confirming via Whop Payments...</span>
                </>
              ) : (
                <>
                  <Lock size={16} />
                  <span>Pay ${currentPlan.amount}.00 USD</span>
                </>
              )}
            </button>

            {/* 3. MANDATORY WHOP BRANDING ELEMENT */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              fontSize: "0.75rem",
              color: "#94a3b8",
              paddingTop: "0.5rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.05)"
            }}>
              <span>Powered by</span>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                fontWeight: 800,
                color: "#ff6224", // Whop Orange
                letterSpacing: "0.02em"
              }}>
                <span style={{
                  display: "inline-block",
                  width: "14px",
                  height: "14px",
                  borderRadius: "3px",
                  background: "#ff6224",
                  color: "#ffffff",
                  fontSize: "9px",
                  fontWeight: 900,
                  textAlign: "center",
                  lineHeight: "14px"
                }}>W</span>
                WHOP
              </div>
              <span>&bull; BrandingElement (Required)</span>
            </div>
          </div>
        ) : (
          /* PAYMENT COMPLETED SUCCESS STATE */
          <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
            <div style={{
              width: "68px",
              height: "68px",
              borderRadius: "50%",
              background: "rgba(16, 185, 129, 0.15)",
              border: "2px solid #10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)"
            }}>
              <CheckCircle2 size={38} color="#10b981" />
            </div>

            <span className="badge badge-emerald" style={{ marginBottom: "0.8rem" }}>
              Sandbox Checkout Successful
            </span>

            <h3 style={{ fontSize: "1.8rem", color: "#ffffff", marginBottom: "0.5rem" }}>
              Payment Confirmed!
            </h3>

            <p style={{ color: "#94a3b8", fontSize: "0.95rem", maxWidth: "420px", margin: "0 auto 1.8rem" }}>
              Thank you, <strong>{customerName}</strong>. Your payment of <strong>${currentPlan.amount}.00 USD</strong> for <strong>{currentPlan.name}</strong> has been secured via Whop Payments.
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
                <span style={{ color: "#94a3b8" }}>Whop Plan:</span>
                <strong style={{ color: "#38bdf8" }}>{currentPlan.id}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "#94a3b8" }}>Payment Method:</span>
                <strong style={{ color: "#ffffff", textTransform: "capitalize" }}>{selectedMethod.replace("_", " ")}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "#94a3b8" }}>Card-on-File Setup Intent:</span>
                <strong style={{ color: "#10b981" }}>Active &amp; Stored (seti_vaulted)</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#94a3b8" }}>Receipt Sent To:</span>
                <strong style={{ color: "#ffffff" }}>{customerEmail}</strong>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.9rem" }}
            >
              Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
