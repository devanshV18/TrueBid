import { clearAlladminSliceErrors, getAllPaymentProofs, getAllUsers, getMonthlyRevenue } from '@/store/slices/adminSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuctionItemDelete from './sub-components/AuctionItemDelete'
import BiddersAuctioneersGraph from './sub-components/BiddersAuctioneersGraph'
import PaymentGraph from './sub-components/PaymentGraph'
import PaymentProofs from './sub-components/PaymentProofs'
import Spinner from '@/custom-components/Spinner'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const dispatch = useDispatch()

    const {loading} = useSelector(state => state.admin)
  
    useEffect(() => {
        dispatch(getMonthlyRevenue())
        dispatch(getAllUsers())
        dispatch(getAllPaymentProofs())
        dispatch(clearAlladminSliceErrors())
    }, [])

    const {user, isAuthenticated} = useSelector(state => state.user)
    const navigateTo = useNavigate()

    
    useEffect(() => {
      if(user.role !== "Admin"){
        navigateTo("/")
      }
    }, [isAuthenticated])

  return (
    <>
      <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col gap-10">
            <h1
              className={`text-[#72a24d] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}
            >
              Dashboard
            </h1>
            <div className="flex flex-col gap-10">
              <div>
                <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                  Total Commissions Recieved Each Month 💸 
                </h3>
                <p className='text-lg font-seminold text-stone-500'>The graph represents trends of profitability and commissions recieved each month</p>
                <PaymentGraph />
              </div>
              <div>
                <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                  Users Statistics and Tracking 📊 
                </h3>
                <p className='text-lg font-seminold text-stone-500'>
                  The graph represents the variety of users registering to tap into right audiences.
                </p>
                <BiddersAuctioneersGraph />
              </div>
              <div>
                <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                  Payment Proofs ✅ 
                </h3>
                <p className='text-lg font-seminold text-stone-500'>
                  All the Commission Payments recieved from auctioneers are handled here by the admins.
                </p>
                <PaymentProofs />
              </div>
              <div>
                <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                  Delete Items From Auction 🗑️ 
                </h3>
                <p className='text-2xl font-bold text-red-500 mb-5'>
                <span className="text-stone-600 text-xl">
                    &#x2a;
                </span> 
                ⚠️ 
                  We are very concerned about maintaining community and legal guidelines on the platforms. Any auction posted, that violates or infringes with the platform declaration can be deleted from here by the admins, also it initiates any legal proceeding if applicable.
                </p>
                <AuctionItemDelete />
              </div>
            </div>
          </div>
        </>
      )}
    </>
    </>
  )
}

export default Dashboard
