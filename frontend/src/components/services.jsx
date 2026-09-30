import { FaTools, FaLaptopCode, FaPencilRuler, FaCheckCircle } from "react-icons/fa";

const SERVICES = [
  {
    icon: FaTools,
    title: "Freelance Website Maintenance",
    desc: "Keep your website secure, fast and up to date so you can focus on running your business.",
    points: [
      "Bug fixes and troubleshooting",
      "Content and feature updates",
      "Performance and speed improvements",
      "Dependency and security updates",
    ],
  },
  {
    icon: FaLaptopCode,
    title: "Website Development with MERN",
    desc: "Full-stack web applications built from scratch with MongoDB, Express, React and Node.js.",
    points: [
      "Responsive, modern front-ends with React",
      "REST APIs with Node.js and Express",
      "Database design with MongoDB",
      "Deployment and hosting setup",
    ],
  },
  {
    icon: FaPencilRuler,
    title: "UI/UX Implementation",
    desc: "Turning your designs into pixel-accurate, interactive and accessible interfaces.",
    points: [
      "Figma or mockup to code",
      "Mobile-first responsive layouts",
      "Clean, consistent component design",
      "Smooth interactions and user flows",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-white text-center">Services I Offer</h2>
      <p className="section-eyebrow mt-3">
        Available for freelance work. I can help you build, improve and maintain your website.
      </p>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {SERVICES.map(({ icon: Icon, title, desc, points }) => (
          <div
            key={title}
            className="card p-6 flex flex-col hover:border-accentBlue/60 transition-colors"
          >
            <div className="w-14 h-14 rounded-xl bg-navy-700 flex items-center justify-center text-accentBlue mb-4">
              <Icon size={26} />
            </div>
            <h3 className="text-white font-semibold text-lg">{title}</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">{desc}</p>

            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <FaCheckCircle className="text-accentBlue mt-0.5 shrink-0" size={14} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a href="#contact" className="btn-gradient">
          Get a Free Quote
        </a>
      </div>
    </section>
  );
}