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
  whatsappUrl: string;
  whatsappMessage: string;
  email: string;
  address: string;
  city: string;
  offices: {
    headOffice: {
      title: string;
      address: string;
      city: string;
      state: string;
      country: string;
      mapsUrl: string;
    };
    branchOffice: {
      title: string;
      address: string;
      city: string;
      state: string;
      country: string;
      mapsUrl: string;
    };
  };
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
  phone: "+919451226511",
  phoneDisplay: "+91 94512 26511",
  whatsapp: "919451226511",
  whatsappUrl: "https://wa.me/919451226511",
  whatsappMessage:
    "Hello RoboPulse Intelligence! I have submitted an enquiry through your website and would like to know more about your Robotics, AI, and STEM programs. Please contact me with further details.",
  email: "robopulse51@gmail.com",
  address: "Panama Park, Dhanori Road, Lohegaon, Pune, Maharashtra, India",
  city: "Pune, India",
  offices: {
    headOffice: {
      title: "Head Office",
      address: "Panama Park, Dhanori Road, Lohegaon, Pune, Maharashtra, India",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Panama+Park+Dhanori+Road+Lohegaon+Pune+Maharashtra+India",
    },
    branchOffice: {
      title: "Branch Office",
      address: "Kabir Nagar, Varanasi, Uttar Pradesh, India",
      city: "Varanasi",
      state: "Uttar Pradesh",
      country: "India",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kabir+Nagar+Varanasi+Uttar+Pradesh+India",
    },
  },
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
 * Production-ready for Hostinger (PHP mailer endpoint), Node.js Express server, Formspree/webhooks
 * Recipient: robopulse51@gmail.com
 */
export async function submitLead(payload: LeadPayload): Promise<{ success: boolean; message: string }> {
  trackAnalyticsEvent("contact_form_submit", { requirement: payload.requirement });
  
  // 1. Client-side field validations with specific, helpful feedback
  if (!payload.name || !payload.name.trim()) {
    return {
      success: false,
      message: "Please enter your full name.",
    };
  }

  if (!payload.phone || !payload.phone.trim()) {
    return {
      success: false,
      message: "Please enter your mobile phone number.",
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
  if (!payload.email || !payload.email.trim()) {
    return {
      success: false,
      message: "Please enter your email address.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(payload.email.trim())) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  const submissionPayload = {
    ...payload,
    _replyto: payload.email,
    _subject: `New Institutional Lead: ${payload.name} (${payload.organization || payload.city || "Website Inquiry"})`,
    recipientEmail: CONFIG.email,
    timestamp: new Date().toISOString(),
  };

  let primaryErrorMessage = "";

  // 2. Try Primary Endpoint: Local Node/Express server route (/api/lead)
  try {
    const response = await fetch(CONFIG.integrations.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(submissionPayload),
    });

    if (response.ok) {
      // Check content-type to ensure we got a valid JSON API response (not an HTML fallback)
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await response.json();
        if (data.success !== false) {
          return {
            success: true,
            message: data.message || `ENQUIRY TRANSMITTED // Details forwarded to ${CONFIG.email}.`,
          };
        } else {
          primaryErrorMessage = data.message || "Endpoint returned error.";
        }
      }
    } else {
      console.warn(`[LEAD] Primary /api/lead returned HTTP ${response.status}. Attempting Hostinger PHP mailer...`);
    }
  } catch (err) {
    console.warn("[LEAD] Primary /api/lead endpoint unreachable or returned HTML. Trying production fallback...", err);
  }

  // 3. Try Hostinger PHP Mailer Endpoint (/api/contact.php and /contact.php)
  // Hostinger Apache/LiteSpeed web servers natively execute PHP scripts in /public or document root
  const hostingerEndpoints = ["/api/contact.php", "/contact.php"];
  for (const phpEndpoint of hostingerEndpoints) {
    try {
      const phpRes = await fetch(phpEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submissionPayload),
      });

      if (phpRes.ok) {
        const contentType = phpRes.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const phpData = await phpRes.json();
          if (phpData.success !== false) {
            return {
              success: true,
              message: phpData.message || `ENQUIRY TRANSMITTED // Email forwarded to ${CONFIG.email}.`,
            };
          }
        }
      }
    } catch (phpErr) {
      console.warn(`[LEAD] Hostinger endpoint ${phpEndpoint} check:`, phpErr);
    }
  }

  // 4. Try Direct Cloud Webhook / Formspree gateway to guarantee email delivery to robopulse51@gmail.com
  try {
    const cloudGatewayUrl = `https://formsubmit.co/ajax/${encodeURIComponent(CONFIG.email)}`;
    const cloudRes = await fetch(cloudGatewayUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        organization: payload.organization,
        city: payload.city,
        requirement: payload.requirement,
        message: payload.message,
        _subject: `New Robopulse Enquiry: ${payload.name} (${payload.organization || payload.city || "Campus"})`,
        _template: "table",
        _captcha: "false",
      }),
    });

    if (cloudRes.ok) {
      const cloudData = await cloudRes.json().catch(() => ({}));
      return {
        success: true,
        message: `ENQUIRY TRANSMITTED // Lead successfully sent to ${CONFIG.email}. Our robotics team will get back to you shortly.`,
      };
    }
  } catch (cloudErr) {
    console.warn("[LEAD] Cloud mail gateway attempt:", cloudErr);
  }

  // If every network path failed or was blocked by client network/offline state
  return {
    success: false,
    message: primaryErrorMessage || "Network connection issue. Unable to dispatch enquiry to our server. Please verify your connection or reach us directly via WhatsApp.",
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
