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
    title: "Non-Disclosure Agreement System",
    description:
      "A secure platform for creating, signing, and managing non-disclosure agreements.",
    image: "/mynda.jpg",
    tags: ["React", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    _id: "3",
    title: "POS System",
    description:
      "A secure platform for creating, signing, and managing point-of-sale transactions.",
    image: "/mypos.png",
    tags: ["React", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com",
    demo: "https://example.com",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [preview, setPreview] = useState(null); // { src, title } or null
  const [shown, setShown] = useState(false); // fade/scale-in animation
  const [loaded, setLoaded] = useState(false); // picture finished loading
  const [zoomed, setZoomed] = useState(false); // click the picture to zoom

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

  // Pop-up behaviour: Esc to close, lock page scroll, animate in
  useEffect(() => {
    if (!preview) return;
    const frame = requestAnimationFrame(() => setShown(true));
    const onKey = (e) => e.key === "Escape" && closePreview();
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [preview]);

  function openPreview(src, title) {
    setLoaded(false);
    setZoomed(false);
    setPreview({ src, title });
  }

  function closePreview() {
    setShown(false);
    setTimeout(() => setPreview(null), 200); // wait for the fade-out
  }

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

            <div className="mt-6 flex flex-wrap gap-3">
              {p.image && (
                <button
                  type="button"
                  onClick={() => openPreview(p.image, p.title)}
                  className="btn-outline !py-2 !px-4 text-sm cursor-pointer"
                >
                  View Screenshot 🖼
                </button>
              )}
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

      {preview && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 transition-opacity duration-200 ${
            shown ? "opacity-100" : "opacity-0"
          }`}
          onClick={closePreview}
          role="dialog"
          aria-modal="true"
          aria-label={`${preview.title} screenshot`}
        >
          <div
            className={`relative max-w-6xl w-full transition-transform duration-200 ${
              shown ? "scale-100" : "scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closePreview}
              aria-label="Close"
              className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-white text-black font-bold shadow-lg hover:scale-110 transition-transform cursor-pointer"
            >
              ✕
            </button>

            <div className="rounded-xl overflow-hidden border border-navy-600 bg-navy-800 shadow-2xl shadow-black/60">
              <div className={`max-h-[80vh] ${zoomed ? "overflow-auto" : "overflow-hidden"}`}>
                {!loaded && (
                  <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
                    Loading picture…
                  </div>
                )}
                <img
                  src={preview.src}
                  alt={`${preview.title} screenshot`}
                  onLoad={() => setLoaded(true)}
                  onClick={() => setZoomed((z) => !z)}
                  className={`mx-auto transition-opacity duration-300 ${
                    loaded ? "opacity-100" : "opacity-0 h-0"
                  } ${
                    zoomed
                      ? "max-w-none w-auto cursor-zoom-out"
                      : "w-full max-h-[80vh] object-contain cursor-zoom-in"
                  }`}
                />
              </div>

              <div className="flex items-center justify-between gap-4 px-5 py-3 border-t border-navy-600 text-sm">
                <span className="text-white font-medium">{preview.title}</span>
                <span className="text-slate-400 hidden sm:inline">
                  {zoomed ? "Click picture to zoom out" : "Click picture to zoom in"} · Esc to close
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}