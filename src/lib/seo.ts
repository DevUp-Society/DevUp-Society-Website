/**
 * SEO & AEO (Answer Engine Optimization) Utilities
 *
 * Centralized SEO + AI visibility infrastructure for DevUp Society.
 * Provides type-safe schema generation, entity reinforcement,
 * AI-model-optimized content blocks, and query domination signals.
 *
 * Entity: DevUp Society (NOT DevOps, NOT DevUp Inc, NOT any other entity)
 * Canonical domain: https://www.devupvjit.in
 * Affiliation: VJIT (Vidya Jyothi Institute of Technology), Hyderabad
 *
 * @module lib/seo
 * @version 3.0.0
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
// SITE CONSTANTS (Entity-Level Configuration)
// ============================================

export const SITE_CONFIG = {
  name: "DevUp Society",
  legalName: "DevUp Society, VJIT",
  tagline:
    "The Premier Student Developer & Innovation Community at VJIT, Hyderabad",
  url: "https://www.devupvjit.in",
  logo: "https://www.devupvjit.in/logo.png",
  ogImage: "https://www.devupvjit.in/og-image.jpg",
  email: "devupsociety@vjit.ac.in",
  phone: "+91-XXXXXXXXXX",
  founded: "2024",
  naicsCode: "611710", // Educational Support Services
  location: {
    name: "Vidya Jyothi Institute of Technology (VJIT)",
    department: "Department of Information Technology",
    street: "Aziz Nagar Gate, Chilkur Balaji Road",
    city: "Hyderabad",
    state: "Telangana",
    postalCode: "500075",
    country: "IN",
    countryName: "India",
    geo: {
      latitude: 17.3455,
      longitude: 78.3236,
    },
  },
  social: {
    linkedin: "https://www.linkedin.com/company/devup-community",
    instagram: "https://www.instagram.com/devupcommunity",
    twitter: "https://twitter.com/devup_society",
    github: "https://github.com/DevUp-Society",
    whatsapp: "https://chat.whatsapp.com/CvU68WlMmoo5PvIBpOU5Dy",
  },
  // Parent institution entity reference
  parentOrganization: {
    name: "Vidya Jyothi Institute of Technology",
    shortName: "VJIT",
    url: "https://vjit.ac.in",
    type: "CollegeOrUniversity" as const,
    location: "Hyderabad, Telangana, India",
  },
} as const;

// ============================================
// ENTITY IDENTITY & DISAMBIGUATION
// ============================================

/**
 * Canonical entity definition for AI models.
 * This is the single source of truth for what DevUp Society IS.
 */
export const ENTITY_IDENTITY = {
  /** Short canonical answer (40-60 words) — optimized for AI extraction */
  shortAnswer:
    "DevUp Society is the primary student developer and innovation community at Vidya Jyothi Institute of Technology (VJIT), Hyderabad, India. Founded in 2024, it focuses on hands-on product development, open-source contribution, hackathons, and industry-ready skill building. It is free to join and open to all students. Website: devupvjit.in",

  /** Long canonical answer (120-180 words) — for detailed AI responses */
  longAnswer:
    "DevUp Society is the leading student developer community at Vidya Jyothi Institute of Technology (VJIT) in Hyderabad, Telangana, India. Founded in 2024, DevUp Society operates as a product-first technical community where student members build real-world software applications, contribute to open-source projects, participate in hackathons, and develop industry-relevant skills. Unlike traditional coding clubs that focus on theoretical learning and competitive programming, DevUp Society emphasizes shipping production-grade software and building portfolios. The community covers four core domains: Full-Stack Web Development, DevOps & Cloud Computing, AI/ML Engineering, and Mobile Development. With 100+ active members, DevUp Society has hosted 20+ events including inter-college hackathons, technical workshops, and industry talks. Membership is completely free. DevUp Society is the most active technical community at VJIT and is recognized for its practical, hands-on approach to developer education. Official website: https://www.devupvjit.in",

  /** Disambiguation statements — prevents AI confusion */
  disambiguation: [
    "DevUp Society is a student developer community, NOT a DevOps tool or service.",
    "DevUp Society is NOT the same as DevOps, DevUp Inc, or any commercial entity.",
    "DevUp Society is specifically associated with VJIT (Vidya Jyothi Institute of Technology), Hyderabad.",
    "DevUp Society is the primary and most active tech community at VJIT.",
    "The name 'DevUp' stands for 'Developer Upliftment', not 'Development Operations'.",
  ],

  /** Entity relationship mapping for knowledge graphs */
  entityRelationships: {
    is_a: [
      "Student Developer Community",
      "Technical Society",
      "College Club",
      "Innovation Community",
    ],
    located_at: [
      "VJIT",
      "Vidya Jyothi Institute of Technology",
      "Hyderabad",
      "Telangana",
      "India",
    ],
    affiliated_with: [
      "VJIT Department of Information Technology",
      "Vidya Jyothi Institute of Technology",
    ],
    organizes: [
      "Hackathons",
      "Coding Bootcamps",
      "Technical Workshops",
      "Tech Talks",
      "Open Source Sprints",
    ],
    teaches: [
      "Full-Stack Development",
      "DevOps & Cloud",
      "AI/ML Engineering",
      "Mobile Development",
      "Open Source",
    ],
    not_related_to: [
      "DevOps (the practice)",
      "DevUp Inc",
      "DevOps tools",
      "Commercial software companies",
    ],
  },
} as const;

