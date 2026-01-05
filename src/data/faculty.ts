export interface Faculty {
  id: string;
  name: string;
  designation: string;
  department: string;
  photo: string;
  shortSupportNote: string;
  email?: string;
}

export const faculty: Faculty[] = [
  {
    id: "fac-001",
    name: "Dr. Rajesh Kumar",
    designation: "Professor & Head",
    department: "Computer Science & Engineering",
    photo: "/faculty/rajesh-kumar.jpg",
    shortSupportNote: "DevUp Society has been instrumental in fostering innovation and technical excellence among our students. I'm proud to support their initiatives.",
    email: "rajesh.kumar@college.edu",
  },
  {
    id: "fac-002",
    name: "Dr. Meera Deshmukh",
    designation: "Associate Professor",
    department: "Information Technology",
    photo: "/faculty/meera-deshmukh.jpg",
    shortSupportNote: "The club provides students with practical exposure and industry connections that complement their academic learning perfectly.",
    email: "meera.deshmukh@college.edu",
  },
  {
    id: "fac-003",
    name: "Prof. Anil Verma",
    designation: "Assistant Professor",
    department: "Computer Applications",
    photo: "/faculty/anil-verma.jpg",
    shortSupportNote: "DevUp Society bridges the gap between classroom knowledge and real-world tech skills. Their events and workshops are truly impactful.",
    email: "anil.verma@college.edu",
  },
];
