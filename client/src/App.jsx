import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './sections/Home/Hero';
import About from './sections/About/About';
import Services from './sections/Services/Services';
import Contact from './sections/Contact/Contact';
import Footer from './components/Footer/Footer';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';

function App() {
    return (
        <div className="app">
            <ParticleBackground />
            <Navbar />
            <main>
                <Hero />
                <About />
                <Services />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
