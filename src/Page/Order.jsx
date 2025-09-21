import axios from "axios";
import { getDatabase } from "firebase/database";
import React, { useEffect, useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import { useSelector } from "react-redux";

const Order = () => {
  const db = getDatabase();
  const [orderItems, setOrderItems] = useState([]);
  const [orderStatusx, setOrderStatusx] = useState([]);
  const userUid = useSelector((state) => state.counter.user);
  const [loading, setLoading] = useState(true);
  const [OS_selectX, setOS_selectX] = useState("All");

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userUid}.json`
      )
      .then((res) => {
        const Data = res?.data;

        if (Array.isArray(Data)) {
          const validOrders =
            OS_selectX !== "All" && OS_selectX !== ""
              ? Data.filter(
                  (order) =>
                    order?.orderStatus?.orderStatus === OS_selectX
                ).reverse()
              : Data.filter((order) => order !== null).reverse();

          setOrderItems(validOrders);
          setOrderStatusx(validOrders.map((item) => item?.orderStatus));
        } else {
          console.error("Unexpected data format:", res?.data);
          setOrderItems([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      })
      .finally(() => setLoading(false));
  }, [userUid, OS_selectX]);

  const handleSelectOS = (itemx) => {
    setOS_selectX(itemx);
  };

  return (
<div className="container mx-auto py-8 px-4 lg:px-0">
  {/* Order Status Filter */}
  <div className="w-full mb-8">
    <div className=" flex overflow-scroll lg:justify-center gap-2 sm:gap-3 pb-2">
      {[
        "All",
        "Processing",
        "Confirmed",
        "Picking",
        "Shipped",
        "Delivered",
        "Cancelled",
      ].map((status, index) => (
        <button
          key={index}
          onClick={() => handleSelectOS(status)}
          className={`px-5 py-2 text-xs sm:text-sm rounded-full font-medium transition whitespace-nowrap shadow-sm
            ${
              OS_selectX === status
                ? "ring-2 ring-offset-2 ring-pink-500 scale-105"
                : "hover:scale-105"
            }
            ${
              status === "Cancelled"
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
    <div className="text-center text-gray-500 text-lg">
      No orders found.
    </div>
  ) : (
    orderItems.map((order, orderIndex) => (
      <div
        key={orderIndex}
        className="mb-8 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
      >
        {/* Order Header */}
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-3 bg-gray-100 px-6 py-4 rounded-t-xl">
          <div className="flex flex-col">
            {/* Placed Date */}
            {order.placeOrderDate && (
              <span className="text-xs text-gray-600">
                Placed on: {order.placeOrderDate}
              </span>
            )}

            {/* Delivered Date */}
            {
              order.orderStatus?.dateFormatted && (
                <span className="text-xs text-gray-600">
                  {order.orderStatus?.orderStatus} on: {order.orderStatus.dateFormatted}
                </span>
              )}

            {/* Status Badge */}
            <span
              className={`mt-2 text-xs px-3 py-1 rounded-full font-semibold w-fit
                ${
                  order.orderStatus?.orderStatus === "Delivered"
                    ? "bg-green-600 text-white"
                    : order.orderStatus?.orderStatus === "Shipped"
                    ? "bg-blue-600 text-white"
                    : order.orderStatus?.orderStatus === "Picking"
                    ? "bg-yellow-500 text-white"
                    : order.orderStatus?.orderStatus === "Confirmed"
                    ? "bg-orange-500 text-white"
                    : order.orderStatus?.orderStatus === "Processing"
                    ? "bg-gray-700 text-white"
                    : "bg-red-600 text-white"
                }`}
            >
              {order.orderStatus?.orderStatus || "Unknown"}
            </span>
          </div>

          <p className="text-sm font-semibold text-gray-700">
            Total:{" "}
            <span className="text-pink-600">{order.TotalBuild} ৳</span>
          </p>
        </div>

        {/* Order Items */}
        <div className="p-6 space-y-4">
          {order?.orderItem?.map((itemBlock, idx) => {
            const items = itemBlock?.cartItem || [itemBlock];
            return items.map((cartItem, i) => (
              <div
                key={`${idx}-${i}`}
                className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 p-4 rounded-md border border-gray-100 bg-gray-50 hover:bg-gray-100 transition"
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
                      Price:{" "}
                      <span className="font-medium">{cartItem.Price}৳</span>
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
