// export interface SocialLinks {
//   linkedin?: string;
//   github?: string;
//   instagram?: string;
//   twitter?: string;
//   portfolio?: string;
// }

// export interface TeamMember {
//   id: string;
//   name: string;
//   role: string;
//   year: string;
//   teamType: "core" | "member";
//   teamSlug: string;
//   teamName: string;
//   photo: string;
//   socialLinks: SocialLinks;
//   quote: string;
// }

// export const teamMembers: TeamMember[] = [
//   // Core Team
//   {
//     id: "tm-001",
//     name: "Aditya Verma",
//     role: "President",
//     year: "3rd Year, CSE",
//     teamType: "core",
//     teamSlug: "leadership",
//     teamName: "Leadership",
//     photo: "/team/aditya-verma.jpg",
//     socialLinks: {
//       linkedin: "https://linkedin.com/in/adityaverma",
//       github: "https://github.com/adityaverma",
//       portfolio: "https://adityaverma.dev",
//     },
//     quote: "Building communities, one line of code at a time.",
//   },
//   {
//     id: "tm-002",
//     name: "Priya Sharma",
//     role: "Vice President",
//     year: "3rd Year, IT",
//     teamType: "core",
//     teamSlug: "leadership",
//     teamName: "Leadership",
//     photo: "/team/priya-sharma.jpg",
//     socialLinks: {
//       linkedin: "https://linkedin.com/in/priyasharma",
//       github: "https://github.com/priyasharma",
//       instagram: "https://instagram.com/priya.codes",
//     },
//     quote: "Passionate about AI and its potential to change the world.",
//   },
//   {
//     id: "tm-003",
//     name: "Rahul Malhotra",
//     role: "Technical Lead",
//     year: "4th Year, CSE",
//     teamType: "core",
//     teamSlug: "tech",
//     teamName: "Tech Team",
//     photo: "/team/rahul-malhotra.jpg",
//     socialLinks: {
//       linkedin: "https://linkedin.com/in/rahulmalhotra",
//       github: "https://github.com/rahulmalhotra",
//       portfolio: "https://rahulm.dev",
//     },
//     quote: "Solving complex problems with elegant solutions.",
//   },
//   {
//     id: "tm-004",
//     name: "Sneha Reddy",
//     role: "Events Head",
//     year: "2nd Year, CSE",
//     teamType: "core",
//     teamSlug: "operations",
//     teamName: "Operations Team",
//     photo: "/team/sneha-reddy.jpg",
//     socialLinks: {
//       linkedin: "https://linkedin.com/in/snehareddy",
//       instagram: "https://instagram.com/sneha.dev",
//     },
//     quote: "Creating experiences that inspire and educate.",
//   },
//   {
//     id: "tm-005",
//     name: "Arjun Singh",
//     role: "Treasurer",
//     year: "3rd Year, IT",
//     teamType: "core",
//     teamSlug: "operations",
//     teamName: "Operations Team",
//     photo: "/team/arjun-singh.jpg",
//     socialLinks: {
//       linkedin: "https://linkedin.com/in/arjunsingh",
//       github: "https://github.com/arjunsingh",
//     },
//     quote: "Managing resources to fuel innovation.",
//   },
//   {
//     id: "tm-006",
//     name: "Kavya Nair",
//     role: "Content Lead",
//     year: "2nd Year, CSE",
//     teamType: "core",
//     teamSlug: "content",
//     teamName: "Content Team",
//     photo: "/team/kavya-nair.jpg",
//     socialLinks: {
//       linkedin: "https://linkedin.com/in/kavyanair",
//       instagram: "https://instagram.com/kavya.writes",
//       twitter: "https://twitter.com/kavyanair",
//     },
//     quote: "Crafting stories that connect technology and people.",
//   },
  
