import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Leaderboard = () => {

  const { leaderboard } = useSelector((state) => state.user)

  console.log(leaderboard)

  return (
    <section className='my-8 lg:px-5'>
         <div className="flex flex-col min-[340px]:flex-row min-[340px]:gap-2">
          <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
            Top 10
          </h3>
          <h3 className="text-[#72a24d] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
            Bidders of All time! 🏆
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-black border my-5 border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left text-xl text-white">Profile Picture 👩🏻‍💼</th>
                <th className="py-2 px-4 text-left text-xl text-white">Username ✍🏻</th>
                <th className="py-2 px-4 text-left text-xl text-white">Bid Expenditure 💰</th>
                <th className="py-2 px-4 text-left text-xl text-white">Auctions Won 🥇</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">

              {leaderboard.slice(0, 10).map((element, index) => {
                return (
                  <tr key={element._id} className="border-b border-gray-300">
                    <td className="flex gap-2 items-center py-2 px-4">
                      <span className="text-stone-400 font-semibold text-xl w-7 hidden sm:block">
                        {index + 1}
                      </span>
                      <span>
                        <img
                          src={element.profileImage?.url}
                          alt={element.userName}
                          className="h-12 w-12 object-cover rounded-full"
                        />
                      </span>
                    </td>
                    <td className="py-2 px-4 text-white font-semibold">{element.userName}</td>
                    <td className="py-2 px-4 text-white font-semibold">₹ {element.moneySpent} (INR)</td>
                    <td className="py-2 px-4 text-white font-semibold">{element.auctionsWon}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Link
          to={"/leaderboard"}
          className="border-2 border-stone-200 font-bold text-xl w-full py-2 flex justify-center rounded-md hover:border-[#72a24d] transition-all duration-300"
        >
          Go to Leaderboard
        </Link>
    </section>
  )
}

export default Leaderboard
