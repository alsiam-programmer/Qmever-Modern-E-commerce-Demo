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
import SIMILAR_PRODUCTS from '../Componat/SIMILAR_PRODUCTS';
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
  const [ SIMILAR_PRODUCTSX , setSIMILAR_PRODUCTSX ] = useState('')

  let [show, setShow] = useState(false)


  let productData = async () => {
    try {
      let res = await axios.get(`https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json`)
      if (res.data === null) {
        navigate("/404");
        return;
      }

      setInfo(res.data);
      setInfo2(res.data.thumbnail || "")
      setInfo3(res.data.addModle !== undefined ? res.data.addModle : "");
      setSIMILAR_PRODUCTSX(res?.data?.category?.subs);
      
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
          if (modleaddicon !== "" && !SelectColor) {
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
        }
      } else {
        dispatch(BuyItemDelete({ ...info, size: modleaddicon, Pricesub: modlePrice, ProdectQun, modleColor }))
        setLodingOn(true)
        setTimeout(() => {
          setLoding(true)
        }, 30);
        setTimeout(() => {
          dispatch(userBuyItem({ ...info, ProdectQun, modleColor }))
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
          dispatch(AddToCart({ ...{ Prodectname: info.Prodectname, Price: modlePrice ? modlePrice : info.Price, ProdectId: info.uid, imgurl: info.imgurl, category: info.category }, size: modleaddicon, Pricesub: modlePrice, ProdectQun, modleColor }))
          setaddsucess(true)
          setTimeout(() => {
            setaddsucess(false)
          }, 1000);
        } else {
          if (modleaddicon !== "" && !SelectColor) {
            dispatch(AddToCart({ ...{ Prodectname: info.Prodectname, Price: modlePrice ? modlePrice : info.Price, ProdectId: info.uid, imgurl: info.imgurl, category: info.category }, size: modleaddicon, Pricesub: modlePrice, ProdectQun, modleColor }))
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
        }
      } else {
        dispatch(AddToCart({ ...{ Prodectname: info.Prodectname, Price: modlePrice ? modlePrice : info.Price, ProdectId: info.uid, imgurl: info.imgurl, category: info.category }, ProdectQun, modleColor }))
        setaddsucess(true)
        setTimeout(() => {
          setaddsucess(false)
        }, 1000);
      }
    } else {
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
    <section className="relative">
      <Helmet>
        <title>
          {info.Prodectname ? `${info.Prodectname} - Price in Bangladesh` : ""}
        </title>
        <meta
          name="description"
          content={`Buy ${info.Prodectname} online at the best price. Free shipping and amazing discounts. Get it now!`}
        />
        <meta property="og:title" content={info.Prodectname} />
        <meta
          property="og:description"
          content={`Buy ${info.Prodectname} online at the best price. Free shipping and amazing discounts. Get it now!`}
        />
        <meta property="og:image" content={info.imgurl} />
        <meta
          property="og:url"
          content={`https://www.qmever.com/productDetails/${id}`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={info.Prodectname} />
        <meta
          name="twitter:description"
          content={`Buy ${info.Prodectname} online at the best price. Free shipping and amazing discounts. Get it now!`}
        />
        <meta name="twitter:image" content={info.imgurl} />
      </Helmet>

      <div className="container mx-auto px-4 py-6">
        {/* Toast for Model Select */}
        {modelselect && (
          <div className="fixed inset-x-0 top-24 flex justify-center z-[1200]">
            <div className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-xl shadow-xl text-sm font-semibold flex items-center gap-3 animate-slide-in">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M4.93 4.93l14.14 14.14" />
              </svg>
              <span>{info.ModelName ? `${info.ModelName} not selected` : "Model not selected"}</span>
            </div>
          </div>
        )}

        {/* Toast for Login Error */}
        {logErr && (
          <div className="fixed inset-x-0 top-24 flex justify-center z-[1200]">
            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-3 animate-slide-in">

              <span>Login required to proceed</span>
              <button
                onClick={handleErrCodeClose}
                className="ml-4 bg-white/20 hover:bg-white/40 text-white rounded-full w-6 h-6 flex items-center justify-center transition-transform hover:scale-125"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>
        )}




        {/* Loader */}
        {Lodingon && (
          <div className="fixed inset-0 bg-black/50 z-[9998] flex items-center justify-center">
            <div className="w-[60px] h-[60px] flex items-center justify-center">
              <div className="loader w-full h-full" />
            </div>
          </div>
        )}


        {showSlick && (
          <div className="showImg fixed inset-0 bg-black/95 backdrop-blur-sm z-[999] flex items-center justify-center">

            {/* Close Button */}
            <button
              onClick={handleSlickClose}
              className="absolute hover:rotate-180 top-6 right-6 z-[1000] p-3 rounded-full bg-white/20 hover:bg-white/40 transition text-white text-3xl shadow-lg"
              aria-label="Close"
            >
              <IoMdClose />
            </button>

            {/* Slider */}
            {info2 ? (
              <Slider
                {...settings}
                className="w-full px-6"
              >
                {/* Main Product Image */}
                <div className="flex justify-center items-center h-[80vh]">
                  <ZoomableImage
                    src={info.imgurl}
                    alt={`${info.Prodectname} main`}
                    className="max-h-full max-w-full object-contain rounded-xl shadow-lg"
                  />
                </div>

                {/* Extra Thumbnails */}
                {[info2.productimg, info2.productimg2, info2.productimg3].map(
                  (img, i) =>
                    img && (
                      <div
                        key={i}
                        className="flex justify-center items-center h-[80vh]"
                      >
                        <ZoomableImage
                          src={img}
                          alt={`${info.Prodectname} Thumbnail ${i + 1}`}
                          className="max-h-full max-w-full object-contain rounded-xl shadow-lg"
                        />
                      </div>
                    )
                )}
              </Slider>
            ) : (
              <div className="flex justify-center items-center h-[80vh] w-full">
                <ZoomableImage
                  src={info.imgurl}
                  alt={`${info.Prodectname} main`}
                  className="max-h-full max-w-full object-contain rounded-xl shadow-lg"
                />
              </div>
            )}
          </div>
        )}


        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Image Gallery */}
          <div className={`flex ${info2 && "gap-4"}`}>
            {/* Thumbnails */}
            {info2 && (
              <div className="w-[22%] flex flex-col gap-4 cursor-pointer">
                {[info2.productimg, info2.productimg2, info2.productimg3].map(
                  (img, i) =>
                    img && (
                      <div
                        key={i}
                        className="aspect-square w-full overflow-hidden rounded-lg"
                        onClick={handleImgSlick}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition"
                        />
                      </div>
                    )
                )}
              </div>
            )}

            {/* Main Image */}
            <div
              onClick={handleImgSlick}
              className={`${info2 ? "w-[78%]" : "w-full"
                } aspect-square cursor-pointer rounded-lg overflow-hidden`}
            >
              {info.imgurl ? (
                <img
                  src={info.imgurl}
                  alt={info.Prodectname}
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              ) : (
                <Skeleton className="h-full w-full aspect-square" />
              )}
            </div>
          </div>



          {/* Right: Product Details */}
          <div className="flex flex-col gap-5">
            {/* Title */}
            {info.Prodectname ? (
              <h1 className="text-2xl xl:text-4xl font-bold uppercase text-gray-900">
                {info.Prodectname}
              </h1>
            ) : (
              <Skeleton className="h-8 w-2/3" />
            )}

            {/* Price & Stock */}
            <h2 className="text-lg xl:text-2xl font-semibold text-gray-800">
              Price:{" "}
              <span className="text-pink-600">
                {modlePrice
                  ? Number(modlePrice).toFixed(2)
                  : info?.Price
                    ? Number(info.Price).toFixed(2)
                    : ""}
                ৳
              </span>
            </h2>
            {modleColor?.Stock > 0 && (
              <div className="text-green-600 font-medium">
                Stock: {modleColor.Stock}
              </div>
            )}

            {/* Share Links */}
            <ShareProductsLink title={info.Prodectname} />

            {/* Model Name */}
            {info.ModelName && (
              <h3 className="text-md xl:text-lg font-semibold text-gray-700">
                {info.ModelName}
              </h3>
            )}

            {/* Color Selector */}
            {SelectColor && (
              <div className="flex gap-3 mt-2">
                {SelectColor.map(
                  (item, idx) =>
                    item.Stock > 0 && (
                      <div
                        key={idx}
                        onClick={() => HandleGetColor(item, idx)}
                        style={{ backgroundColor: item.Color }}
                        className={`w-12 h-12 rounded-full cursor-pointer border-2 ${InColor === idx ? "border-black" : "border-gray-200"
                          }`}
                        title={item.Color}
                      />
                    )
                )}
              </div>
            )}

            {/* Extra Models */}
            {info3?.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {info3.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleModel({ index: idx, addModle: m })}
                    className={`px-4 py-2 rounded-md border transition ${modleaddicon === m.Model
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    {m.Model}
                  </button>
                ))}
              </div>
            )}

            {/* Video Button */}
            {info.VideoURL && (
              <button
                onClick={() => setShow(true)}
                className="flex items-center justify-center gap-2 w-full h-12 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <FaYoutube className="text-2xl" /> Watch Video
              </button>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-green-900 text-white py-3 rounded-lg shadow hover:bg-green-800 transition"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddTocart}
                className="flex-1 bg-green-900 text-white py-3 rounded-lg shadow hover:bg-green-800 transition flex items-center justify-center gap-2"
              >
                {addsucess ? <IoCheckmarkDoneCircle size={22} /> : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
          {info?.description ? (
            info.description.split(".  ").map((txt, i) => (
              <p
                key={i}
                className="text-gray-700 text-base leading-relaxed mb-2 italic"
              >
                {txt.trim()}.
              </p>
            ))
          ) : (
            <p className="text-gray-400 italic">Loading description...</p>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {show && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[1000]">
    <div className="relative w-[95%] max-w-5xl rounded-xl overflow-hidden shadow-2xl">
      {/* Close Button */}
      <button
        onClick={() => setShow(false)}
        className="absolute -top-2 -right-2 opacity-[0.3] hover:opacity-[1] bg-red-600 hover:bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-transform hover:scale-110 z-50"
        aria-label="Close Video"
      >
        ✕
      </button>

      {/* Responsive Video */}
      <div className="relative w-full pb-[56.25%]">
        <iframe
          src={`${info.VideoURL}?rel=0`}
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full rounded-lg"
        />
      </div>
    </div>
  </div>
)}
    
    <SIMILAR_PRODUCTS SIMILAR_PRODUCTSX={SIMILAR_PRODUCTSX} id={id}/>

    </section>

  )
}

export default ProductDetails