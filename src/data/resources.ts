export interface Resource {
  id: string;
  title: string;
  category: "Roadmap" | "Tutorial" | "Tool" | "Cheatsheet" | "Course" | "Book" | "Documentation";
  description: string;
  link: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  isPaid: boolean;
}

export const resources: Resource[] = [
  // Roadmaps
  {
    id: "res-001",
    title: "Roadmap.sh - Developer Roadmaps",
    category: "Roadmap",
    description: "Step-by-step guides and paths to learn different tech stacks. Includes frontend, backend, DevOps, and more.",
    link: "https://roadmap.sh/",
    difficulty: "Beginner",
    tags: ["Career Path", "Learning Path", "All Domains"],
    isPaid: false,
  },
  {
    id: "res-002",
    title: "Frontend Developer Roadmap",
    category: "Roadmap",
    description: "Complete roadmap to become a modern frontend developer covering HTML, CSS, JavaScript, React, and more.",
    link: "https://roadmap.sh/frontend",
    difficulty: "Beginner",
    tags: ["Frontend", "Web Development", "React"],
    isPaid: false,
  },
  {
    id: "res-003",
    title: "Backend Developer Roadmap",
    category: "Roadmap",
    description: "Comprehensive guide to backend development including databases, APIs, authentication, and deployment.",
    link: "https://roadmap.sh/backend",
    difficulty: "Intermediate",
    tags: ["Backend", "APIs", "Databases"],
    isPaid: false,
  },

  // Beginner Resources
  {
    id: "res-004",
    title: "freeCodeCamp",
    category: "Course",
    description: "Free interactive coding tutorials covering web development, data science, machine learning, and more.",
    link: "https://www.freecodecamp.org/",
    difficulty: "Beginner",
    tags: ["Web Development", "Python", "Data Science"],
    isPaid: false,
  },
  {
    id: "res-005",
    title: "The Odin Project",
    category: "Course",
    description: "Open-source curriculum for learning full-stack web development. Completely free with hands-on projects.",
    link: "https://www.theodinproject.com/",
    difficulty: "Beginner",
    tags: ["Full Stack", "Ruby", "JavaScript"],
    isPaid: false,
  },
  {
    id: "res-006",
    title: "CS50 - Introduction to Computer Science",
    category: "Course",
    description: "Harvard's legendary intro to CS course. Learn fundamentals of computer science and programming.",
    link: "https://cs50.harvard.edu/",
    difficulty: "Beginner",
    tags: ["Computer Science", "Algorithms", "C"],
    isPaid: false,
  },
  {
    id: "res-007",
    title: "JavaScript.info",
    category: "Tutorial",
    description: "Modern JavaScript tutorial covering everything from basics to advanced concepts with clear explanations.",
    link: "https://javascript.info/",
    difficulty: "Beginner",
    tags: ["JavaScript", "Web Development"],
    isPaid: false,
  },

  // Tools
  {
    id: "res-008",
    title: "GitHub Student Developer Pack",
    category: "Tool",
    description: "Free access to developer tools worth thousands of dollars including GitHub Pro, cloud credits, and more.",
    link: "https://education.github.com/pack",
    difficulty: "Beginner",
    tags: ["Tools", "Free Resources", "Cloud"],
    isPaid: false,
  },
  {
    id: "res-009",
    title: "VS Code Extensions Guide",
    category: "Tool",
    description: "Curated list of the best VS Code extensions to boost your productivity as a developer.",
    link: "https://marketplace.visualstudio.com/",
    difficulty: "Beginner",
    tags: ["VS Code", "Productivity", "Tools"],
    isPaid: false,
  },
  {
    id: "res-010",
    title: "Figma for Developers",
    category: "Tool",
    description: "Learn how to use Figma for designing and prototyping user interfaces. Essential for frontend developers.",
    link: "https://www.figma.com/",
    difficulty: "Beginner",
    tags: ["Design", "UI/UX", "Prototyping"],
    isPaid: false,
  },

  // Cheatsheets
  {
    id: "res-011",
    title: "Git Cheatsheet",
    category: "Cheatsheet",
    description: "Quick reference for common Git commands and workflows. Perfect for beginners and as a reminder.",
    link: "https://education.github.com/git-cheat-sheet-education.pdf",
    difficulty: "Beginner",
    tags: ["Git", "Version Control"],
    isPaid: false,
  },
  {
    id: "res-012",
    title: "DevHints - Developer Cheatsheets",
    category: "Cheatsheet",
    description: "Collection of cheatsheets for various programming languages, frameworks, and tools.",
    link: "https://devhints.io/",
    difficulty: "Intermediate",
    tags: ["Cheatsheets", "Quick Reference"],
    isPaid: false,
  },
  {
    id: "res-013",
    title: "OverAPI - Cheat Sheets",
    category: "Cheatsheet",
    description: "Comprehensive collection of cheatsheets for programming languages and web technologies.",
    link: "https://overapi.com/",
    difficulty: "Intermediate",
    tags: ["Cheatsheets", "Documentation"],
    isPaid: false,
  },

  // Documentation
  {
    id: "res-014",
    title: "MDN Web Docs",
    category: "Documentation",
    description: "The most comprehensive web development documentation covering HTML, CSS, JavaScript, and Web APIs.",
    link: "https://developer.mozilla.org/",
    difficulty: "Beginner",
    tags: ["HTML", "CSS", "JavaScript", "Web APIs"],
    isPaid: false,
  },
  {
    id: "res-015",
    title: "React Documentation",
    category: "Documentation",
    description: "Official React documentation with interactive examples and comprehensive guides.",
    link: "https://react.dev/",
    difficulty: "Intermediate",
    tags: ["React", "Frontend", "JavaScript"],
    isPaid: false,
  },
  {
    id: "res-016",
    title: "Python Documentation",
    category: "Documentation",
    description: "Official Python documentation including tutorials, library references, and language specifications.",
    link: "https://docs.python.org/",
    difficulty: "Beginner",
    tags: ["Python", "Programming"],
    isPaid: false,
  },

  // Advanced Resources
  {
    id: "res-017",
    title: "System Design Primer",
    category: "Tutorial",
    description: "Learn how to design large-scale systems. Covers scalability, load balancing, caching, and more.",
    link: "https://github.com/donnemartin/system-design-primer",
    difficulty: "Advanced",
    tags: ["System Design", "Architecture", "Interviews"],
    isPaid: false,
  },
  {
    id: "res-018",
    title: "LeetCode",
    category: "Tool",
    description: "Practice coding interview questions with solutions and discussions. Essential for technical interviews.",
    link: "https://leetcode.com/",
    difficulty: "Intermediate",
    tags: ["DSA", "Interviews", "Problem Solving"],
    isPaid: false,
  },
  {
    id: "res-019",
    title: "Coursera - Machine Learning by Andrew Ng",
    category: "Course",
    description: "One of the most popular ML courses. Learn the fundamentals of machine learning from Stanford professor.",
    link: "https://www.coursera.org/learn/machine-learning",
    difficulty: "Intermediate",
    tags: ["Machine Learning", "AI", "Mathematics"],
    isPaid: false,
  },
  {
    id: "res-020",
    title: "Full Stack Open",
    category: "Course",
    description: "Deep dive into modern web development with React, Node.js, MongoDB, GraphQL, and TypeScript.",
    link: "https://fullstackopen.com/",
    difficulty: "Intermediate",
    tags: ["Full Stack", "React", "Node.js"],
    isPaid: false,
  },

  // Books
  {
    id: "res-021",
    title: "You Don't Know JS (Book Series)",
    category: "Book",
    description: "Deep dive into JavaScript mechanics and core concepts. Available for free on GitHub.",
    link: "https://github.com/getify/You-Dont-Know-JS",
    difficulty: "Intermediate",
    tags: ["JavaScript", "Books", "Deep Dive"],
    isPaid: false,
  },
  {
    id: "res-022",
    title: "Eloquent JavaScript",
    category: "Book",
    description: "A modern introduction to programming with JavaScript. Interactive online version available for free.",
    link: "https://eloquentjavascript.net/",
    difficulty: "Beginner",
    tags: ["JavaScript", "Books", "Programming"],
    isPaid: false,
  },
];

export const freeResources = resources.filter((resource) => !resource.isPaid);
export const beginnerResources = resources.filter((resource) => resource.difficulty === "Beginner");
