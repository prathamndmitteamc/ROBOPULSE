/**
 * SEOHead.tsx — Dynamic Client-Side Meta & Canonical Tag Management
 * Handles per-route titles, meta descriptions, canonical URLs, Open Graph,
 * Twitter cards, and BreadcrumbList structured data in compliance with Google Search Central guidelines.
 */

import { useEffect } from "react";
import { CONFIG } from "../config";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  noindex?: boolean;
  ogType?: "website" | "article";
  ogImage?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function SEOHead({
  title,
  description,
  canonicalPath = "/",
  noindex = false,
  ogType = "website",
  ogImage = "/assets/images/hero_robotics_lab_1790153224618.jpg",
  breadcrumbs = [],
}: SEOHeadProps) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Helper to set or create meta tag
    const setMetaTag = (attr: "name" | "property", key: string, content: string) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // 3. Meta Description
    setMetaTag("name", "description", description);

    // 4. Robots Directives
    setMetaTag("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    // 5. Canonical URL
    const baseUrl = CONFIG.website.replace(/\/$/, "");
    const cleanPath = canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`;
    const fullCanonicalUrl = `${baseUrl}${cleanPath === "/" ? "" : cleanPath}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", fullCanonicalUrl);

    // 6. Open Graph Tags
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:url", fullCanonicalUrl);
    setMetaTag("property", "og:site_name", CONFIG.businessName);

    const fullImageUrl = ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`;
    setMetaTag("property", "og:image", fullImageUrl);
    setMetaTag("property", "og:image:alt", `${CONFIG.businessName} Robotics & AI STEM Education`);

    // 7. Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", fullImageUrl);

    // 8. Dynamic BreadcrumbList JSON-LD
    const breadcrumbScriptId = "dynamic-breadcrumb-ld-json";
    let breadcrumbScript = document.getElementById(breadcrumbScriptId) as HTMLScriptElement | null;

    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbList = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
          ...breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 2,
            name: crumb.name,
            item: `${baseUrl}${crumb.path.startsWith("/") ? crumb.path : `/${crumb.path}`}`,
          })),
        ],
      };

      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement("script");
        breadcrumbScript.id = breadcrumbScriptId;
        breadcrumbScript.type = "application/ld+json";
        document.head.appendChild(breadcrumbScript);
      }
      breadcrumbScript.textContent = JSON.stringify(breadcrumbList);
    } else if (breadcrumbScript) {
      breadcrumbScript.remove();
    }

    // 9. Sync GA4 Virtual Page View without sending duplicate initial pageviews
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "page_view", {
        page_title: title,
        page_location: fullCanonicalUrl,
        page_path: cleanPath,
      });
    }
  }, [title, description, canonicalPath, noindex, ogType, ogImage, breadcrumbs]);

  return null;
}
