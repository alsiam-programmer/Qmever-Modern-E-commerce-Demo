import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io'; // Import close icon

const WorkInProgressNotification = () => {
  const [isOpen, setIsOpen] = useState(true);

  // Close the notification
  const handleClose = () => {
    setIsOpen(false);
  };

  
  return (
    <>
{isOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="relative w-[90%] max-w-md p-6 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 overflow-hidden animate-slideInUp">
      
      {/* Glowing Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400 opacity-20 blur-xl animate-animateGlow"></div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white text-3xl cursor-pointer hover:text-gray-100 transition-colors"
      >
        <IoMdClose />
      </button>

      {/* Icon + Title */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <span className="text-5xl animate-bounce">⚠️</span>
        <h2 className="text-2xl font-bold text-center tracking-wide text-white drop-shadow-lg">
          Work in Progress
        </h2>
      </div>

      {/* Description */}
      <p className="mt-4 text-center text-lg leading-relaxed text-white/90">
        The website is still a work in progress. Orders cannot be placed until it’s live.
        <br />
        ওয়েবসাইটের কাজ এখনও চলছে। ওয়েবসাইটটি সামাজিক না হওয়া পর্যন্ত আপনি কেউ অর্ডার করতে পারবেন না।
      </p>

      {/* Footer */}
      <h3 className="mt-6 text-center text-lg font-semibold text-white/90 drop-shadow-md">
        We’ll notify you when everything is ready!
        <br />
        সবকিছু প্রস্তুত হলে আমরা আপনাকে অবহিত করব!
      </h3>
    </div>
  </div>
)}


    </>
  );
};

export default WorkInProgressNotification;
