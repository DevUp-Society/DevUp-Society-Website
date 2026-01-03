import SectionHeading from "@/components/SectionHeading";
import EventCard from "@/components/EventCard";
import { upcomingEvents, pastEvents } from "@/data/events";

export default function Events() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading 
        title="Events" 
        subtitle="Join us for workshops, hackathons, tech talks, and more"
      />

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Past Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* No Events Message */}
      {upcomingEvents.length === 0 && pastEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No events available at the moment.</p>
        </div>
      )}
    </div>
  );
}
