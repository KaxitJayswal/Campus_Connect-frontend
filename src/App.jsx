import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

// Import all your page components
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateEventPage from './pages/CreateEventPage';
import OrganizerDashboard from './pages/OrganizerDashboard';
import EditEventPage from './pages/EditEventPage';
import NotFoundPage from './pages/NotFoundPage';
import StudentDashboard from './pages/StudentDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container mx-auto p-4 md:p-6">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <HomePage />
              <Footer />
            </>
          } />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route 
            path="/create-event" 
            element={
              <ProtectedRoute>
                <CreateEventPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/organizer-dashboard" 
            element={
              <ProtectedRoute>
                <OrganizerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/edit-event/:id" 
            element={
              <ProtectedRoute>
                <EditEventPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-events" 
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;