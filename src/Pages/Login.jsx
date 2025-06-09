import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import {BASE_URL} from "../utils/constants"
import {useDispatch} from "react-redux"
import { addUser } from '../utils/userSlice';


export default function Login() {
  const [email, setEmail] = useState('harsh@gmail.com')
  const [password, setPassword] = useState('1234')
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const res = await axios.post(BASE_URL + '/login', { email, password } , {withCredentials: true})
    // console.log(res.data)
    const {user , token} = res.data;
    dispatch(addUser(user));
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token" , token);
    navigate('/')
  }

  return (
    <div className='flex justify-center mt-10'>
      <div className="card bg-base-300 w-96 shadow-sm">
        <h1 className='text-2xl font-bold mb-5'>LOGIN</h1>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input type="text" className="input" value = {email} placeholder="Type here" onChange={(e) =>setEmail(e.target.value)}/>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input type="password" className="input" value = {password} placeholder="Type here" onChange={(e) => setPassword(e.target.value)}/>
        </fieldset>
        <button className="btn mt-5 bg-blue-400" onClick={handleLogin}>Submit</button>
      </div>
    </div>
  )
}