import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-20 py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-3">About CampusConnect</h3>
            <p className="text-gray-400">
              CampusConnect is Gujarat's ultimate hub for discovering, joining, and organizing college events. Tech, cultural, sports, and more!
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <ul>
              <li className="mb-2"><Link to="/" className="hover:text-indigo-400">Home</Link></li>
              <li className="mb-2"><Link to="/events" className="hover:text-indigo-400">Events</Link></li>
              <li className="mb-2"><Link to="/login" className="hover:text-indigo-400">Login</Link></li>
              <li className="mb-2"><Link to="/register" className="hover:text-indigo-400">Register</Link></li>
            </ul>
          </div>
          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-3">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-indigo-400">
                <FiGithub />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-indigo-400">
                <FiLinkedin />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-indigo-400">
                <FiTwitter />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2025 CampusConnect. All Rights Reserved.</p>
          <span>
            Made with <span className="text-indigo-400">♥</span> by CampusConnect Team
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
