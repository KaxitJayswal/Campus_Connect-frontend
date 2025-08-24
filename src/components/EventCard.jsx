import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom'; // 1. Import Link

function EventCard({ event }) {
  // 2. Wrap the div with a Link component
  return (
    <Link to={`/events/${event._id}`}>
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full">
        <div className="p-6">
          <p className="text-sm text-indigo-400 font-semibold">{event.category.toUpperCase()} • {event.college}</p>
          <h3 className="text-2xl font-bold text-white mt-2">{event.title}</h3>
          <p className="text-gray-400 mt-2 h-20">{event.description.substring(0, 100)}...</p>
          <div className="mt-4 text-gray-300">
            <p><strong>Date:</strong> {format(new Date(event.date), 'MMMM dd, yyyy')}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
