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
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769354914/faizan_vnwpay_e400ar.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/faizanmohammed07tech",
            github: "https://github.com/FaizanMohammed07",
            instagram: "https://www.instagram.com/fa1zan._x0?igsh=MW10YTlhcDRtOWY5bg=="
        },
        quote: "Leading the community vision and fostering connections.",
    },

    {
        id: "tm-101",
        name: "Syed Asif",
        role: "Chief Executive Director — Strategy & Growth",
        year: "3rd Year",
        teamType: "core",
        teamSlug: "leadership",
        teamName: "Leadership",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769354896/Asif_hwuhio.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/syed-asif2505?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            instagram: "https://www.instagram.com/ashhdoingthings"
        },
        quote: "Driving long-term growth strategy.",
    },
    {
        id: "tm-102",
        name: "Thapendra D",
        role: "Executive Director — Operations & Execution",
        year: "3rd Year",
        teamType: "core",
        teamSlug: "leadership",
        teamName: "Leadership",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769354903/thapendra_dzzliz.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/thapendra-donepudi-4670b628b/",
            github: "https://github.com/Thapendra",
            instagram: "https://www.instagram.com/thapendra_donepudi?igsh=NDV0ZHA3azJscTVm"
        },
        quote: "Ensuring execution excellence.",
    },
    {
        id: "tm-103",
        name: "Narsing Yadav",
        role: "Executive — Innovation & Ecosystem",
        year: "3rd Year",
        teamType: "core",
        teamSlug: "leadership",
        teamName: "Leadership",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769354899/Narsing_vpwb5f.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/chipuri-narsing-yadav-b38504290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            github: "https://github.com/Narsingyadav",
            instagram: "https://www.instagram.com/cny_1505?igsh=MXJtdXNjZWY2c3R1bQ=="
        },
        quote: "Expanding innovation networks.",
    },
    {
        id: "tm-002",
        name: "Sai Srujan",
        role: "Tech Lead & Advisor",
        year: "2nd Year, IT",
        teamType: "core",
        teamSlug: "tech",
        teamName: "Technical Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769354909/Sai_Srujan_a1qxuo.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/saisrujanpunati",
            github: "https://github.com/saiusesgithub",
            instagram: "https://www.instagram.com/__saisrujan__"
        },
        quote: "Driving technical innovation.",
    },
    {
        id: "tm-003",
        name: "Harshavardhan",
        role: "Content & Outreach Lead",
        year: "2nd Year, IT",
        teamType: "core",
        teamSlug: "content",
        teamName: "Content & Outreach Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769354906/harsha_ddgh5f_m7inv6.png",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/harsh-vardhan-6b0a69325?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            github: "https://github.com/Harshavardhan021",
            instagram: "https://www.instagram.com/harsha._.021/"
        },
        quote: "Managing creative communications.",
    },
    {
        id: "tm-004",
        name: "Karthik",
        role: "Research & Innovation Lead",
        year: "2nd Year, IT",
        teamType: "core",
        teamSlug: "research",
        teamName: "Research & Innovation Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769354888/pavanakarthikeya_tehppr_oa73u4.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/pavan-karthik-a377b632b/",
            github: "https://github.com/pavanakarthik12",
            instagram: "https://www.instagram.com/pavanakarthik_890"
        },
        quote: "Driving innovation and research.",
    },
    {
        id: "tm-005",
        name: "Govardhan",
        role: "Design Lead",
        year: "2nd Year, IT",
        teamType: "core",
        teamSlug: "design",
        teamName: "Design Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769354894/1769267203106_3_-_Govardhan_Jyosula_rtfz3z_wkvpbg.png",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/govardhan-jyosula-278059326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            github: "https://github.com/JGovardhan2007"
        },
        quote: "Leading visual design.",
    },
    {
        id: "tm-006",
        name: "Emmanuel",
        role: "Events Lead",
        year: "2nd Year, IT",
        teamType: "core",
        teamSlug: "events",
        teamName: "Events & Operations Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769354904/Emmanuel_in3fpb_rbkqxv.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/emmanuel-sathur-113128342?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            instagram: "https://www.instagram.com/roryyy.__?igsh=YW5kMmhpajNyN2sx"
        },
        quote: "Managing events and logistics.",
    },
    {
        id: "tm-007",
        name: "Nashra Fatima",
        role: "Partnerships Lead",
        year: "2nd Year, IT",
        teamType: "core",
        teamSlug: "partnerships",
        teamName: "Collaboration & Partnerships Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769351440/31858bc72e19519f0ccbe2e646e4d9ae_high_-_Nashra_Fatima_m91aub.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/nashra-fatima-b6a83b326",
            instagram: "https://www.instagram.com/_shaik.nashra_"
        },
        quote: "Building collaborations.",
    },
    {
        id: "tm-008",
        name: "Jeevan",
        role: "Marketing Lead",
        year: "2nd Year, IT",
        teamType: "core",
        teamSlug: "marketing",
        teamName: "Marketing Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769354889/Jeevan_amp3xz_cgvfhk.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/jeevan-charugundla?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            github: "https://github.com/jeevan-charugundla",
            instagram: "https://www.instagram.com/jeevan_exe?igsh=MTdvZzA4dGxvdDdqbA=="
        },
        quote: "Managing media presence.",
    },
    {
        id: "tm-009",
        name: "Syed Abrar",
        role: "Mission & Support Lead",
        year: "2nd Year, IT",
        teamType: "core",
        teamSlug: "support",
        teamName: "Support Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769354912/Abrar_aiswqi_idwt2w.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/syed-abrar-809045356/",
            instagram: "https://www.instagram.com/_abrar_x18/"
        },
        quote: "Ensuring smooth operations.",
    },
    {
        id: "tm-010",
        name: "Chathurya Pandiri",
        role: "IT Branch Representative",
        year: "2nd Year, IT",
        teamType: "core",
        teamSlug: "leadership",
        teamName: "Leadership",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769354891/Chathurya_cfaftx_pe9qsx.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/chathurya-pandiri-26b6b4331",
            instagram: "https://www.instagram.com/_ft.chathurya"
        },
        quote: "Representing student voices.",
    },

    // ================= TECHNICAL TEAM =================

    {
        id: "tm-011",
        name: "Cheerath Aniketh",
        role: "Technical Team Member",
        year: "1st Year, CSE",
        teamType: "member",
        teamSlug: "tech",
        teamName: "Technical Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769349508/Aniketh_nunmkl.png",
        socialLinks: {},
        quote: "Building practical systems.",
    },
    {
        id: "tm-012",
        name: "Aitha Sathvika",
        role: "Technical Team Member",
        year: "1st Year, CSE - AIML",
        teamType: "member",
        teamSlug: "tech",
        teamName: "Technical Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769349508/Sathvika_Aitha_cccpq4.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/aitha-sathvika-5821",
            github: "https://github.com/sathvikaaitha033",
            instagram: "https://www.instagram.com/sathviiiiika_03",
        },
        quote: "Exploring AI development.",
    },
    {
        id: "tm-013",
        name: "Siledar Shashank",
        role: "Technical Team Member",
        year: "1st Year, CSE",
        teamType: "member",
        teamSlug: "tech",
        teamName: "Technical Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769349508/Shashank_ayqfoh.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/shashank-siledar-52142a304",
            instagram: "https://www.instagram.com/me_shashank_16",
        },
        quote: "Passionate about systems.",
    },
    {
        id: "tm-014",
        name: "Gubba Nithish",
        role: "Technical Team Member",
        year: "2nd Year, IT",
        teamType: "member",
        teamSlug: "tech",
        teamName: "Technical Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769349508/Nithish_bhuu9x.jpg",
        socialLinks: {
            linkedin: "https://share.google/kqJjhMrqHBHynTIu4",
            instagram: "https://www.instagram.com/gubbanithish",
        },
        quote: "Learning through projects.",
    },
    {
        id: "tm-015",
        name: "Karan Prajapati",
        role: "Technical Team Member",
        year: "2nd Year, IT",
        teamType: "member",
        teamSlug: "tech",
        teamName: "Technical Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769349508/Karan_kggogw.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/karan-prajapati-680100342",
            instagram: "https://www.instagram.com/_karan._.19",
        },
        quote: "Hands-on learner.",
    },
    {
        id: "tm-016",
        name: "Manasvi Neerudi",
        role: "Technical Team Member",
        year: "1st Year, CSE",
        teamType: "member",
        teamSlug: "tech",
        teamName: "Technical Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769349507/Manasvi_Neerudi_xp3aue.jpg",
        socialLinks: {
            instagram: "https://www.instagram.com/_manasvi_.13",
        },
        quote: "Curious developer.",
    },
    {
        id: "tm-017",
        name: "Mohammed Mohiuddin",
        role: "Technical Team Member",
        year: "1st Year, CSE - AIML",
        teamType: "member",
        teamSlug: "tech",
        teamName: "Technical Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769349507/MOHAMMED_MOHIUDDIN_xc9uqs.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/mohammed-mohi-uddin-aa4ba934b",
            github: "https://github.com/mohi2006august",
            instagram: "https://www.instagram.com/moh_iuddin18",
        },
        quote: "AI enthusiast.",
    },
    {
        id: "tm-018",
        name: "Furqaan Hussain",
        role: "Technical Team Member",
        year: "1st Year, CSE",
        teamType: "member",
        teamSlug: "tech",
        teamName: "Technical Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769349507/Furqaan_lstaht.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/mohammed-furqaan-hussain-9624a1387",
            github: "https://github.com/Furqaan-Hussain",
            instagram: "https://www.instagram.com/furq.aann",
        },
        quote: "Problem solver.",
    },
    {
        id: "tm-019",
        name: "Laasya Kavuri",
        role: "Technical Team Member",
        year: "1st Year, ECE",
        teamType: "member",
        teamSlug: "tech",
        teamName: "Technical Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769349507/Lassya_z4bhw0.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/laasya-kavuri-a297a4374",
            instagram: "https://www.instagram.com/laasya_kavuri_",
        },
        quote: "Exploring technology.",
    },

    // ================= MARKETING TEAM =================
    {
        id: "tm-020",
        name: "Riya Kumari",
        role: "Marketing Team Member",
        year: "1st Year, IT",
        teamType: "member",
        teamSlug: "marketing",
        teamName: "Marketing Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769350949/20251025_202329_0000_-_Riya_jha_eqeteo.png",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/riya-jha-b35133306",
        },
        quote: "Creative communicator.",
    },
    {
        id: "tm-021",
        name: "P. Yeshwanth Chowdary",
        role: "Marketing Team Member",
        year: "3rd Year, CSE - DS",
        teamType: "member",
        teamSlug: "marketing",
        teamName: "Marketing Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769350947/IMG-20251023-WA0049_-_Yeshwant_Chowdary_dfdi8h.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/yeshwanth-pavuluri-9018a5390",
            instagram: "https://www.instagram.com/_yeshu__chowdary_",
        },
        quote: "Strategic marketer.",
    },
    {
        id: "tm-022",
        name: "Aliya Banu",
        role: "Marketing Team Member",
        year: "2nd Year, IT",
        teamType: "member",
        teamSlug: "marketing",
        teamName: "Marketing Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769350884/IMG-20260112-WA0001_-_Aliya_banu_wirnx6.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/aliya-banu-2a7142356",
            github: "https://github.com/aliyabanu242006-arch",
            instagram: "https://www.instagram.com/aliya_banu_24",
        },
        quote: "Creative strategist.",
    },
    {
        id: "tm-023",
        name: "Bhanu Prasanna Bathula",
        role: "Marketing Team Member",
        year: "2nd Year, CSE",
        teamType: "member",
        teamSlug: "marketing",
        teamName: "Marketing Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769350886/IMG-20250329-WA0130_-_5D7_Bhanu_prasanna_cmy9lz.jpg",
        socialLinks: {
            instagram: "https://www.instagram.com/BhanuPrasanna_14",
        },
        quote: "Brand promoter.",
    },
    {
        id: "tm-024",
        name: "Syed Naveed Ahmed",
        role: "Marketing Team Member",
        year: "2nd Year, CSE",
        teamType: "member",
        teamSlug: "marketing",
        teamName: "Marketing Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769350885/1764046971825_-_5B7_Syed_Naveed_Ahmed_qpkcvd.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/syed-naveed-ahmed-9891b6317",
            instagram: "https://www.instagram.com/_.naveed.__",
        },
        quote: "Focused on engagement.",
    },
    {
        id: "tm-025",
        name: "Mahathi Chinta",
        role: "Marketing Team Member",
        year: "2nd Year, IT",
        teamType: "member",
        teamSlug: "marketing",
        teamName: "Marketing Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769350882/me_-_Mahathi_qhuzmt.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/mahathi-chinta/",
            github: "https://github.com/chintamahathi",
            instagram: "https://www.instagram.com/mahathi.verse",
        },
        quote: "Digital storyteller.",
    },
    {
        id: "tm-026",
        name: "Neerati Rupasri",
        role: "Marketing Team Member",
        year: "2nd Year, IT",
        teamType: "member",
        teamSlug: "marketing",
        teamName: "Marketing Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769350882/IMG-20260107-WA0023_-_RUPA-43_vgmkon.jpg",
        socialLinks: {},
        quote: "Outreach specialist.",
    },
    {
        id: "tm-027",
        name: "Juveria Usman",
        role: "Marketing Team Member",
        year: "3rd Year, IT",
        teamType: "member",
        teamSlug: "marketing",
        teamName: "Marketing Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769350881/1757694653571_-_Juveria_Usman_cx87xh.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/juveria-usman-07821b2aa",
            instagram: "https://www.instagram.com/juveriaa.21",
        },
        quote: "Creative marketer.",
    },

    // ================= CONTENT & OUTREACH =================

    {
        id: "tm-028",
        name: "Shruthi Goud",
        role: "Content & Outreach Member",
        year: "2nd Year, IT",
        teamType: "member",
        teamSlug: "content",
        teamName: "Content & Outreach Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769351458/IMG_0404_-_Shruthi_Goud_i5t7wf.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/shruthi-goud-p-8699ba380",
            instagram: "https://www.instagram.com/_p.s.goud_",
        },
        quote: "Creating content that connects people.",
    },
    {
        id: "tm-029",
        name: "Anjali Ladde",
        role: "Content & Outreach Member",
        year: "1st Year, CSE - DS",
        teamType: "member",
        teamSlug: "content",
        teamName: "Content & Outreach Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769351367/Anjali_photo_-_Anjali_Ladde_e5vg8s.jpg",
        socialLinks: {},
        quote: "Learning to communicate ideas effectively.",
    },
    {
        id: "tm-030",
        name: "Akshitha A",
        role: "Content & Outreach Member",
        year: "1st Year, IT",
        teamType: "member",
        teamSlug: "content",
        teamName: "Content & Outreach Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769351366/IMG_20260112_115120_-_Akshitha_A_c1s33i.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/akshitha-a-381117392",
            instagram: "https://www.instagram.com/akshithaa_016",
        },
        quote: "Creative learner.",
    },
    {
        id: "tm-031",
        name: "Athikah Abdul Azeem",
        role: "Content & Outreach Member",
        year: "2nd Year, IT",
        teamType: "member",
        teamSlug: "content",
        teamName: "Content & Outreach Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769351365/IMG-20250922-WA0024_-_Athikah_Azeem_vfiik9.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/athikah-azeem-2287b2328",
            github: "https://github.com/Athikah-aa",
            instagram: "https://www.instagram.com/Athikah_aa",
        },
        quote: "Turning ideas into impactful narratives.",
    },
    {
        id: "tm-032",
        name: "R. Rishika",
        role: "Content & Outreach Member",
        year: "2nd Year, IT",
        teamType: "member",
        teamSlug: "content",
        teamName: "Content & Outreach Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769351362/IMG-20241112-WA0096_-_rishikarathod_ustw3m.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/rishika-rathod-574728326",
            instagram: "https://www.instagram.com/riishika_rathod",
        },
        quote: "Expressing ideas through creative content.",
    },
    {
        id: "tm-033",
        name: "Dhanush Reddy",
        role: "Content & Outreach Member",
        year: "2nd Year, IT",
        teamType: "member",
        teamSlug: "content",
        teamName: "Content & Outreach Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769351358/Profilephoto_-_Dhanush_Reddy_au56fh.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/dhanush-reddy-50551b309/",
            instagram: "https://www.instagram.com/dhanush_reddy21",
        },
        quote: "Content creation with consistency and clarity.",
    },

    // ================= EVENTS & OPERATIONS =================

    {
        id: "tm-034",
        name: "Amaan",
        role: "Events & Operations Member",
        year: "1st Year, CSE - DS",
        teamType: "member",
        teamSlug: "events",
        teamName: "Events & Operations Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769351078/IMG_2553_-_AMAAN_ndplxq.jpg",
        socialLinks: {
            instagram: "https://www.instagram.com/amaan.ahmed2",
        },
        quote: "Supporting events with enthusiasm and teamwork.",
    },
    {
        id: "tm-035",
        name: "Jagruthi Sivampeta",
        role: "Events & Operations Member",
        year: "2nd Year, IT",
        teamType: "member",
        teamSlug: "events",
        teamName: "Events & Operations Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769351077/DSCF6605_-_Jagruthi_S_fdrsqq.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/jagruthi-sivampeta-4127b832b",
            instagram: "https://www.instagram.com/jags_19.05",
        },
        quote: "Managing operations with precision.",
    },
    {
        id: "tm-036",
        name: "Garima Choudhary",
        role: "Events & Operations Member",
        year: "2nd Year, IT",
        teamType: "member",
        teamSlug: "events",
        teamName: "Events & Operations Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769351075/GARIMA_-_Garima_Choudhary_bb2ere.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/garima-choudhary-51b404356",
            github: "https://github.com/bugbyte-code",
            instagram: "https://www.instagram.com/garimagc183",
        },
        quote: "Ensuring seamless execution of events.",
    },
    // ================= RESEARCH & INNOVATION =================

    {
        id: "tm-037",
        name: "A. Vaishnavi",
        role: "Research & Innovation Member",
        year: "1st Year, CSE - DS",
        teamType: "member",
        teamSlug: "research",
        teamName: "Research & Innovation Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769350761/1769278572890_-_Vaishnavi_rnz0p1.png",
        socialLinks: {
            instagram: "https://www.instagram.com/vxnavi.3",
        },
        quote: "Analytical thinker.",
    },
    {
        id: "tm-038",
        name: "Uthukota Mohitha",
        role: "Research & Innovation Member",
        year: "1st Year, CSE - AIML",
        teamType: "member",
        teamSlug: "research",
        teamName: "Research & Innovation Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769350760/IMAGE_-_UTHUKOTA_MOHITHA_xosodq.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/uthukota-mohitha-245b96390",
            github: "https://github.com/Mohitha011207",
            instagram: "@u.mohitha",
        },
        quote: "Exploring AI-driven research paths.",
    },
    {
        id: "tm-039",
        name: "Syed Anas",
        role: "Research & Innovation Member",
        year: "1st Year, CSE - DS",
        teamType: "member",
        teamSlug: "research",
        teamName: "Research & Innovation Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769350760/image_2026-01-12_165649372_-_anas_vpsje1.png",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/syedanas007",
            github: "https://github.com/ACLICXDD",
            instagram: "@syedd.anass",
        },
        quote: "Driven by curiosity and innovation.",
    },
    {
        id: "tm-040",
        name: "Sahasra",
        role: "Research & Innovation Member",
        year: "2nd Year, IT",
        teamType: "member",
        teamSlug: "research",
        teamName: "Research & Innovation Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769350760/sahasrapic_-_SAHASRA_ykests.jpg",
        socialLinks: {},
        quote: "Exploring ideas through research and experimentation.",
    },
    {
        id: "tm-041",
        name: "Shaik Minhaj Basha",
        role: "Research & Innovation Member",
        year: "1st Year, CSE",
        teamType: "member",
        teamSlug: "research",
        teamName: "Research & Innovation Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769350759/20250913_172346_-_Minhaj_Shaik_xduoi1.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/minhaj-shaik-097674382",
            github: "https://github.com/shaikminhajbasha-art",
            instagram: "https://www.instagram.com/minhaj_1207",
        },
        quote: "Learning research through hands-on exploration.",
    },
    {
        id: "tm-042",
        name: "Bakka Sathvika",
        role: "Research & Innovation Member",
        year: "1st Year, CSE - DS",
        teamType: "member",
        teamSlug: "research",
        teamName: "Research & Innovation Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769350759/IMG-20250310-WA0001_-_B.Sathvika_reddy_g5tjru.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/b-sathvika-reddy-98bb4936a",
            instagram: "https://www.instagram.com/sathvika.reddy_03",
        },
        quote: "Researching with curiosity and persistence.",
    },

    // ================= DESIGN TEAM =================

    {
        id: "tm-043",
        name: "Nithin Addetla",
        role: "Design Team Member",
        year: "2nd Year, IT",
        teamType: "member",
        teamSlug: "design",
        teamName: "Design Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769351205/IMG_20251106_101335_-_ADDETLA_NITHIN_jjzf57.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/nithin-addetla-72a705366",
        },
        quote: "Designing visuals that communicate clearly.",
    },
    {
        id: "tm-044",
        name: "Sai Tharun Vangapally",
        role: "Design Team Member",
        year: "2nd Year, IT",
        teamType: "member",
        teamSlug: "design",
        teamName: "Design Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769351203/IMG_20250807_215718_-_12K0__SAI_Tharun_l0wicp.jpg",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/saitharun-vangapally-ba1642331",
            github: "https://github.com/saitharunvangapally07-png",
            instagram: "https://www.instagram.com/tharun777__07",
        },
        quote: "Blending creativity with functionality.",
    },
    {
        id: "tm-045",
        name: "Srinithya Madaram",
        role: "Design Team Member",
        year: "1st Year, CSE",
        teamType: "member",
        teamSlug: "design",
        teamName: "Design Team",
        photo: "https://res.cloudinary.com/dmrp1d1tv/image/upload/v1769351198/IMG-20260114-WA0000_-_Srinithya_Madaram_npi2mr.jpg",
        socialLinks: {
            instagram: "https://www.instagram.com/snith.jm",
        },
        quote: "Exploring creativity through design.",
    },


    // ================= PARTNERSHIPS =================
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