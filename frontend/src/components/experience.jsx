import { useState } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TESTIMONIALS = [
  {
    quote:
      "Dwight handled both frontend and backend tasks smoothly and always ensured the codebase stayed clean, structured, and easy to maintain. He identified performance bottlenecks early, proposed solid solutions, and implemented them without disrupting the workflow.",
    name: "Mark Klient Munoz",
    date: "19/08/2026",
  },
  {
    quote:
      "Communicative, reliable, and detail-oriented. Sajid turned a vague brief into a polished product ahead of schedule and kept us updated at every step.",
    name: "Mary Faith Alicaway",
    date: "12/08/2026",
  },
  {
    quote:
      "Great API design instincts and a real eye for UX. Our conversion rate improved noticeably after the redesign he led.",
    name: "Daniel Fernandez",
    date: "28/01/2026",
  },
];

export default function Experience() {
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;
  const current = TESTIMONIALS[index];

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section id="testimonials" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-white text-center">Testimonials</h2>
      <p className="section-eyebrow mt-3">
        Feedback from clients and collaborators I've worked with on real projects and
        web applications.
      </p>

      <div className="mt-12 flex items-center justify-center gap-4 md:gap-8">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="w-10 h-10 shrink-0 rounded-full bg-brand-gradient flex items-center justify-center text-white"
        >
          <FaChevronLeft size={14} />
        </button>

        <div className="card p-8 max-w-2xl text-center">
          <div className="flex justify-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} size={16} />
            ))}
          </div>
          <p className="mt-4 text-slate-300 leading-relaxed">"{current.quote}"</p>
          <p className="mt-5 font-semibold gradient-text">{current.name}</p>
          <p className="text-sm text-slate-500">{current.date}</p>
        </div>

        <button
          onClick={next}
          aria-label="Next testimonial"
          className="w-10 h-10 shrink-0 rounded-full bg-brand-gradient flex items-center justify-center text-white"
        >
          <FaChevronRight size={14} />
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`w-2 h-2 rounded-full ${i === index ? "bg-accentPink" : "bg-navy-600"}`}
          />
        ))}
      </div>
    </section>
  );
}