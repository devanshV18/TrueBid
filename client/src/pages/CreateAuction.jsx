import React, { useState, useEffect } from 'react';
import { createAuction } from "@/store/slices/auctionSlice";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { X } from 'lucide-react';
import Spinner from '@/custom-components/Spinner';

const CreateAuction = () => {
  const auctionCategories = [
    "Electronics",
    "Furniture",
    "Art & Antiques",
    "Jewelry & Watches",
    "Automobiles",
    "Real Estate",
    "Collectibles",
    "Fashion & Accessories",
    "Sports Memorabilia",
    "Books & Manuscripts",
  ];

  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { loading } = useSelector(state => state.auction);
  const { isAuthenticated, user } = useSelector(state => state.user);

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };

  const handleCreateAuction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(createAuction(formData));
  };

  const handleRemoveImage = () => {
    setImage("");
    setImagePreview("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 ml-40">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center py-6 bg-white text-[#72a24d]">
          Create Auction
        </h1>
        <form onSubmit={handleCreateAuction} className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#72a24d] focus:ring focus:ring-[#72a24d] focus:ring-opacity-50 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#72a24d] focus:ring focus:ring-[#72a24d] focus:ring-opacity-50 px-3 py-2"
                >
                  <option value="">Select Category</option>
                  {auctionCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#72a24d] focus:ring focus:ring-[#72a24d] focus:ring-opacity-50 px-3 py-2"
                >
                  <option value="">Select Condition</option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                </select>
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">Starting Bid</label>
                <input
                  type="number"
                  value={startingBid}
                  onChange={(e) => setStartingBid(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#72a24d] focus:ring focus:ring-[#72a24d] focus:ring-opacity-50 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">Start Time</label>
                <DatePicker
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat={"MMMM d, yyyy h:mm aa"}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#72a24d] focus:ring focus:ring-[#72a24d] focus:ring-opacity-50 px-3 py-2 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">End Time</label>
                <DatePicker
                  selected={endTime}
                  onChange={(date) => setEndTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat={"MMMM d, yyyy h:mm aa"}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#72a24d] focus:ring focus:ring-[#72a24d] focus:ring-opacity-50 px-3 py-2 cursor-pointer"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1">
              <div className="relative h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="max-h-full max-w-full object-contain" />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <X size={20} />
                    </button>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="mt-2 text-base text-gray-600">Upload Image</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={imageHandler} />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-6 ">
            <label className="block text-base font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#72a24d] focus:ring focus:ring-[#72a24d] focus:ring-opacity-50 px-3 py-2"
            />
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="w-1/3 bg-black text-white py-2 px-4 rounded-md hover:bg-[#5c8a3d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#72a24d] text-base font-medium"
            >
              {loading ? <Spinner/> : "Post Auction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAuction;