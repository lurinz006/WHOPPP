import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { DepositInvoiceFlow } from "./components/DepositInvoiceFlow";
import { FinancingSection } from "./components/FinancingSection";
import { EstimateForm } from "./components/EstimateForm";
import { ServiceArea } from "./components/ServiceArea";
import { ReviewsSection } from "./components/ReviewsSection";
import { Footer } from "./components/Footer";
import { PaymentModal } from "./components/PaymentModal";
import { PixelTrackerHUD } from "./components/PixelTrackerHUD";
import { whopApi } from "./services/whopApi";

export const App: React.FC = () => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedPlanKey, setSelectedPlanKey] = useState<"inspectionFee" | "projectDeposit" | "flatRateService">("projectDeposit");

  useEffect(() => {
    // Initial page view registration
    whopApi.trackEvent("page_view", {
      title: document.title,
      url: window.location.href,
      path: window.location.pathname,
    });
  }, []);

  const handleOpenCheckout = (planKey: "inspectionFee" | "projectDeposit" | "flatRateService" = "projectDeposit") => {
    setSelectedPlanKey(planKey);
    setIsPaymentOpen(true);
  };

  const scrollToEstimate = () => {
    const el = document.getElementById("estimate");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToDepositFlow = () => {
    const el = document.getElementById("deposit-invoice-flow");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* 1. Header & Navigation */}
      <Navbar
        onRequestEstimate={scrollToEstimate}
        onOpenDepositFlow={scrollToDepositFlow}
      />

      {/* 2. High-Ticket Hero Section */}
      <Hero
        onRequestEstimate={scrollToEstimate}
        onBookInspection={() => handleOpenCheckout("inspectionFee")}
        onOpenDeposit={() => handleOpenCheckout("projectDeposit")}
      />

      {/* 3. Core Services (Inspection $149, Deposit $500, Flat-Rate $799) */}
      <Services
        onSelectPlan={(planKey) => handleOpenCheckout(planKey)}
        onRequestEstimate={scrollToEstimate}
      />

      {/* 4. High-Ticket Deposit -> Job -> Final Invoices API Interactive Flow */}
      <DepositInvoiceFlow
        onOpenDepositCheckout={() => handleOpenCheckout("projectDeposit")}
      />

      {/* 5. 0% APR Financing via Whop BNPL (Klarna, Splitit, Afterpay) */}
      <FinancingSection
        onOpenCheckout={() => handleOpenCheckout("projectDeposit")}
      />

      {/* 6. "Request an Estimate" Form Wired to Whop Leads API */}
      <EstimateForm />

      {/* 7. Texas Regional Service Area & Zip Checker */}
      <ServiceArea />

      {/* 8. Verified Homeowner Reviews & Trust Badges */}
      <ReviewsSection />

      {/* 9. Business Credentials & Footer */}
      <Footer />

      {/* 10. Embedded Whop Payment Elements Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        initialPlanKey={selectedPlanKey}
      />

      {/* 11. Live Whop Pixel & API HUD (Floating Event Verification Console) */}
      <PixelTrackerHUD />
    </div>
  );
};

export default App;
