import React, { useRef, useState } from "react";
import { FaStopwatch } from "react-icons/fa";

const Spin = () => {
  const [nValue, setNValue] = useState(-1);
  const [spinning, setSpinning] = useState(false);
  const audioRef = useRef(null);

  const data = [
    { name: "5%", ImgUrl: "https://mobilebuzzbd.com/wp-content/uploads/2023/07/iPhone-14-pro-Deep-Purple.jpg", productLink: "http://qmever.com" },
    { name: "15%", ImgUrl: "https://mobilebuzzbd.com/wp-content/uploads/2023/07/iPhone-14-pro-Deep-Purple.jpg", productLink: "http://qmever.com" },
    { name: "-20৳", ImgUrl: "https://mobilebuzzbd.com/wp-content/uploads/2023/07/iPhone-14-pro-Deep-Purple.jpg", productLink: "http://qmever.com" },
    { name: "-100৳", ImgUrl: "https://mobilebuzzbd.com/wp-content/uploads/2023/07/iPhone-14-pro-Deep-Purple.jpg", productLink: "http://qmever.com" },
  ];

  const angleStep = 360 / data.length;

  const spinButton = async () => {
    if (spinning) return;
    setNValue(-1);
    setSpinning(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.log(err));
    }

    const length = data.length;
    const rounds = Math.floor(Math.random() * 10 + 19);
    let speed = 50;

    for (let i = 0; i < rounds; i++) {
      setNValue(prev => (prev < length - 1 ? prev + 1 : 0));
      await new Promise(resolve => setTimeout(resolve, speed));
      speed += 20;
    }

    setSpinning(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Audio */}
      <audio ref={audioRef} src="/spinning-music.wav" loop />

      <h2 className="mb-4 font-bold text-lg">Selected: {data[nValue]?.name}</h2>

      {/* Wheel */}
      <div className="relative aspect-square w-[90vw] max-w-[400px] rounded-full border-[6px] border-green-900 shadow-2xl bg-white flex justify-center items-center overflow-hidden">

        {/* Products */}
        {data.map((item, index) => {
          const angle = angleStep * index;
          const radius = 120;
          return (
            <div
              key={index}
              className="absolute w-[70px] flex items-center justify-center md:w-[85px] top-1/2 left-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`,
              }}
            >
              <span className="font-bold text-red-700 text-[27px]  flex rotate-6 " >{item.name}</span>
              {/* <img className="w-[70px] md:w-[85px]" src={item.ImgUrl} alt={item.name} /> */}
            </div>
          );
        })}

        {/* Highlighted Triangle */}
        {[...Array(data.length)].map((_, i) => {
          const angle = i * angleStep;
          return (
            <div
              key={i}
              className={`absolute top-1/2 left-1/2 transition-opacity duration-200 ${nValue === i ? "opacity-100" : "opacity-0"}`}
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-105px) rotate(-180deg)`,
              }}
            >
              <svg width="177" height="200" viewBox="0 0 100 100" className="max-h-[200px] w-[177px]">
                <polygon points="50,0 0,100 100,110" fill="transparent" stroke="black" strokeWidth="3" />
              </svg>
            </div>
          );
        })}

        {/* Spin Button */}
        <button
          onClick={spinButton}
          disabled={spinning}
          className={`absolute top-1/2 left-1/2 h-[70px] w-[70px] md:h-[80px] md:w-[80px] rounded-full text-white font-bold flex justify-center items-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer shadow-xl border-4 border-white transition-all ${
            spinning ? "bg-[#000]" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {spinning ? <span className="text-[29px] text-red-600"><FaStopwatch /></span> : "Spin"}
        </button>

      </div>
    </div>
  );
};

export default Spin;