//   // General Members
//   {
//     id: "tm-007",
//     name: "Rohan Kapoor",
//     role: "Web Developer",
//     year: "2nd Year, IT",
//     teamType: "member",
//     teamSlug: "tech",
//     teamName: "Tech Team",
//     photo: "/team/rohan-kapoor.jpg",
//     socialLinks: {
//       linkedin: "https://linkedin.com/in/rohankapoor",
//       github: "https://github.com/rohankapoor",
//     },
//     quote: "Designing beautiful experiences on the web.",
//   },
//   {
//     id: "tm-008",
//     name: "Ananya Iyer",
//     role: "ML Enthusiast",
//     year: "3rd Year, CSE",
//     teamType: "member",
//     teamSlug: "tech",
//     teamName: "Tech Team",
//     photo: "/team/ananya-iyer.jpg",
//     socialLinks: {
//       linkedin: "https://linkedin.com/in/ananyaiyer",
//       github: "https://github.com/ananyaiyer",
//     },
//     quote: "Exploring the endless possibilities of machine learning.",
//   },
//   {
//     id: "tm-009",
//     name: "Karan Joshi",
//     role: "Backend Developer",
//     year: "2nd Year, CSE",
//     teamType: "member",
//     teamSlug: "tech",
//     teamName: "Tech Team",
//     photo: "/team/karan-joshi.jpg",
//     socialLinks: {
//       linkedin: "https://linkedin.com/in/karanjoshi",
//       github: "https://github.com/karanjoshi",
//     },
//     quote: "Building robust systems that scale.",
//   },
//   {
//     id: "tm-010",
//     name: "Ishita Bansal",
//     role: "UI/UX Designer",
//     year: "1st Year, IT",
//     teamType: "member",
//     teamSlug: "design",
//     teamName: "Design Team",
//     photo: "/team/ishita-bansal.jpg",
//     socialLinks: {
//       linkedin: "https://linkedin.com/in/ishitabansal",
//       instagram: "https://instagram.com/ishita.designs",
//     },
//     quote: "Creating intuitive designs that users love.",
//   },
//   {
//     id: "tm-011",
//     name: "Vikram Choudhary",
//     role: "Cloud Architect",
//     year: "3rd Year, IT",
//     teamType: "member",
//     teamSlug: "tech",
//     teamName: "Tech Team",
//     photo: "/team/vikram-choudhary.jpg",
//     socialLinks: {
//       linkedin: "https://linkedin.com/in/vikramchoudhary",
//       github: "https://github.com/vikramchoudhary",
//     },
//     quote: "Leveraging cloud to build the future.",
//   },
//   {
//     id: "tm-012",
//     name: "Meera Desai",
//     role: "Data Analyst",
//     year: "2nd Year, CSE",
//     teamType: "member",
//     teamSlug: "tech",
//     teamName: "Tech Team",
//     photo: "/team/meera-desai.jpg",
//     socialLinks: {
//       linkedin: "https://linkedin.com/in/meeradesai",
//       github: "https://github.com/meeradesai",
//     },
//     quote: "Turning data into actionable insights.",
//   },
//   {
//     id: "tm-013",
//     name: "Siddharth Rao",
//     role: "DevOps Engineer",
//     year: "3rd Year, IT",
//     teamType: "member",
//     teamSlug: "tech",
//     teamName: "Tech Team",
//     photo: "/team/siddharth-rao.jpg",
//     socialLinks: {
//       linkedin: "https://linkedin.com/in/siddharthrao",
//       github: "https://github.com/siddharthrao",
//     },
//     quote: "Automating workflows for seamless deployments.",
//   },
//   {
//     id: "tm-014",
//     name: "Tanvi Mehta",
//     role: "Mobile Developer",
//     year: "2nd Year, CSE",
//     teamType: "member",
//     teamSlug: "tech",
//     teamName: "Tech Team",
//     photo: "/team/tanvi-mehta.jpg",
//     socialLinks: {
//       linkedin: "https://linkedin.com/in/tanvimehta",
//       github: "https://github.com/tanvimehta",
//     },
//     quote: "Building mobile apps that make a difference.",
//   },
// ];

