import React, { useState } from "react";
import Slider from "react-slick";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  let sliderRef = React.useRef(null);

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
    <section className="w-full mb-1 relative">
      <div className="container px-3 lg:px-0 mx-auto">
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
    </section>
  );
};

export default Banner;
