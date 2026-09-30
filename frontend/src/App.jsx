import Navbar from "./components/navbar.jsx";
import Hero from "./components/hero.jsx";
import About from "./components/about.jsx";
import Skills from "./components/skills.jsx";
import Services from "./components/services.jsx";
import Projects from "./components/projects.jsx";
import Experience from "./components/experience.jsx";
import Contact from "./components/contact.jsx";
 
export default function App() {
  return (
    <div className="min-h-screen bg-navy-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}