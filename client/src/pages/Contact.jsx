import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import contactusIllustration from "../assets/contactusIllustration.png"

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();
  const handleContactForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      name,
      email,
      phone,
      subject,
      message,
    };

    emailjs
      .send(
        "service_p25l0mf",
        "template_68zks8a",
        templateParams,
        "VNaJg-wnH3g19zG1O"
      )
      .then(() => {
        toast.success("Thank You! Your message has been sent successfully.");
        setLoading(false);
        navigateTo("/");
      })
      .catch((err) => {
        toast.error("Failed to send message.");
        setLoading(false);
      });
  };

  return (
    <>
      <section className="w-full min-h-screen flex flex-col lg:flex-row items-start justify-between px-5 pt-20 lg:pl-[320px]">
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
        <div className="bg-white text-black rounded-lg shadow-xl p-8">
          <form className="flex flex-col gap-5 w-full" 
          onSubmit={handleContactForm}
          >
            <h3 className="text-[#72a24d] text-2xl font-bold mb-6">
              Contact Us 📞 
            </h3>
            <div className="flex flex-col gap-2">
              <label className="text-xl text-black">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 p-3 bg-stone-200 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#72a24d] text-black"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xl text-black">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-3 bg-stone-200 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#72a24d] text-black"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xl text-black">Contact Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 p-3 bg-stone-200 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#72a24d] text-black"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xl text-black">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full mt-1 p-3 bg-stone-200 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#72a24d] text-black"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xl text-black">Message</label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full mt-1 p-3 bg-stone-200 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#72a24d] text-black"
                required
              />
            </div>
            <button
              className="bg-[#2c2c2c] font-semibold hover:bg-[#72a24d] text-xl transition-all duration-300 py-3 px-6 rounded-md text-white mt-6 w-1/3"
              type="submit"
            >
              {loading ? "Sending Message..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        {/* Add your contact illustration here */}
        <div className="text-2xl font-bold text-gray-500">
            <img
            src={contactusIllustration}
            />
            <h3 className="ml-4 text-black">Get in Touch with TrueBid</h3>
            <p className="text-xl mt-4 ml-5 font-semibold">
            Have questions or need assistance? We're here to help! Whether you're a bidder, a seller, or just exploring our auctions, feel free to reach out. Our team is ready to assist you with any inquiries or concerns you may have.
            </p>
            <span className="mt-2 ml-4">
            📧 Email: devanshverma024@gmail.com
            </span>
        
            <p className="mt-2 ml-4 font-bold text-black">
            Your feedback and satisfaction are important to us at TrueBid—where every bid counts 🤝 
            </p>
        </div>
      </div>
    </section>
    </>
  );
};

export default Contact;