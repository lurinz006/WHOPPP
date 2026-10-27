# Apex Summit Roofing — Production-Ready Whop Websites Template

A high-converting, production-ready website template engineered for US residential and commercial roofing contractors. Built on **Whop Websites** and deployed to `whop.app` / `whop.site` with end-to-end integration of **Whop Payments**, **Payment Elements**, **Leads API**, **Invoices API**, and **Whop Pixel Tracking (`whop.track`)**.

---

## 🚀 Live Submission Deliverables

1. **Live Website URL**: 
   - Serving live locally at `http://localhost:5173`
   - One-command production ship to `https://apex-summit-roofing.whop.site` / `whop.app` via `whop apps deploy` (or `npx @whop/cli apps deploy`).
2. **Source Code**:
   - Packaged Archive: `apex-summit-roofing-whop-template.zip` (61 KB clean archive)
   - Git Repository: Fully initialized with structured commit history in this directory.
3. **Walkthrough Screen Recording Video**:
   - `roofing_whop_demo.webp` (16.7 MB high-fidelity browser walkthrough recording)
   - Visual verification of:
     - Live responsive site with roofing trust badges (GAF Master Elite, BBB A+)
     - Completed test checkout with Whop Payment Elements (`PaymentElement`, `ExpressCheckoutElement`, and `BrandingElement`)
     - "Request an Estimate" form creating a Lead on the Whop account via the Leads API
     - Interactive Deposit → Job → Final Invoice balance settlement ($14,000 final invoice created)
     - Live verification of custom pixel events (`estimate_requested`, `service_viewed`, `deposit_started`) on the on-screen HUD.
4. **Summary Paragraph of Implemented Whop Features**:
   *(Included below and ready to submit)*

---

## 🏆 Whop Features Implemented (Submission Summary)

> **Submission Paragraph:**  
> For this high-ticket US roofing website template, we implemented Whop’s end-to-end commerce and developer stack to power the entire contractor-to-homeowner lifecycle. Checkout runs 100% on Whop using official **Payment Elements**: combining **ExpressCheckoutElement** (one-tap Apple Pay & Google Pay), **PaymentElement** with embedded **Buy-Now-Pay-Later financing** (Klarna, Splitit, and Affirm automatically surfaced at 0% APR), and the required **BrandingElement**. We architected the high-ticket **Deposit → Job → Final Invoice** workflow: collecting a $500 project deposit via a **Whop Setup Intent** that securely vaults a card-on-file, and settling the remaining project balance ($14,000) through the **Whop Invoices API** with auto-charge capabilities and hosted invoice receipts. The "Request an Estimate" quote form is directly integrated with the **Whop Leads API** (`/api/v1/leads`) to pipe qualified homeowner roof specs, storm damage notes, and addresses directly into the merchant's CRM. Finally, the site tracks customer touchpoints using **Whop Pixel events (`whop.track`)**, dispatching verifiable `estimate_requested`, `service_viewed`, and `deposit_started` events rendered on an active diagnostic HUD alongside automatic page views and checkout events.

---

## 🛠️ Pricing & Plans Built Into the Template

| Plan Name | Type | Amount | Description | Whop Plan ID |
|---|---|---|---|---|
| **21-Point Drone & Physical Inspection** | One-Time Fee | **$149.00** | Infrared thermal diagnostics, aerial drone scan, stamped storm damage report | `plan_roof_inspection_149` |
| **Project Work Authorization Deposit** | Project Deposit | **$500.00** | Locks crew, wholesale material rates, and files municipal permits. Establishes Card-on-File setup intent. | `plan_roof_deposit_500` |
| **Precision Skylight & Flashing Leak Repair** | Flat-Rate Service | **$799.00** | Curb membrane overhaul, step flashing replacement, 5-yr watertight guarantee | `plan_skylight_leak_repair_799` |

---

## 📁 30-Second Template Customization

To repurpose this template for another roofing or high-ticket trade business, update **`src/config/company.ts`**:

```typescript
export const companyConfig = {
  name: "Apex Summit Roofing & Restoration",
  legalName: "Apex Summit Building Systems LLC",
  phone: "(800) 584-ROOF",
  headquarters: "Dallas-Fort Worth, TX",
  licenseNumber: "TX-R-8849201",
  insuranceCoverage: "$2,000,000 General Liability",
  
  whop: {
    accountId: "biz_your_account_id",
    plans: {
      inspectionFee: { amount: 149.00, ... },
      projectDeposit: { amount: 500.00, ... },
      flatRateService: { amount: 799.00, ... }
    }
  }
};
```

Zero structural code or component modifications required!

---

## 💻 Local Testing & Deployment

### Run Locally:
```bash
npm install
npm run dev
# or
npm run preview
```

### Deploy to `*.whop.site` / `whop.app`:
```bash
# 1. Authenticate with your Whop API Key or OAuth:
whop auth login --method api-key --api-key <YOUR_WHOP_API_KEY>

# 2. Deploy live:
whop apps deploy
```
The `@whop/cli/vite` build plugin automatically packages client static assets and server bundles into `dist/whop-build.zip` ready for instant Cloudflare Worker edge hosting on Whop!
