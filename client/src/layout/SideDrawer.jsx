import React from 'react'
import { useState } from 'react';
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


const SideDrawer = () => {

    const [show, setShow] = useState(false);

    const { isAuthenticated, user } = useSelector(state => state.user)

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

return (
    <>
    <div
        onClick={() => setShow(!show)}
        className="fixed right-5 top-5 bg-black text-white text-3xl p-2 rounded-md hover:bg-[#b8381e] lg:hidden"
    >
        <GiHamburgerMenu />
    </div>

    <div className={`w-[100%] sm:w-[300px] bg-[#2c2c2c] h-full fixed top-0 ${show ? "left-0" : "left-[-100%]"} transition-all duration-100 p-4 flex flex-col justify-between lg:left-0 border-r-[1px] border-r-stone-500`}>

        <div className='relative'>
            <Link to={"/"}>
            <h4 className='text-3xl font-bold mb-4 text-white ml-14 mt-2'>
                True<span className='text-[#72a24d] text-3xl'>Bid™</span>
            </h4>
            </Link>

            <ul className='flex flex-col gap-3 items-center'>
                <li className='w-full mt-3'>
                    <div className='hover-container'>
                    <Link to={"/auctions"} className='flex justify-center text-xl font-semibold gap-2 items-center text-white hover-effect'>
                        <RiAuctionFill/> Auctions
                    </Link>
                    </div>
                </li>
                <li className='w-full mt-3'>
                    <div className='hover-container'>
                    <Link to={"/leaderboard"} className='flex justify-center text-xl font-semibold gap-2 items-center text-white hover-effect'>
                        <MdLeaderboard/> LeaderBoard
                    </Link>
                    </div>
                </li>


                {/* FOR AUCTIONEERS */}

                {
                    isAuthenticated && user && user.role === "Auctioneer" && 
                    ( 
                        <>
                        <li className='w-full mt-3'>
                            <div className='hover-container'>
                            <Link to={"/submit-commission"} className='flex justify-center text-xl font-semibold gap-2 items-center text-white hover-effect'>
                                <FaFileInvoiceDollar/> Submit Commission
                            </Link>
                            </div>
                        </li>

                        <li className='w-full mt-3'>
                            <div className='hover-container'>
                            <Link to={"/create-auction"} className='flex justify-center text-xl font-semibold gap-2 items-center text-white hover-effect'>
                                <IoIosCreate/> Create Auction
                            </Link>
                            </div>
                        </li>

                        <li className='w-full mt-3'>
                            <div className='hover-container'>
                            <Link to={"/view-my-auctions"} className='flex justify-center text-xl font-semibold gap-2 items-center text-white hover-effect'>
                                <FaEye/> Posted Auctions
                            </Link>
                            </div>
                        </li>
                        </>
                    ) 
                } 


                {/* FOR ADMIN */}


                {
                    isAuthenticated && user && user.role === "Admin" && 
                    (
                        <>
                            <li className='w-full mt-3'>
                                <div className='hover-container'>
                                <Link to={"/dashboard"} className='flex justify-center text-xl font-semibold gap-2 items-center text-white hover-effect'>
                                    <MdDashboard/> DashBoard
                                </Link>
                                </div>
                            </li>
                        </>
                    )
                }
            </ul>


                {
                    !isAuthenticated ? 

                    (
                    <>
                        <div className='my-4 flex justify-center gap-2'> {/* Added justify-center here */}
                            <Link to={"/signup"} className='flex justify-center items-center bg-[#72a24d] text-white text-xl font-bold hover:bg-white hover:text-black rounded px-4 py-2 transition-colors duration-300'>
                            SignUp
                            </Link>
                            <Link to={"/login"} className='flex justify-center items-center bg-[#72a24d] text-white text-xl font-bold hover:bg-white hover:text-black rounded px-4 py-2 transition-colors duration-300'>
                            LogIn
                            </Link>
                        </div>
                    </>
                    ) 

                    : 

                    (
                    <>
                        <div className='my-4 flex justify-center gap-4 w-full' onClick={handleLogout}> 
                            <button className='bg-[#72a24d] text-white text-xl font-bold hover:bg-white hover:text-black rounded px-4 py-2 transition-colors duration-300'>
                            LogOut
                            </button>
                        </div>

                    </>
                    )   
                }


                <hr className='mb-8 text-white' />


                <ul className='flex flex-col gap-3'>

                    <li className='w-full mt-3'>
                        <div className='hover-container'>
                        <Link to={"/how-it-works-info"} className='flex justify-center text-xl font-semibold gap-2 items-center text-white hover-effect'>
                            <SiGooglesearchconsole/> How it Works
                        </Link>
                        </div>
                    </li>

                    <li className='w-full mt-3'>
                        <div className='hover-container'>
                        <Link to={"/about"} className='flex justify-center text-xl font-semibold gap-2 items-center text-white hover-effect'>
                            <BsFillInfoSquareFill/> About Us
                        </Link>
                        </div>
                    </li>

                </ul>

                <IoMdCloseCircleOutline 
                onClick={() => setShow(!show)} 
                className='mx-auto mt-12 text-3xl text-white font-bold cursor-pointer hover:text-[#72a24d] lg:hidden'
                />
        </div>
                

        {/* FOOTER OF NAVBAR */}

        <div>
            <div className='flex gap-2 items-center mb-2'>
                <a href='https://github.com/devanshV18' className='bg-[#2c2c2c] text-stone-500 p-2 text-xl rounded-sm hover:text-blue-400'>
                    <FaGithub />
                </a>

                <a href='https://www.instagram.com/verma_ji_7/profilecard/?igsh=amF5NWRvZ204YmFx' className='bg-[#2c2c2c] text-stone-500 p-2 text-xl rounded-sm hover:text-pink-500'>
                    <RiInstagramFill/>
                </a>
            </div>

                <Link to={"/contact"} className='text-white text-xl font-semibold hover:text-[#72a24d]'>
                    Contact Us
                </Link>

                <p className='text-white mb-4'>&copy; TrueBid, LLC.</p>
                <p className='text-gray-400'>Designed By <span className='text-white'>Devansh Verma</span><a href='https://www.linkedin.com/in/devansh-verma-822a20166/' className='text-white text-xl hover:text-blue-500'><FaLinkedin /></a> </p>
        </div>


    </div>
    </>
  )
}

export default SideDrawer
SideDrawer