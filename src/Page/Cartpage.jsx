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
  

  let goDetails_page = (id) => {
    navigate(`/productDetails/${id}`)
  }
  return (
<section className="min-h-screen bg-gray-100 py-8">
  <div className="container mx-auto px-4">
    {cartItem.length > 0 ? (
      <div className="relative">
        {/* Loading Overlay */}
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${Lodingon ? 'block' : 'hidden'}`}>
          {Loding && <div className="text-white text-2xl font-semibold animate-pulse">Processing...</div>}
        </div>

        {/* Header Row */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-4 hidden md:flex">
          <div className="w-1/3 font-semibold text-lg text-gray-800">Product</div>
          <div className="w-1/4 font-semibold text-lg text-gray-800">Model</div>
          <div className="w-1/4 font-semibold text-lg text-gray-800">Quantity</div>
          <div className="w-1/6 font-semibold text-lg text-right text-gray-800">Price</div>
        </div>

        {/* Cart Items */}
        {cartItem.map((cartItemx, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-4 mb-3 flex flex-col md:flex-row items-center md:justify-between gap-4">
            <div className="flex items-center w-full md:w-1/3 relative">
              <button onClick={() => HandleRemoveCartIn(index)} className="absolute -top-2 -left-2 text-red-500 hover:text-red-700 text-lg z-10">
                <FaCircleXmark />
              </button>
              <img src={cartItemx.imgurl} alt="" className="h-[70px] w-[70px] object-contain rounded-md" />
              <h2 onClick={() => goDetails_page(cartItemx.ProdectId)} className="ml-4 font-semibold text-gray-700 hover:underline cursor-pointer text-[16px]">
                {cartItemx.Prodectname}
              </h2>
            </div>

            <div className="w-full md:w-1/4 text-gray-600 font-medium">
              {cartItemx.size ? cartItemx.size : 'Regular'}
            </div>

            <div className="w-full md:w-1/4 flex items-center space-x-3 text-gray-700">
              <button onClick={() => handleIncre(index)} className="text-green-600 hover:text-green-800 text-lg"><IoAddOutline /></button>
              <span className="font-semibold">{cartItemx.ProdectQun}</span>
              <button onClick={() => handleDecre(index)} className="text-red-500 hover:text-red-700 text-lg"><CgMathMinus /></button>
            </div>

            <div className="w-full md:w-1/6 text-right font-semibold text-gray-800">
              Price: {cartItemx.Pricesub ? cartItemx.Pricesub * cartItemx.ProdectQun : cartItemx.Price * cartItemx.ProdectQun}৳
            </div>
          </div>
        ))}

        {/* Checkout Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={HandleCheckoutGo}
            className="bg-green-600 hover:bg-green-700 transition text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    ) : (
      <div className="text-center py-20">
        <h5 className="text-2xl font-semibold text-gray-700">You have no items in your cart.</h5>
      </div>
    )}
  </div>
</section>

  )
}

export default Cartpage