import {
  FaShareAlt,
  FaCog,
  FaJs,
  FaReact,
  FaCss3Alt,
  FaDatabase,
} from "react-icons/fa";

// Icons are spread evenly around the circle (every 60°, starting at the top)
// so each one sits exactly on the edge of the photo.
const FLOATING_ICONS = [FaShareAlt, FaCog, FaReact, FaDatabase, FaCss3Alt, FaJs];

function iconStyle(index, total) {
  const angle = ((-90 + (360 / total) * index) * Math.PI) / 180;
  return {
    left: `${50 + 50 * Math.cos(angle)}%`,
    top: `${50 + 50 * Math.sin(angle)}%`,
    transform: "translate(-50%, -50%)",
  };
}

export default function Hero() {
  return (
    <section id="home" className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <p className="text-3xl md:text-4xl font-semibold text-white">Hi, I'm</p>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.25] pb-2 gradient-text mt-1">
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
            alt="Dwight James Dupit"
            className="w-full h-full object-cover"
          />
        </div>

        {FLOATING_ICONS.map((Icon, i) => (
          <div
            key={i}
            style={iconStyle(i, FLOATING_ICONS.length)}
            className="absolute w-11 h-11 rounded-full bg-navy-800 border border-navy-600 flex items-center justify-center text-accentBlue shadow-lg"
          >
            <Icon size={18} />
          </div>
        ))}
      </div>
    </section>
  );
}