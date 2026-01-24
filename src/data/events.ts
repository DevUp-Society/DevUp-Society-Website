export interface Speaker {
    name: string;
    designation: string;
    company?: string;
}

export interface Event {
    id: string;
    title: string;
    slug: string;
    date: string;
    location: string;
    mode: "Online" | "Offline" | "Hybrid";
    shortDescription: string;
    fullDescription: string;
    images: string[];
    speakers: Speaker[];
    tags: string[];
    status: "upcoming" | "past";
    registrationLink?: string;
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
        title: "Devathon 2026",
        slug: "devathon-2026",
        date: "2026-02-28",
        location: "VJIT Campus",
        mode: "Offline",
        shortDescription: "An intense 24-hour hackathon challenging you to build future-ready solutions.",
        fullDescription: "Get ready for the ultimate coding challenge! DevUp Society presents 'Devathon', a 24-hour hackathon scheduled for the last week of February 2026. This event calls upon developers, designers, and problem solvers to collaborate and build innovative solutions overnight. Whether you are into AI, Blockchain, or App Dev, this is your platform to showcase your skills. Stay tuned for track announcements and registration details.",
        images: ["/events/devathon-teaser.jpg"],
        speakers: [],
        tags: ["Hackathon", "Devathon", "Innovation", "24HourChallenge", "Competition"],
        status: "upcoming",
        registrationLink: "#",
    }
];

export const upcomingEvents = events.filter((event) => event.status === "upcoming");
export const pastEvents = events.filter((event) => event.status === "past");