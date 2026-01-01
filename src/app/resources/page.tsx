import SectionHeading from "@/components/SectionHeading";
import { resources } from "@/data/resources";
import { ExternalLink } from "lucide-react";

export default function Resources() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading 
        title="Resources" 
        subtitle="Curated learning materials and tools for your development journey"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded mb-2">
                  {resource.category}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-gray-600">{resource.description}</p>
              </div>
              <ExternalLink size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
