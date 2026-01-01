"use client";

import SectionHeading from "@/components/SectionHeading";
import { CheckCircle } from "lucide-react";

export default function Join() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading 
        title="Join DevUp Society" 
        subtitle="Become part of our growing community"
      />
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h3 className="text-2xl font-semibold mb-6">Why Join Us?</h3>
        <ul className="space-y-3 mb-8">
          {[
            "Access to exclusive workshops and tech talks",
            "Networking opportunities with industry professionals",
            "Hands-on experience with real projects",
            "Career guidance and mentorship",
            "Collaborative learning environment",
          ].map((benefit, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <p className="text-lg text-gray-700 mb-4">
            Ready to join? Fill out our membership form or reach out to us directly!
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
