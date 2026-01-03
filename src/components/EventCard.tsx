import Link from "next/link";
import { Calendar, MapPin, Monitor } from "lucide-react";
import { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getModeIcon = () => {
    switch (event.mode) {
      case "Online":
        return <Monitor size={16} />;
      case "Offline":
        return <MapPin size={16} />;
      case "Hybrid":
        return (
          <>
            <MapPin size={16} />
            <Monitor size={16} className="ml-1" />
          </>
        );
    }
  };

  return (
    <Link href={`/events/${event.slug}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow h-full cursor-pointer">
        {/* Status Badge */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              event.status === "upcoming"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {event.status === "upcoming" ? "Upcoming" : "Past Event"}
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            {getModeIcon()}
            <span>{event.mode}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {event.shortDescription}
        </p>

        {/* Date */}
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar size={16} className="mr-2 flex-shrink-0" />
          <span>{formatDate(event.date)}</span>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPin size={16} className="mr-2 flex-shrink-0" />
          <span className="line-clamp-1">{event.location}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {event.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
