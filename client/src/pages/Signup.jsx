import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [accountHandlerName, setaccountHandlerName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [upiId , setUpiId] = useState("")
  const [profileImage, setProfileImage] = useState("");
  const [ifscCode, setIfscCode] = useState("")
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const {loading, isAuthenticated} = useSelector(state => state.user)
  const navigateTo = useNavigate()
  const dispatch = useDispatch()

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("userName", userName)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("phone", phone)
    formData.append("address", address)
    formData.append("role", role)
    formData.append("profileImage", profileImage)


    role === "Auctioneer" && 
    (
        formData.append("bankAccountNumber", bankAccountNumber),
        formData.append("accountHandlerName", accountHandlerName),
        formData.append("ifscCode", ifscCode),
        formData.append("bankname", bankName),
        formData.append("upiId", upiId)
    )

    dispatch(register(formData))
  }


  useEffect(() => {
    //if user is already authenticated we navigate the user to home page.
    if(isAuthenticated){
        navigateTo("/")
    }
  }, [dispatch, loading, isAuthenticated]) //dependencies upon which useEffect should run


  //image handler function
  const imageHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        setProfileImagePreview(reader.result)
        setProfileImage(file)
    }
  }

return (
    <>

    <div className="flex items-center justify-center h-screen bg-stone-200 ml-40">

        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            
            <div className="text-center mb-6">
            
                <h2 className="text-3xl font-bold mb-3">Register to Get Started !</h2>
                <p className="font-bold text-[#72a24d] text-xl">Secured Auctions and Bids</p>

            </div>

            <form onSubmit={handleRegister}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    
                    <div>
                        <label className="block text-base font-medium mb-1 text-gray-700">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#72a24d] text-sm"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-base font-medium mb-1 text-gray-700">Email</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#72a24d] text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    
                    <div>
                        <label className="block text-base font-medium mb-1 text-gray-700">Phone</label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#72a24d] text-sm"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    
                    <div>
                        <label className="block text-base font-medium mb-1 text-gray-700">Address</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#72a24d] text-sm"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    
                    <div>
                        <label className="block text-base font-medium mb-1 text-gray-700">Role</label>
                        <select 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#72a24d] text-sm"
                        >
                            <option value="">Select Role</option>
                            <option value="Auctioneer">Auctioneer</option>
                            <option value="Bidder">Bidder</option>
                        </select>
                    </div>


                    <div>
                        <label className="block text-base font-medium mb-1 text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#72a24d] text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                </div>

                <div className="flex flex-col sm:flex-1 gap-2">
                    <label className="text-[16px] text-stone-600">
                        Profile Image
                    </label>
                    <div className="flex items-center gap-3">
                        <img src = {
                            profileImagePreview 
                            ? profileImagePreview
                            : "/imageHolder.jpg"
                            }
                            alt="ProfileImagePreview"
                            className="w-14 h-14 rounded-full"
                        />

                        <input type="file" onChange={imageHandler}/>
                    </div>
                </div>

                <div className="flex flex-col gap-4 mt-8">

                    <label className="text-[16px] text-stone-600 font-semibold md:2xl flex flex-col">
                        <p className="text-2xl">Payment Method Details.</p> 

                        <span className="text-lg text-stone-500 mt-2">

                            <span className="text-red-600 text-xl">
                                &#x2a;
                            </span> 
                            FIll payment Details only if you want to register as an Auctioneer.

                        </span>

                    </label>

                    <div className="flex flex-col gap-2 mt-2">
                        <label
                            className="text-[16px] text-black font-semibold"
                        >
                            <p className="text-xl">Bank Details</p>
                        </label>

                        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 mt-2">
                            <select
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#72a24d] text-sm sm:flex-1"
                            disabled = {role === "Bidder"}
                            >
                                <option value="">Select Your Bank</option>
                                <option value="SBI">SBI</option>
                                <option value="ICICI">ICICI</option>
                                <option value="HDFC">HDFC</option>
                                <option value="BOB">BOB</option>
                                <option value="AXIS">AXIS</option>
                                <option value="Standard Chartered">Standard Chartered</option>
                                <option value="Other">Other</option>
                            </select>

                            <input
                                type="text"
                                value={bankAccountNumber}
                                placeholder="Bank Account Number"
                                onChange={(e) => setBankAccountNumber(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#72a24d] text-sm sm:flex-1"
                                disabled = {role === "Bidder"}
                            />

                            <input
                                type="text"
                                value={accountHandlerName}
                                placeholder="Account Holder's Name"
                                onChange={(e) => setaccountHandlerName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#72a24d] text-sm sm:flex-1"
                                disabled = {role === "Bidder"}
                            />

                            <input
                                type="text"
                                value={ifscCode}
                                placeholder="IFSC Code"
                                onChange={(e) => setIfscCode(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#72a24d] text-sm sm:flex-1"
                                disabled = {role === "Bidder"}
                            />
                        </div>

                        <div className="mt-3">

                            <label className="text-[16px] text-black font-semibold">
                                <p className="text-xl">UPI Details</p>
                            </label>

                            <input
                                type="text"
                                value={upiId}
                                placeholder="UPI ID"
                                onChange={(e) => setUpiId(e.target.value)}
                                className="w-1/4 mt-3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#72a24d] text-sm sm:flex-1"
                                disabled = {role === "Bidder"}
                            />
                        </div>
                    </div>
                </div>

            
                <div className="flex justify-center mt-6">
                    <button
                    type="submit"
                    className="w-1/3 bg-black text-white text-xl font-semibold py-3 px-4 rounded-lg hover:bg-[#72a24d] hover:text-white transition duration-300"
                    disabled = {loading}
                    >
                        {
                            
                            loading && <div role="status" className="flex justify-center items-center">
                            <span class="sr-only">Loading...</span>
                            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#72a24d]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </div> 
                        }

                        {
                            !loading && "Register"
                        }
                    </button>
                </div>

            </form>
        </div>
    </div>
    </>
  )
}

export default Signup
