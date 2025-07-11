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
        <div className="notification fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="message relative w-[90%] max-w-[500px] p-6 bg-yellow-600 text-white rounded-lg shadow-lg">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white text-2xl cursor-pointer hover:text-gray-300"
            >
              <IoMdClose />
            </button>
            <div className="flex items-center justify-center space-x-3">
              <span className="text-white text-4xl">⚠️</span>
              <h2 className="text-xl font-semibold">Work in Progress</h2>
            </div>
            <p className="pt-4 text-center text-lg">
              The website is still a work in progress. None of you can order until the website is social.
              <br/>
              ওয়েবসাইটের কাজ এখনও চলছে। ওয়েবসাইটটি সামাজিক না হওয়া পর্যন্ত আপনি কেউ অর্ডার করতে পারবেন না।
            </p>
            <h3 className="mt-6 text-white text-lg font-medium text-center">
              We’ll notify you when everything is ready!
              সবকিছু প্রস্তুত হলে আমরা আপনাকে অবহিত করব!
            </h3>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkInProgressNotification;
