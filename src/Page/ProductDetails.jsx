import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Slider from "react-slick";
import "../Css/banner.css"
import { IoIosArrowForward, IoIosArrowBack, IoMdClose, IoIosWarning } from "react-icons/io";
import { AddToCart, BuyItemDelete, userBuyItem } from '../Componat/slice/AllSlice';
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import { Helmet } from 'react-helmet';
import ZoomableImage from '../Componat/ZoomableImage';
import ShareProductsLink from '../Componat/ShareProductsLink';
import { FaYoutube } from "react-icons/fa";
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className=''
      onClick={onClick}
    ><h2 className='flex justify-center items-center rounded-[50%] text-[27px] w-[50px] h-[50px] absolute top-[50%] translate-y-[-50%] z-[990] left-[10px] bg-[#ffffff49] hover:bg-[#fff]'><IoIosArrowBack /></h2></div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className=''
      onClick={onClick}
    ><h2 className='  flex justify-center items-center rounded-[50%] text-[27px] w-[50px] h-[50px] absolute top-[50%] translate-y-[-50%] z-[990] right-[10px] bg-[#ffffff49] hover:bg-[#fff]'><IoIosArrowForward /></h2></div>
  );
}

const ProductDetails = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let LoginInfo = useSelector((item) => item.counter.user)
  let [userUID, setUserUID] = useState('')
  let [logErr, setLogErr] = useState(false)
  let { id } = useParams();
  let [showSlick, setShowSlick] = useState(false)
  let [info, setInfo] = useState([])
  let [info2, setInfo2] = useState([])
  let [info3, setInfo3] = useState([])
  let [modleaddicon, setmodleaddicon] = useState('')
  let [modleColor, setmodleColor] = useState('')
  let [modlePrice, setmodlePrice] = useState('')
  let [SelectColor, setSelectColor] = useState('')
  let [InColor, setInColor] = useState('')
  let [ProdectQun, setProdectQun] = useState(1)
  let [Lodingon, setLodingOn] = useState(false)
  let [Loding, setLoding] = useState(false)
  let [modelselect, setModelselect] = useState(false)
  let [addsucess, setaddsucess] = useState(false)

  let [show , setShow] = useState(false)

  
  
  let productData = async () => {
     try {
      let res = await axios.get(`https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json`)
    if (res.data === null) {
      navigate("/404");
      return;
    }

      setInfo(res.data);
      setInfo2(res.data.thumbnail)
      setInfo3(res.data.addModle !== undefined ? res.data.addModle : "");
     } catch (error) {
      
     }
  }



  useEffect(() => {
    productData()
  }, [id])
  useEffect(() => {
    LoginInfo.map((item) => {
      setUserUID(item)
    })
  })


  let handleBuyNow = () => {
    if (userUID !== "") {
      if (info3 !== "") {
        if (modleaddicon !== "" && modleColor.Stock > 0) {
          dispatch(BuyItemDelete({ ...info, size: modleaddicon, Pricesub: modlePrice, ProdectQun, modleColor }))
          setLodingOn(true)
          setTimeout(() => {
            setLoding(true)
          }, 30);
          setTimeout(() => {
            dispatch(userBuyItem({ ...info, size: modleaddicon, Pricesub: modlePrice, ProdectQun, modleColor }))
            window.scrollTo(0, 0)
            navigate('/CheckOut')
          }, 1000);
        } else {
          setModelselect(true)
          setTimeout(() => {
            setModelselect(false)
          }, 1000);
        }
      } else {
        dispatch(BuyItemDelete({ ...info, size: modleaddicon, Pricesub: modlePrice, ProdectQun }))
        setLodingOn(true)
        setTimeout(() => {
          setLoding(true)
        }, 30);
        setTimeout(() => {
          dispatch(userBuyItem({ ...info, ProdectQun }))
          window.scrollTo(0, 0)
          navigate('/CheckOut')
        }, 1000);
      }
    } else {
      setLogErr(true)
    }
  }

  let handleAddTocart = () => {
    if (userUID !== "") {
      if (info3 !== "") {
        if (modleaddicon !== "" && modleColor.Stock > 0) {
          dispatch(AddToCart({ ...{ Prodectname: info.Prodectname, Price: info.Price, ProdectId: info.uid, imgurl: info.imgurl, PCU: info.PCU, category: info.category }, size: modleaddicon, Pricesub: modlePrice, ProdectQun, modleColor }))
          setaddsucess(true)
          setTimeout(() => {
            setaddsucess(false)
          }, 1000);
        } else {
          setModelselect(true)
          setTimeout(() => {
            setModelselect(false)
          }, 1000);
        }
      } else {
        dispatch(AddToCart({ ...{ Prodectname: info.Prodectname, Price: info.Price, ProdectId: info.uid, imgurl: info.imgurl, PCU: info.PCU, category: info.category }, ProdectQun }))
        console.log(info);
        setaddsucess(true)
        setTimeout(() => {
          setaddsucess(false)
        }, 1000);
      }
    } else {
      console.log("errror");
      setLogErr(true)

    }
  }
  let handleErrCodeClose = () => {
    setLogErr(false)
  }

  let handleModel = ({ index, addModle }) => {
    setInColor('')
    setmodleColor('')
    setmodleaddicon(addModle.Model)
    setmodlePrice(addModle.Price)

    if (index !== undefined && index !== null) {

      const needData = addModle?.NeedValue?.filter(item => item);

      setSelectColor(needData)

    }

  }
  let HandleGetColor = (item, index) => {
    setmodleColor(item);
    setInColor(index);
  };


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    swipe: false,
    draggable: false,
    touchMove: false,
  };

  let handleImgSlick = () => {
    setShowSlick(true)
  }
  let handleSlickClose = () => {
    setShowSlick(false)
  }




  return (
    <section>
      <Helmet>
        <title>{info.Prodectname !== undefined ? info.Prodectname : ""} - Price in bangladesh</title>
        <meta name="description" content={`Buy ${info.Prodectname} online at the best price. Free shipping and amazing discounts. Get it now!`} />
        <meta property="og:title" content={info.Prodectname} />
        <meta property="og:description" content={`Buy ${info.Prodectname} online at the best price. Free shipping and amazing discounts. Get it now!`} />
        <meta property="og:image" content={info.imgurl} />
        <meta property="og:url" content={`https://www.qmever.com/productDetails/${id}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={info.Prodectname} />
        <meta name="twitter:description" content={`Buy ${info.Prodectname} online at the best price. Free shipping and amazing discounts. Get it now!`} />
        <meta name="twitter:image" content={info.imgurl} />
      </Helmet>
      <div className="container mx-auto px-[10px] py-[10px]">
        {
          modelselect === true
            ? <div className="bg-[#d31212] text-[#fff] text-[18px] w-[200px] rounded duration-500 h-[34px] fixed top-[200px] left-[50%] translate-x-[-50%] flex justify-center items-center">{info.ModelName} not select </div>
            : <div className="bg-[#d31212] text-[#fff] text-[18px] w-[200px] rounded duration-500 h-[34px] fixed top-0 left-[50%] translate-x-[-50%] flex justify-center items-center ">{info.ModelName} not select</div>
        }
        <div className={`loging fixed ${Lodingon === true ? "block" : "hidden"} border-4 border-white rounded-lg shadow-lg z-50 duration-300 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[250px] h-[50px] bg-[#ffffff]`}>
          {
            Loding === true
              ? (
                <div className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-[#062919] rounded-lg transition-all duration-500" style={{ width: '100%' }} />
                  <div className="absolute inset-0 flex justify-center items-center text-lg font-semibold text-white">Processing...</div>
                </div>
              )
              : (
                <div className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden">
                  <div className="absolute top-0 left-0 w-0 h-full bg-[#062919] rounded-lg transition-all duration-500" />
                </div>
              )
          }
        </div>


        {
          showSlick === true &&
<div className="showImg fixed inset-0 bg-black/95 z-[999] flex items-center justify-center">
  {/* Close Button */}
  <button
    onClick={handleSlickClose}
    className="absolute z-[1000] top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white text-3xl"
  >
    <IoMdClose />
  </button>

  {/* Slider */}
  <Slider
    {...settings}
    className="w-full h-full flex items-center justify-center px-4"
  >
    <div className="imgBox flex justify-center items-center h-[90vh]">
      <ZoomableImage
        src={info.imgurl}
        alt={`${info.Prodectname} main`}
        className="max-h-full max-w-full object-contain rounded-xl shadow-lg"
      />
    </div>
    <div className="imgBox flex justify-center items-center h-[90vh]">
      
      <ZoomableImage
        src={info2.productimg}
        alt={`${info.Prodectname} Thumbnail 1`}
        className="max-h-full max-w-full object-contain rounded-xl shadow-lg"
      />
    </div>
    <div className="imgBox flex justify-center items-center h-[90vh]">
      <ZoomableImage
        src={info2.productimg2}
        alt={`${info.Prodectname} Thumbnail 2`}
        className="max-h-full max-w-full object-contain rounded-xl shadow-lg"
      />
    </div>
    <div className="imgBox flex justify-center items-center h-[90vh]">
      <ZoomableImage
        src={info2.productimg3}
        alt={`${info.Prodectname} Thumbnail 3`}
        className="max-h-full max-w-full object-contain rounded-xl shadow-lg"
      />
    </div>
  </Slider>
</div>


        }
        {
          logErr === true ?
            <div className="logerr fixed inset-0 bg-[#0000008a] flex items-center justify-center z-50">
              <div className="mes relative w-[90%] max-w-[450px] p-8 bg-white rounded-lg shadow-lg">
                <button
                  onClick={handleErrCodeClose}
                  className="absolute top-4 right-4 text-red-500 text-3xl hover:text-red-700 transition-colors"
                >
                  <IoMdClose />
                </button>
                <div className="flex items-center justify-center space-x-3">
                  <IoIosWarning className="text-red-500 text-4xl" />
                  <h2 className="text-red-500 text-2xl font-bold">Error</h2>
                </div>
                <p className="pt-4 text-center text-lg text-gray-700">
                  You do not have an account.
                </p>
                <h3 className="mt-6 text-green-500 text-xl font-medium text-center">
                  <u className="cursor-pointer hover:text-green-700 transition-colors">Go MENU/Login now</u>
                </h3>
              </div>
            </div>
            :
            <div className="logerr fixed top-[-100%] duration-150 left-[50%] translate-x-[-50%] w-[100%] h-[100%] bg-[#00000059]"></div>

        }
        <div className="productdetailsBox gap-[20px] flex flex-wrap">
          <div className="imgbox w-[100%] flex gap-[10px] lg:w-[55%]">
            <div onClick={handleImgSlick} className=" cursor-pointer leftImg flex flex-wrap gap-y-[10px] w-[23%]">
             <div className="w-[100%]">
  {[info2.productimg, info2.productimg2, info2.productimg3].map((img, index) =>
    img ? (
      <img
        key={index}
        className="mb-[10px] cursor-pointer w-[100%]"
        src={img}
        alt={`${info.Prodectname} Thumbnail ${index + 1}`}
      />
    ) : (
      <SkeletonTheme key={index}>
        <Skeleton className="h-[100px] lg:h-[150px] mb-3" />
      </SkeletonTheme>
    )
  )}
</div>

            </div>
            <div onClick={handleImgSlick} className=" cursor-pointer overflow-hidden rightimg w-[77%]">
              {info.imgurl
                ?
                <img className=" hover:scale-125 duration-200 cursor-pointer w-[100%] " src={info.imgurl} alt="" />
                :
                <SkeletonTheme >
                  <Skeleton className=" h-[330px] lg:h-[490px] mb-4" />

                </SkeletonTheme>
              }
            </div>
          </div>
          <div className="details w-[100%] lg:w-[43%]">
            <div className=" cursor-pointer overflow-hidden rightimg">
              {info.Prodectname
                ?
                <h1 className=' shadow-slate-900 text-customized font-[600] text-[17px] xl:text-[30px] 2xl:text-[40px] uppercase my-[5px]'>{info.Prodectname}</h1>
                :
                <SkeletonTheme className="w-[100%]" >
                  <Skeleton className="h-[18px] mb-[4px] w-[100%]" />
                  <Skeleton className="h-[18px] mb-[4px] w-[100%]" />
                  <Skeleton className="h-[18px] mb-[4px] w-[100%]" />
                </SkeletonTheme>
              }
            </div>
            <h2 className='text-customized font-[600] text-[15px] xl:text-[20px] my-[5px]'>Price : <span className='text-[#cf0cbf] font-[500]'>{modlePrice !== "" ? Number(modlePrice).toFixed(2) : (info?.Price != null ? Number(info.Price).toFixed(2) : "")}৳</span></h2>
            {modleColor && modleColor?.Stock > 0 && (
              <div className="mt-2 py-1 rounded-md font-[500] text-[15px] xl:text-[20px] text-green-900 w-fit">
                Stock: {modleColor.Stock}
              </div>
            )}

            <ShareProductsLink title={info.Prodectname} />

        <div className="py-4">
  {/* Model Name */}
  <h2 className="text-customized select-none font-semibold text-[17px] xl:text-[20px] mb-3">
    {info.ModelName}
  </h2>

  {/* Color Selector */}
  {SelectColor && (
    <div className="flex flex-wrap items-center gap-5 mb-4 px-3 py-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {SelectColor.map((item, index) =>
        item.Stock > 0 ? (
          <div
            key={index}
            onClick={() => HandleGetColor(item, index)}
            className={`
              relative rounded-full w-12 h-12 sm:w-10 sm:h-10 md:w-14 md:h-14 cursor-pointer shadow-md
              transition-transform transform hover:scale-110
              ${InColor === index ? "ring-4 ring-offset-2 ring-[#00000086]" : ""}
            `}
            style={{ backgroundColor: item.Color }}
            title={item.Color}
          />


        ) : null
      )}
    </div>
  )}

  {/* Additional Models */}
  {info3 && info3.length > 0 && (
    <div className="flex flex-wrap gap-3">
      {info3.map((addModle, index) => {
        const isSelected = modleaddicon === addModle.Model;
        return (
          <h2
            key={index}
            onClick={() => handleModel({ index, addModle })}
            className={`
              flex justify-center items-center cursor-pointer rounded-lg py-2 px-4
              font-semibold text-[13px] xl:text-[18px]
              transition-all duration-200
              ${isSelected ? "bg-black text-white border-black" : "bg-white text-black border border-black"}
              hover:scale-105
            `}
          >
            {addModle.Model}
          </h2>
        );
      })}
    </div>
  )}
</div>


  <div className="items-center pb-5">
      {/* Button to open */}
      <button
        onClick={() => setShow(true)}
        className={`${info.VideoURL !== "" ? "block" : "hidden"} flex items-center justify-center w-full h-[40px] sm:h-14 lg:h-16 bg-red-600 text-white rounded-[4px] shadow-lg hover:bg-red-700 transition`}
      >
        <FaYoutube className="text-3xl lg:text-4xl" />
      </button>

      {/* Show Video */}
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-[95%] max-w-7xl rounded-xl overflow-hidden shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-[-5px] right-[-5px] z-[999] bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition"
            >
              ✕
            </button>

            {/* Responsive Video */}
            <div className="relative w-full pb-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src={`${info.VideoURL}+?rel=0}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>

                

            <div className="BTnCaBy noselect flex gap-[10px] w-[100%]">
              <h2 onClick={handleBuyNow} className='cursor-pointer text-[#fff] bg-[#062919] h-[40px] rounded-[5px] justify-center flex items-center font-[600] w-[50%]'>Buy Now</h2>
              <h2 onClick={handleAddTocart} className='cursor-pointer text-[#fff] bg-[#062919] h-[40px] rounded-[5px] justify-center flex items-center font-[600] w-[50%]'>{addsucess === true ? <h2 className='text-[24px] text-[#188918]'><IoCheckmarkDoneCircle /></h2> : <h2>Add To Cart</h2>} </h2>
            </div>


          </div>
        </div>
      </div>
      <div className=" container mx-auto px-[10px] py-[10px] ">
<div className="description mt-12 lg:flex lg:justify-between">
  <div className="cursor-pointer lg:w-[60%] overflow-hidden rightimg">
    {info?.description ? (
      info.description
        .split(".  ") // sentences split
        .map((text, i) => (
          <p
            key={i}
            className="text-[16px] flex justify-between flex-wrap sm:text-[15px] md:text-[16px] lg:text-[17px] font-medium italic text-gray-700 my-2 leading-relaxed"
          >
            {text.trim()}.
          </p>
        ))
    ) : (
      <p className="text-gray-400 italic">Loading description...</p>
    )}
  </div>
<div className="lg:w-[40%] w-full p-2">

  

</div>

</div>

      </div>
    </section>
  )
}

export default ProductDetails