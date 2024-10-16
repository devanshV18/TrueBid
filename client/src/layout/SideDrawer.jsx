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
        className="fixed right-5 top-5 bg-[#D6482B] text-white text-3xl p-2 rounded-md hover:bg-[#b8381e] lg:hidden"
      >
        <GiHamburgerMenu />
      </div>

        <div className={`w-[100%] sm:w-[300px] bg-[#f6f4f0] h-full fixed top-0 ${
          show ? "left-0" : "left-[-100%]"
        } transition-all duration-100 p-4 flex flex-col justify-between lg:left-0 border-r-[1px] border-r-stone-500`}
        >
            <div className='relative'>
                <Link to={"/"}>
                    <h4 className='text-3xl font-bold mb-4'>
                        True<span className='text-[#D6482B]'>Bid</span>
                    </h4>
                </Link>

                <ul className='flex flex-col gap-3'>
                    <Link to={"/auctions"} className=''>
                    </Link>
                </ul>
            </div>
        </div>
    </>
  )
}

export default SideDrawer
SideDrawer