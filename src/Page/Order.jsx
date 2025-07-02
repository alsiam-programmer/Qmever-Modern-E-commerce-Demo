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
<div className="container mx-auto px-4 py-8">
  {/* Order Status Filter */}
  <div className="w-full mb-10">
  <div className="flex flex-wrap sm:justify-center justify-start gap-2 sm:gap-3">
    {[
      "All", "Processing", "Confirmed", "Picking", "Shipped", "Delivered", "Cancelled"
    ].map((status, index) => (
      <button
        key={index}
        onClick={() => handleSelectOS(status)}
        className={`px-4 sm:px-5 py-2 text-xs sm:text-sm rounded-full font-medium transition whitespace-nowrap
        ${OS_selectX === status ? 'ring-2 ring-offset-1 ring-black' : ''}
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
                    : "bg-black text-white hover:bg-white hover:text-black border hover:border-black"
        }`}
      >
        {status}
      </button>
    ))}
  </div>
</div>

  {/* Loader */}
  {loading ? (
    <div className="flex justify-center py-10">
      <TbLoader2 className="w-10 h-10 text-pink-600 animate-spin" />
    </div>
  ) : orderItems.length === 0 ? (
    <div className="text-center text-gray-500 text-lg">No orders found.</div>
  ) : (
    orderItems.map((order, orderIndex) => (
      <div
        key={orderIndex}
        className="mb-10 bg-white rounded-xl shadow-lg border border-gray-200"
      >
        {/* Order Header */}
        <div className="flex justify-between items-center bg-gray-100 px-6 py-4 rounded-t-xl">
          <span className={`text-sm px-4 py-1 rounded-full font-semibold
            ${orderStatusx[orderIndex]?.orderStatus === "Delivered"
              ? "bg-green-600 text-white"
              : orderStatusx[orderIndex]?.orderStatus === "Shipped"
                ? "bg-blue-600 text-white"
                : orderStatusx[orderIndex]?.orderStatus === "Picking"
                  ? "bg-yellow-500 text-white"
                  : orderStatusx[orderIndex]?.orderStatus === "Confirmed"
                    ? "bg-orange-500 text-white"
                    : orderStatusx[orderIndex]?.orderStatus === "Processing"
                      ? "bg-gray-700 text-white"
                      : "bg-red-600 text-white"
            }`}>
            {orderStatusx[orderIndex]?.orderStatus || "Unknown"}
          </span>
          {console.log(order)
          }
          <p className="text-sm font-semibold text-gray-700">
            Total: {order.TotalBuild} ৳
          </p>
        </div>

        {/* Order Items */}
        <div className="p-6 space-y-4">
          {order?.orderItem?.map((itemBlock, idx) => {
            const items = itemBlock?.cartItem || [itemBlock];
            return items.map((cartItem, i) => (
              <div
                key={`${idx}-${i}`}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-md border border-gray-100 bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={cartItem.imgurl}
                    alt={cartItem.Prodectname}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {cartItem.Prodectname}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Price: {cartItem.Price}৳
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {cartItem.ProdectQun}
                    </p>
                  </div>
                </div>
              </div>
            ));
          })}
        </div>
      </div>
    ))
  )}
</div>


  );
};

export default Order;