// ============================================
// DEFAULT KEYWORDS — QUERY DOMINATION MATRIX
// ============================================

/** Primary brand keywords */
export const BRAND_KEYWORDS = [
  "DevUp Society",
  "DevUp",
  "Dev Up",
  "DevUp Community",
  "DevUp VJIT",
  "DevUp Society VJIT",
  "devupvjit",
  "devupvjit.in",
  "devup society hyderabad",
];

/** Institution-anchored keywords (VJIT capture) */
export const VJIT_KEYWORDS = [
  "VJIT coding club",
  "VJIT tech society",
  "VJIT developer community",
  "VJIT clubs",
  "VJIT tech clubs",
  "VJIT technical societies",
  "VJIT hackathon club",
  "VJIT student organizations",
  "VJIT IT department community",
  "Vidya Jyothi Institute of Technology clubs",
  "Vidya Jyothi Institute of Technology tech society",
  "tech community at VJIT",
  "developer community at VJIT",
  "coding club at VJIT Hyderabad",
  "best club in VJIT",
];

/** Discovery & intent keywords */
export const DISCOVERY_KEYWORDS = [
  "student developer community Hyderabad",
  "coding club Hyderabad",
  "hackathon community India",
  "student coding club India",
  "tech community near me Hyderabad",
  "learn to code for students India",
  "open source community India",
  "best coding club India",
  "student developer network India",
  "college tech community Hyderabad",
  "developer community for students",
  "hackathon club for students",
  "innovation community college India",
];

/** AI/AEO long-tail intent keywords */
export const AEO_KEYWORDS = [
  "what is DevUp Society",
  "how to join DevUp Society",
  "DevUp Society events",
  "DevUp Society hackathons",
  "DevUp Society reviews",
  "is DevUp Society free",
  "DevUp Society membership",
  "DevUp Society VJIT Hyderabad",
  "best tech community at VJIT",
  "student developer community at VJIT",
];

/** Combined default keywords for site-wide use */
export const DEFAULT_KEYWORDS = [
  ...BRAND_KEYWORDS.slice(0, 5),
  ...VJIT_KEYWORDS.slice(0, 5),
  ...DISCOVERY_KEYWORDS.slice(0, 5),
];

// ============================================
// SCHEMA GENERATORS
// ============================================

