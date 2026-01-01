import SectionHeading from "@/components/SectionHeading";
import { opportunities } from "@/data/opportunities";
import { Briefcase, Clock } from "lucide-react";

export default function Opportunities() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading 
        title="Opportunities" 
        subtitle="Internships, jobs, and projects for our members"
      />
      <div className="space-y-6">
        {opportunities.map((opportunity) => (
          <div 
            key={opportunity.id} 
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{opportunity.title}</h3>
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                    {opportunity.type}
                  </span>
                </div>
                <p className="text-gray-700 font-medium mb-2">{opportunity.company}</p>
                <p className="text-gray-600 mb-4">{opportunity.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Briefcase size={16} className="mr-2" />
                    {opportunity.location}
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    {opportunity.duration}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
