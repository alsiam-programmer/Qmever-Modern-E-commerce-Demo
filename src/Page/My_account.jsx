// src/Page/UserProfile.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaUserEdit, FaLink, FaTimes , FaEllipsisV } from "react-icons/fa";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Order from "./Order";
import { useNavigate } from "react-router-dom";


const My_account = () => {
  const navigate = useNavigate();
  const loggedInUID = useSelector((state) => state.counter.user);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showbaritem, setshowbaritem] = useState(false)
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setError("User not logged in");
        return;
      }

      if (!loggedInUID) return;

      setLoading(true);
      setError("");

      try {
        const userRef = ref(db, `users/${loggedInUID}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          setError("User data not found.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [loggedInUID]);

  const handleCopyLink = () => {
    const link = `${window.location.origin}/watch/${loggedInUID}`;
    navigator.clipboard.writeText(link).then(() => {
      alert("Profile link copied to clipboard!");
    });
  };


  return (
<div className="min-h-screen py-6 bg-gray-50">
  <div className="sm:rounded-[10px] overflow-hidden">
    {/* Cover Section */}
<div
  className={`relative w-full rounded-full sm:rounded-none h-72 ${
    userData?.gender?.toLowerCase() === "male"
      ? "bg-gradient-to-r from-blue-600 to-indigo-700"
      : userData?.gender?.toLowerCase() === "female"
      ? "bg-gradient-to-r from-pink-500 to-purple-600"
      : "bg-gradient-to-r from-gray-400 to-gray-600"
  }`}
>

      {/* Avatar & Info Card */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-4/5 backdrop-blur-xl bg-white/25 border border-white/20 rounded-3xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6 transition-transform duration-300 hover:scale-[1.02]">
        <img
          src={
            userData?.profile_picture ||
            "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
          }
          className="rounded-full w-28 sm:w-32 md:w-36 h-28 sm:h-32 md:h-36 object-cover border-4 border-white shadow-md"
          alt="Profile"
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

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex items-center gap-3 bg-white/15 backdrop-blur-md rounded-full p-2 shadow-md transition-all duration-300">
        {showbaritem ? (
          <>
            {userData?.uid === loggedInUID[0] && (
              <button onClick={()=> navigate('/my-account/user-edit_profile')}
                className={`w-20 h-10 flex items-center justify-center rounded-full shadow-md transition-all duration-200 hover:scale-110 ${
                  userData?.gender === "male"
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : "bg-white text-pink-600 hover:bg-pink-50"
                }`}
              >
                <FaUserEdit className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleCopyLink}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-white shadow-md transition-all duration-200 hover:scale-110"
            >
              <FaLink className="w-4 h-4" />
            </button>
            <button
              onClick={() => setshowbaritem(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-white shadow-md transition-all duration-200 hover:scale-110"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </>
        ) : (
          <button
            onClick={() => setshowbaritem(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-white shadow-md transition-all duration-200 hover:scale-110"
          >
            <FaEllipsisV className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>

    {/* Main Content */}
    <div className="container mx-auto px-4 sm:px-6 my-8 space-y-6">
      {/* Wishlist Section */}
      {userData?.Wishlist && Object.keys(userData.Wishlist).length > 0 && (
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
      )}
    </div>
  </div>
</div>

  );
};

export default My_account;
