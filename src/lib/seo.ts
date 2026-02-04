/**
 * SEO Utilities & Schema Generators
 *
 * Centralized SEO helpers for DevUp Society website.
 * Provides type-safe schema generation and SEO utilities.
 *
 * @module lib/seo
 * @version 2.0.0
 * @author DevUp Society
 */

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string[];
  url?: string;
  image?: string;
  type?: "website" | "article" | "event" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  locale?: string;
  siteName?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface PersonSchema {
  name: string;
  jobTitle?: string;
  organization?: string;
  image?: string;
  url?: string;
  sameAs?: string[];
}

export interface EventSchemaConfig {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  mode: "Online" | "Offline" | "Hybrid";
  image?: string[];
  price?: number;
  currency?: string;
  url: string;
  isHackathon?: boolean;
  organizer?: {
    name: string;
    url: string;
  };
}

// ============================================
// SITE CONSTANTS
// ============================================

export const SITE_CONFIG = {
  name: "DevUp Society",
  tagline: "Student Developer Community",
  url: "https://www.devupvjit.in",
  logo: "https://www.devupvjit.in/logo.png",
  ogImage: "https://www.devupvjit.in/og-image.jpg",
  email: "devupsociety@vjit.ac.in",
  phone: "+91-XXXXXXXXXX",
  founded: "2024",
  location: {
    name: "Vidya Jyothi Institute of Technology (VJIT)",
    street: "Aziz Nagar Gate",
    city: "Hyderabad",
    state: "Telangana",
    postalCode: "500075",
    country: "IN",
    countryName: "India",
    geo: {
      latitude: 17.3917,
      longitude: 78.3362,
    },
  },
  social: {
    linkedin: "https://www.linkedin.com/company/devup-community",
    instagram: "https://www.instagram.com/devupcommunity",
    twitter: "https://twitter.com/devup_society",
    github: "https://github.com/DevUp-Society",
    whatsapp: "https://chat.whatsapp.com/CvU68WlMmoo5PvIBpOU5Dy",
  },
} as const;

// ============================================
// DEFAULT KEYWORDS (Site-wide)
// ============================================

export const DEFAULT_KEYWORDS = [
  "DevUp Society",
  "devup",
  "dev up",
  "student developer community",
  "developer community Hyderabad",
  "coding club VJIT",
  "hackathon community India",
  "student coding club",
  "tech community near me",
  "learn to code for students",
  "open source community India",
  "web development workshop",
  "AI ML student community",
  "best coding club India",
  "student developer network",
];

// ============================================
// SCHEMA GENERATORS
// ============================================

/**
 * Generate Organization Schema (Enhanced for Entity SEO)
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    alternateName: ["DevUp", "Dev Up", "DevUp Community", "DevUp VJIT"],
    url: SITE_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      url: SITE_CONFIG.logo,
      width: 512,
      height: 512,
    },
    image: SITE_CONFIG.ogImage,
    description:
      "India's premier student developer community at VJIT, Hyderabad. Build real products, join hackathons, learn industry skills.",
    slogan: "Build. Learn. Grow.",
    foundingDate: SITE_CONFIG.founded,
    foundingLocation: {
      "@type": "Place",
      name: SITE_CONFIG.location.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE_CONFIG.location.city,
        addressRegion: SITE_CONFIG.location.state,
        addressCountry: SITE_CONFIG.location.country,
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.location.street,
      addressLocality: SITE_CONFIG.location.city,
      addressRegion: SITE_CONFIG.location.state,
      postalCode: SITE_CONFIG.location.postalCode,
      addressCountry: SITE_CONFIG.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.location.geo.latitude,
      longitude: SITE_CONFIG.location.geo.longitude,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE_CONFIG.email,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi", "Telugu"],
    },
    sameAs: Object.values(SITE_CONFIG.social),
    memberOf: {
      "@type": "Organization",
      name: "Vidya Jyothi Institute of Technology",
      url: "https://vjit.ac.in",
    },
    knowsAbout: [
      "Web Development",
      "Full-Stack Development",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "DevOps",
      "Docker",
      "Kubernetes",
      "AWS",
      "Artificial Intelligence",
      "Machine Learning",
      "Open Source",
      "Hackathons",
      "Git",
      "GitHub",
    ],
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: SITE_CONFIG.location.geo.latitude,
        longitude: SITE_CONFIG.location.geo.longitude,
      },
      geoRadius: "50000",
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 150,
    },
  };
}

/**
 * Generate EducationalOrganization Schema
 */
export function generateEducationalOrgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_CONFIG.url}/#educational-org`,
    name: SITE_CONFIG.name,
    alternateName: "DevUp Community",
    url: SITE_CONFIG.url,
    description:
      "Student-led educational community teaching practical programming skills through hands-on projects and hackathons.",
    educationalCredentialAwarded:
      "Portfolio Projects, Open Source Contributions, Industry Readiness",
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Portfolio",
        name: "Deployed Project Portfolio",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Experience",
        name: "Hackathon Participation Certificate",
      },
    ],
    courseMode: ["onsite", "online", "blended"],
    availableLanguage: "English",
  };
}

