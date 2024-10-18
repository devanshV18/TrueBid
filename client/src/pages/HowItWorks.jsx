import React from 'react'
import {
    FaUser,
    FaGavel,
    FaEnvelope,
    FaDollarSign,
    FaFileInvoice,
    FaRedo,
  } from "react-icons/fa";

const HowItWorks = () => {

    const steps = [
        {
          icon: <FaUser />,
          title: "User Registration",
          description:
            "Users must register or log in to perform operations such as posting auctions, bidding on items, accessing the dashboard, and sending payment proof.",
        },
        {
          icon: <FaGavel />,
          title: "Role Selection",
          description:
            'Users can register as either a "Bidder" or "Auctioneer." Bidders can bid on items, while Auctioneers can post items.',
        },
        {
          icon: <FaEnvelope />,
          title: "Winning Bid Notification",
          description:
            "After winning an item, the highest bidder will receive an email with the Auctioneer's payment method information, including bank transfer or UPI.",
        },
        {
          icon: <FaDollarSign />,
          title: "Commission Payment",
          description:
            "If the Bidder pays and purchases the item, the Auctioneer must pay 5% of that payment to the platform. If the auctioneer fails to pay the commission, the auctioneer cannot post any further item for auctions.Also the terms and conditions allows the platform to pursue a legal proceeding against the person.",
        },
        {
          icon: <FaFileInvoice />,
          title: "Proof of Payment",
          description:
            "The platform receives payment proof as a screenshot and the total amount sent. Once approved by the Administrator, the unpaid commission of the Auctioneer will be adjusted accordingly.",
        },
        {
          icon: <FaRedo />,
          title: "Reposting Items",
          description:
            "If the Bidder does not pay, the Auctioneer can republish the item without any additional cost.",
        },
      ];

  return (
    <>
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
        <h1
        className={`text-black text-2xl font-extrabold mb-8 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-6xl`}
        >
            Discover How{' '}
            <span className='text-7xl text-black font-extrabold'>
                True
            </span>
            <span className='text-7xl text-[#72a24d] font-extrabold'>
                Bid™
            </span>{' '}
            Operates
        </h1>

        <div className="flex flex-col gap-4 my-5">
          {steps.map((element, index) => {
            return (
              <div
                key={index}
                className="bg-white rounded-md p-2 lg:p-5 flex flex-col gap-2 group hover:bg-black transition-all duration-300"
              >
                <div className="bg-black text-white p-3 text-xl rounded-full w-fit group-hover:bg-[#72a24d] transition-all duration-300">
                  {element.icon}
                </div>
                <h3
                  className={`text-[#72a24d] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl`}
                >
                  {element.title}
                </h3>
                <p className="text-xl text-stone-700 group-hover:text-[#fff] transition-all duration-300">
                  {element.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  )
}

export default HowItWorks
