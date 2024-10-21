import Spinner from "@/custom-components/Spinner";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {

  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <section className="w-full m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start bg-stone-200">
  {loading ? (
    <Spinner />
  ) : (
    <>
      <div className="bg-white mx-auto w-full h-auto px-4 flex flex-col gap-6 items-center py-6 justify-center rounded-md shadow-lg lg:w-3/5 transition-shadow hover:shadow-2xl">
        <div className="relative">
          <img
            src={user.profileImage?.url}
            alt="/imageHolder.jpg"
            className="w-36 h-36 rounded-full border-4 border-[#72a24d] transition-transform duration-300 ease-in-out transform hover:scale-105"
          />
        </div>

        <div className="mb-6 w-full">
          <h3 className="text-2xl font-semibold text-black mb-6">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-base font-semibold text-gray-700">Name</label>
              <input
                type="text"
                defaultValue={user.userName}
                className="w-full mt-2 p-3 bg-stone-100 text-black focus:outline-none"
                disabled
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700">Email</label>
              <input
                type="text"
                defaultValue={user.email}
                className="w-full mt-2 p-3 bg-stone-100 text-black focus:outline-none"
                disabled
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700">Phone</label>
              <input
                type="number"
                defaultValue={user.phone}
                className="w-full mt-2 p-3 bg-stone-100 text-black focus:outline-none"
                disabled
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700">Address</label>
              <input
                type="text"
                defaultValue={user.address}
                className="w-full mt-2 p-3 bg-stone-100 text-black focus:outline-none"
                disabled
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700">Role</label>
              <input
                type="text"
                defaultValue={user.role}
                className="w-full mt-2 p-3 bg-stone-100 text-black focus:outline-none"
                disabled
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700">Joined On</label>
              <input
                type="text"
                defaultValue={user.createdAt?.substring(0, 10)}
                className="w-full mt-2 p-3 bg-stone-100 text-black focus:outline-none"
                disabled
              />
            </div>
          </div>
        </div>

        {user.role === "Auctioneer" && (
          <div className="mb-6 w-full">
            <h3 className="text-2xl font-semibold text-black mb-6">Payment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-semibold text-gray-700">Bank Name</label>
                <input
                  type="text"
                  defaultValue={user.paymentMethods.bankTransfer.bankName}
                  className="w-full mt-2 p-3 bg-stone-100 text-black focus:outline-none"
                  disabled
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700">Bank Account Number</label>
                <input
                  type="text"
                  defaultValue={user.paymentMethods.bankTransfer.bankAccountNumber}
                  className="w-full mt-2 p-3 bg-stone-100 text-black focus:outline-none"
                  disabled
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700">Account Holder's Name</label>
                <input
                  type="text"
                  defaultValue={user.paymentMethods.bankTransfer.AccountHandlerName}
                  className="w-full mt-2 p-3 bg-stone-100 text-black focus:outline-none"
                  disabled
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700">GooglePay ID</label>
                <input
                  type="text"
                  defaultValue={user.paymentMethods.upi.upiId}
                  className="w-full mt-2 p-3 bg-stone-100 text-black focus:outline-none"
                  disabled
                />
              </div>
            </div>
          </div>
        )}

        <div className="mb-6 w-full">
          <h3 className="text-2xl font-semibold text-black mb-6">Other User Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.role === "Auctioneer" && (
              <div>
                <label className="block text-base font-semibold text-gray-700">Unpaid Commissions</label>
                <input
                  type="text"
                  defaultValue={user.unpaidCommision}
                  className="w-full mt-2 p-3 bg-stone-100 text-black focus:outline-none"
                  disabled
                />
              </div>
            )}
            {user.role === "Bidder" && (
              <>
                <div>
                  <label className="block text-base font-semibold text-gray-700">Auctions Won</label>
                  <input
                    type="text"
                    defaultValue={user.auctionsWon}
                    className="w-full mt-2 p-3 bg-stone-100 text-black focus:outline-none"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold text-gray-700">Money Spent</label>
                  <input
                    type="text"
                    defaultValue={user.moneySpent}
                    className="w-full mt-2 p-3 bg-stone-100 text-black focus:outline-none"
                    disabled
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )}
</section>



    </>
  );
};

export default UserProfile;