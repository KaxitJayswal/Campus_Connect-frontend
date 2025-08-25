import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eventService from '../api/eventService';
import { useAuth } from '../context/AuthContext';

function CreateEventPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    venue: '',
    college: '',
    category: 'Tech',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is not an organizer
  if (user && user.role !== 'organizer') {
    return (
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-400 text-lg mb-6">Only approved organizers can create events.</p>
        {user.role === 'student' && user.organizerStatus === 'none' && (
          <button 
            onClick={() => navigate('/my-events')}
            className="bg-indigo-600 text-white font-bold py-2 px-4 rounded"
          >
            Apply to become an organizer
          </button>
        )}
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEvent = await eventService.createEvent(formData);
      alert('Event created successfully!');
      navigate(`/events/${newEvent._id}`); // Navigate to the new event's detail page
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create event.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-4xl font-bold text-white text-center mb-8">Create New Event</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg space-y-4">
        {error && <p className="bg-red-500 text-white p-3 rounded">{error}</p>}

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

        <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded font-bold hover:bg-indigo-500">Create Event</button>
      </form>
    </div>
  );
}

export default CreateEventPage;
