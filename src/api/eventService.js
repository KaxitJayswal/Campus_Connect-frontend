import api from './api'; // Import the new api instance

// Updated getEvents function
const getEvents = async (params = {}) => {
  const response = await api.get('/api/events', { params });
  return response.data;
};

// New function to create an event
const createEvent = async (eventData) => {
  const response = await api.post('/api/events', eventData);
  return response.data;
};

// Get single event by ID
const getEventById = async (id) => {
  const response = await api.get(`/api/events/${id}`);
  return response.data;
};

// Get events for the logged-in user
const getMyEvents = async () => {
  const response = await api.get(API_URL + 'myevents');
  return response.data;
};

// Update an event
const updateEvent = async (id, eventData) => {
  const response = await api.put(API_URL + id, eventData);
  return response.data;
};

// Delete an event
const deleteEvent = async (id) => {
  const response = await api.delete(API_URL + id);
  return response.data;
};

const eventService = {
  getEvents,
  createEvent,
  getEventById,
  getMyEvents,
  updateEvent,
  deleteEvent,
};

export default eventService;
