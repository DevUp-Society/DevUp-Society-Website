export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  github?: string;
  linkedin?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "President",
    bio: "Full-stack developer passionate about building impactful solutions.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Vice President",
    bio: "AI enthusiast focused on machine learning applications.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: 3,
    name: "Michael Davis",
    role: "Technical Lead",
    bio: "Backend specialist with experience in scalable systems.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Events Coordinator",
    bio: "Organizing engaging events and building community connections.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
];
