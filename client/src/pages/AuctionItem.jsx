import React, { useState, useEffect } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "@/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";

const AuctionItem = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector((state) => state.auction);
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated]);

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col">
      <div className="text-[16px] flex flex-wrap gap-2 items-center mb-8">
        <Link to="/" className="font-semibold transition-all duration-300 hover:text-[#72a24d]">Home</Link>
        <FaGreaterThan />
        <Link to="/auctions" className="font-semibold transition-all duration-300 hover:text-[#72a24d]">Auctions</Link>
        <FaGreaterThan className="text-stone-400" />
        <p className="text-stone-600 font-semibold">{auctionDetail.title}</p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex gap-12 flex-col lg:flex-row mt-8">
          <div className="flex-1 flex flex-col gap-3 rounded-xl bg-white p-8 shadow-2xl border border-gray-200 m-4">
            <div className="flex gap-6 flex-col lg:flex-row">
              <div className="bg-white w-full lg:w-80 lg:h-80 flex justify-center items-center p-5 border border-gray-200 rounded-lg shadow-md">
                <img src={auctionDetail.image?.url} alt={auctionDetail.title} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="flex flex-col justify-around pb-4 lg:items-start lg:text-left">
                <h3 className="text-[#111] text-2xl font-semibold mb-4 lg:text-3xl">{auctionDetail.title}</h3>
                <p className="text-xl font-semibold mb-2">Condition: <span className="text-[#72a24d] font-bold">{auctionDetail.condition}</span></p>
                <p className="text-xl font-semibold">Minimum Bid: <span className="text-[#72a24d] font-bold">₹{auctionDetail.startingBid}</span></p>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-xl font-bold mb-2">Auction Item Description</p>
              <hr className="my-4 border-t-2 border-gray-200" />
              <ul className="list-disc pl-5">
                {auctionDetail.description &&
                  auctionDetail.description.split(". ").map((element, index) => (
                    <li key={index} className="text-lg my-2 text-gray-700">{element}</li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="flex-1 bg-white shadow-2xl rounded-xl overflow-hidden m-4">
            <header className="bg-gray-100 py-5 px-8 text-2xl font-semibold text-gray-800">BIDS</header>
            <div className="bg-white px-8 min-h-fit lg:min-h-[650px]">
              {auctionBidders &&
              new Date(auctionDetail.startTime) < Date.now() &&
              new Date(auctionDetail.endTime) > Date.now() ? (
                auctionBidders.length > 0 ? (
                  auctionBidders.map((element, index) => (
                    <div key={index} className="py-5 flex items-center justify-between border-b border-gray-200">
                      <div className="flex items-center gap-4">
                        <img src={element.profileImage} alt={element.userName} className="w-12 h-12 rounded-full hidden md:block" />
                        <p className="text-lg font-semibold text-gray-800">{element.userName}</p>
                      </div>
                      {index === 0 ? (
                        <p className="text-xl font-semibold text-green-600">1st</p>
                      ) : index === 1 ? (
                        <p className="text-xl font-semibold text-blue-600">2nd</p>
                      ) : index === 2 ? (
                        <p className="text-xl font-semibold text-yellow-600">3rd</p>
                      ) : (
                        <p className="text-xl font-semibold text-gray-600">{index + 1}th</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-10 text-lg">No bids for this auction</p>
                )
              ) : Date.now() < new Date(auctionDetail.startTime) ? (
                <img src="/notStarted.png" alt="not-started" className="w-full max-h-[650px] object-contain" />
              ) : (
                <img src="/auctionEnded.png" alt="ended" className="w-full max-h-[650px] object-contain" />
              )}
            </div>

            <div className="bg-[#72a24d] py-7 px-8 flex items-center justify-between">
              {Date.now() >= new Date(auctionDetail.startTime) &&
              Date.now() <= new Date(auctionDetail.endTime) ? (
                <>
                  <div className="flex gap-4 flex-col sm:flex-row sm:items-center">
                    <p className="text-white text-xl font-semibold">Place Bid</p>
                    <input
                      type="number"
                      className="w-48 focus:outline-none text-xl p-3 rounded shadow-inner"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                    />
                  </div>
                  <button className="p-4 text-white bg-black rounded-full transition-all duration-300 hover:bg-gray-800 text-2xl shadow-lg">
                    <RiAuctionFill />
                  </button>
                </>
              ) : new Date(auctionDetail.startTime) > Date.now() ? (
                <p className="text-white font-semibold text-xl">Auction has not started yet!</p>
              ) : (
                <p className="text-white font-semibold text-xl">Auction has ended!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AuctionItem;