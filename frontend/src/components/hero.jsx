import {
  FaShareAlt,
  FaCog,
  FaJs,
  FaReact,
  FaCss3Alt,
  FaDatabase,
} from "react-icons/fa";

const FLOATING_ICONS = [
  { Icon: FaShareAlt, pos: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" },
  { Icon: FaCog, pos: "top-6 right-0 translate-x-1/2" },
  { Icon: FaJs, pos: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" },
  { Icon: FaReact, pos: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2" },
  { Icon: FaCss3Alt, pos: "bottom-6 left-2" },
  { Icon: FaDatabase, pos: "bottom-6 right-2" },
];

export default function Hero() {
  return (
    <section id="home" className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <p className="text-3xl md:text-4xl font-semibold text-white">Hi, I'm</p>
        <h1 className="text-4xl md:text-5xl font-extrabold gradient-text mt-1">
          Dwight James Dupit
        </h1>
        <p className="mt-6 text-slate-400 max-w-md leading-relaxed">
          I build scalable full-stack applications using React, Node.js, Express and
          MongoDB. I love clean code and fast UIs.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#projects" className="btn-gradient">
            View Projects
          </a>
          <a href="#contact" className="btn-outline">
            Let's Collaborate ↗
          </a>
        </div>
      </div>

      <div className="relative mx-auto w-72 h-72 md:w-80 md:h-80">
        <div className="absolute inset-0 rounded-full bg-brand-gradient opacity-20 blur-2xl" />
        <div className="relative w-full h-full rounded-full border border-navy-600 bg-navy-800 overflow-hidden shadow-glow">
          <img
            src="/logo.jpg"
            alt="Sajid Yaqub"
            className="w-full h-full object-cover"
          />
        </div>

        {FLOATING_ICONS.map(({ Icon, pos }, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-11 h-11 rounded-full bg-navy-800 border border-navy-600 flex items-center justify-center text-accentBlue shadow-lg`}
          >
            <Icon size={18} />
          </div>
        ))}
      </div>
    </section>
  );
}