import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SideDrawer from './layout/SideDrawer'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './pages/Signup'; 
import Login from './pages/login';
import SubmitCommission from './pages/SubmitCommission';
import { useDispatch } from 'react-redux';
import { fetchUser } from './store/slices/userSlice';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, []);

  return (
    <Router>
      <SideDrawer/>

      <Routes>
        <Route path='/' element = { <Home/> } />
        <Route path='/sign-up' element = {<Signup/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/submit-commission' element = {<SubmitCommission/>}/>
      </Routes>
      <ToastContainer position='top-right'/>
    </Router>
  )
}

export default App
