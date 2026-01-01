"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import OpportunityCard from "@/components/OpportunityCard";
import { opportunities, Opportunity } from "@/data/opportunities";

type FilterType = "All" | "Internship" | "Hackathon" | "Scholarship" | "Open Source" | "Fellowship" | "Competition";

const filterTypes: FilterType[] = [
  "All",
  "Internship",
  "Hackathon",
  "Scholarship",
  "Open Source",
  "Fellowship",
  "Competition"
];

export default function Opportunities() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const filteredOpportunities: Opportunity[] =
    activeFilter === "All"
      ? opportunities
      : opportunities.filter((opp) => opp.type === activeFilter);

  const activeCount = filteredOpportunities.filter(
    (opp) => new Date(opp.deadline) >= new Date()
  ).length;

  const expiredCount = filteredOpportunities.filter(
    (opp) => new Date(opp.deadline) < new Date()
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading
        title="Opportunities"
        subtitle="Explore internships, hackathons, scholarships, and more"
      />

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filterTypes.map((filter) => {
          const count =
            filter === "All"
              ? opportunities.length
              : opportunities.filter((opp) => opp.type === filter).length;

          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeFilter === filter
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {filter} ({count})
            </button>
          );
        })}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 mb-8 text-sm">
        <div>
          <span className="text-gray-500">Active: </span>
          <span className="font-medium text-gray-900">{activeCount}</span>
        </div>
        <div>
          <span className="text-gray-500">Expired: </span>
          <span className="font-medium text-gray-900">{expiredCount}</span>
        </div>
      </div>

      {/* Opportunities Grid */}
      {filteredOpportunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No opportunities found for this filter.</p>
        </div>
      )}
    </div>
  );
}
