export interface Speaker {
    name: string;
    designation: string;
    company?: string;
}

// Rich Event Details Interfaces
export interface TimelineItem {
    id: number;
    title: string;
    date: string;
    description: string;
}

export interface PrizeItem {
    id: number;
    type: "Gold" | "Silver" | "Bronze" | "Consolation";
    amount: string;
    perks: string[];
}

export interface ThemeItem {
    title: string;
    description: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface EventStats {
    participants: string;
    teams: string;
    prizePool: string;
}

export interface Event {
    id: string;
    title: string;
    slug: string;
    date: string; // ISO Date YYYY-MM-DD
    location: string;
    mapEmbedLink?: string; // For Venue Map
    mode: "Online" | "Offline" | "Hybrid";
    shortDescription: string;
    fullDescription: string;
    images: string[];
    speakers: Speaker[];
    tags: string[];
    status: "upcoming" | "past";
    registrationLink?: string;

    // Feature Flags & Extended Data
    isHackathon?: boolean;
    stats?: EventStats;
    timeline?: TimelineItem[];
    prizes?: PrizeItem[];
    themes?: ThemeItem[];
    faqs?: FAQItem[];
    fee?: number; // Fee per person in INR
    seatsLeft?: number;
}

export const events: Event[] = [
    {
        id: "evt-001",
        title: "DevUp Society Inauguration & StackFest 2025",
        slug: "devup-inauguration-stackfest-2025",
        date: "2025-10-15",
        location: "Vidya Jyothi Institute Of Technology (VJIT)",
        mode: "Offline",
        shortDescription: "A proud beginning: The official launch of DevUp Society followed by a tech-packed StackFest.",
        fullDescription: "We officially launched the DevUp Society at VJIT—a student-led tech community built to learn, grow, and innovate together. The morning began with the inauguration attended by over 300+ students and graced by our Chief Guest, Dr. Dinesh Chandrasekar (DC), whose words on innovation and passion set the tone for the day. The afternoon transitioned into DevUp StackFest 2025, where participants explored trending domains like AI, Web Development, App Development, and Blockchain, gaining hands-on insights and wrapping up with exclusive swags and tech cheat sheets.",
        images: [
            "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769254834/stack-fest-1_uommxj.jpg",
            "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769254835/stack-fest-3_tcaqai.jpg",
            "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769254835/stack-fest-2_s9ejtn.jpg",
            "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769254835/stack-fest-5_kr3gu9.jpg",
            "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769254835/stack-fest-4_h2rpap.jpg"
        ],
        speakers: [
            {
                name: "Dr. Dinesh Chandrasekar (DC)",
                designation: "Chief Guest",
                company: "Innovation Strategist",
            },
            {
                name: "Dr. Avuku Obulesh",
                designation: "HOD - IT Department",
                company: "VJIT",
            }
        ],
        tags: ["Inauguration", "DevUpStackFest2025", "AI", "WebDevelopment", "Blockchain", "StudentCommunity"],
        status: "past",
    },
    {
        id: "evt-002",
        title: "Founders Meet 2026",
        slug: "founders-meet-2026",
        date: "2026-04-11",
        location: "T-HUB, Hyderabad",
        mapEmbedLink: "https://www.google.com/maps?q=T-Hub,+Hyderabad&output=embed",
        mode: "Offline",
        shortDescription: "A high-energy founder networking and idea-validation meetup on 11 April 2026 at T-HUB. Only 100 seats left. Fee: ₹1000 per seat.",
        fullDescription: "DevUp Society presents Founders Meet 2026 on 11 April 2026 at T-HUB, Hyderabad. This focused meetup is designed for founders, aspiring entrepreneurs, builders, and students who want to discuss startup ideas, validate concepts, and connect with mentors and investors. You will get practical conversations around execution, market fit, and building with speed. Seats are limited and filling fast. Only 100 seats are left, and the participation fee is ₹1000 per seat.",
        images: ["/Founders-Meet.svg"],
        speakers: [],
        tags: ["FoundersMeet", "Startup", "Networking", "Mentorship", "Innovation"],
        status: "upcoming",
        fee: 1000,
        seatsLeft: 100,
        registrationLink: "/events/founders-meet-2026/register",
        timeline: [
            { id: 1, title: "Check-in & Networking", date: "Apr 11, 9:30 AM", description: "Entry, registration desk support, and founder networking kickoff." },
            { id: 2, title: "Opening Keynote", date: "Apr 11, 10:30 AM", description: "Opening session on startup execution and founder mindset." },
            { id: 3, title: "Founder Discussions", date: "Apr 11, 11:30 AM", description: "Focused discussions on validation, traction, and growth strategies." },
            { id: 4, title: "Mentor Connect", date: "Apr 11, 1:00 PM", description: "Meet mentors for practical feedback on ideas and next steps." },
            { id: 5, title: "Investor Interaction", date: "Apr 11, 2:30 PM", description: "Interactive session with investors and ecosystem enablers." }
        ],
        faqs: [
            { question: "What is the registration fee?", answer: "The registration fee is ₹1000 per seat." },
            { question: "How many seats are currently available?", answer: "Only 100 seats are left at the moment." },
            { question: "Where is the event happening?", answer: "The event will be held at T-HUB, Hyderabad." },
            { question: "When is Founders Meet 2026?", answer: "Founders Meet 2026 is scheduled for 11 April 2026." }
        ]
    }
];

export const upcomingEvents = events.filter((event) => event.status === "upcoming");
export const pastEvents = events.filter((event) => event.status === "past");