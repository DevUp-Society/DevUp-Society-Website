"use client";

import { useState } from "react";
import { Github, Linkedin, Instagram, Twitter, Globe } from "lucide-react";
import { TeamMember } from "@/data/team";

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  const [showQuote, setShowQuote] = useState(false);

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "github":
        return <Github size={18} />;
      case "linkedin":
        return <Linkedin size={18} />;
      case "instagram":
        return <Instagram size={18} />;
      case "twitter":
        return <Twitter size={18} />;
      case "portfolio":
        return <Globe size={18} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="text-center group cursor-pointer"
      onMouseEnter={() => setShowQuote(true)}
      onMouseLeave={() => setShowQuote(false)}
      onClick={() => setShowQuote(!showQuote)}
    >
      {/* Photo Placeholder */}
      <div className="w-32 h-32 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
        {member.name.split(" ").map((n) => n[0]).join("")}
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>

      {/* Role */}
      <p className="text-gray-700 font-medium text-sm mb-1">{member.role}</p>

      {/* Year */}
      <p className="text-gray-500 text-xs mb-4">{member.year}</p>

      {/* Quote (shown on hover/click) */}
      <div
        className={`min-h-[60px] mb-4 transition-opacity duration-200 ${
          showQuote ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-gray-600 text-sm italic px-2">
          "{member.quote}"
        </p>
      </div>

      {/* Social Links */}
      <div className="flex justify-center space-x-3">
        {member.socialLinks.linkedin && (
          <a
            href={member.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {getSocialIcon("linkedin")}
          </a>
        )}
        {member.socialLinks.github && (
          <a
            href={member.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {getSocialIcon("github")}
          </a>
        )}
        {member.socialLinks.instagram && (
          <a
            href={member.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {getSocialIcon("instagram")}
          </a>
        )}
        {member.socialLinks.twitter && (
          <a
            href={member.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {getSocialIcon("twitter")}
          </a>
        )}
        {member.socialLinks.portfolio && (
          <a
            href={member.socialLinks.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {getSocialIcon("portfolio")}
          </a>
        )}
      </div>
    </div>
  );
}
