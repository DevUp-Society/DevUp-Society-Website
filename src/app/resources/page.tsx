import SectionHeading from "@/components/SectionHeading";
import ResourceCard from "@/components/ResourceCard";
import { resources } from "@/data/resources";

type Category = "Roadmap" | "Tutorial" | "Tool" | "Cheatsheet" | "Course" | "Book" | "Documentation";

export default function Resources() {
  // Group resources by category
  const groupedResources = resources.reduce((acc, resource) => {
    const category = resource.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(resource);
    return acc;
  }, {} as Record<Category, typeof resources>);

  const categories: Category[] = [
    "Roadmap",
    "Course",
    "Tutorial",
    "Documentation",
    "Tool",
    "Cheatsheet",
    "Book"
  ];

  const stats = {
    total: resources.length,
    beginner: resources.filter(r => r.difficulty === "Beginner").length,
    intermediate: resources.filter(r => r.difficulty === "Intermediate").length,
    advanced: resources.filter(r => r.difficulty === "Advanced").length,
    free: resources.filter(r => !r.isPaid).length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading
        title="Resources"
        subtitle="Curated learning materials and tools for your development journey"
      />

      {/* Stats */}
      <div className="flex flex-wrap gap-4 mb-12 text-sm">
        <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg">
          <span className="text-gray-500">Total: </span>
          <span className="font-semibold text-gray-900">{stats.total}</span>
        </div>
        <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg">
          <span className="text-gray-500">Beginner: </span>
          <span className="font-semibold text-gray-900">{stats.beginner}</span>
        </div>
        <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg">
          <span className="text-gray-500">Intermediate: </span>
          <span className="font-semibold text-gray-900">{stats.intermediate}</span>
        </div>
        <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg">
          <span className="text-gray-500">Advanced: </span>
          <span className="font-semibold text-gray-900">{stats.advanced}</span>
        </div>
        <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg">
          <span className="text-gray-500">Free: </span>
          <span className="font-semibold text-gray-900">{stats.free}</span>
        </div>
      </div>

      {/* Grouped Resources */}
      <div className="space-y-12">
        {categories.map((category) => {
          const categoryResources = groupedResources[category];
          if (!categoryResources || categoryResources.length === 0) return null;

          return (
            <div key={category}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                {category}s <span className="text-gray-400 text-lg font-normal">({categoryResources.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
