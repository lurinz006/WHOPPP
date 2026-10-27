/**
 * APEX SUMMIT ROOFING - TEMPLATE CONFIGURATION
 * 
 * Reusable configuration file for US Roofing businesses.
 * Swapping company details, service tiers, and Whop plan IDs takes 30 seconds
 * without modifying any component structure.
 */

export interface ServiceTier {
  id: string;
  name: string;
  tagline: string;
  priceDisplay: string;
  numericPrice: number;
  planId?: string; // Whop Plan ID
  badge?: string;
  turnaround: string;
  warranty: string;
  features: string[];
  recommended?: boolean;
}

export interface CompanyConfig {
  name: string;
  legalName: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  headquarters: string;
  licenseNumber: string;
  insuranceCoverage: string;
  yearsInBusiness: number;
  rating: number;
  reviewCount: number;
  
  // Whop Configuration
  whop: {
    accountId: string; // Whop biz_xxx id
    sandbox: boolean;
    plans: {
      inspectionFee: {
        id: string;
        name: string;
        amount: number;
        currency: string;
        description: string;
      };
      projectDeposit: {
        id: string;
        name: string;
        amount: number;
        currency: string;
        description: string;
      };
      flatRateService: {
        id: string;
        name: string;
        amount: number;
        currency: string;
        description: string;
      };
    };
  };

  // Service Areas
  serviceAreas: {
    primaryMetro: string;
    counties: string[];
    zipCodes: string[];
    responseTimeHours: number;
  };

  // Financing Callout
  financing: {
    minApr: string;
    maxMonths: number;
    providers: string[];
    preQualifyNote: string;
  };
}

export const companyConfig: CompanyConfig = {
  name: "Apex Summit Roofing & Restoration",
  legalName: "Apex Summit Building Systems LLC",
  phone: "(800) 584-ROOF",
  emergencyPhone: "(800) 584-7663",
  email: "dispatch@apexsummitroofing.com",
  headquarters: "742 Commercial Blvd, Dallas-Fort Worth, TX 75201",
  licenseNumber: "TX-R-8849201 (Licensed & Fully Bonded)",
  insuranceCoverage: "$2,000,000 Commercial General Liability & Workers Comp",
  yearsInBusiness: 18,
  rating: 4.96,
  reviewCount: 528,

  whop: {
    accountId: "biz_apex_roofing_prod",
    sandbox: true,
    plans: {
      inspectionFee: {
        id: "plan_roof_inspection_149",
        name: "21-Point Drone & Physical Roof Inspection",
        amount: 149.00,
        currency: "USD",
        description: "Complete 21-point structural assessment, infrared thermal leak detection, and stamped storm damage insurance report."
      },
      projectDeposit: {
        id: "plan_roof_deposit_500",
        name: "Project Work Authorization Deposit",
        amount: 500.00,
        currency: "USD",
        description: "Secures your build crew on the official schedule, locks material wholesale rates, and files municipal permits. Automatically saves card-on-file for job completion billing."
      },
      flatRateService: {
        id: "plan_skylight_leak_repair_799",
        name: "Precision Skylight & Flashing Leak Repair",
        amount: 799.00,
        currency: "USD",
        description: "Same-day leak triage, premium ice & water shield barrier reset, step flashing replacement, and 5-year watertight guarantee."
      }
    }
  },

  serviceAreas: {
    primaryMetro: "Dallas-Fort Worth Metroplex & Surrounding Counties",
    counties: ["Dallas County", "Tarrant County", "Collin County", "Denton County", "Rockwall County", "Ellis County"],
    zipCodes: ["75001", "75002", "75006", "75007", "75019", "75023", "75024", "75034", "75035", "75038", "75070", "75093", "75201", "75202", "75204", "75205", "75206", "75219", "75225", "75230"],
    responseTimeHours: 2
  },

  financing: {
    minApr: "0% APR",
    maxMonths: 60,
    providers: ["Klarna", "Splitit", "Affirm", "Afterpay"],
    preQualifyNote: "Instant digital pre-qualification at checkout with no impact to credit scores."
  }
};
