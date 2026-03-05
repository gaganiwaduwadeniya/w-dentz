import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './sections/Home/Hero';
import About from './sections/About/About';
import Services from './sections/Services/Services';
import Contact from './sections/Contact/Contact';
import Footer from './components/Footer/Footer';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';
import AdminLogin from './sections/Admin/AdminLogin';
import AdminDashboard from './sections/Admin/AdminDashboard';
import ProtectedRoute from './sections/Admin/ProtectedRoute';

function App() {
    return (
        <Routes>
            <Route path="/" element={
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
            } />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute component={AdminDashboard} />} />
        </Routes>
    );
}

export default App;
