import Card from '@/custom-components/Card'
import Spinner from '@/custom-components/Spinner'
import React from 'react'
import { useSelector } from 'react-redux'

const FeaturedAuctions = () => {

  const { loading, allAuctions } = useSelector((state) => state.auction)

  return (
    <div>
      <section className='my-8'>

        <h3 className='text-[#111] text-xl font-semibold mb-10 min-[480px]:text-xl md:text-2xl lg:text-3xl'>
          Featured Auctions
        </h3>

        <div className='flex flex-wrap gap-6'>
            {
              loading ? (
                <Spinner/>
              )
              : 
              (
                allAuctions.slice(0,8).map(element => {
                  return(
                    <Card title={element.title} imgSrc={element.image?.url} startTime={element.startTime} endTime={element.endTime} startingBid={element.startingBid} id={element._id} key={element._id}/>
                  )
                })
              )
            }
            {/* {
              allAuctions.slice(0,8).map(element => {
                return(
                  <Card title={element.title} imgSrc={element.image?.url} startTime={element.startTime} endTime={element.endTime} startingBid={element.startingBid} id={element._id} key={element._id}/>
                )
              })
            } */}
        </div>

      </section>
    </div>
  )
}

export default FeaturedAuctions
