import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './utils/constants';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      axios.post(BASE_URL + "/logout");
      localStorage.removeItem('token');
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
