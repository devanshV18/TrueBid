import React from 'react'
import { Link } from 'react-router-dom'
import loginIllustration from "../assets/loginIllustration.png"
const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
        
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96 ml-40">
            <div className="flex items-center justify-center mb-6">
            
                <h2 className="text-3xl font-bold text-gray-800">
                    Welcome to
                    <span className='text-3xl'>True</span>
                    <span className='text-3xl text-[#72a24d]'>Bid</span>
                </h2>
            </div>

            <p className="text-stone-600 font-bold text-xl mb-6 text-center">Please enter your credentials</p>
            
            <form>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2 text-lg">
                        Email
                    </label>
                    <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#72a24d]"
                    placeholder="Enter your email"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-lg font-bold mb-2">
                        Password
                    </label>
                    <input
                    type="password"
                    id="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#72a24d]"
                    placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full text-xl bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-[#2c2c2c] hover:text-white transition duration-300 mb-4"
                >
                    Login
                </button>
            </form>

            <div className="text-center">

                <p className="text-lg text-gray-600 mb-2">Don't have an account?</p>

                <button
                    className="text-[#72a24d] text-lg font-semibold hover:underline focus:outline-none"
                >
                    <Link to={"/sign-up"}>Sign Up</Link>
                </button>
            </div>
      </div>

      <div className='w-1/4'>
        <img src={loginIllustration} />
      </div>
    </div>
  )
}

export default Login
