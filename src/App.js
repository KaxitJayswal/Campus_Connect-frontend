import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EventDetailPage from './pages/EventDetailPage';
import OrganizerDashboard from './pages/OrganizerDashboard';
import EditEventPage from './pages/EditEventPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/organizer-dashboard" element={
          <ProtectedRoute>
            <OrganizerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/edit-event/:id" element={
          <ProtectedRoute>
            <EditEventPage />
          </ProtectedRoute>
        } />
        {/* Add other routes here */}
      </Routes>
    </div>
  );
}

export default App;