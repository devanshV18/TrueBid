import { elements } from 'chart.js';
import React from 'react'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";
import Spinner from '@/custom-components/Spinner';
// import Card from '@/custom-components/Card';
// import Spinner from "@/custom-components/Spinner";

const Home = () => {

  const howItWorks = [
    { title: "Post Items ⬆️", description: "Auctioneer posts items for bidding." },
    { title: "Place Bids 💵", description: "Bidders place bids on listed items." },
    {
      title: "Win Notification 🎯",
      description: "Highest bidder receives a winning email.",
    },
    {
      title: "Payment & Fees 💳",
      description: "Bidder pays; auctioneer pays 5% fee.",
    },
  ];

  const {isAuthenticated} = useSelector(state => state.user)

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] gap-7 flex flex-col min-h-screen py-4 justify-center">
        <div>
            <p className="text-stone-400 font-bold text-2xl mb-8">
              Transparent and Legitimate Auctions.
            </p>
            <h1
              className={`text-[#111] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}
            >
              Bidding Made Easy.
            </h1>
            <h1
              className={`text-[#72a24d] text-2xl font-bold mb-2 min-[480px]:text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl`}
            >
              Auction Your Way to Unbeatable Deals!
            </h1>
            <div className="flex gap-4 my-8">

              {
                !isAuthenticated && 
                (
                  <>

                    <div className='my-4 flex justify-center gap-2'> {/* Added justify-center here */}
                          <Link to={"/sign-up"} className='flex justify-center items-center bg-white border border-black text-black text-xl font-bold hover:bg-[#72a24d] hover:border-none hover:text-white rounded px-4 py-2 transition-colors duration-300'>
                            SignUp
                          </Link>
                        
                          <Link to={"/login"} className='flex justify-center items-center bg-white border border-black text-black text-xl font-bold hover:bg-[#72a24d] hover:border-none hover:text-white rounded px-4 py-2 transition-colors duration-300'>
                            LogIn
                          </Link>
                    </div>

                  </>
                )
              }

            </div>
        </div>

        <div className='flex flex-col gap-6'>

            <h3 className='text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl'>How it works ⚙️</h3>

            <div className='flex flex-col gap-4 md:flex-row md:flex-wrap w-full cursor-pointer'>
                {
                  howItWorks.map(element => {
                    return (
                      <div key={element.title}
                          className='bg-white flex flex-col gap-2 p-2 rounded-md h-[96px] justify-center md:w-[48%] lg:w-[47%] 2xl:w-[24%] shadow-xl transition-all duration-300'
                      >
                        <h5 className='font-bold  text-xl'>{element.title}</h5>
                        <p className='text-gray-600 font-semibold'>{element.description}</p>
                      </div>
                    )
                  })
                }
            </div>
        </div>
        <FeaturedAuctions/>
        <UpcomingAuctions/>
        <Leaderboard/>
        {/* <Card/> */}
        {/* <Spinner/> */}
      </section>
    </>
  )
}

export default Home
