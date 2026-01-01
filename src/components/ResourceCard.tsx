import Link from "next/link";
import { ExternalLink, Tag } from "lucide-react";
import { Resource } from "@/data/resources";

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-gray-100 text-gray-700";
      case "Intermediate":
        return "bg-gray-200 text-gray-800";
      case "Advanced":
        return "bg-gray-300 text-gray-900";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 text-xs font-medium bg-gray-50 text-gray-600 rounded border border-gray-200">
            {resource.category}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded ${getDifficultyColor(resource.difficulty)}`}>
            {resource.difficulty}
          </span>
          {resource.isPaid && (
            <span className="px-2 py-1 text-xs font-medium bg-gray-700 text-white rounded">
              Paid
            </span>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {resource.title}
      </h3>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {resource.description}
      </p>

      {resource.tags.length > 0 && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Tag size={14} className="text-gray-400" />
          {resource.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <Link
        href={resource.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
      >
        View Resource
        <ExternalLink size={16} />
      </Link>
    </div>
  );
}
