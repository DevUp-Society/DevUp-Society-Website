export interface Opportunity {
  id: number;
  title: string;
  company: string;
  description: string;
  type: string;
  location: string;
  duration: string;
}

export const opportunities: Opportunity[] = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "Tech Corp",
    description: "Work on cutting-edge web applications and gain hands-on experience with modern tech stack.",
    type: "Internship",
    location: "Remote",
    duration: "3 months",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "StartupXYZ",
    description: "Build beautiful and responsive user interfaces using React and TypeScript.",
    type: "Part-time",
    location: "Hybrid",
    duration: "6 months",
  },
  {
    id: 3,
    title: "Open Source Contributor",
    company: "DevUp Society",
    description: "Contribute to our open-source projects and collaborate with the community.",
    type: "Volunteer",
    location: "Remote",
    duration: "Flexible",
  },
];
