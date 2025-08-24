import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth(); // We now get the user object
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">CampusConnect</Link>
        <div className="space-x-6 flex items-center">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/events" className="hover:text-gray-300">Events</Link>
          {user ? (
            <>
              {/* --- THIS IS THE NEW LOGIC --- */}
              {user.role === 'student' && (
                <Link to="/my-events" className="hover:text-gray-300">My Events</Link>
              )}
              {user.role === 'organizer' && (
                <>
                  <Link to="/organizer-dashboard" className="hover:text-gray-300">My Dashboard</Link>
                  <Link to="/create-event" className="hover:text-gray-300">Create Event</Link>
                </>
              )}
              <button onClick={handleLogout} className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;