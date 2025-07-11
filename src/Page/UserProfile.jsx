import { getDatabase, onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const userUID = useSelector((item) => item.counter.user)
  let db = getDatabase()
  let [userData, setUserData] = useState({})
  let user_data = () => {
    let user_dateRef = ref(db, '/users/' + userUID)
    onValue(user_dateRef, (snapshot) => {
      let data = snapshot.val()
      setUserData(data)

    })
  }

  
  useEffect(() => {
    user_data()
  }, [userUID])
  console.log(userData);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        {/* Avatar */}
        <div className="avatar mb-4">
          <img
            src={userData.profile_picture} // Example avatar image
            alt="User Avatar"
            className="rounded-full w-36 h-36 object-cover border-4 border-white shadow-lg"
          />
        </div>

        {/* User Info */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800">{userData.username}</h1>
          {userData?.username && (
            <p className="text-lg text-gray-600 lowercase">
              qmever.com?@{userData.username.replace(/\s+/g, '').toLowerCase()}-$$-bangladesh
            </p>
          )}
          <p className="mt-2 text-gray-700">{userData.email}</p>
        </div>

        {/* Edit Button */}
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
          <FaUserEdit className="inline mr-2" />
          Edit Profile
        </button>
      </div>

      {/* Tabs/Sections for Posts, Activities, etc. */}
      <div className="mt-8">
        <div className="tabs flex justify-around bg-gray-200 rounded-t-lg">
          <button className="tab px-4 py-2 text-lg font-medium text-gray-800 hover:bg-white active:bg-gray-300 transition">
            Posts
          </button>
          <button className="tab px-4 py-2 text-lg font-medium text-gray-800 hover:bg-white active:bg-gray-300 transition">
            Friends
          </button>
          <button className="tab px-4 py-2 text-lg font-medium text-gray-800 hover:bg-white active:bg-gray-300 transition">
            Activity
          </button>
        </div>

        <div className="tab-content mt-6">
          {/* Sample Posts */}
          <div className="post bg-white p-4 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-800">My First Post</h3>
            <p className="text-gray-600 mt-2">
              Just got started with React. So excited to build awesome things!
            </p>
          </div>

          {/* Sample Activity */}
          <div className="activity bg-white p-4 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
            <p className="text-gray-600 mt-2">
              You commented on a post: "Great job on the project!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
