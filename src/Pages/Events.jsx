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
      {events.length > 0 ? 
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5'>
          {events.map((e) => (
            <div key={e._id} className="p-0 rounded-xl bg-base-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <figure>
                <img src="https://escales.ponant.com/wp-content/uploads/2020/12/plage.jpg" alt="Event" className='w-full h-48 object-cover  rounded-t-xl' />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg font-semibold">{e.name}</h2>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm" onClick={() => register(e._id)}>Register</button>
                </div>
              </div>
            </div>
          ))}
      </div> : 
      <div>No events as of now!! Please check again later</div>
      }
    </div>
  );
}