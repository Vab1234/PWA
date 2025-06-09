import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

export default function Events() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const res = await axios.get(BASE_URL + "/events" , {withCredentials : true});
    setEvents(res.data)
  }

  useEffect(() => {
    fetchEvents();
  }, [])

  const register = async (id) => {
    await axios.post(`/event/${id}/register`)
    alert('Registered')
  }

  return (
    <div>
      <h2 className='text-3xl font-bold '>Events</h2>
      <div className='flex gap-10 mt-10 sm:flex-wrap'>
        {events.map((e) => (
            <div className="card bg-base-300 shadow-sm px-0 ">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes" className='w-fit'/>
              </figure>
              <div className="card-body">
                <h2 className="card-title">{e.name}</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Register</button>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}