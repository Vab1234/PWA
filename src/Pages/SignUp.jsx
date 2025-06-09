import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSignup = async () => {
    await axios.post(BASE_URL + '/register', { name, email, password })
    navigate('/login')
  }

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder='Name' onChange={(e) => setName(e.target.value)} />
      <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
      <input placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Register</button>
    </div>
  )
}