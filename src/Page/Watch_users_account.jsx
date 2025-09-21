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

  // Fetch user and orders
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

  // Navigate to 404 if error
  useEffect(() => {
    if (error) {
      navigate("/404");
    }
  }, [error, navigate]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading user profile...
      </div>
    );

  return (
<div className="min-h-screen bg-gray-50 py-6">
  <div className="sm:rounded-[10px] overflow-hidden">

    {/* Profile Header */}
    <div className="relative w-full h-72">
<div
  className={`relative w-full rounded-full sm:rounded-none h-72 ${
    userData?.gender?.toLowerCase() === "male"
      ? "bg-gradient-to-r from-blue-600 to-indigo-700"
      : userData?.gender?.toLowerCase() === "female"
      ? "bg-gradient-to-r from-pink-500 to-purple-600"
      : "bg-gradient-to-r from-gray-400 to-gray-600"
  }`}
/>


      {/* Floating Glass Profile */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-4/5 backdrop-blur-xl bg-white/25 border border-white/20 rounded-3xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6 transition-all duration-300 hover:scale-[1.02]">
        <img
          src={
            userData?.profile_picture ||
            "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
          }
          alt="Profile"
          className="rounded-full w-28 sm:w-32 md:w-36 h-28 sm:h-32 md:h-36 object-cover border-4 border-white shadow-md"
        />
        <div className="text-white text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg truncate">
            {userData?.username || "Unknown User"}
          </h1>
          <p className="text-sm sm:text-base opacity-90 mt-1 drop-shadow-lg break-words">
            {userData?.email || "No email provided"}
          </p>
          <p className="text-sm sm:text-base opacity-90 mt-1 drop-shadow-lg break-words">
            {userData?.bio || "No bio provided"}
          </p>
        </div>
      </div>
    </div>

    {/* Buy Items Section */}
    <section className="container mx-auto px-4 sm:px-6 my-8">
      <div className="bg-white/50 backdrop-blur-lg rounded-3xl shadow-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl bg-gray-100 font-bold mb-4 px-4 py-2 rounded-3xl text-gray-600 flex justify-center items-center shadow-sm">
        Buy Items
      </h2>
      {userbuyData?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5">
          {userbuyData.map((item) => (
            <div
              key={item?.uid}
              className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white/20 backdrop-blur-md border border-white/20 shadow-md group transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img
                src={item?.imgurl || "https://via.placeholder.com/300"}
                alt={item?.Prodectname || "Product"}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => navigate(`/productDetails/${item?.uid}`)}
                  className="bg-white/90 text-gray-900 px-3 py-1 rounded-xl shadow-sm hover:bg-white text-sm transition"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-sm mt-2">No delivered items</p>
      )}
      </div>
    </section>

    {/* Wishlist Section */}
    {userData?.Wishlist && Object.keys(userData.Wishlist).length > 0 && (
      <section className="container mx-auto px-4 sm:px-6 my-8">
        <div className="bg-white/50 backdrop-blur-lg rounded-3xl shadow-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl bg-gray-100 font-bold mb-4 px-4 py-2 rounded-3xl text-gray-600 flex justify-center items-center shadow-sm">
            Wishlist
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5">
            {Object.values(userData.Wishlist)
              .reverse()
              .map((item) => (
                <div
                  key={item?.uid}
                  className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white/20 backdrop-blur-md border border-white/20 shadow-md group transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={item?.imgurl || "https://via.placeholder.com/300"}
                    alt={item?.Prodectname || "Wishlist Item"}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => navigate(`/productDetails/${item?.uid}`)}
                      className="bg-white/90 text-gray-900 px-3 py-1 rounded-xl shadow-sm hover:bg-white text-sm transition"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    )}
  </div>
</div>



  );
};

export default Watch_users_account;
