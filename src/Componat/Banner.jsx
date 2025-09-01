import React from "react";
import Slider from "react-slick";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Next Arrow
function SampleNextArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="hidden md:flex justify-center items-center absolute top-1/2 -translate-y-1/2 right-4 z-20
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
      className="hidden md:flex justify-center items-center absolute top-1/2 -translate-y-1/2 left-4 z-20
      w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white shadow-lg cursor-pointer transition-all duration-300 group"
    >
      <IoIosArrowBack className="text-gray-800 text-xl md:text-2xl group-hover:scale-110 transition-transform" />
    </div>
  );
}

const Banner = () => {
  const settings = {
    dots: true,
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
    dotsClass: "slick-dots custom-dots",
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul className="flex gap-3">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white/60 hover:bg-white transition-all duration-300" />
    ),
  };

  const slides = [
    {
      img: "https://i.ibb.co/PzGTq0h/Black-and-Yellow-Minimalist-E-Commerce-Store-Burning-Mercado-Shops-Banner.png",
      title: "🔥 Big Sale",
      desc: "Up to 70% Off on Selected Items",
      btn: "Shop Now",
    },
    {
      img: "https://i.ibb.co/PzGTq0h/Black-and-Yellow-Minimalist-E-Commerce-Store-Burning-Mercado-Shops-Banner.png",
      title: "✨ New Arrivals",
      desc: "Discover the latest fashion trends",
      btn: "Explore",
    },
  ];

  return (
    <section className="w-full">
      <div className="container px-2 lg:px-0 mx-auto">
        <div className="w-full relative">
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div
                key={index}
                className="relative w-full rounded-xl overflow-hidden flex justify-center items-center"
              >
                {/* Background Image */}
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex flex-col justify-center px-4 sm:px-8 lg:px-20">
                  <h2 className="text-white text-xl sm:text-3xl lg:text-5xl font-extrabold leading-snug max-w-full sm:max-w-xl drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base lg:text-lg mt-2 sm:mt-3 max-w-full sm:max-w-md drop-shadow-md">
                    {slide.desc}
                  </p>
                  <button className="mt-4 sm:mt-5 px-4 py-2 sm:px-6 sm:py-3 bg-white text-gray-800 font-semibold rounded-full shadow-md hover:bg-gray-200 transition-all duration-300 w-fit">
                    {slide.btn}
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Banner;
