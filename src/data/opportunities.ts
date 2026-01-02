export interface Opportunity {
  id: string;
  title: string;
  type: "Internship" | "Hackathon" | "Scholarship" | "Open Source" | "Fellowship" | "Competition";
  deadline: string;
  description: string;
  externalLink: string;
  source: string;
  tags: string[];
  eligibility?: string;
  stipend?: string;
}

export const opportunities: Opportunity[] = [
  // Internships
  {
    id: "opp-001",
    title: "Google Summer of Code 2026",
    type: "Open Source",
    deadline: "2026-03-18",
    description: "GSoC is a global program focused on bringing more developers into open source software development. Students work with open source organizations on a 12+ week programming project during their break from university.",
    externalLink: "https://summerofcode.withgoogle.com/",
    source: "Google",
    tags: ["Open Source", "Remote", "Stipend"],
    eligibility: "University students (18+ years)",
    stipend: "$1,500 - $6,600 USD",
  },
  {
    id: "opp-002",
    title: "Microsoft SWE Intern - Summer 2026",
    type: "Internship",
    deadline: "2026-02-28",
    description: "Join Microsoft as a Software Engineering Intern and work on real-world projects alongside industry experts. Gain hands-on experience with cloud technologies, AI, and large-scale distributed systems.",
    externalLink: "https://careers.microsoft.com/",
    source: "Microsoft Careers",
    tags: ["Software Engineering", "Cloud", "AI"],
    eligibility: "2nd/3rd year students",
    stipend: "Competitive",
  },
  {
    id: "opp-003",
    title: "Amazon ML Summer Internship",
    type: "Internship",
    deadline: "2026-03-10",
    description: "Work on cutting-edge machine learning projects at Amazon. Contribute to real ML models that power Amazon's recommendation systems, Alexa, and other AI-driven features.",
    externalLink: "https://www.amazon.jobs/",
    source: "Amazon Jobs",
    tags: ["Machine Learning", "AI", "Python"],
    eligibility: "Students pursuing CS/IT/related fields",
    stipend: "₹80,000 - ₹1,20,000/month",
  },
  {
    id: "opp-004",
    title: "Flipkart Runway - Product Intern",
    type: "Internship",
    deadline: "2026-02-20",
    description: "Join Flipkart's product team and learn how to build products that impact millions of users. Work closely with PMs, designers, and engineers to ship features.",
    externalLink: "https://www.flipkartcareers.com/",
    source: "Flipkart Careers",
    tags: ["Product Management", "E-commerce", "Strategy"],
    eligibility: "Pre-final and final year students",
    stipend: "₹50,000/month",
  },

  // Hackathons
  {
    id: "opp-005",
    title: "Smart India Hackathon 2026",
    type: "Hackathon",
    deadline: "2026-03-05",
    description: "India's biggest hackathon with problem statements from government ministries and industries. Build innovative solutions and compete for cash prizes and internship opportunities.",
    externalLink: "https://sih.gov.in/",
    source: "Government of India",
    tags: ["Government", "Innovation", "Problem Solving"],
    eligibility: "Students enrolled in Indian institutions",
    stipend: "Cash prizes up to ₹1 Lakh",
  },
  {
    id: "opp-006",
    title: "MLH Fellowship - Spring 2026",
    type: "Fellowship",
    deadline: "2026-01-31",
    description: "A 12-week remote internship alternative where you'll contribute to Open Source projects alongside peers from around the world. Gain real-world experience and mentorship from industry professionals.",
    externalLink: "https://fellowship.mlh.io/",
    source: "Major League Hacking",
    tags: ["Open Source", "Remote", "Fellowship"],
    eligibility: "Students worldwide",
    stipend: "$5,000 USD",
  },
  {
    id: "opp-007",
    title: "HackMIT 2026",
    type: "Hackathon",
    deadline: "2026-08-15",
    description: "Join thousands of students at MIT's campus for a weekend of hacking, workshops, and networking. Build amazing projects and compete for prizes from top tech companies.",
    externalLink: "https://hackmit.org/",
    source: "MIT",
    tags: ["Hackathon", "Innovation", "Networking"],
    eligibility: "College students",
    stipend: "Prizes worth $50,000+",
  },

  // Scholarships
  {
    id: "opp-008",
    title: "Google Women Techmakers Scholarship",
    type: "Scholarship",
    deadline: "2026-02-15",
    description: "Scholarship program for women pursuing computer science and related fields. Recipients receive financial support and mentorship opportunities.",
    externalLink: "https://www.womentechmakers.com/scholars",
    source: "Google",
    tags: ["Women in Tech", "Scholarship", "Diversity"],
    eligibility: "Women studying CS/related fields",
    stipend: "$1,000 - $10,000 USD",
  },
  {
    id: "opp-009",
    title: "GitHub Campus Expert Program",
    type: "Fellowship",
    deadline: "2026-03-01",
    description: "Train with GitHub to become a leader in your community. Get access to exclusive resources, events, and opportunities to grow your technical and leadership skills.",
    externalLink: "https://education.github.com/experts",
    source: "GitHub Education",
    tags: ["Leadership", "Community", "Open Source"],
    eligibility: "Active student developers",
    stipend: "Swag + Resources",
  },

  // Open Source Programs
  {
    id: "opp-010",
    title: "Outreachy Internships",
    type: "Open Source",
    deadline: "2026-02-05",
    description: "Outreachy provides internships in open source and open science to people subject to systemic bias and impacted by underrepresentation in the tech industry.",
    externalLink: "https://www.outreachy.org/",
    source: "Outreachy",
    tags: ["Open Source", "Diversity", "Remote"],
    eligibility: "Underrepresented groups in tech",
    stipend: "$7,000 USD",
  },
  {
    id: "opp-011",
    title: "LFX Mentorship (Linux Foundation)",
    type: "Open Source",
    deadline: "2026-02-10",
    description: "Work with open source projects under the Linux Foundation umbrella. Gain mentorship from maintainers and contribute to projects used by millions worldwide.",
    externalLink: "https://lfx.linuxfoundation.org/tools/mentorship/",
    source: "Linux Foundation",
    tags: ["Open Source", "Linux", "Mentorship"],
    eligibility: "Developers worldwide",
    stipend: "$3,000 - $6,600 USD",
  },

  // Competitions
  {
    id: "opp-012",
    title: "Google Kickstart 2026",
    type: "Competition",
    deadline: "2026-03-20",
    description: "Google's global online coding competition with multiple rounds throughout the year. Top performers get the chance to interview for engineering positions at Google.",
    externalLink: "https://codingcompetitions.withgoogle.com/kickstart",
    source: "Google",
    tags: ["Competitive Programming", "Algorithms", "DSA"],
    eligibility: "Anyone can participate",
    stipend: "Free T-shirts + Interview opportunities",
  },
];

export const upcomingOpportunities = opportunities.filter(
  (opp) => new Date(opp.deadline) > new Date()
);
