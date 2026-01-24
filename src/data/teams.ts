// teams.ts - Team definitions
// Each team has a slug used for dynamic routing (/teams/[slug])

export interface Team {
    slug: string;
    name: string;
    description: string;
    icon: string; // Iconify icon name
}

export const teams: Team[] = [
    {
        slug: 'tech',
        name: 'Technical Team',
        description: 'Web, mobile, and backend development. Building products that matter.',
        icon: 'lucide:code'
    },
    {
        slug: 'design',
        name: 'Design Team',
        description: 'UI/UX, branding, and graphics. Crafting beautiful experiences.',
        icon: 'lucide:palette'
    },
    {
        slug: 'marketing',
        name: 'Marketing Team',
        description: 'Content creation, social media, and outreach. Spreading the word.',
        icon: 'lucide:megaphone'
    },
    {
        slug: 'events',
        name: 'Events Team',
        description: 'Planning, logistics, and execution. Making things happen.',
        icon: 'lucide:calendar'
    }
];
