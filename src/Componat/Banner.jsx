import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

// Next Arrow
function SampleNextArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="hidden lg:flex justify-center items-center absolute top-1/2 -translate-y-1/2 right-4 z-20
      w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white shadow-lg cursor-pointer transition-all duration-300 group"
    >
      <IoIosArrowForward className="text-gray-800 text-xl md:text-2xl group-hover:scale-110 transition-transform" />
    </div>
  );
}



// Prev Arrow
function SamplePrevArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="hidden lg:flex justify-center items-center absolute top-1/2 -translate-y-1/2 left-4 z-20
      w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white shadow-lg cursor-pointer transition-all duration-300 group"
    >
      <IoIosArrowBack className="text-gray-800 text-xl md:text-2xl group-hover:scale-110 transition-transform" />
    </div>
  );
}

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [arr, setArr] = useState([]);

  let sliderRef = React.useRef(null);


  
  
  let category = async () => {
    try {
      const res = await axios.get("https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/products.json");
      let info = Object.entries(res?.data || {}).map(([key , item]) =>({
        category: {
    main: item?.category?.main,
    sub: item?.category?.sub,
    subs: item?.category?.subs,
      },
      }))
      console.log(info);
      
      if (!info) return;
      let mapValue = [...new Set(info.map((i)=>i.category.main))]
      setArr(mapValue)
    } catch (error) {
      console.log('err',error);
      
    }
    }

  useEffect(()=>{
    
  category()
 },[])
  

  const slides = [

    {
      img: "https://i.ibb.co/DDVJMp3R/Black-Minimalist-Perfume-Product-Banner.png",
    },
    {
      img:"https://i.ibb.co/TDH22dsw/Gray-and-Black-Minimalist-Fashion-Style-Banner.png"
    },
    {
      img:"https://i.ibb.co.com/gLXJgyqp/Black-Red-Minimalist-Fashion-Product-Introduction-Landscape-Banner.png"
    },
    {
      img:"https://i.ibb.co.com/qFWVYX9Z/Black-White-Minimalist-Thrift-Shop-Sale-Discount-Promotion-Outdoor-Banner.png"
    }
  ];

  const settings = {
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    afterChange: (index) => setCurrentSlide(index),
    dots: false, // disable default dots
  };

  return (
    <section className="container flex gap-2 px-3 lg:px-0 mb-1 mx-auto relative">
      <div className="lg:w-[75%] w-full">
        <div className="w-full relative">
          <Slider ref={sliderRef} {...settings}>
            {slides.map((slide, index) => (
              <div
                key={index}
                className="relative w-full rounded-xl overflow-hidden flex justify-center items-center"
              >
                <img
                  src={slide.img}
                  alt={slide.title || `Slide ${index+1}`}
                  className=" w-full h-[300px] sm:h-[400px] lg:h-auto object-cover"
                />
                {(slide.title || slide.desc || slide.btn) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex flex-col justify-center px-4 sm:px-8 lg:px-20">
                    {slide.title && (
                      <h2 className="text-white text-lg sm:text-2xl md:text-3xl lg:text-5xl font-extrabold leading-snug max-w-full sm:max-w-xl drop-shadow-lg">
                        {slide.title}
                      </h2>
                    )}
                    {slide.desc && (
                      <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg mt-2 sm:mt-3 max-w-full sm:max-w-md drop-shadow-md">
                        {slide.desc}
                      </p>
                    )}
                    {slide.btn && (
                      <button className="mt-3 sm:mt-4 px-3 py-1.5 sm:px-5 sm:py-3 bg-white text-gray-800 font-semibold rounded-full shadow-md hover:bg-gray-200 transition-all duration-300 w-fit text-sm sm:text-base">
                        {slide.btn}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </Slider>

          {/* Custom Dots */}
          <div className="flex mt-1 justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => sliderRef.slickGoTo(index)}
                className={`w-6 h-3 rounded-full transition-all duration-300 shadow-sm ${
                  currentSlide === index ? "bg-gray-800 scale-110" : "bg-gray-400/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

<div className="w-[25%] lg:block hidden h-full rounded-2xl 
bg-gradient-to-b from-[#062919] via-[#041f14] to-[#02150d]
p-4 sm:p-5 shadow-2xl border border-[#0b3d2a]/60">

  {/* Title */}
  <h2 className="text-white text-base sm:text-lg lg:text-xl font-semibold 
  mb-4 sm:mb-5 tracking-wide border-b border-[#0b3d2a] pb-2">
    Categories
  </h2>

  {/* Items */}
  <div className="flex flex-col gap-2 sm:gap-3">
    {arr.map((i, index) => (
      <div
        key={index}
        className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg 
        bg-[#0b3d2a]/90 text-gray-200 
        text-sm sm:text-base
        cursor-pointer
        hover:bg-gradient-to-r hover:from-[#16a34a] hover:to-[#22c55e]
        hover:text-white hover:translate-x-1
        transition-all duration-300 
        shadow-sm hover:shadow-lg"
      >
        {i}
      </div>
    ))}
  </div>
</div>




    </section>
  );
};

export default Banner;
