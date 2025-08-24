import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiEdit, FiBell } from 'react-icons/fi'; // Import icons
import eventService from '../api/eventService';
import EventCard from '../components/EventCard';
import bgImage from '../assets/background.png'; // Import your image (adjust the path if needed)

export default function HomePage() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch only upcoming events for homepage
        const data = await eventService.getEvents({ dateFilter: 'upcoming' });
        setUpcomingEvents(data.slice(0, 3)); // Limit to 3 events
      } catch (err) {
        setUpcomingEvents([]);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="bg-gray-900 text-white text-center py-20 px-4"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div style={{ background: 'rgba(17,24,39,0.7)', padding: '2rem', borderRadius: '1rem', display: 'inline-block' }}>
          <h1 className="text-5xl font-extrabold mb-6">Gujarat's Ultimate College Event Hub</h1>
          <p className="text-xl mb-8">Discover, join, and organize college events across Gujarat. Tech, cultural, sports, and more!</p>
          <Link to="/events">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
              Explore Events
            </button>
          </Link>
        </div>
      </section>

      {/* Happening Soon Section */}
      <section className="max-w-6xl mx-auto mt-16 px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Happening Soon</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto mt-16 px-4">
        <div className="bg-gray-800 rounded-xl p-10">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Everything You Need</h2>
          <p className="text-gray-300 text-center mb-10">Discover, organize, and stay updated with college events across Gujarat.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Discover */}
            <div className="flex flex-col items-center bg-gray-900 rounded-lg p-6">
              <FiSearch className="text-indigo-400 text-4xl mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Discover</h3>
              <p className="text-gray-400 text-center">Find events by college, category, or date. Never miss what's happening around you.</p>
            </div>
            {/* Post & Manage */}
            <div className="flex flex-col items-center bg-gray-900 rounded-lg p-6">
              <FiEdit className="text-indigo-400 text-4xl mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Post & Manage</h3>
              <p className="text-gray-400 text-center">Organizers can easily post new events and manage registrations from one dashboard.</p>
            </div>
            {/* Stay Notified */}
            <div className="flex flex-col items-center bg-gray-900 rounded-lg p-6">
              <FiBell className="text-indigo-400 text-4xl mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Stay Notified</h3>
              <p className="text-gray-400 text-center">Get instant updates and reminders for events you care about.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}