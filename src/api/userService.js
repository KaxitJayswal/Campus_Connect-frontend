import api from './api';

const getMyProfile = async () => {
    const response = await api.get('/api/users/me');
    return response.data;
};

const saveEvent = async (eventId) => {
    const response = await api.post(`/api/users/me/events/${eventId}`);
    return response.data;
};

const unsaveEvent = async (eventId) => {
    const response = await api.delete(`/api/users/me/events/${eventId}`);
    return response.data;
};

const applyToBeOrganizer = async () => {
    const response = await api.post('/api/users/me/apply-organizer');
    return response.data;
};

const userService = {
    getMyProfile,
    saveEvent,
    unsaveEvent,
    applyToBeOrganizer
};

export default userService;
