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
        date: "2026-04-18",
        location: "T-HUB, Hyderabad",
        mapEmbedLink: "https://www.google.com/maps?q=T-Hub,+Hyderabad&output=embed",
        mode: "Offline",
        shortDescription: "Founders Meet 2026 is a high-impact startup networking and founder showcase event at T-HUB on 18 April 2026, with quick registration and curated application flows.",
        fullDescription: "DevUp Society presents Founders Meet 2026 at T-HUB, Hyderabad. The timeline begins with registration closure on 14 April, online pitching from 14-16 April, shortlist declaration on 16 April, and founders meet registrations from 16-17 April. The main event is on 18 April 2026, featuring founder interactions, networking opportunities, and high-visibility sessions.",
        images: ["https://res.cloudinary.com/dmrp1d1tv/image/upload/q_auto/f_auto/v1775898652/Founders_Meet_Poster_lxwujw.png"],
        speakers: [],
        tags: ["FoundersMeet", "Startup", "Networking", "Mentorship", "Innovation"],
        status: "upcoming",
        fee: 1000,
        seatsLeft: 100,
        registrationLink: "/events/founders-meet-2026/register",
        timeline: [
            { id: 1, title: "Registration Closes", date: "Apr 14", description: "Final date for registration submissions." },
            { id: 2, title: "Online Pitching Phase", date: "Apr 14-16", description: "Selected participants take part in online pitching rounds." },
            { id: 3, title: "Shortlisted Innovators Declared", date: "Apr 16", description: "Official shortlist announcement for next-stage participants." },
            { id: 4, title: "Founders Meet Registration Window", date: "Apr 16-17", description: "Shortlisted participants complete founders meet registration." },
            { id: 5, title: "Founders Meet Main Event @ T-HUB", date: "Apr 18", description: "In-person flagship founders meet at T-HUB, Hyderabad." }
        ],
        faqs: [
            { question: "What is the event date and venue?", answer: "Founders Meet 2026 main event is on 18 April 2026 at T-HUB, Hyderabad." },
            { question: "What are the available passes?", answer: "Two passes are available: Normal Pass (INR 999) and Premium Pass (INR 1299)." },
            { question: "What does the Normal Pass include?", answer: "Normal Pass includes event access, networking opportunities, and general participation." },
            { question: "What does the Premium Pass include?", answer: "Premium Pass includes all Normal Pass benefits, 5 to 10 minutes stage speaking opportunity, direct interaction with founders and senior professionals, and higher visibility." },
            { question: "Is there an application or approval process?", answer: "Yes. Curated entries can use the application and approval flow where details are reviewed before proceeding." },
            { question: "How can I register quickly?", answer: "Use Quick Registration on the event page and choose your pass to register directly." },
            { question: "Who should I contact for support?", answer: "For support, contact devupsociety@vjit.ac.in." }
        ]
    }
];

export const upcomingEvents = events.filter((event) => event.status === "upcoming");
export const pastEvents = events.filter((event) => event.status === "past");