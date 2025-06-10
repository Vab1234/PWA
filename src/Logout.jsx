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
      localStorage.removeItem("user")
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  return (
    <button onClick={handleLogout}  className = "border-2 border-base-300 py-1.5 px-2 rounded-2xl bg-white text-black hover:bg-black hover:border-white  hover:text-white ease-in-out">
      Logout
    </button>
  );
}
