import { events } from "@/data/events";
import { Calendar, MapPin, Monitor, User } from "lucide-react";
import Link from "next/link";

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-8">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/events"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getModeIcon = () => {
    switch (event.mode) {
      case "Online":
        return <Monitor size={20} />;
      case "Offline":
        return <MapPin size={20} />;
      case "Hybrid":
        return (
          <>
            <MapPin size={20} />
            <Monitor size={20} className="ml-2" />
          </>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Back Button */}
      <Link
        href="/events"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <span className="mr-2">←</span> Back to Events
      </Link>

      {/* Status Badge */}
      <div className="mb-4">
        <span
          className={`text-sm font-semibold px-4 py-2 rounded-full ${
            event.status === "upcoming"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {event.status === "upcoming" ? "Upcoming Event" : "Past Event"}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{event.title}</h1>

      {/* Event Info */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 text-gray-700">
        <div className="flex items-center">
          <Calendar size={20} className="mr-2 flex-shrink-0" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center">
          <MapPin size={20} className="mr-2 flex-shrink-0" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center">
          {getModeIcon()}
          <span className="ml-2">{event.mode}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {event.tags.map((tag, index) => (
          <span
            key={index}
            className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Registration Link */}
      {event.status === "upcoming" && event.registrationLink && (
        <div className="mb-8">
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
          >
            Register Now
          </a>
        </div>
      )}

      {/* Image Gallery */}
      {event.images.length > 0 && (
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {event.images.map((image, index) => (
              <div
                key={index}
                className="aspect-video bg-gray-200 rounded-lg overflow-hidden"
              >
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span className="text-sm">Event Image {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {event.fullDescription}
        </p>
      </div>

      {/* Speakers */}
      {event.speakers.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Speakers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {event.speakers.map((speaker, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={28} className="text-gray-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {speaker.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{speaker.designation}</p>
                  {speaker.company && (
                    <p className="text-gray-500 text-sm">{speaker.company}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Short Description */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-2">Quick Summary</h3>
        <p className="text-gray-700">{event.shortDescription}</p>
      </div>
    </div>
  );
}
