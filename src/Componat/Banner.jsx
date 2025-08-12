import React , {Component} from 'react'
import Slider from "react-slick";
import "../Css/banner.css"
import { IoIosArrowForward , IoIosArrowBack} from "react-icons/io";
function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div className='sm:block hidden'
        onClick={onClick}
      ><h2 className='flex justify-center items-center rounded-[50%] text-[27px] w-[50px] h-[50px] absolute top-[50%] translate-y-[-50%] z-[900] left-[10px] bg-[#ffffff49] hover:bg-[#fff]'><IoIosArrowBack /></h2></div>
    );
  }
  
  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className='sm:block hidden'
        onClick={onClick}
      ><h2 className='  flex justify-center items-center rounded-[50%] text-[27px] w-[50px] h-[50px] absolute top-[50%] translate-y-[-50%] z-[900] right-[10px] bg-[#ffffff49] hover:bg-[#fff]'><IoIosArrowForward /></h2></div>
    );
  }
const Banner = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        autoplay: true,
        autoplaySpeed: 10000,
      };
  return (
    <section className=' '>
        <div className="container py-[5px] px-[10px] md:py-[6px] 2xl:px-0 flex mx-auto">
      <div className="w-[100%]">
        <Slider {...settings} >
            <div className="imgBox w-[100%]">
                <img className=' rounded-[2px] w-[100%]' src="https://i.ibb.co.com/PzGTq0h/Black-and-Yellow-Minimalist-E-Commerce-Store-Burning-Mercado-Shops-Banner.png" alt="" />
            </div>
            <div className="imgBox w-[100%]">
                <img className=' rounded-[2px] w-[100%]' src="https://i.ibb.co.com/PzGTq0h/Black-and-Yellow-Minimalist-E-Commerce-Store-Burning-Mercado-Shops-Banner.png" alt="" />
            </div>
    </Slider>
    </div>
    {/* <img className='w-[20%] p-[10px] rounded-[20px]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkNJRyKOaepOQlOOx_AjFJNEwZ4TtQn-5sLNdlctaf2tYa5xMBfUj2P2nBvb4_qu33w38&usqp=CAU" alt="" /> */}
        </div>
      
    </section>
  )
}

export default Banner