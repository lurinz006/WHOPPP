export interface LeadPayload {
  name: string;
  phone: string;
  email: string;
  propertyAddress: string;
  roofAge: string;
  serviceCategory: "replacement" | "repair" | "inspection" | "commercial";
  insuranceClaim: boolean;
  preferredDate?: string;
  notes?: string;
}

export interface WhopLeadResponse {
  id: string;
  account_id: string;
  created_at: number;
  status: "created" | "pending";
  metadata: Record<string, any>;
}

export interface WhopInvoiceResponse {
  id: string;
  amount: number;
  currency: string;
  status: "draft" | "open" | "paid";
  customer_email: string;
  customer_name: string;
  description: string;
  hosted_invoice_url: string;
  payment_method_id?: string;
  created_at: number;
}

export interface PixelEventRecord {
  id: string;
  eventName: "estimate_requested" | "service_viewed" | "deposit_started" | string;
  payload: Record<string, any>;
  timestamp: string;
  status: "dispatched" | "verified";
}
