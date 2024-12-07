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

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className='sm:block hidden'
      onClick={onClick}
    ><h2 className='flex justify-center items-center rounded-[50%] text-[27px] w-[50px] h-[50px] absolute top-[50%] translate-y-[-50%] z-[990] left-[10px] bg-[#ffffff49] hover:bg-[#fff]'><IoIosArrowBack /></h2></div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className='sm:block hidden'
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
  let productId = useParams()
  let [showSlick, setShowSlick] = useState(false)
  let [info, setInfo] = useState([])
  let [info2, setInfo2] = useState([])
  let [info3, setInfo3] = useState([])
  let [modleaddicon, setmodleaddicon] = useState('')
  let [modlePrice, setmodlePrice] = useState('')
  let [ProdectQun, setProdectQun] = useState(1)
  let [Lodingon, setLodingOn] = useState(false)
  let [Loding, setLoding] = useState(false)
  let [modelselect, setModelselect] = useState(false)
  let [addsucess, setaddsucess] = useState(false)
  let productData = () => axios.get(`https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId.id}.json`).then((res) => {
    setInfo(res.data);
    setInfo2(res.data.thumbnail)
    setInfo3(res.data.addModle);
  })
  useEffect(() => {
    productData()
  }, [productId.id])

  useEffect(() => {
    LoginInfo.map((item) => {
      setUserUID(item)
    })
  })


  let handleBuyNow = () => {
    if (userUID !== "") {
      if (info3 !== "") {
        if (modleaddicon !== "") {
          dispatch(BuyItemDelete({ ...info, size: modleaddicon, Pricesub: modlePrice, ProdectQun }))
          setLodingOn(true)
          setTimeout(() => {
            setLoding(true)
          }, 30);
          setTimeout(() => {
            dispatch(userBuyItem({ ...info, size: modleaddicon, Pricesub: modlePrice, ProdectQun }))
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
        if (modleaddicon !== "") {
          dispatch(AddToCart({ ...{ Prodectname : info.Prodectname , Price : info.Price , ProdectId : info.ProdectId , imgurl : info.imgurl , PCU : info.PCU , category : info.category}, size: modleaddicon, Pricesub: modlePrice, ProdectQun }))
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
        dispatch(AddToCart({ ...{ Prodectname : info.Prodectname , Price : info.Price , ProdectId : info.ProdectId , imgurl : info.imgurl , PCU : info.PCU , category : info.category} , ProdectQun }))
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
    setmodleaddicon(addModle.Model)
    setmodlePrice(addModle.Price)

  }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
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
        <meta property="og:url" content={`https://www.qmever.com/productDetails/${productId.id}`} />
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
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
                <div className="showImg fixed top-[50%] bg-[#000] left-[50%] translate-x-[-50%] translate-y-[-50%]  z-[999] w-[100%] h-[100%] ">
                  <icon onClick={handleSlickClose} className=" m-[30px] cursor-pointer justify-end flex p-[10px] text-[#fff] text-[30px]"><IoMdClose /></icon>
                  <Slider className='w-[90%] flex items-center md:w-[60%] lg:w-[50%] xl:w-[600px] top-[50%] absolute left-[50%] translate-x-[-50%] translate-y-[-50%] ' {...settings}>
                    <div className="imgBox w-[100%]">
                      <img className='w-[100%]' src={info.imgurl} alt={`${info.Prodectname} main`} />
                    </div>
                    <div className="imgBox w-[100%]">
                      <img className='w-[100%]' src={info2.productimg} alt={`${info.Prodectname} Thumbnail 1`} />
                    </div>
                    <div className="imgBox w-[100%]">
                      <img className='w-[100%]' src={info2.productimg2} alt={`${info.Prodectname} Thumbnail 2`} />
                    </div>
                    <div className="imgBox w-[100%]">
                      <img className='w-[100%]' src={info2.productimg3} alt={`${info.Prodectname} Thumbnail 3`} />
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
                    <div className="w-[100%] ">
                      {info2.productimg
                        ?
                        <img className=" mb-[10px] cursor-pointer w-[100%] " src={info2.productimg} alt="" />
                        :
                        <SkeletonTheme >
                          <Skeleton className=" h-[100px] lg:h-[150px] mb-3" />

                        </SkeletonTheme>
                      }
                      {info2.productimg2
                        ?
                        <img className=" my-[10px] cursor-pointer w-[100%] " src={info2.productimg2} alt="" />
                        :
                        <SkeletonTheme >
                          <Skeleton className=" h-[100px] lg:h-[150px] mb-3" />

                        </SkeletonTheme>
                      }
                      {info2.productimg3
                        ?
                        <img className=" my-[10px] cursor-pointer w-[100%] " src={info2.productimg3} alt="" />
                        :
                        <SkeletonTheme >
                          <Skeleton className=" h-[100px] lg:h-[150px] mb-3" />

                        </SkeletonTheme>
                      }
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
                      <h1 className=' shadow-slate-900 text-customized font-[600] text-[20px] lg:text-[30px] 2xl:text-[40px] uppercase my-[5px]'>{info.Prodectname}</h1>
                      :
                      <SkeletonTheme className="w-[100%]" >
                        <Skeleton className="h-[18px] mb-[4px] w-[100%]" />
                        <Skeleton className="h-[18px] mb-[4px] w-[100%]" />
                        <Skeleton className="h-[18px] mb-[4px] w-[100%]" />
                      </SkeletonTheme>
                    }
                  </div>
                  <h2 className='text-customized font-[600] text-[20px] my-[5px]'>Price : <span className='text-[#cf0cbf] font-[500]'>{modlePrice !== "" ? Number(modlePrice).toFixed(2) : (info?.Price != null ? Number(info.Price).toFixed(2) : "")}৳</span></h2>
                  <h2 className='text-customized noselect font-[600] text-[20px] my-[5px]'>{info.ModelName}</h2>

                  {
                    info3 !== ""
                      ?
                      <div className="modles noselect mb-[30px] flex-wrap flex gap-[10px]">
                        {info3.map((addModle, index) => (
                          <h2 onClick={() => handleModel({ index, addModle })} className={` ${modelselect === true && "border-[red]"} flex border-[1px] py-[10px] px-[20px] rounded justify-center items-center cursor-pointer ${modleaddicon === addModle.Model ? "bg-[#000] text-[#fff]" : "border-[#fff] text-[#fff]"}  font-[600] text-[20px] my-[5px]`}>{addModle.Model}</h2>
                        ))}
                      </div>
                      : ""
                  }
                  <div className="BTnCaBy noselect flex gap-[10px] w-[100%]">
                    <h2 onClick={handleBuyNow} className='cursor-pointer text-[#fff] bg-[#062919] h-[40px] rounded-[5px] justify-center flex items-center font-[600] w-[50%]'>Buy Now</h2>
                    <h2 onClick={handleAddTocart} className='cursor-pointer text-[#fff] bg-[#062919] h-[40px] rounded-[5px] justify-center flex items-center font-[600] w-[50%]'>{addsucess === true ? <h2 className='text-[24px] text-[#188918]'><IoCheckmarkDoneCircle /></h2> : <h2>Add To Cart</h2>} </h2>
                  </div>
                  <div className="description mt-[50px] border-t-[2px] border-t-[#fff]">
                    <div className=" cursor-pointer overflow-hidden rightimg">
                      <p className=' text-[16px] font-[600] italic my-[30px]  text-[#0000008a] '>{info.description}</p>
                    </div>
                    <iframe className=' w-[100%] sm:h-[315px]' src={info.VideoURL} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>
          )
}

          export default ProductDetails