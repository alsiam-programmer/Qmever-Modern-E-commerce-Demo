// src/Page/UserProfile.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaUserEdit, FaLink, FaTimes , FaEllipsisV } from "react-icons/fa";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Order from "./Order";
import { useNavigate } from "react-router-dom";
import {getIcon , brandColors} from "../Componat/SocialIcons"

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
  if (!loggedInUID) {
    alert("User ID not available!");
    return;
  }

  // Encode UID to hide it in URL
  const encodedUID = btoa(loggedInUID); // Base64 encode
  const link = `${window.location.origin}/watch/${encodedUID}?email=${userData.email}&name=${userData.username}`;

  navigator.clipboard.writeText(link)
    .then(() => {
      alert("Profile link copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      alert("Failed to copy link. Try manually.");
    });
};



  return (
<div className="min-h-screen py-6 px-2 md:px-0 bg-gray-50">
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
        {userData?.socialLinks?.length > 0 && (
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 mt-2 sm:mt-3">
            {userData.socialLinks.map((item, index) => (
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
