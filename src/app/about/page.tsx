import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading 
        title="About DevUp Society" 
        subtitle="Learn more about our mission, vision, and what we do"
      />
      <div className="prose prose-lg max-w-4xl mx-auto">
        <p className="text-gray-600 text-lg leading-relaxed">
          DevUp Society is a student-led tech community dedicated to fostering innovation, 
          collaboration, and learning. We bring together students passionate about technology 
          and provide them with opportunities to enhance their skills, work on real projects, 
          and connect with industry professionals.
        </p>
      </div>
    </div>
  );
}
