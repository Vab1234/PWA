import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from '../utils/userSlice';

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState('harsh@gmail.com');
  const [password, setPassword] = useState('1234');
  const [toLogin, setToLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const res = await axios.post(BASE_URL + '/login', { email, password });
    const { user, token } = res.data;
    dispatch(addUser(user));
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    navigate('/');
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(BASE_URL + "/register", { name, email, password });
      navigate("/login");
      setToLogin(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-[80vh] px-4'>
      <div className="card bg-base-200 w-full max-w-md p-6 shadow-xl">
        <h1 className='text-2xl font-bold mb-4 text-center'>{toLogin ? 'LOGIN' : 'SIGN UP'}</h1>
        {!toLogin && (
          <div className="form-control mb-4">
            <label className="label"><span className="label-text">Name</span></label>
            <input type="text" className="input input-bordered" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        )}
        <div className="form-control mb-4">
          <label className="label"><span className="label-text">Email</span></label>
          <input type="email" className="input input-bordered" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-control mb-4">
          <label className="label"><span className="label-text">Password</span></label>
          <input type="password" className="input input-bordered" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary w-full" onClick={toLogin ? handleLogin : handleSignup}>Submit</button>
        <div className='mt-4 text-center'>
          {toLogin ? (
            <>Don't have an account? <span className='text-primary cursor-pointer' onClick={() => setToLogin(false)}>Sign Up</span></>
          ) : (
            <>Already have an account? <span className='text-primary cursor-pointer' onClick={() => setToLogin(true)}>Login</span></>
          )}
        </div>
      </div>
    </div>
  );
}