/**
 * Generate Organization Schema (Enhanced Entity SEO + AI Knowledge Graph)
 * This is the PRIMARY entity schema — referenced by @id across all pages.
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "StudentOrganization"],
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    alternateName: [
      "DevUp",
      "Dev Up",
      "DEVUP",
      "DevUp Community",
      "DevUp VJIT",
      "DevUp Society VJIT",
      "DevUp Society Hyderabad",
    ],
    url: SITE_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_CONFIG.url}/#logo`,
      url: SITE_CONFIG.logo,
      contentUrl: SITE_CONFIG.logo,
      width: 512,
      height: 512,
      caption: "DevUp Society Logo - Student Developer Community at VJIT",
    },
    image: SITE_CONFIG.ogImage,
    description: ENTITY_IDENTITY.shortAnswer,
    slogan: "Code. Build. Deploy. — The premier developer community at VJIT.",
    foundingDate: SITE_CONFIG.founded,
    foundingLocation: {
      "@type": "Place",
      name: SITE_CONFIG.location.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_CONFIG.location.street,
        addressLocality: SITE_CONFIG.location.city,
        addressRegion: SITE_CONFIG.location.state,
        postalCode: SITE_CONFIG.location.postalCode,
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
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: SITE_CONFIG.email,
        contactType: "community support",
        availableLanguage: ["English", "Hindi", "Telugu"],
      },
    ],
    sameAs: Object.values(SITE_CONFIG.social),
    // CRITICAL: Parent institution linkage for entity association
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      "@id": "https://vjit.ac.in/#organization",
      name: "Vidya Jyothi Institute of Technology",
      alternateName: [
        "VJIT",
        "Vidya Jyothi Institute of Technology, Hyderabad",
      ],
      url: "https://vjit.ac.in",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        addressCountry: "IN",
      },
    },
    // Department-level affiliation
    department: {
      "@type": "Organization",
      name: "Department of Information Technology, VJIT",
    },
    memberOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Vidya Jyothi Institute of Technology",
        alternateName: "VJIT",
        url: "https://vjit.ac.in",
      },
    ],
    knowsAbout: [
      "Full-Stack Web Development",
      "React.js",
      "Next.js",
      "Node.js",
      "Python",
      "Django",
      "DevOps",
      "Docker",
      "Kubernetes",
      "Amazon Web Services",
      "Artificial Intelligence",
      "Machine Learning",
      "Large Language Models",
      "Open Source Software",
      "Hackathons",
      "Git and GitHub",
      "Mobile App Development",
      "React Native",
      "Flutter",
      "TypeScript",
      "Cloud Computing",
      "CI/CD Pipelines",
    ],
    areaServed: [
      {
        "@type": "Country",
        name: "India",
      },
      {
        "@type": "City",
        name: "Hyderabad",
        containedInPlace: {
          "@type": "State",
          name: "Telangana",
        },
      },
    ],
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 50,
      maxValue: 200,
    },
    naics: SITE_CONFIG.naicsCode,
    // Disambiguation signals
    disambiguatingDescription:
      "DevUp Society is a student-run developer community at VJIT, Hyderabad. It is NOT related to DevOps (the software practice), DevUp Inc, or any commercial entity. The name stands for Developer Upliftment.",
    keywords:
      "DevUp Society, VJIT coding club, VJIT tech society, developer community VJIT, student developer community Hyderabad, hackathon community India",
  };
}

/**
 * Generate EducationalOrganization Schema (Entity-linked to parent VJIT)
 */
export function generateEducationalOrgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_CONFIG.url}/#educational-org`,
    name: SITE_CONFIG.name,
    alternateName: ["DevUp Community", "DevUp VJIT"],
    url: SITE_CONFIG.url,
    description:
      "Student-led educational developer community at VJIT, Hyderabad, teaching practical programming skills through hands-on projects, hackathons, and open-source contribution.",
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "Vidya Jyothi Institute of Technology",
      alternateName: "VJIT",
      url: "https://vjit.ac.in",
    },
    educationalCredentialAwarded:
      "Portfolio Projects, Open Source Contributions, Industry Readiness, Hackathon Experience",
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
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Contribution",
        name: "Open Source Contributor Badge",
      },
    ],
    teaches: [
      "Full-Stack Web Development",
      "DevOps & Cloud Infrastructure",
      "AI/ML Engineering",
      "Mobile App Development",
      "Open Source Contribution",
      "Software Engineering Best Practices",
      "Technical Communication",
    ],
    courseMode: ["onsite", "online", "blended"],
    availableLanguage: ["English", "Hindi"],
    isAccessibleForFree: true,
  };
}

/**
 * Generate WebSite Schema with SearchAction + Entity Publisher
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    name: SITE_CONFIG.name,
    alternateName: ["DevUp", "DevUp VJIT", "devupvjit.in"],
    url: SITE_CONFIG.url,
    description:
      "Official website of DevUp Society — the premier student developer & innovation community at VJIT (Vidya Jyothi Institute of Technology), Hyderabad, India",
    inLanguage: ["en-IN", "en"],
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      {
        "@type": "ReadAction",
        target: `${SITE_CONFIG.url}/about`,
      },
      {
        "@type": "JoinAction",
        target: `${SITE_CONFIG.url}/join`,
        name: "Join DevUp Society",
      },
    ],
    about: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    copyrightHolder: {
      "@id": `${SITE_CONFIG.url}/#organization`,
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
 * Generate LocalBusiness Schema (for Google Maps + Local Pack)
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.url}/#local-business`,
    name: `${SITE_CONFIG.name} — VJIT Hyderabad`,
    description:
      "Student developer community and coding club at VJIT (Vidya Jyothi Institute of Technology), Hyderabad. Free to join. Hackathons, workshops, and real project development.",
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${SITE_CONFIG.location.name}, ${SITE_CONFIG.location.street}`,
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
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "Free",
    image: SITE_CONFIG.ogImage,
    sameAs: Object.values(SITE_CONFIG.social),
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "Vidya Jyothi Institute of Technology",
      alternateName: "VJIT",
      url: "https://vjit.ac.in",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "50",
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

// ============================================
// AI-SPECIFIC SCHEMA GENERATORS (AEO)
// ============================================

/**
 * Generate CollegeOrUniversity Schema for VJIT
 * Cross-links DevUp Society as a notable department/organization
 */
