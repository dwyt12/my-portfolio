export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
      <div className="rounded-2xl overflow-hidden border border-navy-600 aspect-[4/5] bg-navy-800">
        <img
          src="/logo.jpg"
          alt="Dwight James Dupit"
          className="w-full h-full object-cover"
        />
      </div>

      <div>
        <h2 className="text-3xl font-bold text-white">About Me</h2>
        <p className="mt-4 text-slate-400 leading-relaxed">
          I am a MERN Stack Web Developer focused on building production-ready
          applications. I enjoy designing APIs, creating interactive user interfaces,
          and optimizing performance to deliver smooth and efficient user experiences.
        </p>
        <p className="mt-4 text-slate-400 leading-relaxed">
          Along with strong problem-solving skills, I follow clean architecture
          principles and modern development patterns. I'm passionate about writing
          maintainable code, improving UI/UX flows, and building applications that
          feel fast, secure, and intuitive. I actively explore new tools in the MERN
          ecosystem to stay updated and keep improving my development workflow.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="/MyResume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            View Resume ↗
          </a>
          <a href="/MyResume.pdf" download="Dwight-James-Dupit-Resume.pdf" className="btn-gradient">
            Download Resume ↓
          </a>
        </div>
      </div>
    </section>
  );
}