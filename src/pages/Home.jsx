import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

/* Replace these with your real images */
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import csr1 from "../assets/csr1.png";
import csr2 from "../assets/csr2.png";
import csr3 from "../assets/csr3.jpg";
import csr4 from "../assets/csr4.jpg";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import {
  ClockIcon,
  TruckIcon,
  DocumentTextIcon,
  CurrencyDollarIcon, // instead of CashIcon
  HomeIcon,
  CubeIcon,
  ArrowRightIcon, // instead of TruckArrowRightIcon
  CloudIcon,
} from "@heroicons/react/24/outline";

const slides = [slide1, slide2, slide3];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [activeTab, setActiveTab] = useState("express");

  /* Auto slider */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  /* Tab Items */
  const expressItems = [
    { name: "Same Day Delivery", icon: ClockIcon },
    { name: "Overnight Express", icon: TruckIcon },
    { name: "Document Delivery", icon: DocumentTextIcon },
    { name: "Cash on Delivery", icon: CurrencyDollarIcon },
  ];

  const logisticsItems = [
    { name: "Warehousing", icon: HomeIcon },
    { name: "Supply Chain", icon: CubeIcon },
    { name: "Freight Forwarding", icon: ArrowRightIcon },
    { name: "Cold Chain", icon: CloudIcon },
  ];

  const activeItems =
    activeTab === "express" ? expressItems : logisticsItems;

  return (
    <>
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div className="pt-0"></div>

      {/* 🔴 MOVING MESSAGE */}
      <div className="text-black py-2 overflow-hidden">
        <div className="whitespace-nowrap animate-marquee font-medium">
          Welcome to TCS – Pakistan’s Most Trusted Courier & Logistics Company •
          Delivering Excellence Nationwide & Worldwide
        </div>
      </div>

      {/* 🖼️ SLIDER */}
      <div className="relative w-full flex justify-center overflow-hidden">
        <img
          src={slides[current]}
          alt="TCS Slide"
          className="h-95 max-w-full object-contain transition-all duration-700"
        />

        {/* Overlay Input Box */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-4 rounded-md flex flex-col space-y-2 max-w-md w-full mx-4">
            <label htmlFor="trackShipment" className="text-black font-semibold">
              Track your shipment
            </label>
            <div className="flex space-x-2">
              <input
                id="trackShipment"
                type="text"
                placeholder="Enter shipment ID"
                className="flex-1 px-3 py-2 rounded-md border-none outline-none bg-white/70 placeholder-gray-700 text-black"
              />
              <button className="px-2 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
                Track Shipment
              </button>
            </div>
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center text-[150px] text-white rounded transition-all duration-300 hover:scale-110 hover:bg-gray-300/30"
        >
          ‹
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center text-[150px] text-white rounded transition-all duration-300 hover:scale-110 hover:bg-gray-300/30"
        >
          ›
        </button>
      </div>

      {/* 📦 PRODUCTS & SERVICES */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-center">
          Products & Services
        </h2>
        <div className="w-20 h-1 bg-red-600 mx-auto rounded mt-3 mb-10"></div>

        {/* Tabs */}
<div className="flex space-x-8 justify-center mb-6 border-b border-gray-300">
  <button
    className={`relative pb-2 font-semibold text-gray-700 hover:text-gray-900 transition ${
      activeTab === "express" ? "text-gray-900" : ""
    }`}
    onClick={() => setActiveTab("express")}
  >
    Express
    {activeTab === "express" && (
      <span className="absolute bottom-0 left-0 w-full h-1 bg-red-600 rounded"></span>
    )}
  </button>

  <button
    className={`relative pb-2 font-semibold text-gray-700 hover:text-gray-900 transition ${
      activeTab === "logistics" ? "text-gray-900" : ""
    }`}
    onClick={() => setActiveTab("logistics")}
  >
    Logistics
    {activeTab === "logistics" && (
      <span className="absolute bottom-0 left-0 w-full h-1 bg-red-600 rounded"></span>
    )}
  </button>
</div>

{/* Items */}
<div className="grid md:grid-cols-2 gap-x-8 gap-y-6 justify-items-center max-w-2xl mx-auto text-gray-700">
  {activeItems.map((item) => {
    const Icon = item.icon;
    return (
      <div
        key={item.name}
        className="flex flex-col items-center justify-center p-4 hover:bg-gray-100 rounded cursor-pointer transition transform hover:scale-105"
      >
        <Icon className="w-12 h-12 text-red-600 mb-2" /> {/* Icon on top */}
        <span className="text-center">{item.name}</span>   {/* Text below */}
      </div>
    );
  })}
</div>



      </section>

      {/* 📰 BLOGS */}
<section className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start justify-center gap-8">
  {/* Send Gifts */}
  <div className="flex-1 text-center md:text-left">
    <h3 className="text-2xl font-bold mb-4">Send Gifts Nationwide</h3>
    <p className="text-gray-700 mb-4">
      Pakistan's First Gifting Platform – Spreading Joy Since 1989.<br />
      Founded in 1989, TCS Sentiments Express has set the benchmark for online gifting in Pakistan. 
      The platform offers a wide range of thoughtfully curated gifts — including fresh flowers, cakes, mithai, 
      fruit baskets, chocolates, and personalized hampers — suitable for every occasion, from birthdays and weddings 
      to corporate milestones.
    </p>
    <p className="text-gray-700 mb-6">
      Deliveries are fulfilled across Pakistan and internationally, with service to destinations such as the UK, USA, UAE, and Germany. 
      Backed by TCS's logistics expertise, each gift is packaged with care and delivered with precision.
    </p>
    <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition">
      Gift Now
    </button>
  </div>

  {/* Thin Vertical Red Line */}
  <div className="hidden md:block w-px bg-red-600 self-stretch"></div>

  {/* Shop Online */}
  <div className="flex-1 text-center md:text-left">
    <h3 className="text-2xl font-bold mb-4">Shop Online with TCS</h3>
    <p className="text-gray-700 mb-4">
      Studio by TCS - We Deliver Fashion.<br />
      Studio by TCS brings curated collections from top Pakistani designers straight to your doorstep. 
      From bridal looks to everyday elegance, we deliver fashion across the globe — including London, New York, Houston, and Dubai.
    </p>
    <p className="text-gray-700 mb-6">
      With TCS's trusted logistics, shopping your favorite embroideries, fabrics, and silhouettes is seamless, wherever you are.
    </p>
    <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition">
      Shop Now
    </button>
  </div>
</section>


{/* ☎ CUSTOMER SUPPORT */}
<section className="py-12 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
  {/* Left: Images */}
  <div className="grid grid-cols-2 gap-4 flex-1">
    <img src={csr1} alt="CSR" className="w-full h-48 object-cover transform -translate-y-4 rounded-lg" />
    <img src={csr2} alt="CSR" className="w-full h-48 object-cover transform translate-y-4 rounded-lg" />
    <img src={csr3} alt="CSR" className="w-full h-48 object-cover transform -translate-y-4 rounded-lg" />
    <img src={csr4} alt="CSR" className="w-full h-48 object-cover transform translate-y-4 rounded-lg" />
  </div>

  {/* Right: Text and Button */}
  <div className="flex-1 text-center md:text-left">
    <h2 className="text-3xl font-bold mb-2">Customer Support</h2>
    <div className="w-20 h-1 bg-red-600 rounded mb-6"></div>
    <p className="text-gray-700 mb-6">
      With the aim to do better everyday, and to be able to add greater value to our customers' lives, 
      we have an extensive network of call centres, a WhatsApp response system, along with a highly motivated social media team, 
      so we can respond to your queries, inputs, and complaints better.
    </p>
    <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition">
      Contact Us
    </button>
  </div>
</section>



{/* 🔻 FOOTER */}
<footer className="bg-gray-100 text-gray-700 py-12">
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
    {/* Company Info */}
    <div>
      <h4 className="font-semibold mb-3 text-gray-900">Company Information</h4>
      <p>About Us</p>
      <p>Mission & Core Values</p>
      <p>Leadership</p>
      <p>Careers</p>
    </div>

    {/* Products & Services */}
    <div>
      <h4 className="font-semibold mb-3 text-gray-900">Products & Services</h4>
      <p>Express</p>
      <p>Logistics</p>
      <p>Brands</p>
      <p>Promotions</p>
    </div>

    {/* Head Office */}
    <div>
      <h4 className="font-semibold mb-3 text-gray-900">Head Office</h4>
      <p>101-104 Civil Aviation Club Road</p>
      <p>Karachi 75202, Pakistan</p>
    </div>

    {/* Follow Us */}
    <div>
      <h4 className="font-semibold mb-3 text-gray-900">Follow Us</h4>
      <div className="flex gap-4 mt-2 text-gray-700">
        <a href="#" className="hover:text-red-600 transition"><FaFacebookF size={20} /></a>
        <a href="#" className="hover:text-red-600 transition"><FaInstagram size={20} /></a>
        <a href="#" className="hover:text-red-600 transition"><FaWhatsapp size={20} /></a>
        <a href="#" className="hover:text-red-600 transition"><FaTwitter size={20} /></a>
        <a href="#" className="hover:text-red-600 transition"><FaLinkedinIn size={20} /></a>
        <a href="#" className="hover:text-red-600 transition"><FaYoutube size={20} /></a>
      </div>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="border-t border-gray-300 mt-8 pt-4">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-3">
      <div>2026 © TCS Private Ltd. All rights reserved.</div>
      <div className="flex gap-4">
        <span className="hover:text-gray-900 cursor-pointer">Terms of Use</span>
        <span className="hover:text-gray-900 cursor-pointer">Privacy Policy</span>
        <span className="hover:text-gray-900 cursor-pointer">FAQs</span>
      </div>
    </div>
  </div>
</footer>

    </>
  );
};

export default Home;
