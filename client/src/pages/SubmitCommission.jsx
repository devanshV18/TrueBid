import { postCommissionProof } from '@/store/slices/commissionSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import paymentsIllustration2 from '../assets/paymentsIllustration2.png';

const SubmitCommission = () => {
  const [proof, setProof] = useState('');
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');

  const proofHandler = (e) => {
    const file = e.target.files[0];
    setProof(file);
  };

  const removeProof = () => {
    setProof('');
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);

  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('proof', proof);
    formData.append('comment', comment);
    formData.append('amount', amount);
    dispatch(postCommissionProof(formData));

    setAmount("")
    setComment("")
    setProof("")
  };

  return (
    <div className="w-full flex items-center justify-center gap-0 h-screen bg-stone-200">
      <div className="w-1/3 ml-20">
        <img src={paymentsIllustration2} alt="Payments Illustration" />
      </div>

      <div className="bg-white p-8 rounded-lg shadow-2xl ml-40">
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            <span className="text-3xl">True</span>
            <span className="text-3xl text-[#72a24d]">Bid</span>
          </h2>
        </div>

        <p className="text-stone-600 font-bold text-2xl mb-6 text-center">
          Upload your Payment Proofs and Details.
        </p>

        <p>We process each request within 24 hours.</p>
        <p>Kindly upload the details and we will reach out to you!</p>

        <form className="mt-5" onSubmit={handlePaymentProof}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 text-lg">
                <span className="text-red-600 text-xl">
                    &#x2a;
                </span>Amount (INR)
            </label>

            <input
              type="number"
              id="amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#72a24d]"
              placeholder="Enter The Amount Paid ₹"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-bold mb-2">
            <span className="text-red-600 text-xl">
                    &#x2a;
                </span>Comments 
            </label>
            <textarea
              id="comment"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#72a24d]"
              placeholder="Add your comments"
              value={comment}
              rows={5}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-bold mb-2">
            <span className="text-red-600 text-xl">
                    &#x2a;
                </span>Payment Proof
            </label>
            <div
              className="border border-gray-300 px-4 py-4 rounded-xl flex justify-between items-center cursor-pointer"
              onClick={() => document.getElementById('fileInput').click()}
            >
              {proof ? (
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">{proof.name}</span>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 font-bold"
                    onClick={removeProof}
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <span className="text-gray-500">Click to upload payment proof</span>
              )}
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={proofHandler}
                accept="image/*"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-xl bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-[#2c2c2c] hover:text-white transition duration-300 mb-4"
          >
            {loading ? (
              <div
                role="status"
                className="flex justify-center items-center"
              >
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin fill-[#72a24d]"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              'Upload'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitCommission;
