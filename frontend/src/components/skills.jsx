import { FaJs, FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiExpress, SiMongodb } from "react-icons/si";

const SKILLS = [
  {
    icon: SiTailwindcss,
    title: "Tailwind CSS",
    desc: "Creating responsive, modern, and clean layouts quickly using utility-first styling.",
  },
  {
    icon: FaJs,
    title: "JavaScript",
    desc: "Writing efficient, modern, and optimized code for both frontend and backend logic.",
  },
  {
    icon: FaReact,
    title: "React",
    desc: "Building fast, interactive, and component-based UIs with clean state management.",
  },
  {
    icon: FaNodeJs,
    title: "Node.js",
    desc: "Building scalable server-side logic and REST APIs with an event-driven runtime.",
  },
  {
    icon: SiExpress,
    title: "Express.js",
    desc: "Structuring clean, middleware-driven APIs and routing for backend services.",
  },
  {
    icon: SiMongodb,
    title: "MongoDB",
    desc: "Designing flexible, document-based schemas for fast, scalable data storage.",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-white text-center">Skills &amp; Technologies</h2>
      <p className="section-eyebrow mt-3">
        I work with modern tools and technologies to build fast, scalable and efficient
        web applications.
      </p>

      <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {SKILLS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card p-6 text-center hover:border-accentBlue/60 transition-colors">
            <div className="mx-auto w-14 h-14 rounded-xl bg-navy-700 flex items-center justify-center text-accentBlue mb-4">
              <Icon size={26} />
            </div>
            <h3 className="text-white font-semibold text-lg">{title}</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}