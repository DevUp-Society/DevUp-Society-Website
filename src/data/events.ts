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
        date: "2026-03-27",
        location: "VJIT Campus",
        mapEmbedLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18711.1396264906!2d78.33616666991054!3d17.39169720077843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb95a2780aa0eb%3A0xe5495572621379da!2sVidya%20Jyothi%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1706698654321!5m2!1sen!2sin",
        mode: "Offline",
        shortDescription: "An intense 36-hour hackathon challenging you to build future-ready solutions. Registration opens March 7th!",
        fullDescription: "Get ready for the ultimate coding challenge! DevUp Society presents 'Devthon', a 36-hour hackathon happening on March 27-28, 2026. This event calls upon developers, designers, and problem solvers to collaborate and build innovative solutions. Whether you are into AI, Blockchain, or App Dev, this is your platform to showcase your skills. Registration opens March 7th and closes March 25th. Don't miss out on this incredible opportunity with a massive prize pool of ₹1,50,000!",
        images: ["/events/devathon-teaser.jpg"],
        speakers: [],
        tags: ["Hackathon", "Devathon", "Innovation", "36HourChallenge", "Competition"],
        status: "upcoming",
        fee: 500,
        registrationLink: "/events/devthon-2026/register",
        isHackathon: true,
        stats: {
            participants: "400+",
            teams: "100+",
            prizePool: "₹1,50,000"
        },
        timeline: [
            { id: 1, title: "Registration Opens", date: "Mar 7, 2026", description: "Team Registration Begins - Don't Miss Out!" },
            { id: 2, title: "Registration Closes", date: "Mar 25, 2026", description: "Last Day to Register Your Team" },
            { id: 3, title: "Day 1 - Check-in", date: "Mar 27, 9:00 AM", description: "Participants check-in (E-Block)" },
            { id: 4, title: "Day 1 - Inauguration", date: "Mar 27, 10:00 AM", description: "Inaugural ceremony (E-Block auditorium)" },
            { id: 5, title: "Day 1 - Venue Shift", date: "Mar 27, 11:30 AM", description: "Proceed to venues" },
            { id: 6, title: "Day 1 - Theme Reveal", date: "Mar 27, 11:40 AM", description: "Theme reveal and idea selection" },
            { id: 7, title: "Day 1 - Hacking Begins", date: "Mar 27, 12:30 PM", description: "Hackathon Phase I & II, Lunch, Snacks & Tea" },
            { id: 8, title: "Day 1 - Mentors Check-in", date: "Mar 27, 7:00 PM", description: "Mentors arrive for guidance" },
            { id: 9, title: "Day 1 - Night Session", date: "Mar 27, 9:00 PM", description: "Dinner break & Hackathon Phase III (Night coding)" },
            { id: 10, title: "Day 2 - Fun Activities", date: "Mar 28, 12:00 AM", description: "Fun activities (Gaming, DJ Night) & Ice Breaking Session" },
            { id: 11, title: "Day 2 - Late Night Dev", date: "Mar 28, 3:00 AM", description: "Hackathon Phase IV (Late Night Development) & Breakfast" },
            { id: 12, title: "Day 2 - Final Dev", date: "Mar 28, 8:00 AM", description: "Final Development & Submission Preparation" },
            { id: 13, title: "Day 2 - Submissions", date: "Mar 28, 10:00 AM", description: "Code Freeze & Project Submission, Evaluation & Presentations" },
            { id: 14, title: "Day 2 - Break", date: "Mar 28, 1:00 PM", description: "Judges Deliberation & Participant Break" },
            { id: 15, title: "Day 2 - Valedictory", date: "Mar 28, 2:00 PM", description: "Valedictory & Prize Distribution, Feedback" }
        ],
        prizes: [
            { id: 1, type: "Gold", amount: "₹75,000", perks: ["Trophy", "Merch Kit", "Internship Referral", "Certificate"] },
            { id: 2, type: "Silver", amount: "₹50,000", perks: ["Trophy", "Merch Kit", "Certificate"] },
            { id: 3, type: "Bronze", amount: "₹25,000", perks: ["Trophy", "Swag Kit", "Certificate"] }
        ],
        themes: [
            { title: "Medical & Healthcare", description: "Innovate solutions for healthcare delivery, diagnostics, telemedicine, and patient care systems." },
            { title: "Agriculture", description: "Build tech for smart farming, crop monitoring, supply chain optimization, and farmer support." },
            { title: "Welfare & Social Impact", description: "Create solutions addressing poverty, education access, employment, and community welfare." },
            { title: "Women Safety", description: "Develop safety apps, alert systems, support networks, and empowerment platforms." },
            { title: "Open Innovation", description: "Build anything innovative that solves real-world problems—your vision, your way." },
            { title: "Everyday Problems", description: "Solve daily life challenges with simple, practical, and user-friendly solutions." },
            { title: "Simple AI-Assisted Apps", description: "Leverage AI for automation, recommendations, chatbots, and intelligent user experiences." },
            { title: "Student Utilities", description: "Tools for academic management, collaboration, learning resources, and campus life." },
            { title: "Business Automation", description: "Streamline workflows, billing, inventory, CRM, and enterprise operations with tech." },
            { title: "Travel & Tourism", description: "Enhance travel planning, local discovery, booking systems, and traveler experiences." },
            { title: "Transportation", description: "Innovate in logistics, public transit, ride-sharing, delivery systems, and mobility." },
            { title: "Emergency & Crisis Support", description: "Build systems for disaster response, emergency alerts, rescue coordination, and crisis management." }
        ],
        faqs: [
            { question: "Team Size?", answer: "2-4 Members. You can't participate alone." },
            { question: "Registration Fee?", answer: "₹500 per person. Includes food and swag." },
            { question: "When does registration open?", answer: "Registration opens on March 7, 2026 and closes on March 25, 2026." },
            { question: "How long is the hackathon?", answer: "36 hours - Starting March 27 at 12:30 PM and ending March 28 at 10:00 AM." }
        ]
    }
];

export const upcomingEvents = events.filter((event) => event.status === "upcoming");
export const pastEvents = events.filter((event) => event.status === "past");