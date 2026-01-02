export interface SocialLinks {
  linkedin?: string;
  github?: string;
  instagram?: string;
  twitter?: string;
  portfolio?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  year: string;
  teamType: "core" | "member";
  teamSlug: string;
  teamName: string;
  photo: string;
  socialLinks: SocialLinks;
  quote: string;
}

export const teamMembers: TeamMember[] = [
  // Core Team
  {
    id: "tm-001",
    name: "Aditya Verma",
    role: "President",
    year: "3rd Year, CSE",
    teamType: "core",
    teamSlug: "leadership",
    teamName: "Leadership",
    photo: "/team/aditya-verma.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/adityaverma",
      github: "https://github.com/adityaverma",
      portfolio: "https://adityaverma.dev",
    },
    quote: "Building communities, one line of code at a time.",
  },
  {
    id: "tm-002",
    name: "Priya Sharma",
    role: "Vice President",
    year: "3rd Year, IT",
    teamType: "core",
    teamSlug: "leadership",
    teamName: "Leadership",
    photo: "/team/priya-sharma.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/priyasharma",
      github: "https://github.com/priyasharma",
      instagram: "https://instagram.com/priya.codes",
    },
    quote: "Passionate about AI and its potential to change the world.",
  },
  {
    id: "tm-003",
    name: "Rahul Malhotra",
    role: "Technical Lead",
    year: "4th Year, CSE",
    teamType: "core",
    teamSlug: "tech",
    teamName: "Tech Team",
    photo: "/team/rahul-malhotra.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/rahulmalhotra",
      github: "https://github.com/rahulmalhotra",
      portfolio: "https://rahulm.dev",
    },
    quote: "Solving complex problems with elegant solutions.",
  },
  {
    id: "tm-004",
    name: "Sneha Reddy",
    role: "Events Head",
    year: "2nd Year, CSE",
    teamType: "core",
    teamSlug: "operations",
    teamName: "Operations Team",
    photo: "/team/sneha-reddy.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/snehareddy",
      instagram: "https://instagram.com/sneha.dev",
    },
    quote: "Creating experiences that inspire and educate.",
  },
  {
    id: "tm-005",
    name: "Arjun Singh",
    role: "Treasurer",
    year: "3rd Year, IT",
    teamType: "core",
    teamSlug: "operations",
    teamName: "Operations Team",
    photo: "/team/arjun-singh.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/arjunsingh",
      github: "https://github.com/arjunsingh",
    },
    quote: "Managing resources to fuel innovation.",
  },
  {
    id: "tm-006",
    name: "Kavya Nair",
    role: "Content Lead",
    year: "2nd Year, CSE",
    teamType: "core",
    teamSlug: "content",
    teamName: "Content Team",
    photo: "/team/kavya-nair.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/kavyanair",
      instagram: "https://instagram.com/kavya.writes",
      twitter: "https://twitter.com/kavyanair",
    },
    quote: "Crafting stories that connect technology and people.",
  },
  
  // General Members
  {
    id: "tm-007",
    name: "Rohan Kapoor",
    role: "Web Developer",
    year: "2nd Year, IT",
    teamType: "member",
    teamSlug: "tech",
    teamName: "Tech Team",
    photo: "/team/rohan-kapoor.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/rohankapoor",
      github: "https://github.com/rohankapoor",
    },
    quote: "Designing beautiful experiences on the web.",
  },
  {
    id: "tm-008",
    name: "Ananya Iyer",
    role: "ML Enthusiast",
    year: "3rd Year, CSE",
    teamType: "member",
    teamSlug: "tech",
    teamName: "Tech Team",
    photo: "/team/ananya-iyer.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/ananyaiyer",
      github: "https://github.com/ananyaiyer",
    },
    quote: "Exploring the endless possibilities of machine learning.",
  },
  {
    id: "tm-009",
    name: "Karan Joshi",
    role: "Backend Developer",
    year: "2nd Year, CSE",
    teamType: "member",
    teamSlug: "tech",
    teamName: "Tech Team",
    photo: "/team/karan-joshi.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/karanjoshi",
      github: "https://github.com/karanjoshi",
    },
    quote: "Building robust systems that scale.",
  },
  {
    id: "tm-010",
    name: "Ishita Bansal",
    role: "UI/UX Designer",
    year: "1st Year, IT",
    teamType: "member",
    teamSlug: "design",
    teamName: "Design Team",
    photo: "/team/ishita-bansal.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/ishitabansal",
      instagram: "https://instagram.com/ishita.designs",
    },
    quote: "Creating intuitive designs that users love.",
  },
  {
    id: "tm-011",
    name: "Vikram Choudhary",
    role: "Cloud Architect",
    year: "3rd Year, IT",
    teamType: "member",
    teamSlug: "tech",
    teamName: "Tech Team",
    photo: "/team/vikram-choudhary.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/vikramchoudhary",
      github: "https://github.com/vikramchoudhary",
    },
    quote: "Leveraging cloud to build the future.",
  },
  {
    id: "tm-012",
    name: "Meera Desai",
    role: "Data Analyst",
    year: "2nd Year, CSE",
    teamType: "member",
    teamSlug: "tech",
    teamName: "Tech Team",
    photo: "/team/meera-desai.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/meeradesai",
      github: "https://github.com/meeradesai",
    },
    quote: "Turning data into actionable insights.",
  },
  {
    id: "tm-013",
    name: "Siddharth Rao",
    role: "DevOps Engineer",
    year: "3rd Year, IT",
    teamType: "member",
    teamSlug: "tech",
    teamName: "Tech Team",
    photo: "/team/siddharth-rao.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/siddharthrao",
      github: "https://github.com/siddharthrao",
    },
    quote: "Automating workflows for seamless deployments.",
  },
  {
    id: "tm-014",
    name: "Tanvi Mehta",
    role: "Mobile Developer",
    year: "2nd Year, CSE",
    teamType: "member",
    teamSlug: "tech",
    teamName: "Tech Team",
    photo: "/team/tanvi-mehta.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/tanvimehta",
      github: "https://github.com/tanvimehta",
    },
    quote: "Building mobile apps that make a difference.",
  },
];

export const coreTeam = teamMembers.filter((member) => member.teamType === "core");
export const generalMembers = teamMembers.filter((member) => member.teamType === "member");
