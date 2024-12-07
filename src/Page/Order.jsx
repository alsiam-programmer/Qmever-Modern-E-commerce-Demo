import axios from "axios";
import { getDatabase } from "firebase/database";
import React, { useEffect, useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import { useSelector } from "react-redux";

const Order = () => {
  const db = getDatabase();
  const [orderItems, setOrderItems] = useState([]);
  const [orderStatusx, setorderStatusx] = useState([])
  const userUid = useSelector((state) => state.counter.user);
  const [loading, setLoading] = useState(true);
  const [ OS_selectX , setOS_selectX ] = useState('')

  console.log(orderItems);

  useEffect(() => {
    setLoading(true); // Reset loading state

    axios
      .get(
        `https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userUid}.json`
      )
      .then((res) => {
        const Data = res?.data
        if (Array.isArray(Data)) {
          const validOrders =
          OS_selectX !== "All" && OS_selectX !== ""
          ? Data.filter((order) => order?.orderStatus?.orderStatus === OS_selectX ).reverse()
          : Data.filter((order) => order !== null).reverse()
          setOrderItems(validOrders);
          const orderStatusc = validOrders.map((item) => item?.orderStatus)
          setorderStatusx(orderStatusc)

        } else {
          console.error("Unexpected data format:", res?.data);
          setOrderItems([])
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      })
      .finally(() => setLoading(false));
  }, [userUid , OS_selectX]);

  const handleSelectOS = (itemx) => {
    setOS_selectX(itemx)
  }
  
  // useEffect(()=>{
  // },[orderItems])
  return (
    <div className=" container text-center md:py-10 py-[5px] px-[10px] mx-auto">
      {/* Order Status Filter */}
      <div className="w-full bg-[#f4f4f4] rounded-[15px] my-8 flex flex-wrap justify-center items-center gap-4 py-6 px-4 shadow-xl border border-[#e0e0e0]">
        {[
          "All",
          "Processing",
          "Confirmed",
          "Picking",
          "Shipped",
          "Delivered",
          "Cancelled",
        ].map((status, index) => (
          <h5 onClick={()=>handleSelectOS(status)}
            key={index}
            className={`text-xs sm:text-sm md:text-base font-medium py-3 px-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out 
            ${status === "Cancelled"
                ? "bg-red-600 text-white"
                : status === "Delivered"
                  ? "bg-green-500 text-white"
                  : status === "Shipped"
                    ? "bg-blue-500 text-white"
                    : status === "Picking"
                      ? "bg-yellow-500 text-white"
                      : status === "Confirmed"
                        ? "bg-orange-500 text-white"
                        : status === "Processing"
                          ? "bg-gray-600 text-white"
                          : "bg-black text-white hover:bg-white hover:text-black"
              }`}
          >
            {status}
          </h5>
        ))}
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex w-full justify-center my-8">
          <TbLoader2 className="w-10 h-10 animate-spin text-[#ff1586]" />
        </div>
      ) : orderItems.length === 0 ? (
        <div className="text-center text-gray-500">No orders found.</div>
      ) : (
        // Render Orders
        orderItems.map((order, orderIndex) => (
          <div key={orderIndex} className="my-6">
            <div className="flex flex-wrap justify-between items-start">
              {/* Order Details */}
              <div className="w-full lg:w-[75%] xl:w-[70%] bg-white rounded-lg shadow-2xl border border-[#f0f0f0] p-4">
                {
                  orderStatusx.map((item, index) => (
                    <div key={index}>
                      {index === orderIndex ?  // Replace `orderIndex` with the actual variable that matches status
                        <h2 
                          
                          className={`text-lg font-bold py-3 px-8 rounded-full shadow-md ${item.orderStatus === "Delivered"
                              ? "bg-green-600 text-white"
                              : item.orderStatus === "Shipped"
                                ? "bg-blue-600 text-white"
                                : item.orderStatus === "Picking"
                                  ? "bg-yellow-600 text-white"
                                  : item.orderStatus === "Confirmed"
                                    ? "bg-orange-600 text-white"
                                    : item.orderStatus === "Processing"
                                      ? "bg-gray-600 text-white"
                                      : "bg-red-600 text-white"
                            }`}
                        >
                          {item.orderStatus}
                        </h2>
                       : null}
                    </div>
                  ))
                }


                {/* Cart Items */}
                {order?.orderItem?.map((cartItem, itemIndex) => (
                  <div className="">

                    {
                      cartItem?.cartItem !== undefined
                        ?
                        cartItem?.cartItem?.map((cartItem, itemIndex) => (

                          <div
                            key={itemIndex}
                            className="flex items-center gap-5 mb-6 flex-wrap justify-between"
                          >
                            <img
                              className="w-32 h-32 object-cover rounded-xl shadow-md"
                              src={cartItem.imgurl}
                              alt={cartItem.Prodectname}
                            />
                            <div className="flex flex-col">
                              <h3 className="text-lg font-semibold">
                                {cartItem.Prodectname}
                              </h3>
                              <p>{cartItem.Price}৳</p>
                              <p>Quantity: {cartItem.ProdectQun}</p>
                            </div>
                            <h3 className="text-xl font-bold text-right mt-4">
                              Total: {order.totalPrice}৳
                            </h3>
                          </div>
                        ))
                        :
                        <div
                          key={itemIndex}
                          className="flex items-center gap-5 mb-6 flex-wrap justify-between"
                        >

                          <img
                            className="w-32 h-32 object-cover rounded-xl shadow-md"
                            src={cartItem.imgurl}
                            alt={cartItem.Prodectname}
                          />
                          <div className="flex flex-col">
                            <h3 className="text-lg font-semibold">
                              {cartItem.Prodectname}
                            </h3>
                            <p>{cartItem.Price}৳</p>
                            <p>Quantity: {cartItem.ProdectQun}</p>
                          </div>
                          <h3 className="text-xl font-bold text-right mt-4">
                            Total: {order.totalPrice}৳
                          </h3>
                        </div>
                    }
                  </div>
                )
                )}

              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Order;
