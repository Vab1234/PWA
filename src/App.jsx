import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Pages/Login'
import Events from './Pages/Events'
import QRScan from './Pages/QrScan'
import LogoutButton from './Logout'
import './App.css'
import Body from './Pages/Body'
import {Provider} from "react-redux";
import appStore from './utils/appStore'
import EventMap from './Pages/EventMap'

function App() {
  const isLoggedIn = localStorage.getItem('token')
  return (
    <>
    <Provider store = {appStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element = {<Body />}>
            <Route path = "/" element = {<EventMap />}/>
            <Route path = "/events" element = {<Events />}/>
            <Route path = "/login" element = {<Login />}/>
            <Route path = "/qr" element = {<QRScan />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App