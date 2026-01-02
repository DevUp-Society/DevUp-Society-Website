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
    title: "Web3 and Blockchain Fundamentals",
    slug: "web3-blockchain-fundamentals",
    date: "2026-02-10",
    location: "Main Auditorium, CSE Block",
    mode: "Offline",
    shortDescription: "Explore the world of decentralized applications and smart contracts with industry experts.",
    fullDescription: "Join us for an immersive workshop on Web3 and Blockchain technology. This session will cover the fundamentals of blockchain, smart contracts, DeFi, NFTs, and how to get started with Ethereum development. Perfect for beginners and intermediate developers looking to enter the Web3 space. Participants will get hands-on experience building their first smart contract.",
    images: ["/events/web3-workshop.jpg", "/events/web3-lab.jpg"],
    speakers: [
      {
        name: "Rohan Mehta",
        designation: "Blockchain Developer",
        company: "Polygon Labs",
      },
      {
        name: "Priya Sharma",
        designation: "Smart Contract Engineer",
        company: "Ethereum Foundation",
      },
    ],
    tags: ["Blockchain", "Web3", "Smart Contracts", "Workshop"],
    status: "upcoming",
    registrationLink: "https://forms.gle/example1",
  },
  {
    id: "evt-002",
    title: "DevUp Hackathon 2026",
    slug: "devup-hackathon-2026",
    date: "2026-03-15",
    location: "Innovation Hub",
    mode: "Hybrid",
    shortDescription: "36-hour hackathon to build innovative solutions for real-world problems.",
    fullDescription: "DevUp Hackathon is back with exciting themes including AI/ML, Healthcare Tech, Sustainability, and Social Impact. Teams of 2-4 members will compete for prizes worth ₹2 lakhs, internship opportunities, and mentorship from industry leaders. The event features workshops, mentoring sessions, and networking opportunities with tech professionals and investors. Whether you're a beginner or experienced developer, this is your chance to build, learn, and win.",
    images: ["/events/hackathon-main.jpg", "/events/hackathon-team.jpg"],
    speakers: [
      {
        name: "Amit Kumar",
        designation: "Engineering Manager",
        company: "Google",
      },
      {
        name: "Sarah Chen",
        designation: "Product Lead",
        company: "Microsoft",
      },
      {
        name: "Vikram Singh",
        designation: "CTO",
        company: "TechStartup Inc",
      },
    ],
    tags: ["Hackathon", "Competition", "Innovation", "Prizes"],
    status: "upcoming",
    registrationLink: "https://forms.gle/example2",
  },
  {
    id: "evt-003",
    title: "Git & GitHub Masterclass",
    slug: "git-github-masterclass",
    date: "2025-12-05",
    location: "Online (Google Meet)",
    mode: "Online",
    shortDescription: "Master version control and collaborative coding with Git and GitHub.",
    fullDescription: "A comprehensive workshop covering everything from basic Git commands to advanced workflows including branching strategies, pull requests, resolving merge conflicts, and GitHub Actions for CI/CD. This session is designed for students who want to contribute to open source projects and work effectively in team environments. We covered practical examples and real-world scenarios.",
    images: ["/events/git-workshop.jpg"],
    speakers: [
      {
        name: "Arjun Patel",
        designation: "Senior Software Engineer",
        company: "GitHub",
      },
    ],
    tags: ["Git", "GitHub", "Version Control", "Open Source"],
    status: "past",
  },
  {
    id: "evt-004",
    title: "AI/ML Bootcamp Day 1: Introduction to Machine Learning",
    slug: "aiml-bootcamp-day1",
    date: "2025-11-18",
    location: "Lab 204, IT Block",
    mode: "Offline",
    shortDescription: "Kickstart your machine learning journey with hands-on Python exercises.",
    fullDescription: "The first day of our 3-day AI/ML bootcamp introduced students to the fundamentals of machine learning, covering supervised and unsupervised learning, data preprocessing, and building your first ML model using scikit-learn. Participants worked on a real dataset and built a predictive model from scratch. The session included practical coding exercises and interactive Q&A.",
    images: ["/events/aiml-bootcamp.jpg", "/events/aiml-participants.jpg"],
    speakers: [
      {
        name: "Dr. Neha Agarwal",
        designation: "ML Research Scientist",
        company: "IIT Bombay",
      },
      {
        name: "Karthik Reddy",
        designation: "Data Scientist",
        company: "Flipkart",
      },
    ],
    tags: ["AI", "Machine Learning", "Python", "Bootcamp"],
    status: "past",
  },
  {
    id: "evt-005",
    title: "Tech Talk: Building Scalable Systems",
    slug: "tech-talk-scalable-systems",
    date: "2025-10-22",
    location: "Seminar Hall B",
    mode: "Offline",
    shortDescription: "Learn system design principles from industry experts.",
    fullDescription: "An engaging tech talk where industry veterans shared insights on designing and building scalable distributed systems. Topics included microservices architecture, load balancing, caching strategies, database sharding, and handling millions of requests. The session featured real-world case studies from companies like Netflix, Amazon, and Uber. Over 200 students attended and participated in the interactive discussion.",
    images: ["/events/tech-talk.jpg"],
    speakers: [
      {
        name: "Rajesh Kumar",
        designation: "Principal Engineer",
        company: "Amazon Web Services",
      },
    ],
    tags: ["System Design", "Architecture", "Tech Talk", "Backend"],
    status: "past",
  },
];

export const upcomingEvents = events.filter((event) => event.status === "upcoming");
export const pastEvents = events.filter((event) => event.status === "past");
