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
import { fetchLeaderboard, fetchUser } from './store/slices/userSlice';
import { useEffect } from 'react';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import { getAllAuctionItems } from './store/slices/auctionSlice';
import LeaderboardPage from './pages/LeaderboardPage';
import Auctions from './pages/Auctions';
import AuctionItem from './pages/AuctionItem';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
    dispatch(getAllAuctionItems())
    dispatch(fetchLeaderboard())
  }, []);

  return (
    <Router>
      <SideDrawer/>

      <Routes>

        <Route path='/' element = { <Home/> } />
        <Route path='/sign-up' element = {<Signup/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/submit-commission' element = {<SubmitCommission/>}/>
        <Route path='/how-it-works-info' element = {<HowItWorks/>}/>
        <Route path='/about' element = {<About/>}/>
        <Route path='/leaderboard' element = {<LeaderboardPage/>}/>
        <Route path='/auctions' element = {<Auctions/>}/>
        <Route path='/auction/item/:id' element = {<AuctionItem/>}/>
        
      </Routes>
      <ToastContainer position='top-right'/>
    </Router>
  )
}

export default App
