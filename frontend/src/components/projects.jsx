import { useEffect, useState } from "react";

const FALLBACK_PROJECTS = [
  {
    _id: "1",
    title: "Acadia",
    description:
      "Acadia is where you view your grades and either help others as a tutor or get help as a tutee.",
    tags: ["React", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    _id: "2",
    title: "NDA Agreement System",
    description:
      "A secure platform for creating, signing, and managing non-disclosure agreements.",
    tags: ["React", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    _id: "3",
    title: "POS System",
    description:
      "A secure platform for creating, signing, and managing point-of-sale transactions.",
    tags: ["React", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com",
    demo: "https://example.com",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data) && data.length) setProjects(data);
      })
      .catch(() => {
        // Backend not running — keep the fallback sample data.
      });
  }, []);

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-white text-center">Projects</h2>
      <p className="section-eyebrow mt-3">
        A selection of full-stack applications I've designed, built, and shipped.
      </p>

      <div className="mt-12 grid md:grid-cols-2 gap-8">
        {projects.map((p) => (
          <div key={p._id} className="card p-6">
            <h3 className="text-xl font-semibold text-white">{p.title}</h3>
            <p className="mt-2 text-slate-400 text-sm leading-relaxed">{p.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-navy-700 text-slate-300 border border-navy-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <a href={p.github} target="_blank" rel="noreferrer" className="btn-outline !py-2 !px-4 text-sm">
                GitHub ↗
              </a>
              <a href={p.demo} target="_blank" rel="noreferrer" className="btn-gradient !py-2 !px-4 text-sm">
                Live Demo ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}