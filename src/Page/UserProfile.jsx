// src/Page/UserProfile.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaUserEdit } from "react-icons/fa";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Order from "./Order";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const loggedInUID = useSelector((state) => state.counter.user); // UID directly
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="min-h-screen">
      <div className="lg:rounded-[10px] overflow-hidden bg-gray-100">
        {/* Cover Section */}
        <div
          className={`relative w-full h-64 sm:h-72 ${
            userData.gender === "male"
              ? "bg-gradient-to-r from-blue-600 to-indigo-700"
              : userData.gender === "female"
              ? "bg-gradient-to-r from-pink-500 to-purple-600"
              : "bg-gray-300"
          }`}
        >
          {/* Avatar & Info */}
          <div className="absolute left-1/2 sm:left-12 top-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:translate-x-0 flex flex-col sm:flex-row items-center sm:items-end gap-5">
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

          {/* Edit Button */}
          {!loading && userData.uid === loggedInUID && (
            <button
              className={`absolute top-4 right-6 px-3 py-1.5 rounded-full shadow flex items-center gap-1 text-sm transition ${
                userData.gender === "male"
                  ? "bg-white text-blue-600 hover:bg-gray-100"
                  : "bg-white text-pink-600 hover:bg-gray-100"
              }`}
            >
              <FaUserEdit className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 my-8 space-y-6">
          {/* Wishlist Section */}
          {userData.Wishlist && Object.keys(userData.Wishlist).length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
              <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
                Wishlist
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                  {Object.keys(userData.Wishlist).length}
                </span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
                {Object.values(userData.Wishlist)
                  .reverse()
                  .map((item) => (
                    <div
                      key={item.uid}
                      className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition relative group"
                    >
                      {/* Square Image Wrapper */}
                      <div className="aspect-square w-full overflow-hidden">
                        <img
                          src={item.imgurl || "https://via.placeholder.com/300"}
                          alt={item.Prodectname}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="p-2">
                        <p className="text-sm font-medium truncate">
                          {item.Prodectname}
                        </p>
                      </div>

                      {/* Hover Actions */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              navigate(`/productDetails/${item.uid}`)
                            }
                            className="bg-white text-gray-800 px-3 py-1 rounded shadow text-xs hover:bg-gray-100"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Orders Section */}
          <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
            <h2 className="font-semibold text-lg mb-3">Your Orders</h2>
            <Order />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