// export const coreTeam = teamMembers.filter((member) => member.teamType === "core");
// export const generalMembers = teamMembers.filter((member) => member.teamType === "member");


// -------------------------



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
  // ================= CORE TEAM (LEADS) =================
  {
    id: "tm-001",
    name: "Mohammed Faizan Ali",
    role: "Chief of Community & Vision",
    year: "2nd Year, IT",
    teamType: "core",
    teamSlug: "leadership",
    teamName: "Leadership",
    photo: "/organizers/faizan.jpg",
    socialLinks: {},
    quote: "Leading the community vision and fostering connections within DevUp Society.",
  },
  {
    id: "tm-002",
    name: "Sai Srujan",
    role: "Tech Lead & Advisor",
    year: "2nd Year, IT",
    teamType: "core",
    teamSlug: "tech",
    teamName: "Tech Team",
    photo: "/organizers/Sai Srujan.jpg",
    socialLinks: {},
    quote: "Driving technical innovation and providing strategic guidance for all tech initiatives.",
  },
  {
    id: "tm-003",
    name: "Harshavardhan",
    role: "Content and Outreach Lead",
    year: "2nd Year, IT",
    teamType: "core",
    teamSlug: "content",
    teamName: "Content & Outreach",
    photo: "/organizers/harsha.png",
    socialLinks: {},
    quote: "Crafting compelling content and managing all creative communications.",
  },
  {
    id: "tm-004",
    name: "Karthik",
    role: "Research & Innovation Lead",
    year: "2nd Year, IT",
    teamType: "core",
    teamSlug: "research",
    teamName: "Research & Innovation",
    photo: "/organizers/pavanakarthikeya.jpg",
    socialLinks: {},
    quote: "Spearheading research initiatives and driving innovation in technology.",
  },
  {
    id: "tm-005",
    name: "Govardhan",
    role: "Design Lead",
    year: "2nd Year, IT",
    teamType: "core",
    teamSlug: "design",
    teamName: "Design Team",
    photo: "/organizers/Govardhan.jpg",
    socialLinks: {},
    quote: "Creating stunning visual experiences and leading all design initiatives.",
  },
  {
    id: "tm-006",
    name: "Emmanuel",
    role: "Event Management Lead",
    year: "2nd Year, IT",
    teamType: "core",
    teamSlug: "events",
    teamName: "Events & Operations",
    photo: "/organizers/Emmanuel.jpg",
    socialLinks: {},
    quote: "Orchestrating seamless events and managing all logistical operations.",
  },
  {
    id: "tm-007",
    name: "Nashra Fatima",
    role: "Collaboration and Partnerships Lead",
    year: "2nd Year, IT",
    teamType: "core",
    teamSlug: "partnerships",
    teamName: "Collaborations & Partnerships",
    photo: "/organizers/Nashra.webp",
    socialLinks: {},
    quote: "Building strategic partnerships and fostering collaborative opportunities.",
  },
  {
    id: "tm-008",
    name: "Jeevan",
    role: "Influence & Media Lead",
    year: "2nd Year, IT",
    teamType: "core",
    teamSlug: "marketing",
    teamName: "Marketing Team",
    photo: "/organizers/Jeevan.jpeg",
    socialLinks: {},
    quote: "Leading media outreach and enhancing the event's influence across platforms.",
  },
  {
    id: "tm-009",
    name: "Abrar",
    role: "Mission & Support Team Lead",
    year: "2nd Year, IT",
    teamType: "core",
    teamSlug: "support",
    teamName: "Support Team",
    photo: "/organizers/Abrar.jpg",
    socialLinks: {},
    quote: "Managing mission-critical tasks and providing robust support to the team.",
  },
  {
    id: "tm-010",
    name: "Chathurya",
    role: "IT Branch Representative",
    year: "2nd Year, IT",
    teamType: "core",
    teamSlug: "leadership",
    teamName: "Leadership",
    photo: "/organizers/Chathurya.jpg",
    socialLinks: {},
    quote: "Representing the IT branch and facilitating communication between students and organizers.",
  },

  // ================= TECH TEAM =================
  {
    id: "tm-011",
    name: "Gubba Nithish",
    role: "Tech Team Member",
    year: "2nd Year, IT",
    teamType: "member",
    teamSlug: "tech",
    teamName: "Tech Team",
    photo: "/team/gubba-nithish.jpg",
    socialLinks: {
      linkedin: "https://share.google/kqJjhMrqHBHynTIu4",
      instagram: "gubba nithish",
    },
    quote: "Always eager to learn and experiment with new tech.",
  },
  {
    id: "tm-012",
    name: "Laasya Kavuri",
    role: "Tech Team Member",
    year: "1st Year, ECE",
    teamType: "member",
    teamSlug: "tech",
    teamName: "Tech Team",
    photo: "/team/laasya-kavuri.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/laasya-kavuri-a297a4374",
      instagram: "@laasya_kavuri_🦋",
    },
    quote: "Curious builder exploring the world of technology.",
  },
  {
    id: "tm-013",
    name: "Furqaan Hussain",
    role: "Tech Team Member",
    year: "1st Year, CSE",
    teamType: "member",
    teamSlug: "tech",
    teamName: "Tech Team",
    photo: "/team/furqaan-hussain.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/mohammed-furqaan-hussain-9624a1387",
      github: "https://github.com/Furqaan-Hussain",
      instagram: "@furq.aann",
    },
    quote: "Driven by curiosity and problem-solving.",
  },
  {
    id: "tm-014",
    name: "Karan Prajapati",
    role: "Tech Team Member",
    year: "2nd Year, IT",
    teamType: "member",
    teamSlug: "tech",
    teamName: "Tech Team",
    photo: "/team/karan-prajapati.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/karan-prajapati-680100342",
      instagram: "_karan._.19",
    },
    quote: "Learning by building and breaking systems.",
  },
  {
    id: "tm-015",
    name: "Siledar Shashank",
    role: "Tech Team Member",
    year: "1st Year, CSE",
    teamType: "member",
    teamSlug: "tech",
    teamName: "Tech Team",
    photo: "/team/siledar-shashank.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/shashank-siledar-52142a304",
      instagram: "me_shashank_16",
    },
    quote: "Passionate about building reliable systems.",
  },
  {
    id: "tm-016",
    name: "Mohammed Mohiuddin",
    role: "Tech Team Member",
    year: "1st Year, CSE - AIML",
    teamType: "member",
    teamSlug: "tech",
    teamName: "Tech Team",
    photo: "/team/mohammed-mohiuddin.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/mohammed-mohi-uddin-aa4ba934b",
      github: "https://github.com/mohi2006august",
      instagram: "@moh_iuddin18",
    },
    quote: "Exploring AI with a hands-on mindset.",
  },
  {
    id: "tm-017",
    name: "Aitha Sathvika",
    role: "Tech Team Member",
    year: "1st Year, CSE - AIML",
    teamType: "member",
    teamSlug: "tech",
    teamName: "Tech Team",
    photo: "/team/aitha-sathvika.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/aitha-sathvika-5821",
      github: "https://github.com/sathvikaaitha033",
      instagram: "sathviiiiika_03",
    },
    quote: "Learning AI through real-world applications.",
  },

  // ================= MARKETING TEAM =================
  {
    id: "tm-018",
    name: "Riya Kumari",
    role: "Marketing Team Member",
    year: "1st Year, IT",
    teamType: "member",
    teamSlug: "marketing",
    teamName: "Marketing Team",
    photo: "/team/riya-kumari.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/riya-jha-b35133306",
    },
    quote: "Communicating ideas that matter.",
  },
  {
    id: "tm-019",
    name: "P. Yeshwanth Chowdary",
    role: "Marketing Team Member",
    year: "3rd Year, CSE - DS",
    teamType: "member",
    teamSlug: "marketing",
    teamName: "Marketing Team",
    photo: "/team/yeshwanth-chowdary.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/yeshwanth-pavuluri-9018a5390",
      instagram: "_yeshu__chowdary_",
    },
    quote: "Strategic marketing with a creative edge.",
  },
  {
    id: "tm-020",
    name: "Aliya Banu",
    role: "Marketing Team Member",
    year: "2nd Year, IT",
    teamType: "member",
    teamSlug: "marketing",
    teamName: "Marketing Team",
    photo: "/team/aliya-banu.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/aliya-banu-2a7142356",
      github: "https://github.com/aliyabanu242006-arch",
      instagram: "aliya_banu_24",
    },
    quote: "Blending analytics and creativity in marketing.",
  },
  {
    id: "tm-021",
    name: "Mahathi Chinta",
    role: "Marketing Team Member",
    year: "2nd Year, IT",
    teamType: "member",
    teamSlug: "marketing",
    teamName: "Marketing Team",
    photo: "/team/mahathi-chinta.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/mahathi-chinta/",
      github: "https://github.com/chintamahathi",
      instagram: "mahathi.verse",
    },
    quote: "Creative storytelling through digital platforms.",
  },
  {
    id: "tm-022",
    name: "Syed Naveed Ahmed",
    role: "Marketing Team Member",
    year: "2nd Year, CSE",
    teamType: "member",
    teamSlug: "marketing",
    teamName: "Marketing Team",
    photo: "/team/syed-naveed-ahmed.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/syed-naveed-ahmed-9891b6317",
      instagram: "_.naveed.__",
    },
    quote: "Focused on brand reach and engagement.",
  },
  {
    id: "tm-023",
    name: "BhanuPrasanna Bathula",
    role: "Marketing Team Member",
    year: "2nd Year, CSE",
    teamType: "member",
    teamSlug: "marketing",
    teamName: "Marketing Team",
    photo: "/team/bhanuprasanna-bathula.jpg",
    socialLinks: {
      instagram: "BhanuPrasanna_14",
    },
    quote: "Promoting ideas that drive community growth.",
  },
  {
    id: "tm-024",
    name: "Juveria Usman",
    role: "Marketing Team Member",
    year: "3rd Year, IT",
    teamType: "member",
    teamSlug: "marketing",
    teamName: "Marketing Team",
    photo: "/team/juveria-usman.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/juveria-usman-07821b2aa",
      instagram: "@juveriaa.21",
    },
    quote: "Storytelling with purpose and clarity.",
  },

  // ================= CONTENT & OUTREACH =================
  {
    id: "tm-025",
    name: "Athikah Abdul Azeem",
    role: "Content & Outreach Member",
    year: "2nd Year, IT",
    teamType: "member",
    teamSlug: "content",
    teamName: "Content & Outreach",
    photo: "/team/athikah-azeem.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/athikah-azeem-2287b2328",
      github: "https://github.com/Athikah-aa",
      instagram: "Athikah_aa",
    },
    quote: "Turning ideas into impactful narratives.",
  },
  {
    id: "tm-026",
    name: "R. Rishika",
    role: "Content & Outreach Member",
    year: "2nd Year, IT",
    teamType: "member",
    teamSlug: "content",
    teamName: "Content & Outreach",
    photo: "/team/rishika-rathod.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/rishika-rathod-574728326",
      instagram: "@riishika_rathod",
    },
    quote: "Expressing ideas through creative content.",
  },
  {
    id: "tm-027",
    name: "Shruthi Goud",
    role: "Content & Outreach Member",
    year: "2nd Year, IT",
    teamType: "member",
    teamSlug: "content",
    teamName: "Content & Outreach",
    photo: "/team/shruthi-goud.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/shruthi-goud-p-8699ba380",
      instagram: "_p.s.goud_",
    },
    quote: "Creating content that connects people.",
  },
  {
    id: "tm-028",
    name: "Dhanush Reddy",
    role: "Content Team Member",
    year: "2nd Year, IT",
    teamType: "member",
    teamSlug: "content",
    teamName: "Content & Outreach",
    photo: "/team/dhanush-reddy.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/dhanush-reddy-50551b309/",
      instagram: "@dhanush_reddy21",
    },
    quote: "Content creation with consistency and clarity.",
  },
  {
    id: "tm-029",
    name: "Akshitha A",
    role: "Content & Outreach Member",
    year: "1st Year, IT",
    teamType: "member",
    teamSlug: "content",
    teamName: "Content & Outreach",
    photo: "/team/akshitha-a.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/akshitha-a-381117392",
      instagram: "akshithaa_016",
    },
    quote: "Exploring content as a tool for engagement.",
  },
  {
    id: "tm-030",
    name: "Anjali Ladde",
    role: "Content & Outreach Member",
    year: "1st Year, CSE - DS",
    teamType: "member",
    teamSlug: "content",
    teamName: "Content & Outreach",
    photo: "/team/anjali-ladde.jpg",
    socialLinks: {},
    quote: "Learning to communicate ideas effectively.",
  },
  {
    id: "tm-031",
    name: "Harshavardhan",
    role: "Content Team Member",
    year: "2nd Year, IT",
    teamType: "member",
    teamSlug: "content",
    teamName: "Content & Outreach",
    photo: "/team/harshavardhan.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/harsh-vardhan-6b0a69325",
      instagram: "harsha._.021",
    },
    quote: "Consistent learning through content creation.",
  },

  // ================= EVENTS & OPERATIONS =================
  {
    id: "tm-032",
    name: "Jagruthi Sivampeta",
    role: "Events & Operations Member",
    year: "2nd Year, IT",
    teamType: "member",
    teamSlug: "events",
    teamName: "Events & Operations",
    photo: "/team/jagruthi-sivampeta.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/jagruthi-sivampeta-4127b832b",
      instagram: "jags_19.05",
    },
    quote: "Managing operations with precision.",
  },
  {
    id: "tm-033",
    name: "Garima Choudhary",
    role: "Events & Operations Member",
    year: "2nd Year, IT",
    teamType: "member",
    teamSlug: "events",
    teamName: "Events & Operations",
    photo: "/team/garima-choudhary.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/garima-choudhary-51b404356",
      github: "https://github.com/bugbyte-code",
      instagram: "@garimagc183",
    },
    quote: "Ensuring seamless execution of events.",
  },
  {
    id: "tm-034",
    name: "Amaan",
    role: "Events & Operations Member",
    year: "1st Year, CSE - DS",
    teamType: "member",
    teamSlug: "events",
    teamName: "Events & Operations",
    photo: "/team/amaan.jpg",
    socialLinks: {
      instagram: "amaan.ahmed2",
    },
    quote: "Supporting events with enthusiasm and teamwork.",
  },
  {
    id: "tm-035",
    name: "S Emmanuel",
    role: "Events & Operations Member",
    year: "2nd Year, IT",
    teamType: "member",
    teamSlug: "events",
    teamName: "Events & Operations",
    photo: "/team/emmanuel.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/emmanuel-sathur-113128342",
      instagram: "@roryyy.__",
    },
    quote: "Focused on smooth execution of club activities.",
  },

  // ================= RESEARCH & INNOVATION =================
  {
    id: "tm-036",
    name: "Sahasra",
    role: "Research & Innovation Member",
    year: "2nd Year, IT",
    teamType: "member",
    teamSlug: "research",
    teamName: "Research & Innovation",
    photo: "/team/sahasra.jpg",
    socialLinks: {},
    quote: "Exploring ideas through research and experimentation.",
  },
  {
    id: "tm-037",
    name: "Syed Anas",
    role: "Research & Innovation Member",
    year: "1st Year, CSE - DS",
    teamType: "member",
    teamSlug: "research",
    teamName: "Research & Innovation",
    photo: "/team/syed-anas.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/syedanas007",
      github: "https://github.com/ACLICXDD",
      instagram: "@syedd.anass",
    },
    quote: "Driven by curiosity and innovation.",
  },
  {
    id: "tm-038",
    name: "Shaik Minhaj Basha",
    role: "Research & Innovation Member",
    year: "1st Year, CSE",
    teamType: "member",
    teamSlug: "research",
    teamName: "Research & Innovation",
    photo: "/team/shaik-minhaj-basha.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/minhaj-shaik-097674382",
      github: "https://github.com/shaikminhajbasha-art",
      instagram: "minhaj_1207",
    },
    quote: "Learning research through hands-on exploration.",
  },
  {
    id: "tm-039",
    name: "Uthukota Mohitha",
    role: "Research & Innovation Member",
    year: "1st Year, CSE - AIML",
    teamType: "member",
    teamSlug: "research",
    teamName: "Research & Innovation",
    photo: "/team/uthukota-mohitha.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/uthukota-mohitha-245b96390",
      github: "https://github.com/Mohitha011207",
      instagram: "@u.mohitha",
    },
    quote: "Exploring AI-driven research paths.",
  },
  {
    id: "tm-040",
    name: "Bakka Sathvika",
    role: "Research & Innovation Member",
    year: "1st Year, CSE - DS",
    teamType: "member",
    teamSlug: "research",
    teamName: "Research & Innovation",
    photo: "/team/bakka-sathvika.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/b-sathvika-reddy-98bb4936a",
      instagram: "@sathvika.reddy_03",
    },
    quote: "Researching with curiosity and persistence.",
  },

  // ================= DESIGN TEAM =================
  {
    id: "tm-041",
    name: "Nithin Addetla",
    role: "Design Team Member",
    year: "2nd Year, IT",
    teamType: "member",
    teamSlug: "design",
    teamName: "Design Team",
    photo: "/team/nithin-addetla.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/nithin-addetla-72a705366",
    },
    quote: "Designing visuals that communicate clearly.",
  },
  {
    id: "tm-042",
    name: "Srinithya Madaram",
    role: "Design Team Member",
    year: "1st Year, CSE",
    teamType: "member",
    teamSlug: "design",
    teamName: "Design Team",
    photo: "/team/srinithya-madaram.jpg",
    socialLinks: {
      instagram: "@snith.jm",
    },
    quote: "Exploring creativity through design.",
  },

  // ================= PARTNERSHIPS =================
  {
    id: "tm-043",
    name: "Nashra Fatima",
    role: "Collaborations & Partnerships Member",
    year: "2nd Year, IT",
    teamType: "member",
    teamSlug: "partnerships",
    teamName: "Collaborations & Partnerships",
    photo: "/team/nashra-fatima.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/nashra-fatima-b6a83b326",
      instagram: "@_shaik.nashra_",
    },
    quote: "Building meaningful collaborations.",
  },
  {
    id: "tm-044",
    name: "Shruthi Jaiswal",
    role: "Collaborations & Partnerships Member",
    year: "2nd Year, IT",
    teamType: "member",
    teamSlug: "partnerships",
    teamName: "Collaborations & Partnerships",
    photo: "/team/shruthi-jaiswal.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/shruthi-jaiswal-7165b933b",
    },
    quote: "Creating partnerships that add value.",
  },
];

export const coreTeam = teamMembers.filter(
  (member) => member.teamType === "core"
);

export const generalMembers = teamMembers.filter(
  (member) => member.teamType === "member"
);
