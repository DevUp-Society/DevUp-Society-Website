export interface Resource {
  id: number;
  title: string;
  description: string;
  category: string;
  link: string;
}

export const resources: Resource[] = [
  {
    id: 1,
    title: "MDN Web Docs",
    description: "Comprehensive documentation for web technologies including HTML, CSS, and JavaScript.",
    category: "Documentation",
    link: "https://developer.mozilla.org",
  },
  {
    id: 2,
    title: "freeCodeCamp",
    description: "Learn to code with free online courses, programming projects, and interview prep.",
    category: "Learning Platform",
    link: "https://www.freecodecamp.org",
  },
  {
    id: 3,
    title: "GitHub Student Developer Pack",
    description: "Free access to the best developer tools for students.",
    category: "Tools",
    link: "https://education.github.com/pack",
  },
  {
    id: 4,
    title: "Roadmap.sh",
    description: "Community-driven roadmaps, articles, and resources for developers.",
    category: "Career Path",
    link: "https://roadmap.sh",
  },
];
