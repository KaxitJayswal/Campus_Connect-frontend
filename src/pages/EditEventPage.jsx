import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import eventService from '../api/eventService';

function EditEventPage() {
    const [formData, setFormData] = useState({ title: '', description: '', date: '', venue: '', college: '', category: '' });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchEventData = async () => {
            const data = await eventService.getEventById(id);
            const formattedDate = new Date(data.date).toISOString().split('T')[0];
            setFormData({ ...data, date: formattedDate });
        };
        fetchEventData();
    }, [id]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await eventService.updateEvent(id, formData);
            alert('Event updated successfully!');
            navigate('/organizer-dashboard');
        } catch (err) {
            alert('Failed to update event.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h1 className="text-4xl font-bold text-white text-center mb-8">Edit Event</h1>
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg space-y-4">
                <div>
                    <label className="block text-gray-300 mb-2" htmlFor="title">Event Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                    <label className="block text-gray-300 mb-2" htmlFor="description">Description</label>
                    <textarea name="description" rows="4" value={formData.description} onChange={handleChange} required className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-indigo-500"></textarea>
                </div>
                <div>
                    <label className="block text-gray-300 mb-2" htmlFor="date">Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                    <label className="block text-gray-300 mb-2" htmlFor="venue">Venue</label>
                    <input type="text" name="venue" value={formData.venue} onChange={handleChange} required className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                    <label className="block text-gray-300 mb-2" htmlFor="college">College</label>
                    <input type="text" name="college" value={formData.college} onChange={handleChange} required className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                    <label className="block text-gray-300 mb-2" htmlFor="category">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-indigo-500">
                        <option value="Tech">Tech</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Sports">Sports</option>
                        <option value="Workshop">Workshop</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded font-bold hover:bg-indigo-500">Update Event</button>
            </form>
        </div>
    );
}

export default EditEventPage;
