import { useEffect, useState } from "react";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Work from "./components/Work";
import Standard from "./components/Standard";
import Quote from "./components/Quote";
import Footer from "./components/Footer";

export default function App() {
  const [route, setRoute] = useState(window.location.hash);
  useEffect(() => {
    function navigate() {
      const next = window.location.hash;
      setRoute(next);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (next.startsWith("#/"))
            window.scrollTo({ top: 0, behavior: "instant" });
          else
            document
              .getElementById(window.location.hash.slice(1) || "top")
              ?.scrollIntoView();
        }),
      );
    }
    window.addEventListener("hashchange", navigate);
    return () => window.removeEventListener("hashchange", navigate);
  }, []);
  return (
    <>
      <Navbar />
      {route === "#/contact" ? (
        <Contact />
      ) : route === "#/work" ? (
        <Gallery />
      ) : (
        <main id="top">
          <Hero />
          <About />
          <Services />
          <Work />
          <Standard />
          <Quote />
        </main>
      )}
      <Footer />
    </>
  );
}
