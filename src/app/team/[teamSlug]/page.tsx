import Link from "next/link";
import TeamCard from "@/components/TeamCard";
import { teamMembers } from "@/data/team";

interface TeamPageProps {
  params: Promise<{
    teamSlug: string;
  }>;
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { teamSlug } = await params;
  
  // Check if this teamSlug exists at all
  const teamExists = teamMembers.some((member) => member.teamSlug === teamSlug);
  
  // Filter team members by teamSlug and teamType === "member"
  const members = teamMembers.filter(
    (member) => member.teamSlug === teamSlug && member.teamType === "member"
  );

  // Get team name from any member with this slug
  const teamName = teamMembers.find((m) => m.teamSlug === teamSlug)?.teamName || null;

  // Also get core team members with same teamSlug for context
  const coreMembers = teamMembers.filter(
    (member) => member.teamSlug === teamSlug && member.teamType === "core"
  );

  // Invalid slug - team doesn't exist
  if (!teamExists) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Team Not Found</h1>
          <p className="text-gray-600 mb-8">
            The team you're looking for doesn't exist.
          </p>
          <Link
            href="/team"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Team
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Back Button */}
      <Link
        href="/team"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <span className="mr-2">←</span> Back to Team
      </Link>

      {/* Team Name */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {teamName || "Team"}
        </h1>
        <p className="text-gray-600">
          Meet the members of our {teamName?.toLowerCase() || "team"}
        </p>
      </div>

      {/* Core Team Members (if any) */}
      {coreMembers.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Team Lead
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {coreMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      )}

      {/* Team Members */}
      {members.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Team Members
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {members.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">
            Team members will be added soon.
          </p>
        </div>
      )}
    </div>
  );
}
