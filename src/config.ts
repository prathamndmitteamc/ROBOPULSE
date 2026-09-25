/**
 * Robopulse Intelligence — Master Configuration
 * Single source of truth for business contact, brand tokens, and integration hooks.
 */

export interface RobopulseConfig {
  businessName: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  address: string;
  city: string;
  website: string;
  primaryCTA: string;
  logo: {
    text: string;
    subtext: string;
  };
  colors: {
    primary: string;
    secondary: string;
    darkPurple: string;
    brightBlue: string;
    lightCyan: string;
    black: string;
    nearBlack: string;
    white: string;
  };
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube: string;
  };
  integrations: {
    webhookURL: string;
    googleAppsScriptURL: string;
    apiEndpoint: string;
    emailServiceEndpoint: string;
  };
}

export const CONFIG: RobopulseConfig = {
  businessName: "Robopulse Intelligence",
  tagline: "Building the Intelligence Behind Tomorrow.",
  phone: "+918707414150",
  phoneDisplay: "+91 87074 14150",
  whatsapp: "918707414150",
  whatsappMessage:
    "Hello Robopulse Intelligence, I would like to know more about your Robotics, AI and STEM programs for our school/students.",
  email: "prathamkhanna321@gmail.com",
  address: "Sigra, Varanasi, Uttar Pradesh, India",
  city: "Varanasi, India",
  website: "https://robopulseintelligence.com",
  primaryCTA: "CONTACT US",
  logo: {
    text: "ROBOPULSE",
    subtext: "INTELLIGENCE",
  },
  colors: {
    primary: "#00C9FF",
    secondary: "#250060",
    darkPurple: "#18003F",
    brightBlue: "#006CFF",
    lightCyan: "#A9D4FF",
    black: "#000000",
    nearBlack: "#050509",
    white: "#FFFFFF",
  },
  social: {
    instagram: "https://instagram.com/robopulseintelligence",
    facebook: "https://share.google/5eIImmcn45R1o03cr",
    linkedin: "https://linkedin.com/company/robopulse-intelligence",
    youtube: "https://youtube.com/@robopulseintelligence",
  },
  integrations: {
    webhookURL: "",
    googleAppsScriptURL: "",
    apiEndpoint: "/api/lead",
    emailServiceEndpoint: "",
  },
};

/**
 * Open WhatsApp with default or custom prefilled message
 */
export function openWhatsApp(customMsg?: string): void {
  const phone = CONFIG.whatsapp;
  const message = customMsg || CONFIG.whatsappMessage;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
  
  // Track event
  trackAnalyticsEvent("whatsapp_click", { destination: phone });
}

export interface LeadPayload {
  name: string;
  phone: string;
  email: string;
  organization: string;
  city: string;
  requirement: string;
  message: string;
  timestamp?: string;
}

/**
 * Central Lead Submission Architecture
 */
export async function submitLead(payload: LeadPayload): Promise<{ success: boolean; message: string }> {
  trackAnalyticsEvent("contact_form_submit", { requirement: payload.requirement });
  
  // In frontend-first mode, simulate network call and prepare for server webhook integration
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!payload.name || !payload.phone || !payload.email) {
    return {
      success: false,
      message: "Please fill in all required contact details.",
    };
  }

  // Validate Indian Phone format (10 digits, optional +91 prefix)
  const cleanPhone = payload.phone.replace(/[\s-]/g, "");
  const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
  if (!phoneRegex.test(cleanPhone)) {
    return {
      success: false,
      message: "Please enter a valid 10-digit mobile number.",
    };
  }

  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(payload.email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  return {
    success: true,
    message: "ENQUIRY RECEIVED. Our education and robotics team will get back to you soon.",
  };
}

/**
 * Analytics Hooks (Google Tag Manager / Meta Pixel ready)
 */
export function trackAnalyticsEvent(eventName: string, data?: Record<string, any>): void {
  if (typeof window !== "undefined") {
    // Google Tag Manager / dataLayer hook
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push({ event: eventName, ...data });
    }
  }
}
