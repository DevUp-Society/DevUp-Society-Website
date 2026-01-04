import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { coreTeam } from "@/data/team";

export default function Team() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading 
        title="Our Team" 
        subtitle="Meet the leadership behind DevUp Society"
      />

      {/* Core Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {coreTeam.map((member) => (
          <div key={member.id} className="text-center">
            {/* Photo Placeholder */}
            <div className="w-40 h-40 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
              {member.name.split(" ").map((n) => n[0]).join("")}
            </div>

            {/* Name */}
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {member.name}
            </h3>

            {/* Role */}
            <p className="text-gray-600 text-sm mb-1">{member.role}</p>

            {/* Year */}
            <p className="text-gray-500 text-xs mb-4">{member.year}</p>

            {/* View Team Button */}
            <Link href={`/team/${member.teamSlug}`}>
              <button className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                View {member.teamName}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
