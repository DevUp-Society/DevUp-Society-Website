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
        title: "Devthon 2026",
        slug: "devthon-2026",
        date: "2026-02-27",
        location: "VJIT Campus",
        mapEmbedLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18711.1396264906!2d78.33616666991054!3d17.39169720077843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb95a2780aa0eb%3A0xe5495572621379da!2sVidya%20Jyothi%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1706698654321!5m2!1sen!2sin",
        mode: "Offline",
        shortDescription: "An intense 24-hour hackathon challenging you to build future-ready solutions.",
        fullDescription: "Get ready for the ultimate coding challenge! DevUp Society presents 'Devthon', a 24-hour hackathon scheduled for the last week of February 2026. This event calls upon developers, designers, and problem solvers to collaborate and build innovative solutions overnight. Whether you are into AI, Blockchain, or App Dev, this is your platform to showcase your skills. Stay tuned for track announcements and registration details.",
        images: ["/events/devathon-teaser.jpg"],
        speakers: [],
        tags: ["Hackathon", "Devathon", "Innovation", "24HourChallenge", "Competition"],
        status: "upcoming",
        fee: 150,
        registrationLink: "/events/devthon-2026/register",
        isHackathon: true,
        stats: {
            participants: "400+",
            teams: "100+",
            prizePool: "₹35K+"
        },
        timeline: [
            { id: 1, title: "Registration Open", date: "Nov 20", description: "Team Registration Begins" },
            { id: 2, title: "Problem Statements", date: "Feb 14", description: "Tracks Announced" },
            { id: 3, title: "Devthon Kickoff", date: "Feb 27, 10:00 AM", description: "Opening Ceremony" },
            { id: 4, title: "Hacking Ends", date: "Feb 28, 10:00 AM", description: "Submission Deadline" },
            { id: 5, title: "Results", date: "Feb 28, 02:00 PM", description: "Closing Ceremony & Prizes" }
        ],
        prizes: [
            { id: 1, type: "Gold", amount: "₹15,000", perks: ["Trophy", "Merch Kit", "Internship Refferal"] },
            { id: 2, type: "Silver", amount: "₹10,000", perks: ["Trophy", "Merch Kit"] },
            { id: 3, type: "Bronze", amount: "₹5,000", perks: ["Trophy", "Swag"] }
        ],
        themes: [
            { title: "Smart City", description: "Solutions for urban challenges." },
            { title: "HealthTech", description: "Innovating healthcare with AI." },
            { title: "EdTech", description: "Revolutionizing learning." },
            { title: "Open Innovation", description: "Build what you believe in." }
        ],
        faqs: [
            { question: "Team Size?", answer: "2-4 Members. You can't participate alone." },
            { question: "Registration Fee?", answer: "₹150 per person. Includes food and swag." },
            { question: "Who can participate?", answer: "Exclusively for 1st Year VJIT Students." },
            { question: "Do I need to code?", answer: "No code solutions are welcome, but prototypes win." }
        ]
    }
];

export const upcomingEvents = events.filter((event) => event.status === "upcoming");
export const pastEvents = events.filter((event) => event.status === "past");