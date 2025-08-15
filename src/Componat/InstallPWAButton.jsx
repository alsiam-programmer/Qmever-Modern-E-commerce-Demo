import React, { useEffect, useState } from 'react';

const InstallPWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    
      const handler = (e) => {
          e.preventDefault(); // ব্রাউজারকে স্বয়ংক্রিয়ভাবে prompt দেখাতে দাও না
          setDeferredPrompt(e); // ইভেন্টটি save করো
          setIsVisible(true); // Install button দেখাও
        };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
    
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt(); // Install prompt দেখাও
    const { outcome } = await deferredPrompt.userChoice; // ব্যবহারকারীর সিদ্ধান্ত পাওয়া যায়
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (

    <div className="flex justify-center px-[10px]">
  <div className="flex flex-row items-center justify-between gap-4 sm:gap-6 px-2 sm:px-6 py-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl shadow-lg container">
    
    {/* Logo */}
    <div className="flex-shrink-0">
      <img
        src="https://qmever.com/Qmever.png"
        alt="Logo"
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 border-white object-cover"
      />
    </div>

    {/* Install Button */}
    <button
      onClick={handleInstallClick}
      className="w-full sm:w-auto sm:px-6 sm:py-2 px-4 py-2 text-[14px] sm:text-[16px] bg-white text-[#062919] font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-all"
    >
      Install App
    </button>

  </div>
</div>



  );
};

export default InstallPWAButton;
