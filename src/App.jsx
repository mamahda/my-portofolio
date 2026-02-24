import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Import Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Portofolio from "./components/Portofolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  // Inisialisasi AOS saat aplikasi dimuat
  useEffect(() => {
    AOS.init({
      once: false, // Animasi akan berjalan setiap kali elemen masuk viewport
      duration: 800, // Durasi animasi dalam ms
      easing: "ease-out-cubic",
      offset: 100, // Trigger animasi 100px sebelum elemen muncul
    });
  }, []);

  return (
    <div className="font-sans antialiased overflow-x-hidden bg-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portofolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
