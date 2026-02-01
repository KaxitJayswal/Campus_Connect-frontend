import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';

function AdminDashboard() {
  const { user } = useAuth();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionStatus, setActionStatus] = useState({});

  useEffect(() => {
    // Only load data if user is admin
    if (user && user.role === 'admin') {
      fetchPendingOrganizers();
    }
  }, [user]);

  const fetchPendingOrganizers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/admin/pending-organizers');
      setPendingUsers(response.data);
    } catch (err) {
      setError('Failed to load pending applications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      setActionStatus((prev) => ({ ...prev, [userId]: 'processing' }));
      await api.put(`/api/admin/approve-organizer/${userId}`);
      setActionStatus((prev) => ({ ...prev, [userId]: 'approved' }));
      // Remove user from list after a short delay
      setTimeout(() => {
        setPendingUsers((prev) => prev.filter(user => user._id !== userId));
        setActionStatus((prev) => {
          const newStatus = { ...prev };
          delete newStatus[userId];
          return newStatus;
        });
      }, 1000);
    } catch (err) {
      setActionStatus((prev) => ({ ...prev, [userId]: 'error' }));
      console.error(err);
    }
  };

  const handleReject = async (userId) => {
    try {
      setActionStatus((prev) => ({ ...prev, [userId]: 'processing' }));
      await api.put(`/api/admin/reject-organizer/${userId}`);
      setActionStatus((prev) => ({ ...prev, [userId]: 'rejected' }));
      // Remove user from list after a short delay
      setTimeout(() => {
        setPendingUsers((prev) => prev.filter(user => user._id !== userId));
        setActionStatus((prev) => {
          const newStatus = { ...prev };
          delete newStatus[userId];
          return newStatus;
        });
      }, 1000);
    } catch (err) {
      setActionStatus((prev) => ({ ...prev, [userId]: 'error' }));
      console.error(err);
    }
  };

  // If user is not admin, show access denied
  if (user && user.role !== 'admin') {
    return (
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-400 text-lg">You don't have permission to view this page.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Pending Organizer Applications</h2>
        
        {pendingUsers.length === 0 ? (
          <p className="text-gray-400">No pending applications</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">College</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map(applicant => (
                  <tr key={applicant._id} className="border-b border-gray-700">
                    <td className="p-4">{applicant.name}</td>
                    <td className="p-4">{applicant.email}</td>
                    <td className="p-4">{applicant.college}</td>
                    <td className="p-4">
                      {actionStatus[applicant._id] === 'processing' ? (
                        <span className="text-yellow-400">Processing...</span>
                      ) : actionStatus[applicant._id] === 'approved' ? (
                        <span className="text-green-400">Approved!</span>
                      ) : actionStatus[applicant._id] === 'rejected' ? (
                        <span className="text-red-400">Rejected</span>
                      ) : actionStatus[applicant._id] === 'error' ? (
                        <span className="text-red-400">Error occurred</span>
                      ) : (
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleApprove(applicant._id)} 
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleReject(applicant._id)} 
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
