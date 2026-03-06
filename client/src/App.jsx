import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './sections/Home/Hero';
import About from './sections/About/About';
import Services from './sections/Services/Services';
import BookAppointment from './sections/BookAppointment/BookAppointment';
import Contact from './sections/Contact/Contact';
import Footer from './components/Footer/Footer';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';
import AdminLogin from './sections/Admin/AdminLogin';
import AdminDashboard from './sections/Admin/AdminDashboard';
import AdminAvailability from './sections/Admin/AdminAvailability';
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
                        <BookAppointment />
                    </main>
                    <Footer />
                </div>
            } />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute component={AdminDashboard} />} />
            <Route path="/admin/availability" element={<ProtectedRoute component={AdminAvailability} />} />
        </Routes>
    );
}

export default App;
