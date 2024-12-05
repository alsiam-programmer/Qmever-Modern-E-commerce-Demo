import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoAddOutline } from "react-icons/io5";
import { CgMathMinus } from "react-icons/cg";
import { FaCircleXmark } from "react-icons/fa6";
import { BuyItemDelete, qunDecrement, qunIncrement, removeCartPro, userBuyItem } from '../Componat/slice/AllSlice';
import { useNavigate } from 'react-router-dom';

const Cartpage = () => {
  const cartItem = useSelector((item)=>item.counter.cartItem)
  const BuyItem = useSelector((item)=>item.counter.BuyItem)
  console.log(cartItem);
  
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let [Lodingon, setLodingOn] = useState(false)
  let [Loding, setLoding] = useState(false)
  let HandleRemoveCartIn = (index) => {
    dispatch(removeCartPro(index))
  }
  let handleIncre = (index) => {
    dispatch(qunIncrement(index))
  }
  let handleDecre = (index) => {
    dispatch(qunDecrement(index))
  }
  let HandleCheckoutGo = () => {
    dispatch(BuyItemDelete(BuyItem))
    setLodingOn(true)
    setTimeout(() => {
      dispatch(userBuyItem({cartItem , totalPrice , totalQun }))
      navigate('/CheckOut')
    }, 500);
    setTimeout(() => {
      setLoding(true)
    }, 100);
  }
  let { totalPrice , totalQun } = cartItem.reduce((acc , item)=>{
    acc.totalPrice += item.Price * item.ProdectQun
    acc.totalQun += item.ProdectQun
    return (
      acc
    )
  },{totalPrice:0 , totalQun:0} )
  
  console.log(totalQun);
  console.log();
  let goDetails_page = (id) => {
    navigate(`/productDetails/${id}`)
  }
  return (
    <section>
      <div className="container mx-auto">
        {cartItem.length > 0 
        ?
        <div className="">
              <div className={`loging ${Lodingon === true ? " block " : "hidden"} `}>
            {
              Loding === true
              ? <div className={` fixed z-[999] duration-100 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] h-[100%] bg-[#0000008e]`}>Processing...</div>
              : <div className={` fixed z-[999] duration-100 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[0%] h-[100%] bg-[#0000008e]`}></div>
            }
          </div>
        <div className=" bg-[#ffff] rounded-[20px] flex items-center h-[60px] ">
                <div className="box justify-between w-[100%] my-[10px] md:m-[10px] flex flex-wrap p-[10px] items-center gap-[10px]">
                  <h2 className='w-[30%] pr-[10px] flex items-center text-[20px] font-[600] text-[#062919] h-[60px]'>Product</h2>
                  <h2 className=' justify-start w-[20%] pr-[10px] flex items-center text-[20px] font-[600] text-[#062919] h-[60px]'>Model</h2>
                  <h2 className=' justify-start w-[20%] pr-[10px] flex items-center h-[60px] text-[#062919]'>Quntite</h2>
                  <h2 className=' justify-end w-[20%] pr-[10px] flex items-center text-[20px] font-[600] text-[#062919] h-[60px]'>Price</h2>
              </div>
              </div>
        {cartItem.map((cartItemx , index)=>(
              <div className=" cursor-pointer ">
                <div className="box justify-between w-[97%] mx-auto lg:w-[100%] my-[10px] rounded flex flex-wrap p-[10px] bg-[#fff] items-center gap-[10px]">
                  <div className=" w-[100%] sm:w-[30%] flex justify-between sm:pr-[30px]">
                  <div className="img relative">
                  <h2 onClick={()=>HandleRemoveCartIn(index)} className=' text-[16px] text-[#f00] absolute top-[-5px] left-[-5px] z-[99]'><FaCircleXmark/></h2>
                  <img className='h-[70px]' src={cartItemx.imgurl} alt="" />
                  </div>
                  <h2 onClick={()=>goDetails_page(cartItemx.ProdectId)} className=' hover:underline sm:pr-[10px] flex items-center h-[70px] text-[#062919] font-[600] text-[17px]'>{cartItemx.Prodectname}</h2>
                  </div>
                  <h2 className=' justify-start sm:w-[20%] pr-[10px] flex items-center h-[70px] text-[#062919] font-[600] text-[17px]'>
                    {
                      cartItemx.size
                      ? <h2 className='text-[#062919] font-[600] text-[17px]'>{cartItemx.size}</h2>
                      : <h2 className='text-[#062919] font-[600] text-[17px]'>Regulear</h2>
                    }
                  
                  </h2>
                  <div className=' justify-start sm:w-[20%] pr-[10px] flex items-center h-[70px] text-[#062919]'>
                    <h2 onClick={()=>handleIncre(index)} className='px-[5px] font-[600] text-[17px]'><IoAddOutline/></h2>
                    <h2 className='px-[5px] text-[green] font-[600] text-[17px]'>{cartItemx.ProdectQun}</h2>
                    <h2 onClick={()=>handleDecre(index)} className='px-[5px] font-[600] text-[17px]'><CgMathMinus/></h2>  
                  </div>
                  <h2 className=' justify-end sm:w-[20%] pr-[10px] font-[600] text-[17px] flex items-center h-[70px] text-[#000]'>Price : {cartItemx.Pricesub !== "" && cartItemx.Pricesub ? cartItemx.Pricesub * cartItemx.ProdectQun : cartItemx.Price * cartItemx.ProdectQun}৳</h2>
              </div>
              </div>
          ))}
          
          <div className="TotalBillbox my-[30px] mx-[10px] flex justify-end">
            <h2 onClick={HandleCheckoutGo} className=" Total rounded w-[100%] md:w-[20%]  flex justify-center items-center p-[7px] border-[2px] border-[#fff] bg-[#ffffff98] sm:text-[19px] font-[600]  text-[#ffffff]">Procces to CheckOut</h2>
          </div>
        </div>
        : <h5 className='text-[20px] text-[#000] font-[600]' >You have no items in your cart.</h5>
      }
      </div>
    </section>
  )
}

export default Cartpage