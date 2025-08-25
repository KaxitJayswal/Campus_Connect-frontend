import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';
import userService from '../api/userService';

function StudentDashboard() {
  const { user, fetchUser } = useAuth();
  const [applying, setApplying] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);

  // Handle apply to become an organizer
  const handleApply = async () => {
    try {
      setApplying(true);
      await userService.applyToBeOrganizer();
      setApplicationStatus('success');
      // Refresh user data to get updated status
      fetchUser();
    } catch (error) {
      console.error('Failed to apply:', error);
      setApplicationStatus('error');
    } finally {
      setApplying(false);
    }
  };

  // Get application status message
  const getStatusMessage = () => {
    if (!user) return null;
    
    switch (user.organizerStatus) {
      case 'pending':
        return <div className="bg-yellow-600 text-white p-4 rounded mb-6">Your application to become an organizer is pending review.</div>;
      case 'approved':
        return <div className="bg-green-600 text-white p-4 rounded mb-6">Your application has been approved! You are now an organizer.</div>;
      default:
        return null;
    }
  };

  // Check if user or savedEvents are not loaded yet, or if the array is empty
  if (!user) return <div className="text-center text-white">Loading...</div>;

  const hasNoSavedEvents = !user.savedEvents || user.savedEvents.length === 0;

  return (
    <div className="text-white">
      {getStatusMessage()}

      {/* Apply to become an organizer section */}
      {user.role === 'student' && user.organizerStatus === 'none' && (
        <div className="bg-gray-800 p-6 rounded-lg mb-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Become an Event Organizer</h2>
          <p className="text-gray-400 mb-4">Want to create and manage events? Apply to become an organizer!</p>
          
          {applicationStatus === 'success' ? (
            <div className="bg-green-600 text-white p-4 rounded mb-4">
              Application submitted successfully! Your request is pending review.
            </div>
          ) : applicationStatus === 'error' ? (
            <div className="bg-red-600 text-white p-4 rounded mb-4">
              There was an error submitting your application. Please try again.
            </div>
          ) : null}
          
          <button 
            onClick={handleApply}
            disabled={applying}
            className="bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-500 disabled:bg-indigo-400 transition-colors"
          >
            {applying ? 'Submitting...' : 'Apply Now'}
          </button>
        </div>
      )}

      <h1 className="text-4xl font-bold mb-8">My Interested Events</h1>

      {hasNoSavedEvents ? (
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-6">You haven't saved any events yet.</p>
          <Link to="/events" className="inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-500 transition-colors">
            Explore Events
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {user.savedEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
