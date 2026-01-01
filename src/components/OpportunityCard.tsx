import Link from "next/link";
import { ExternalLink, Calendar, Tag } from "lucide-react";
import { Opportunity } from "@/data/opportunities";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const isExpired = new Date(opportunity.deadline) < new Date();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {opportunity.title}
            </h3>
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
              {opportunity.type}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-3">{opportunity.source}</p>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-2">
        {opportunity.description}
      </p>

      <div className="space-y-2 mb-4">
        {opportunity.eligibility && (
          <div className="flex items-start gap-2 text-sm">
            <span className="text-gray-500 font-medium">Eligibility:</span>
            <span className="text-gray-700">{opportunity.eligibility}</span>
          </div>
        )}
        {opportunity.stipend && (
          <div className="flex items-start gap-2 text-sm">
            <span className="text-gray-500 font-medium">Stipend:</span>
            <span className="text-gray-700">{opportunity.stipend}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mb-4 text-sm">
        <Calendar size={16} className="text-gray-400" />
        <span className={isExpired ? "text-red-600 font-medium" : "text-gray-600"}>
          Deadline: {new Date(opportunity.deadline).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          })}
          {isExpired && " (Expired)"}
        </span>
      </div>

      {opportunity.tags.length > 0 && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Tag size={14} className="text-gray-400" />
          {opportunity.tags.map((tag, index) => (
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
        href={opportunity.externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
      >
        View Details
        <ExternalLink size={16} />
      </Link>
    </div>
  );
}
