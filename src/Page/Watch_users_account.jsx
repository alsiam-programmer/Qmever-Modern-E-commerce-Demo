import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Watch_users_account = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [userbuyData, setUserbuyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/users/${id}.json`
        );

        if (res.data?.type === "public") {
          setUserData(res.data);
          setError("");
          fetchOrders();
        } else {
          setUserData(null);
          setError("User not found or private");
        }
      } catch (err) {
        setUserData(null);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${id}.json`
        );
        const orders = Object.values(res.data || []);

        const deliveredItems = orders
          .filter((order) => order?.orderStatus?.orderStatus === "Delivered")
          .flatMap((order) =>
            order.orderItem.flatMap((item) =>
              item.cartItem
                ? item.cartItem.map((cart) => ({
                    uid: cart.uid || cart.ProdectId,
                    Prodectname: cart.Prodectname,
                    imgurl: cart.imgurl || "https://via.placeholder.com/150",
                    VideoURL: cart.VideoURL || "",
                  }))
                : [
                    {
                      uid: item.uid,
                      Prodectname: item.Prodectname,
                      imgurl: item.imgurl || "https://via.placeholder.com/150",
                      VideoURL: item.VideoURL || "",
                    },
                  ]
            )
          );

        setUserbuyData(deliveredItems);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setUserbuyData([]);
      }
    };

    fetchUser();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading user profile...
      </div>
    );

  if (error)
    return (
      navigate('/404')
    );

  return (
    <div className="min-h-screen bg-gray-100 mb-6">
      {/* Cover Section */}
      <div
        className={`relative w-full h-64 sm:h-72 ${
          userData.gender === "male"
            ? "bg-gradient-to-r from-blue-600 to-indigo-700"
            : userData.gender === "female"
            ? "bg-gradient-to-r from-pink-500 to-purple-600"
            : "bg-gray-600"
        }`}
      >
        <div className="absolute left-1/2 sm:left-12 top-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:translate-x-0 flex flex-col sm:flex-row !items-center sm:items-end gap-5">
          <img
            src={
              userData.profile_picture ||
              "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            className="rounded-full w-28 sm:w-32 md:w-36 h-28 sm:h-32 md:h-36 object-cover border-4 border-white shadow-lg"
          />
          <div className="text-white text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              {userData.username || "Unknown User"}
            </h1>
            <p className="text-xs sm:text-sm opacity-80 mt-1">
              {userData.email || "No email provided"}
            </p>
          </div>
        </div>
      </div>

{/* Delivered Items Section */}
<div className="buyitem container mx-auto p-4 sm:p-6">
  {userbuyData && userbuyData.length > 0 ? (
    <div>
      <h2 className={`text-xl font-semibold mb-4 text-[#fff] flex items-center justify-center py-2 rounded-[10px] ${userData.gender === "male"
            ? "bg-gradient-to-r from-blue-600 to-indigo-700"
            : userData.gender === "female"
            ? "bg-gradient-to-r from-pink-500 to-purple-600"
            : "bg-gray-600"}`}>Buy Items</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {userbuyData.map((item, idx) => (
          <div
            key={idx}
            className="w-full aspect-square rounded-lg overflow-hidden shadow relative group"
          >
            <img
              src={item.imgurl || "https://via.placeholder.com/300"}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => navigate(`/productDetails/${item.uid}`)}
                className="bg-white text-gray-800 px-3 py-1 rounded shadow text-xs hover:bg-gray-100"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p className="text-center text-gray-400 text-sm mt-2">No delivered items</p>
  )}
</div>

{/* Wishlist Section */}
<div className="container mx-auto p-4 sm:p-6">
  {userData.Wishlist && Object.keys(userData.Wishlist).length > 0 ? (
    <div>
          <h2 className={`text-xl font-semibold mb-4 text-[#fff] flex items-center justify-center py-2 rounded-[10px] ${userData.gender === "male"
            ? "bg-gradient-to-r from-blue-600 to-indigo-700"
            : userData.gender === "female"
            ? "bg-gradient-to-r from-pink-500 to-purple-600"
            : "bg-gray-600"}`}>Wishlist</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {Object.values(userData.Wishlist)
          .reverse()
          .map((item) => (
            <div
              key={item.uid}
              className="w-full aspect-square rounded-lg overflow-hidden shadow relative group"
            >
              <img
                src={item.imgurl || "https://via.placeholder.com/300"}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => navigate(`/productDetails/${item.uid}`)}
                  className="bg-white text-gray-800 px-3 py-1 rounded shadow text-xs hover:bg-gray-100"
                >
                  View
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  ) : (
    <p className="text-center text-gray-400 text-sm mt-2">No items in wishlist</p>
  )}
</div>



    </div>
  );
};

export default Watch_users_account;
