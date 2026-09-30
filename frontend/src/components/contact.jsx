import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const initialForm = { name: "", email: "", phone: "", company: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <section id="contact" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center">Contact Us</h2>
        <p className="section-eyebrow mt-3">
          Have a project in mind? Let's connect and discuss how I can help bring your
          ideas to life.
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-semibold text-white">Get in touch today</h3>
            <p className="mt-3 text-slate-400 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>

            <div className="mt-6 space-y-3 text-slate-300 text-sm">
              <p className="flex items-center gap-3">
                <FaEnvelope className="text-accentBlue" /> dwightdupit19@gmail.com
              </p>
              <p className="flex items-center gap-3">
                <FaPhoneAlt className="text-accentBlue" /> #0966-467-8722 
              </p>
              <p className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-accentBlue" /> Talisay City, Cebu, Philippines
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
              <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="example@email.com" required />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} placeholder="0912-345-8722" />
              <Field label="Company" name="company" value={form.company} onChange={handleChange} placeholder="Facebook" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Message</label>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Please type your message here..."
                required
                className="w-full bg-navy-700 border border-navy-600 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-accentBlue"
              />
            </div>
            <button type="submit" disabled={status === "sending"} className="btn-gradient w-full justify-center">
              {status === "sending" ? "Sending..." : "Send message"}
            </button>
            {status === "sent" && (
              <p className="text-sm text-emerald-400">Thanks — your message has been sent.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-rose-400">
                Couldn't send that. Start the backend server, or email me directly.
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className="border-t border-navy-700 mt-8">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="flex items-center gap-3 font-semibold">
            <img
              src="/logo.jpg"
              alt="Dwight James Dupit"
              className="w-8 h-8 rounded-full object-cover border border-navy-600"
            />
            <span className="gradient-text">MERN Stack Developer</span>
          </span>

          <nav className="flex gap-6 text-sm text-slate-400">
            {["Home", "About", "Services", "Projects", "Contact"].map((l) => {
              const anchor = "#" + l.toLowerCase();
              return (
                <a key={l} href={anchor} className="hover:text-white">
                  {l}
                </a>
              );
            })}
          </nav>

          <div className="flex gap-3">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-navy-700 border border-navy-600 flex items-center justify-center text-slate-300 hover:text-accentBlue">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-slate-500 pb-6">
          Copyright © {new Date().getFullYear()} dwightdupitINSIGHTSCODE | All Rights Reserved
        </p>
      </footer>
    </>
  );
}

function Field({ label, name, type = "text", value, onChange, placeholder, required }) {
  return (
    <div>
      <label className="block text-sm text-slate-300 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-navy-700 border border-navy-600 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-accentBlue"
      />
    </div>
  );
}