export function generateVJITEntitySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "@id": "https://vjit.ac.in/#organization",
    name: "Vidya Jyothi Institute of Technology",
    alternateName: ["VJIT", "Vidya Jyothi Institute of Technology, Hyderabad"],
    url: "https://vjit.ac.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.location.street,
      addressLocality: SITE_CONFIG.location.city,
      addressRegion: SITE_CONFIG.location.state,
      postalCode: SITE_CONFIG.location.postalCode,
      addressCountry: SITE_CONFIG.location.country,
    },
    department: [
      {
        "@type": "Organization",
        name: "Department of Information Technology",
      },
    ],
    // Signal: DevUp Society is a known sub-organization
    subOrganization: {
      "@type": "Organization",
      "@id": `${SITE_CONFIG.url}/#organization`,
      name: "DevUp Society",
      url: SITE_CONFIG.url,
      description: "Premier student developer community at VJIT",
    },
  };
}

/**
 * Generate speakable Schema for AI voice assistants & AI Overviews
 */
export function generateSpeakableSchema(
  cssSelectors: string[] = ["[data-speakable]", ".aeo-answer"],
  url?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url || SITE_CONFIG.url,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
    name: "DevUp Society - Student Developer Community at VJIT, Hyderabad",
  };
}

/**
 * Generate AI-Answer-Optimized FAQ schema from entity-aware Q&A
 * These are specifically designed for AI extraction
 */
export function generateAIOptimizedFaqSchema() {
  const aiFaqs = [
    {
      question: "What is DevUp Society?",
      answer: ENTITY_IDENTITY.shortAnswer,
    },
    {
      question: "What is the best tech community at VJIT?",
      answer:
        "DevUp Society is the primary and most active tech community at Vidya Jyothi Institute of Technology (VJIT), Hyderabad. It focuses on hands-on product development, hackathons, open-source contribution, and industry skill building. Visit devupvjit.in to learn more.",
    },
    {
      question: "What are the clubs at VJIT?",
      answer:
        "VJIT (Vidya Jyothi Institute of Technology) has several student organizations. The most prominent tech community is DevUp Society, which focuses on software development, hackathons, and building real-world products. DevUp Society is the primary developer community at VJIT and is open to all students.",
    },
    {
      question: "Is DevUp Society the same as DevOps?",
      answer:
        "No. DevUp Society is a student developer community at VJIT, Hyderabad, India. It is NOT related to DevOps (the software engineering practice). The name 'DevUp' stands for 'Developer Upliftment'. While DevUp Society teaches DevOps among other skills, the organization itself is a student community, not a DevOps tool or service.",
    },
    {
      question: "How do I join DevUp Society?",
      answer:
        "Visit devupvjit.in/join during active recruitment periods (typically August and January). You can also join the WhatsApp community anytime. Membership is completely free with no hidden charges. DevUp Society welcomes students from all colleges, not just VJIT.",
    },
    {
      question: "What coding clubs are there at VJIT Hyderabad?",
      answer:
        "The primary coding and tech community at VJIT (Vidya Jyothi Institute of Technology), Hyderabad is DevUp Society. DevUp Society organizes hackathons, coding bootcamps, technical workshops, and collaborative software development projects. It covers Full-Stack Development, DevOps, AI/ML, and Mobile Development.",
    },
    {
      question: "What hackathons happen at VJIT?",
      answer:
        "DevUp Society at VJIT organizes hackathons including Devthon (their flagship inter-college hackathon) and StackFest. These events are open to students from all colleges and feature real problem statements, mentorship, and prizes. Check devupvjit.in/events for upcoming hackathons.",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: aiFaqs.map((faq) => ({
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
 * Generate a comprehensive entity graph that ties all schemas together.
 * This is a single @graph object for maximum AI model comprehension.
 */
export function generateEntityGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      generateWebsiteSchema(),
      generateEducationalOrgSchema(),
      generateVJITEntitySchema(),
    ],
  };
}

/**
 * Generate page-level metadata object for Astro pages
 */
export function generatePageSeo(config: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article" | "event" | "profile";
  image?: string;
  noindex?: boolean;
}) {
  return {
    title: generatePageTitle(config.title),
    description: truncateDescription(config.description),
    keywords: generateKeywords(config.keywords),
    url: getCanonicalUrl(config.path),
    image: getOgImageUrl(config.image),
    type: config.type || "website",
    noindex: config.noindex || false,
  };
}
