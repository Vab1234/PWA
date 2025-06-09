import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call backend to invalidate token or clear session if needed
      axios.post("/logout");

      // Clear token from localStorage (if stored there)
      localStorage.removeItem('token');

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
