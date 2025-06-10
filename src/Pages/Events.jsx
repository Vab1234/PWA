import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export default function Events() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const token = localStorage.getItem("token")
    const res = await axios.get(BASE_URL + "/events", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEvents(res.data)
  };

  useEffect(() => { fetchEvents(); }, []);

  const register = async (id) => {
    const token = localStorage.getItem("token");
    await axios.post(BASE_URL + `/event/${id}/register`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Registered');
  };

  return (
    <div className="p-4">
      <h2 className='text-2xl font-bold mb-6'>Events</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {events.map((e) => (
          <div key={e._id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <figure>
              <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Event" className='w-full h-48 object-cover' />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg font-semibold">{e.name}</h2>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm" onClick={() => register(e._id)}>Register</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}