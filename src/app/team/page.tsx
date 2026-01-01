import SectionHeading from "@/components/SectionHeading";
import { teamMembers } from "@/data/team";
import { Github, Linkedin } from "lucide-react";

export default function Team() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading 
        title="Our Team" 
        subtitle="Meet the people who make DevUp Society possible"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <div 
            key={member.id} 
            className="text-center"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
            <p className="text-blue-600 text-sm mb-2">{member.role}</p>
            <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
            <div className="flex justify-center space-x-3">
              {member.github && (
                <a href={member.github} className="text-gray-600 hover:text-blue-600">
                  <Github size={18} />
                </a>
              )}
              {member.linkedin && (
                <a href={member.linkedin} className="text-gray-600 hover:text-blue-600">
                  <Linkedin size={18} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
