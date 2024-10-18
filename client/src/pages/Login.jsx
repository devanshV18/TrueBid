import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginIllustration from "../assets/loginIllustration.png"
import { useSelector, useDispatch } from 'react-redux'
import { login } from '@/store/slices/userSlice'



const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, isAuthenticated } = useSelector((state) => state.user)

    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault()
        const formData = new FormData()

        formData.append("email", email)
        formData.append("password", password)

        dispatch(login(formData))
    }


    useEffect(() => {
        if(isAuthenticated){
            navigateTo("/")
        }
    }, [dispatch, isAuthenticated, loading]);


  return (
    <div className="flex items-center justify-center h-screen bg-stone-200">
        
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96 ml-40">
            <div className="flex items-center justify-center mb-6">
            
                <h2 className="text-3xl font-bold text-gray-800">
                    Welcome to
                    <span className='text-3xl'>True</span>
                    <span className='text-3xl text-[#72a24d]'>Bid</span>
                </h2>
            </div>

            <p className="text-stone-600 font-bold text-xl mb-6 text-center">Please enter your credentials</p>
            
            <form onSubmit={handleLogin}>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2 text-lg">
                        Email
                    </label>
                    <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#72a24d]"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full text-xl bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-[#2c2c2c] hover:text-white transition duration-300 mb-4"
                >
                    {
                            
                            loading && <div role="status" className="flex justify-center items-center">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#72a24d]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </div> 
                        }

                        {
                            !loading && "Login"
                        }
                    
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
