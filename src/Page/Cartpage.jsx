import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoAddOutline } from "react-icons/io5";
import { CgMathMinus } from "react-icons/cg";
import { FaCircleXmark } from "react-icons/fa6";

import {
  BuyItemDelete,
  qunDecrement,
  qunIncrement,
  removeCartPro,
  userBuyItem
} from '../Componat/slice/AllSlice';
import { useNavigate } from 'react-router-dom';

const Cartpage = () => {
  const cartItem = useSelector((item) => item.counter.cartItem)
  const BuyItem = useSelector((item) => item.counter.BuyItem)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [Lodingon, setLodingOn] = useState(false)
  const [Loding, setLoding] = useState(false)

  const HandleRemoveCartIn = (index) => dispatch(removeCartPro(index))
  const handleIncre = (index) => dispatch(qunIncrement(index))
  const handleDecre = (index) => dispatch(qunDecrement(index))

  const HandleCheckoutGo = () => {
    dispatch(BuyItemDelete(BuyItem))
    setLodingOn(true)
    setTimeout(() => {
      dispatch(userBuyItem({ cartItem, totalPrice, totalQun }))
      navigate('/CheckOut')
    }, 500)
    setTimeout(() => setLoding(true), 100)
  }

  const { totalPrice, totalQun } = cartItem.reduce((acc, item) => {
    acc.totalPrice += item.Price * item.ProdectQun
    acc.totalQun += item.ProdectQun
    return acc
  }, { totalPrice: 0, totalQun: 0 })

  const goDetails_page = (id) => {
    navigate(`/productDetails/${id}`)
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        {cartItem.length > 0 ? (
          <div className="relative">
            {/* Loading Overlay */}
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${Lodingon ? 'block' : 'hidden'}`}>
              {Loding && <div className="text-white text-xl font-semibold animate-pulse">Processing...</div>}
            </div>

            {/* Cart List */}
            <div className="space-y-4">
              {cartItem.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Left */}
                  <div className="flex items-center gap-4 w-full md:w-1/3 relative">
                    <button onClick={() => HandleRemoveCartIn(index)} className="absolute -top-2 -left-2 text-red-500 hover:text-red-700 text-lg z-10">
                      <FaCircleXmark />
                    </button>
                    <img src={item.imgurl} alt="" className="h-[70px] w-[70px] rounded-md object-cover border" />
                    <div onClick={() => goDetails_page(item.ProdectId)} className="cursor-pointer hover:underline text-gray-800 font-medium text-base">
                      {(item.Prodectname).slice(0 , 20)+"..."}
                    </div>
                  </div>

                  {/* Size / Model */}
                  <div className="w-full md:w-1/4 text-gray-600 text-sm font-medium">
                    {item.size || 'Regular'}
                  </div>

                  {
                    item.modleColor.Color !== ""
                    &&
                  <div className={`${item.modleColor.Color ? "block" : "hidden"} flex gap-2`}>
                                <span className='text-[#000000] text-sm font-bold'>Color:</span>      <div className="w-4 h-4 rounded-[50%]" style={{ backgroundColor: item.modleColor.Color }}></div>
                  </div>
                  }

                  <div className="w-full md:w-1/4 flex items-center justify-center gap-3 text-gray-700">
                    <button onClick={() => handleIncre(index)} className="bg-green-100 p-2 rounded hover:bg-green-200">
                      <IoAddOutline className="text-green-600" />
                    </button>
                    <span className="font-semibold text-base">{item.ProdectQun}</span>
                    <button onClick={() => handleDecre(index)} className="bg-red-100 p-2 rounded hover:bg-red-200">
                      <CgMathMinus className="text-red-500" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="w-full md:w-1/6 text-right text-gray-800 font-semibold text-base">
                    {item.Pricesub ? item.Pricesub * item.ProdectQun : item.Price * item.ProdectQun}৳
                  </div>
                </div>
              ))}
            </div>

            {/* Total & Checkout */}
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-700 text-lg font-medium">
                Total: <span className="font-bold">{totalPrice}৳</span> | Quantity: <span className="font-bold">{totalQun}</span>
              </div>
              <button
                onClick={HandleCheckoutGo}
                className="bg-green-600 text-[13px] xl:text-[16px] hover:bg-green-700 text-white w-[100%] sm:w-[30%] px-3 py-2 xl:px-6 xl:py-2 rounded-lg font-semibold shadow-md transition"
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
