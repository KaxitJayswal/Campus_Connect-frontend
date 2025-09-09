import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth(); // We now get the user object
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md relative z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">CampusConnect</Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/events" className="hover:text-gray-300">Events</Link>
          {user ? (
            <>
              {user.role === 'student' && (
                <>
                  <Link to="/my-events" className="hover:text-gray-300">My Events</Link>
                  {user.organizerStatus === 'none' && (
                    <Link to="/apply-organizer" className="text-yellow-300 hover:text-yellow-200">Apply to Be Organizer</Link>
                  )}
                  {user.organizerStatus === 'pending' && (
                    <span className="text-yellow-500">Application Pending</span>
                  )}
                </>
              )}
              {user.role === 'organizer' && (
                <>
                  <Link to="/organizer-dashboard" className="hover:text-gray-300">My Dashboard</Link>
                  <Link to="/create-event" className="hover:text-gray-300">Create Event</Link>
                </>
              )}
              {user.role === 'admin' && (
                <Link to="/admin" className="hover:text-gray-300">Admin Dashboard</Link>
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

      {/* Mobile Navigation */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden absolute top-full left-0 right-0 bg-gray-800 shadow-lg`}>
        <div className="flex flex-col p-4 space-y-3">
          <Link to="/" className="hover:text-gray-300 py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/events" className="hover:text-gray-300 py-2" onClick={() => setIsMenuOpen(false)}>Events</Link>
          {user ? (
            <>
              {user.role === 'student' && (
                <>
                  <Link to="/my-events" className="hover:text-gray-300 py-2" onClick={() => setIsMenuOpen(false)}>My Events</Link>
                  {user.organizerStatus === 'none' && (
                    <Link to="/apply-organizer" className="text-yellow-300 hover:text-yellow-200 py-2" onClick={() => setIsMenuOpen(false)}>
                      Apply to Be Organizer
                    </Link>
                  )}
                  {user.organizerStatus === 'pending' && (
                    <span className="text-yellow-500 py-2">Application Pending</span>
                  )}
                </>
              )}
              {user.role === 'organizer' && (
                <>
                  <Link to="/organizer-dashboard" className="hover:text-gray-300 py-2" onClick={() => setIsMenuOpen(false)}>My Dashboard</Link>
                  <Link to="/create-event" className="hover:text-gray-300 py-2" onClick={() => setIsMenuOpen(false)}>Create Event</Link>
                </>
              )}
              {user.role === 'admin' && (
                <Link to="/admin" className="hover:text-gray-300 py-2" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
              )}
              <button 
                onClick={handleLogout} 
                className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300 py-2" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/register" className="hover:text-gray-300 py-2" onClick={() => setIsMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;