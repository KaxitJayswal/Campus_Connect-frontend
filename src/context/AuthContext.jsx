import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../api/authService';
import userService from '../api/userService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const profile = await userService.getMyProfile();
      setUser(profile);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      authService.logout();
      setUser(null);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('userToken'));
        if (token) {
          await fetchUser();
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        authService.logout();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (userData) => {
    await authService.login(userData);
    await fetchUser();
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // New functions to update saved events in the UI instantly
  const handleSaveEvent = async (eventId) => {
    try {
      await userService.saveEvent(eventId);
      // Fetch the updated user profile to get the populated savedEvents
      await fetchUser();
    } catch (error) {
      console.error('Failed to save event:', error);
    }
  };

  const handleUnsaveEvent = async (eventId) => {
    try {
      await userService.unsaveEvent(eventId);
      // Fetch the updated user profile to get the populated savedEvents
      await fetchUser();
    } catch (error) {
      console.error('Failed to unsave event:', error);
    }
  };

  const value = { user, loading, login, logout, handleSaveEvent, handleUnsaveEvent };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};