/**
 * Generate WebSite Schema with SearchAction
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    name: SITE_CONFIG.name,
    alternateName: "DevUp",
    url: SITE_CONFIG.url,
    description:
      "Official website of DevUp Society - Student Developer Community at VJIT, Hyderabad",
    inLanguage: "en-IN",
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate Breadcrumb Schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Article Schema (for blog/content pages)
 */
export function generateArticleSchema(config: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: config.headline,
    description: config.description,
    url: config.url,
    image: config.image || SITE_CONFIG.ogImage,
    datePublished: config.publishedTime || new Date().toISOString(),
    dateModified: config.modifiedTime || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: config.author || SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        "@type": "ImageObject",
        url: SITE_CONFIG.logo,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": config.url,
    },
    keywords: config.keywords?.join(", "),
  };
}

/**
 * Generate Event Schema
 */
export function generateEventSchema(config: EventSchemaConfig) {
  const baseSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": config.isHackathon ? "Hackathon" : "Event",
    name: config.name,
    description: config.description,
    url: config.url,
    startDate: config.startDate,
    endDate: config.endDate || config.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode:
      config.mode === "Online"
        ? "https://schema.org/OnlineEventAttendanceMode"
        : config.mode === "Hybrid"
          ? "https://schema.org/MixedEventAttendanceMode"
          : "https://schema.org/OfflineEventAttendanceMode",
    location:
      config.mode === "Online"
        ? {
            "@type": "VirtualLocation",
            url: config.url,
          }
        : {
            "@type": "Place",
            name: config.location,
            address: {
              "@type": "PostalAddress",
              addressLocality: SITE_CONFIG.location.city,
              addressRegion: SITE_CONFIG.location.state,
              addressCountry: SITE_CONFIG.location.country,
            },
          },
    image: config.image || [SITE_CONFIG.ogImage],
    organizer: config.organizer || {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    offers: {
      "@type": "Offer",
      price: config.price || 0,
      priceCurrency: config.currency || "INR",
      availability: "https://schema.org/InStock",
    },
    isAccessibleForFree: !config.price || config.price === 0,
  };

  return baseSchema;
}

/**
 * Generate Person Schema (for team members)
 */
export function generatePersonSchema(person: PersonSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.jobTitle,
    worksFor: person.organization
      ? {
          "@type": "Organization",
          name: person.organization,
        }
      : undefined,
    image: person.image,
    url: person.url,
    sameAs: person.sameAs,
  };
}

/**
 * Generate FAQ Schema from Q&A pairs
 */
export function generateFaqSchema(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate LocalBusiness Schema (for Google Maps)
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.url}/#local-business`,
    name: SITE_CONFIG.name,
    description:
      "Student developer community and coding club at VJIT, Hyderabad",
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.location.street,
      addressLocality: SITE_CONFIG.location.city,
      addressRegion: SITE_CONFIG.location.state,
      postalCode: SITE_CONFIG.location.postalCode,
      addressCountry: SITE_CONFIG.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.location.geo.latitude,
      longitude: SITE_CONFIG.location.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "Free",
    image: SITE_CONFIG.ogImage,
    sameAs: Object.values(SITE_CONFIG.social),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

/**
 * Generate Course Schema (for workshops/bootcamps)
 */
export function generateCourseSchema(config: {
  name: string;
  description: string;
  url: string;
  provider?: string;
  skills?: string[];
  duration?: string;
  price?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: config.name,
    description: config.description,
    url: config.url,
    provider: {
      "@type": "Organization",
      name: config.provider || SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    educationalCredentialAwarded: "Certificate of Completion",
    courseMode: "onsite",
    isAccessibleForFree: !config.price || config.price === 0,
    offers: config.price
      ? {
          "@type": "Offer",
          price: config.price,
          priceCurrency: "INR",
        }
      : undefined,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      courseWorkload: config.duration || "PT4H",
    },
    teaches: config.skills?.map((skill) => ({
      "@type": "DefinedTerm",
      name: skill,
    })),
  };
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_CONFIG.url}${cleanPath}`;
}

/**
 * Generate Open Graph image URL
 */
export function getOgImageUrl(customImage?: string): string {
  return customImage || SITE_CONFIG.ogImage;
}

/**
 * Combine multiple schemas for injection
 */
export function combineSchemas(...schemas: any[]): string {
  // Filter out null/undefined schemas
  const validSchemas = schemas.filter(Boolean);

  if (validSchemas.length === 0) return "";
  if (validSchemas.length === 1) {
    return JSON.stringify(validSchemas[0]);
  }

  return JSON.stringify(validSchemas);
}

/**
 * Truncate description to optimal length for meta tags
 * Google typically shows 155-160 characters
 */
export function truncateDescription(
  text: string,
  maxLength: number = 155,
): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3).trim() + "...";
}

/**
 * Generate title with site name suffix
 */
export function generatePageTitle(
  title: string,
  includeSiteName: boolean = true,
): string {
  if (!includeSiteName) return title;
  if (title.toLowerCase().includes("devup")) return title;
  return `${title} | ${SITE_CONFIG.name}`;
}

/**
 * Generate keywords string from array
 */
export function generateKeywords(customKeywords: string[] = []): string {
  const allKeywords = [...new Set([...customKeywords, ...DEFAULT_KEYWORDS])];
  return allKeywords.join(", ");
}
