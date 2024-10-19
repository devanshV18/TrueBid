import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Card = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
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

  return (
  <>
    <div className="bg-white transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-black max-w-sm h-100 border border-gray-300 rounded-md">

        <Link
          to={`/auction/item/${id}`}
          className="flex-grow basis-full bg-white rounded-xl group sm:basis-56 lg:basis-64 2xl:basis-72 h-full"
        >
              <img
                src={imgSrc}
                alt={title}
                className="w-full aspect-[4/3] m-auto md:p-10 transform transition-transform duration-300 ease-in-out group-hover:scale-110"
              />


            <div className="px-2 pt-4 pb-2">

                <h5 className="font-semibold text-xl group-hover:text-black mb-2 p-2">
                  {title} hello
                </h5>


                {startingBid && (
                  <p className="text-stone-600 font-light">
s
                    Starting Bid:{" "}

                    <span className="text-[#72a24d] font-bold ml-1">
                      {startingBid}
                    </span>

                  </p>
                )}


                <p className="text-stone-600 font-light mb-6">

                  {timeLeft.type}

                  {  Object.keys(timeLeft).length > 1 ? 
                      (

                        <span className="text-black font-bold ml-1">
                          {formatTimeLeft(timeLeft)}
                        </span>

                      ) 
                      : 
                      (
                        <span className="text-[#72a24d] text-xl font-bold mb-2">Time's up!</span>
                      )
                  }

                </p>

            </div>

        </Link>
    </div>




    </>
  );
};

export default Card;