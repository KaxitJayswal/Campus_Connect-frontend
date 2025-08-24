import React from 'react';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';

function StudentDashboard() {
  const { user } = useAuth();

  // Check if user or savedEvents are not loaded yet, or if the array is empty
  if (!user || !user.savedEvents || user.savedEvents.length === 0) {
    return (
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">My Interested Events</h1>
        <p className="text-gray-400 text-lg">You haven't saved any events yet.</p>
        <Link to="/events" className="mt-6 inline-block bg-primary text-background font-bold py-3 px-6 rounded-lg hover:bg-indigo-500 transition-colors">
          Explore Events
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">My Interested Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {user.savedEvents.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default StudentDashboard;
