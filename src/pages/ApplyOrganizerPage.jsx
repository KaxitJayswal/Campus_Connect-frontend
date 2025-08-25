import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import userService from '../api/userService';

function ApplyOrganizerPage() {
  const { user, fetchUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // If already applied or not a student, redirect
  if (user && (user.role !== 'student' || user.organizerStatus !== 'none')) {
    navigate('/my-events');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await userService.applyToBeOrganizer();
      setSuccess(true);
      // Refresh user data
      await fetchUser();
      // Redirect after a delay
      setTimeout(() => {
        navigate('/my-events');
      }, 3000);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 text-white">
      <h1 className="text-4xl font-bold mb-6">Apply to Become an Organizer</h1>
      
      {success ? (
        <div className="bg-green-600 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
          <p className="mb-4">Your application has been submitted and is awaiting approval from an administrator.</p>
          <p>You will be redirected to your dashboard...</p>
        </div>
      ) : (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="mb-6 text-gray-300">
            As an organizer, you'll be able to create and manage events on the platform. 
            Our administrators will review your application and approve it if you meet the requirements.
          </p>
          
          {error && <div className="bg-red-600 p-4 rounded mb-6">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Your Information</h3>
              <div className="bg-gray-700 p-4 rounded">
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>College:</strong> {user?.college}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block mb-2">
                <input type="checkbox" required className="mr-2" />
                I confirm that I will only create legitimate events and follow the platform guidelines
              </label>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 text-white px-6 py-3 rounded font-bold hover:bg-indigo-500 disabled:bg-indigo-400"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/my-events')}
                className="bg-gray-600 text-white px-6 py-3 rounded font-bold hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ApplyOrganizerPage;
