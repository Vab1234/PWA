import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import {BASE_URL} from "../utils/constants"
import {useDispatch} from "react-redux"
import { addUser } from '../utils/userSlice';


export default function Login() {
  const [name , setName] = useState("");
  const [email, setEmail] = useState('harsh@gmail.com')
  const [password, setPassword] = useState('1234');
  const [toLogin , setToLogin] = useState(true);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const res = await axios.post(BASE_URL + '/login', { email, password })
    // console.log(res.data)
    const {user , token} = res.data;
    dispatch(addUser(user));
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token" , token);
    navigate('/')
  }

  const handleSignup = async () => {
    try{
      const res = await axios.post(BASE_URL + "/register" , {name , email , password});
      navigate("/login");
      setToLogin(true)
    } catch(e){
      console.error(e);
    }
    
  }

  return (
    <div className='flex justify-center items-center'>
      {toLogin ? 
        <>
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
            <div className='mt-5'>Don't have an account?<span className='hover:text-blue-500 cursor-pointer' onClick={() => setToLogin(false)}> Sign Up</span></div>
          </div>
        </> : 
        <>
          <div className="card bg-base-300 w-96 shadow-sm">
            <h1 className='text-2xl font-bold mb-5'>SIGN UP</h1>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input type="text" className="input" value = {name} placeholder="Type here" onChange={(e) =>setName(e.target.value)}/>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input type="text" className="input" value = {email} placeholder="Type here" onChange={(e) =>setEmail(e.target.value)}/>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input type="password" className="input" value = {password} placeholder="Type here" onChange={(e) => setPassword(e.target.value)}/>
            </fieldset>
            <button className="btn mt-5 bg-blue-400" onClick={handleSignup}>Submit</button>
            <div className='mt-5'>Already signed up?<span className='hover:text-blue-500 cursor-pointer' onClick={() => setToLogin(true)}> Login</span></div>
          </div>
        </>
      }
    </div>
  )
}