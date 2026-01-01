import SectionHeading from "@/components/SectionHeading";
import { events } from "@/data/events";
import { Calendar, MapPin } from "lucide-react";

export default function Events() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading 
        title="Events" 
        subtitle="Join us for workshops, hackathons, tech talks, and more"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div 
            key={event.id} 
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Calendar size={16} className="mr-2" />
              {event.date}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin size={16} className="mr-2" />
              {event.location}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
