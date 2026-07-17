export interface Location {
  id: string;
  slug: string;
  city: string;
  state: string;
  keywords: string[];
}

export const locations: Location[] = [
  { id: "loc-1", slug: "hyderabad", city: "Hyderabad", state: "Telangana", keywords: ["Hackathon Hyderabad", "DevThon Hyderabad", "Coding Competition Hyderabad"] },
  { id: "loc-2", slug: "telangana", city: "Telangana", state: "Telangana", keywords: ["Hackathon Telangana", "Innovation Challenge Telangana"] },
  { id: "loc-3", slug: "bengaluru", city: "Bengaluru", state: "Karnataka", keywords: ["Hackathon Bengaluru", "Bangalore Hackathon"] },
  { id: "loc-4", slug: "chennai", city: "Chennai", state: "Tamil Nadu", keywords: ["Hackathon Chennai", "Coding Competition Chennai"] },
  { id: "loc-5", slug: "mumbai", city: "Mumbai", state: "Maharashtra", keywords: ["Hackathon Mumbai", "Startup Competition Mumbai"] },
  { id: "loc-6", slug: "delhi", city: "Delhi", state: "Delhi", keywords: ["Hackathon Delhi", "National Hackathon Delhi"] },
  { id: "loc-7", slug: "pune", city: "Pune", state: "Maharashtra", keywords: ["Hackathon Pune", "Student Hackathon Pune"] },
  { id: "loc-8", slug: "kolkata", city: "Kolkata", state: "West Bengal", keywords: ["Hackathon Kolkata", "Innovation Competition Kolkata"] },
  { id: "loc-9", slug: "ahmedabad", city: "Ahmedabad", state: "Gujarat", keywords: ["Hackathon Ahmedabad", "Tech Event Ahmedabad"] },
  { id: "loc-10", slug: "jaipur", city: "Jaipur", state: "Rajasthan", keywords: ["Hackathon Jaipur", "Coding Fest Jaipur"] },
  { id: "loc-11", slug: "lucknow", city: "Lucknow", state: "Uttar Pradesh", keywords: ["Hackathon Lucknow", "Software Competition Lucknow"] },
  { id: "loc-12", slug: "bhopal", city: "Bhopal", state: "Madhya Pradesh", keywords: ["Hackathon Bhopal", "Innovation Festival Bhopal"] },
  { id: "loc-13", slug: "bhubaneswar", city: "Bhubaneswar", state: "Odisha", keywords: ["Hackathon Bhubaneswar", "Tech Fest Bhubaneswar"] },
  { id: "loc-14", slug: "visakhapatnam", city: "Visakhapatnam", state: "Andhra Pradesh", keywords: ["Hackathon Visakhapatnam", "Vizag Hackathon"] },
  { id: "loc-15", slug: "warangal", city: "Warangal", state: "Telangana", keywords: ["Hackathon Warangal", "NIT Warangal Hackathon"] },
  { id: "loc-16", slug: "coimbatore", city: "Coimbatore", state: "Tamil Nadu", keywords: ["Hackathon Coimbatore", "Engineering Hackathon Coimbatore"] },
  { id: "loc-17", slug: "kochi", city: "Kochi", state: "Kerala", keywords: ["Hackathon Kochi", "Startup Event Kochi"] },
  { id: "loc-18", slug: "indore", city: "Indore", state: "Madhya Pradesh", keywords: ["Hackathon Indore", "AI Competition Indore"] },
  { id: "loc-19", slug: "nagpur", city: "Nagpur", state: "Maharashtra", keywords: ["Hackathon Nagpur", "Tech Competition Nagpur"] },
  { id: "loc-20", slug: "surat", city: "Surat", state: "Gujarat", keywords: ["Hackathon Surat", "Developer Event Surat"] },
  { id: "loc-21", slug: "patna", city: "Patna", state: "Bihar", keywords: ["Hackathon Patna", "Programming Competition Patna"] },
  { id: "loc-22", slug: "vijayawada", city: "Vijayawada", state: "Andhra Pradesh", keywords: ["Hackathon Vijayawada", "Tech Challenge Vijayawada"] }
];
