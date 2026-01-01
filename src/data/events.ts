export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
}

export const events: Event[] = [
  {
    id: 1,
    title: "Web Development Workshop",
    description: "Learn the fundamentals of web development with HTML, CSS, and JavaScript.",
    date: "Jan 25, 2026",
    location: "Room 101, CS Building",
  },
  {
    id: 2,
    title: "Hackathon 2026",
    description: "24-hour coding challenge to build innovative solutions.",
    date: "Feb 15-16, 2026",
    location: "Main Auditorium",
  },
  {
    id: 3,
    title: "Tech Talk: AI in Industry",
    description: "Industry experts discuss the current state of AI and machine learning.",
    date: "Mar 5, 2026",
    location: "Seminar Hall A",
  },
];
