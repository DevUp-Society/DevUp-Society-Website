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
        date: "2026-04-14",
        location: "T-HUB, Hyderabad",
        mapEmbedLink: "https://www.google.com/maps?q=T-Hub,+Hyderabad&output=embed",
        mode: "Offline",
        shortDescription: "Pitch Quest starts online and is completely free. Shortlisted innovators move to the paid Founders Meet main event on 14 April 2026 at T-HUB, Hyderabad.",
        fullDescription: "DevUp Society presents a two-stage founder journey. Stage 1 is Pitch Quest, an online and completely free screening round. Pitch Quest registrations close on 11 April, and the pitching phase runs online on 11-12 April. On 13 April, shortlisted innovators are announced and Founders Meet registrations open for shortlisted participants. Stage 2 is the Founders Meet main event on 14 April 2026 at T-HUB, Hyderabad, where selected innovators get to network, validate ideas, and connect with mentors and startup ecosystem leaders.",
        images: ["https://res.cloudinary.com/dmrp1d1tv/image/upload/q_auto/f_auto/v1775653200/Founders_Meet_Poster_1_epf1vt.png"],
        speakers: [],
        tags: ["FoundersMeet", "Startup", "Networking", "Mentorship", "Innovation"],
        status: "upcoming",
        fee: 1000,
        seatsLeft: 100,
        registrationLink: "/events/founders-meet-2026/register",
        timeline: [
            { id: 1, title: "Pitch Quest Registrations Close", date: "Apr 11", description: "Last date to submit for the free online Pitch Quest round." },
            { id: 2, title: "Pitching Phase (Online)", date: "Apr 11-12", description: "Shortlisted applications pitch online before the main event selection." },
            { id: 3, title: "Shortlisted Innovators Declared", date: "Apr 13", description: "Results are announced for candidates moving to Founders Meet." },
            { id: 4, title: "Founders Meet Registrations Open", date: "Apr 13", description: "Only shortlisted innovators can register for the T-HUB main event." },
            { id: 5, title: "Founders Meet Main Event", date: "Apr 14", description: "In-person main event at T-HUB, Hyderabad." }
        ],
        faqs: [
            { question: "Is Pitch Quest free?", answer: "Yes. The online Pitch Quest round is completely free." },
            { question: "When does Pitch Quest registration close?", answer: "Pitch Quest registrations close on 11 April." },
            { question: "When is the pitching phase?", answer: "Pitching happens online on 11-12 April." },
            { question: "When are shortlisted innovators announced?", answer: "Shortlisted innovators are declared on 13 April." },
            { question: "Who can register for Founders Meet at T-HUB?", answer: "Founders Meet registrations open on 13 April for shortlisted innovators." },
            { question: "Is Founders Meet paid?", answer: "Yes. Founders Meet at T-HUB is a paid stage for shortlisted participants." },
            { question: "When is the main event?", answer: "Founders Meet main event is on 14 April at T-HUB, Hyderabad." }
        ]
    }
];

export const upcomingEvents = events.filter((event) => event.status === "upcoming");
export const pastEvents = events.filter((event) => event.status === "past");