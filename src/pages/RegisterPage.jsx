import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../api/authService';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    role: 'student', // Default role
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { name, email, password, college, role } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authService.register(formData);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-4xl font-bold text-white text-center mb-8">Create Account</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg">
        {error && <p className="bg-red-500 text-white p-3 rounded mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={handleChange} required className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={handleChange} required className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="college">College</label>
          <input type="text" name="college" value={college} onChange={handleChange} required className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-indigo-500" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Register as</label>
          <select name="role" value={role} onChange={handleChange} className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-indigo-500">
            <option value="student">Student</option>
            <option value="organizer">Event Organizer</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-3 rounded font-bold hover:bg-indigo-500 disabled:bg-indigo-400"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
