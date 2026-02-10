import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import eventService from '../api/eventService';
import { format } from 'date-fns';

function OrganizerDashboard() {
    const [myEvents, setMyEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyEvents = async () => {
        try {
            const data = await eventService.getMyEvents();
            setMyEvents(data);
        } catch (error) {
            console.error("Failed to fetch events");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyEvents();
    }, []);

    const handleDelete = async (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await eventService.deleteEvent(eventId);
                fetchMyEvents();
            } catch (error) {
                alert('Failed to delete event.');
            }
        }
    };

    if (loading) return <p className="text-white">Loading...</p>;

    return (
        <div className="max-w-7xl mx-auto">
        {console.log()
        }
            <h1 className="text-4xl font-bold text-white mb-8">My Events Dashboard</h1>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                {myEvents.length > 0 ? (
                    <ul className="space-y-4">
                        {myEvents.map(event => (
                            <li key={event._id} className="bg-gray-700 p-4 rounded-md flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold text-white">{event.title}</h2>
                                    <p className="text-gray-400">{format(new Date(event.date), 'MMMM dd, yyyy')} - {event.college}</p>
                                </div>
                                <div className="space-x-4">
                                    <Link to={`/edit-event/${event._id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">Edit</Link>
                                    <button onClick={() => handleDelete(event._id)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-white text-center">You have not created any events yet.</p>
                )}
            </div>
        </div>
    );
}

export default OrganizerDashboard;
