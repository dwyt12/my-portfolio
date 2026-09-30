import { useState } from "react";

const LINKS = ["Home", "About", "Services", "Projects", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy-900/90 backdrop-blur border-b border-navy-700">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-3 font-semibold text-lg">
          <img
            src="/logo.jpg"
            alt="Sajid Yaqub"
            className="w-9 h-9 rounded-full object-cover border border-navy-600"
          />
          <span className="gradient-text">MERN Stack Developer</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          {LINKS.map((link) => {
            const anchor = "#" + link.toLowerCase();
            return (
              <a key={link} href={anchor} className="hover:text-white transition-colors">
                {link}
              </a>
            );
          })}
        </nav>

        <a href="#contact" className="hidden md:inline-flex btn-gradient !py-2.5 !px-5 text-sm">
          <span>+</span> Hire Me
        </a>

        <button
          className="md:hidden text-slate-200"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-slate-300">
          {LINKS.map((link) => {
            const anchor = "#" + link.toLowerCase();
            return (
              <a key={link} href={anchor} onClick={() => setOpen(false)}>
                {link}
              </a>
            );
          })}
          <a href="#contact" className="btn-gradient justify-center" onClick={() => setOpen(false)}>
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
}