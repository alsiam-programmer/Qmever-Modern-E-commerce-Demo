import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {getIcon , brandColors} from "../Componat/SocialIcons"
import { Helmet } from "react-helmet";

const Watch_users_account = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [userbuyData, setUserbuyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

   const decodedId = (() => {
    try {
      return atob(id);
    } catch {
      return null;
    }
  })();
  // Fetch user and orders
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/users/${decodedId}.json`
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
          `https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${decodedId}.json`
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
<div className="min-h-screen py-6 px-2 md:px-0 bg-gray-50">
   {/* 🔥 SEO Header */}
      <Helmet>
        <title>{userData?.username || "User Profile"} | Qmever</title>
        <meta
          name="description"
          content={userData?.bio || "View user profile and products on Qmever"}
        />
        <meta property="og:title" content={userData?.username || "User Profile"} />
        <meta
          property="og:description"
          content={userData?.bio || "Check out this profile on Qmever"}
        />
        <meta
          property="og:image"
          content={
            userData?.profile_picture ||
            "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
          }
        />
        <meta property="og:type" content="profile" />
      </Helmet>
  <div className="md:rounded-[10px] overflow-hidden">

    {/* Cover Section */}
<div
  className={`relative rounded-3xl p-2 md:rounded-none md:bg-gradient-to-r md:from-[#062919] md:to-[#062919]/90 bg-gradient-to-r from-[#04180f] to-[#062919]`}
      
>

    <div className="w-full md:w-4/5 backdrop-blur-xl md:m-6 xl:m-10 bg-white/10 border border-white/5 rounded-3xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 transition-transform duration-300 hover:scale-[1.02]">
      
      {/* Avatar */}
      <img
        src={
          userData?.profile_picture ||
          "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
        }
        className="rounded-full w-28 sm:w-32 md:w-36 h-28 sm:h-32 md:h-36 object-cover border-4 border-white shadow-md"
        alt="Profile"
      />

      {/* User Info */}
      <div className="text-white text-center sm:text-left flex-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg truncate">
          {userData?.username || "Unknown User"}
        </h1>
        <p className="text-sm sm:text-base opacity-90 mt-1 drop-shadow-lg break-words">
          {userData?.email || "No email provided"}
        </p>
        <p className="text-sm sm:text-base opacity-90 mt-1 drop-shadow-lg break-words">
          {userData?.bio || "No bio provided"}
        </p>

        {/* Social Links */}
        {userData?.Contact_Info.socialLinks?.length > 0 && (
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 mt-2 sm:mt-3">
            {userData?.Contact_Info.socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-lg md:text-xl p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white backdrop-blur-md text-white transition-all duration-300 shadow-md hover:scale-110"
              >
                {getIcon(item.iconName, brandColors[item.name])}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
<div className="container mx-auto px-4 sm:px-6 mt-8 lg:flex lg:gap-6">

  {/* Contact Info */}
  <div className="w-full lg:w-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 sm:p-6 text-gray-700 space-y-4 shadow-xl hover:shadow-2xl transition-shadow duration-300 my-3">
    <h2 className="text-xl sm:text-2xl font-bold border-b border-white/20 pb-2 mb-4">Contact Information</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <p className="text-base sm:text-lg"><span className="font-semibold text-gray-800">Phone:</span> {userData?.Contact_Info?.Phone_Number || "N/A"}</p>
      <p className="text-base sm:text-lg"><span className="font-semibold text-gray-800">Home Address:</span> {userData?.Contact_Info?.Home_Address || "N/A"}</p>
    </div>
  </div>

  {/* Personal Info */}
  <div className="w-full lg:w-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 sm:p-6 text-gray-700 space-y-4 shadow-xl hover:shadow-2xl transition-shadow duration-300 my-3">
    <h2 className="text-xl sm:text-2xl font-bold border-b border-white/20 pb-2 mb-4">Personal Information</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <p className="text-base sm:text-lg"><span className="font-semibold text-gray-800">Date of Birth:</span> {userData?.Personal_Info?.dateOfBirth?.trim() || "N/A"}</p>
      <p className="text-base sm:text-lg"><span className="font-semibold text-gray-800">Gender:</span> {userData?.Personal_Info?.gender?.trim() || "N/A"}</p>
      <p className="text-base sm:text-lg"><span className="font-semibold text-gray-800">Blood Group:</span> {userData?.Personal_Info?.bloodGroup?.trim() || "N/A"}</p>
      <p className="text-base sm:text-lg"><span className="font-semibold text-gray-800">Marital Status:</span> {userData?.Personal_Info?.maritalStatus?.trim() || "N/A"}</p>
      <p className="text-base sm:text-lg"><span className="font-semibold text-gray-800">Education:</span> {userData?.Personal_Info?.education?.trim() || "N/A"}</p>
      <p className="text-base sm:text-lg"><span className="font-semibold text-gray-800">Occupation:</span> {userData?.Personal_Info?.occupation?.trim() || "N/A"}</p>
      <p className="sm:col-span-2 text-base sm:text-lg"><span className="font-semibold text-gray-800">Health Info:</span> {userData?.Personal_Info?.healthInfo?.trim() || "N/A"}</p>
      <p className="sm:col-span-2 text-base sm:text-lg"><span className="font-semibold text-gray-800">Bio:</span> {userData?.Personal_Info?.bio?.trim() || "N/A"}</p>
    </div>
  </div>

</div>


    {/* Buy Items Section */}
    <section className="container mx-auto px-4 sm:px-6 my-8">
      {userbuyData?.length > 0 ? (
      <div className="bg-white/50 backdrop-blur-lg rounded-3xl shadow-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl bg-gray-100 font-bold mb-4 px-4 py-2 rounded-3xl text-gray-600 flex justify-center items-center shadow-sm">
        Buy Items
      </h2>
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
        </div>
      ) : (
""      )}
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
