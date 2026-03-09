import React, { useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiLogOut, FiDownload, FiTrash2, FiSearch, FiCalendar } from 'react-icons/fi';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterService, setFilterService] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    // SECURITY: Check authentication on component mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                // Not authenticated - redirect to login immediately
                window.location.href = '/admin/login';
                return;
            }
            setIsAuthenticated(true);
            fetchContacts();
        });

        return () => unsubscribe();
    }, []);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await axios.get(`${apiUrl}/api/contact`);
            setContacts(response.data.data || []);
            setError('');
        } catch (err) {
            setError('Failed to load contacts. Please try again.');
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const deleteContact = async (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                await axios.delete(`${apiUrl}/api/contact/${id}`);
                setContacts(contacts.filter(c => c.id !== id));
            } catch (err) {
                setError('Failed to delete contact');
            }
        }
    };

    const exportToCSV = () => {
        const headers = ['Name', 'Email', 'Phone', 'Service', 'Appointment Date', 'Appointment Time', 'Message', 'Submitted Date'];
        const rows = filteredContacts.map(c => [
            c.name,
            c.email,
            c.phone || 'N/A',
            c.service || 'N/A',
            c.date ? new Date(c.date).toLocaleDateString() : 'N/A',
            c.time || 'N/A',
            `"${c.message}"`,
            new Date(c.createdAt).toLocaleString()
        ]);

        const csv = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `w-dentz-contacts_${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            window.location.href = '/admin/login';
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    // Filter and sort contacts
    let filteredContacts = contacts.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.phone?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesService = filterService === 'all' || c.service === filterService;
        return matchesSearch && matchesService;
    });

    if (sortBy === 'oldest') {
        filteredContacts = filteredContacts.reverse();
    }

    const services = [...new Set(contacts.map(c => c.service).filter(Boolean))];

    return (
        <section className="admin-dashboard">
            <div className="admin-dashboard__header">
                <div className="admin-dashboard__title-bar">
                    <h1 className="admin-dashboard__title">Contact Inquiries Dashboard</h1>
                    <div className="admin-dashboard__actions">
                        <button 
                            onClick={() => navigate('/admin/availability')} 
                            className="btn-availability" 
                            title="Manage Availability"
                        >
                            <FiCalendar /> Availability
                        </button>
                        <button onClick={handleLogout} className="btn-logout" title="Logout">
                            <FiLogOut /> Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="admin-dashboard__container">
                {/* Stats */}
                <div className="admin-dashboard__stats">
                    <div className="stat-card glass-card">
                        <div className="stat-number">{contacts.length}</div>
                        <div className="stat-label">Total Inquiries</div>
                    </div>
                    <div className="stat-card glass-card">
                        <div className="stat-number">{filteredContacts.length}</div>
                        <div className="stat-label">Filtered Results</div>
                    </div>
                </div>

                {/* Controls */}
                <div className="admin-dashboard__controls glass-card">
                    <div className="control-group">
                        <div className="search-box">
                            <FiSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or phone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>

                    <div className="control-group">
                        <select
                            value={filterService}
                            onChange={(e) => setFilterService(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Services</option>
                            {services.map(service => (
                                <option key={service} value={service}>{service}</option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="filter-select"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>

                        <button onClick={exportToCSV} className="btn-export" disabled={filteredContacts.length === 0}>
                            <FiDownload /> Export CSV
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="error-message glass-card">
                        <p>{error}</p>
                        <button onClick={() => setError('')}>×</button>
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading contacts...</p>
                    </div>
                )}

                {/* Table */}
                {!loading && filteredContacts.length > 0 && (
                    <div className="admin-dashboard__table-wrapper glass-card">
                        <table className="admin-dashboard__table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Service</th>
                                    <th>Appointment Date</th>
                                    <th>Appointment Time</th>
                                    <th>Message</th>
                                    <th>Date Submitted</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredContacts.map(contact => (
                                    <tr key={contact.id} className="contact-row">
                                        <td className="name-cell">{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.phone || '—'}</td>
                                        <td>{contact.service || '—'}</td>
                                        <td className="date-cell">
                                            {contact.date ? new Date(contact.date).toLocaleDateString() : '—'}
                                        </td>
                                        <td className="time-cell">
                                            {contact.time || '—'}
                                        </td>
                                        <td className="message-cell" title={contact.message}>
                                            {contact.message.substring(0, 40)}...
                                        </td>
                                        <td className="date-cell">
                                            {new Date(contact.createdAt).toLocaleDateString()} <br />
                                            <span className="time">{new Date(contact.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => deleteContact(contact.id)}
                                                className="btn-delete"
                                                title="Delete contact"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredContacts.length === 0 && (
                    <div className="empty-state glass-card">
                        <p>No contacts found</p>
                        {searchTerm || filterService !== 'all' && (
                            <button onClick={() => { setSearchTerm(''); setFilterService('all'); }} className="btn-reset">
                                Clear Filters
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AdminDashboard;
