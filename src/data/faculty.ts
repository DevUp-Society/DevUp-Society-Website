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
        name: "Dr. A. Obulesu",
        designation: "Head of Department",
        department: "Information Technology",
        photo: "/converner/obulesu.jpeg",
        shortSupportNote: "We extend our heartfelt gratitude to Dr. A. Obulesu, HOD of IT Department, for his invaluable guidance and unwavering support in making DevUp Society possible.",
        email: "hod.it@college.edu",
    },
];