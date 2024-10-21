import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


const CardTwo = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {

  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    });
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };


  const dispatch = useDispatch()
  const handleDeleteAuction = () => {

  }

  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <>
    <div className="bg-white transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-sm hover:shadow-gray-500 max-w-md w-[26rem] h-[34rem] border border-gray-300 rounded-md mb-8">
      <div className="flex flex-col h-full w-full bg-white rounded-xl group">
        <div className="w-full h-[14rem] overflow-hidden border border-gray-300 hover:border-gray-400 rounded-xl hover:border">
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        </div>

        <div className="px-2 pt-4 pb-2 flex-grow">
          <h5 className="font-semibold text-xl group-hover:text-black mb-2 p-2">{title}</h5>

          {startingBid && (
            <p className="text-stone-500 font-semibold text-md">
              Starting Bid:{" "}
              <span className="text-black font-bold ml-1">₹ {startingBid}</span>
            </p>
          )}

          <p className="text-stone-600 font-light mb-6">
            {timeLeft.type}
            {Object.keys(timeLeft).length > 1 ? (
              <span className="text-black font-bold ml-1">{formatTimeLeft(timeLeft)}</span>
            ) : (
              <span className="text-[#72a24d] text-xl font-bold mb-2">Time's up!</span>
            )}
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-4 items-center mb-4">
          <Link
            to={`/auction/details/${id}`}
            className="bg-black text-white text-lg px-6 py-3 rounded-md transition-all duration-300 hover:bg-[#72a24d]"
          >
            View Auction
          </Link>
          <button
            onClick={handleDeleteAuction}
            className="bg-red-400 text-white text-lg px-6 py-3 rounded-md transition-all duration-300 hover:bg-red-600"
          >
            Delete Auction
          </button>

          <button
            disabled={new Date(endTime) > Date.now()}
            onClick={() => setOpenDrawer(true)}
            className="bg-blue-300 text-white text-lg px-6 py-3 rounded-md transition-all duration-300 hover:bg-blue-600"
          >
            Republish Auction
          </button>
        </div>
      </div>
    </div>
  </>

  );
};

export default CardTwo;