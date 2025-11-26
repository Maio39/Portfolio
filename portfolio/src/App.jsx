import React, { useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import WorkExperience from "./sections/WorkExperience";
import Landing from "./sections/Landing";

const App = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);

  if (!showPortfolio) {
    return <Landing onEnterPortfolio={() => setShowPortfolio(true)} />;
  }

  return (
    <main className="max-w-7xl mx-auto relative animate-in fade-in duration-1000">
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Certifications />
      <WorkExperience />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;