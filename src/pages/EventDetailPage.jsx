import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import eventService from '../api/eventService';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

function EventDetailPage() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, handleSaveEvent, handleUnsaveEvent } = useAuth();
  const { id } = useParams(); // Gets the event ID from the URL

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await eventService.getEventById(id);
        setEvent(data);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (!event) return <p className="text-white text-center">Event not found.</p>;

  // Check if this event is in the user's saved events
  const isSaved = user?.savedEvents?.some(savedEvent => 
    savedEvent._id === event._id || savedEvent === event._id
  );

  const onInterestClick = () => {
    if (!user) return alert('Please log in to save events.');
    if (isSaved) {
      handleUnsaveEvent(event._id);
    } else {
      handleSaveEvent(event._id);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <p className="text-indigo-400 font-semibold">{event.category.toUpperCase()} • {event.college}</p>
      <h1 className="text-5xl font-bold my-4">{event.title}</h1>

      <div className="text-gray-300 text-lg space-y-2 mb-6">
          <p><strong>Date:</strong> {format(new Date(event.date), 'EEEE, MMMM dd, yyyy')}</p>
          <p><strong>Venue:</strong> {event.venue}</p>
          <p><strong>Organizer:</strong> {event.organizer?.name || 'N/A'}</p>
      </div>

      <div className="border-t border-gray-700 pt-6">
        <h2 className="text-2xl font-bold mb-2">About this event</h2>
        <p className="text-gray-400 whitespace-pre-wrap">{event.description}</p>
      </div>

      {event.registrationLink && (
        <div className="mt-8">
          <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-500 transition-colors">
            Register Now
          </a>
        </div>
      )}

      {/* Dynamic "Interested" Button */}
      {user && user.role === 'student' && (
        <div className="mt-8">
          <button
            onClick={onInterestClick}
            className={`w-full md:w-auto font-bold py-3 px-8 rounded-lg transition-colors ${
              isSaved
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-indigo-600 hover:bg-indigo-500'
            }`}
          >
            {isSaved ? '✔ You\'re Interested' : 'I\'m Interested!'}
          </button>
        </div>
      )}
    </div>
  );
}

export default EventDetailPage;
