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
        shortDescription: "Founders Meet 2026 is a high-impact startup networking and founder showcase event at T-HUB on 18 April 2026. Registration is free, followed by interviews and screening.",
        fullDescription: "DevUp Society presents Founders Meet 2026 at T-HUB, Hyderabad. Everyone can register for free. All registered participants are guided through WhatsApp updates and interview-based screening. Selected participants then complete payment and final confirmation before the main event on 18 April 2026, featuring founder interactions, networking, and high-visibility sessions.",
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
            { question: "Is registration free for everyone?", answer: "Yes. Initial registration is free for all participants." },
            { question: "What happens after registration?", answer: "Registered participants are added to the official WhatsApp updates channel and moved into interview and screening rounds." },
            { question: "When is payment required?", answer: "Only selected participants are asked to complete payment after screening." },
            { question: "How are participants selected?", answer: "Selections are made through interviews and profile screening by the event team." },
            { question: "How do I register?", answer: "Use the Register button on the event page and submit your details." },
            { question: "Who should I contact for support?", answer: "For support, contact devupsociety@vjit.ac.in." }
        ]
    }
];

export const upcomingEvents = events.filter((event) => event.status === "upcoming");
export const pastEvents = events.filter((event) => event.status === "past");