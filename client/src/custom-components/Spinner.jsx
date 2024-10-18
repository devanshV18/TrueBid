import React from 'react'
import {BounceLoader} from "react-spinners"

const Spinner = () => {
  return (
    <div className='w-full min-h-[600px] flex justify-center items-center'>
      <BounceLoader size={90} color='#72a24d'/>
    </div>
  )
}

export default Spinner