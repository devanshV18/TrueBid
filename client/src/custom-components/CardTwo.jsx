import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { deleteAuctionItem, republishAuction } from "@/store/slices/auctionSlice";


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
    dispatch(deleteAuctionItem(id))
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
            className="bg-blue-300 text-white text-lg px-6 py-3 rounded-md transition-all duration-300 hover:bg-blue-600 cursor-pointer"
          >
            Republish Auction
          </button>
        </div>
      </div>
    </div>

    <Drawer id={id} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/>
  </>

  );
};

export default CardTwo;

const Drawer = ( { setOpenDrawer, openDrawer, id } ) => {
  const dispatch = useDispatch()

  const [startTime , setStartTime] = useState("")
  const [ endTime, setEndTime ] = useState("")

  const handleRepublishItem = () => {
    const formData = new FormData();

    formData.append("startTime", startTime)
    formData.append("endTime", endTime)
    dispatch(republishAuction(id, formData))
  }

  return (
    <section className={`fixed ${openDrawer && id ? "bottom-0" : "-bottom-full"} left-0 w-full transition-all duration-300 h-full bg-[#00000087] flex items-end`}>

      <div className="bg-white h-fit transition-all duration-300 w-full">

        <div className="w-full px-5 py-8 sm:max-w-[640px] sm:m-auto">

          <h3 className="text-[#72a24D] text-3xl font-bold text-center mb-1">
            Republish Auction
          </h3>

          <p className="text-lg font-semibold text-center">
            You can Republish this item with a new start and end Time!
          </p>


          <form className="flex flex-col gap-5 mt-8">
            <div className="flex flex-col gap-3">
              
                <label className="block text-base font-medium text-gray-700 mb-1 font-semibold">Start Time</label>
                <DatePicker
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat={"MMMM d, yyyy h:mm aa"}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#72a24d] focus:ring focus:ring-[#72a24d] focus:ring-opacity-50 px-3 py-2 cursor-pointer"
                />

            </div>

            <div className="flex flex-col gap-3">
              
                <label className="block text-base font-medium text-gray-700 mb-1 font-semibold">End Time</label>
                <DatePicker
                  selected={endTime}
                  onChange={(date) => setEndTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat={"MMMM d, yyyy h:mm aa"}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#72a24d] focus:ring focus:ring-[#72a24d] focus:ring-opacity-50 px-3 py-2 cursor-pointer"
                />

            </div>

            <div>
                <button type="button" className="bg-blue-500 flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-blue-700"
                onClick={handleRepublishItem}
                >
                  Republish Item
                </button>
            </div>

            <div>
                <button type="button" className="bg-red-600 flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-red-700"
                onClick={() => setOpenDrawer(false)}
                >
                  Cancel
                </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}