import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoIosDoneAll } from 'react-icons/io';

const EditProfile = () => {
  const navigate = useNavigate();
  const db = getDatabase();
  const userLoginUid = useSelector((state) => state.counter.user);

  const [userData, setUserData] = useState({});
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [selectedGender, setSelectedGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState(''); // <-- New state for user bio

  const genderOptions = ['Male', 'Female', 'Transgender'];

  useEffect(() => {
    userLoginUid.forEach((uid) => {
      const userRef = ref(db, `/users/${uid}`);
      const addressRef = ref(db, `/users/${uid}/Delivery_address`);

      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUserData(data);
          setBio(data.bio || ''); // <-- Populate bio from Firebase
        }
      }, { onlyOnce: true });

      onValue(addressRef, (snapshot) => {
        const address = snapshot.val();
        if (address) setDeliveryAddress(address);
      }, { onlyOnce: true });
    });
  }, [userLoginUid]);

  useEffect(() => window.scrollTo(0, 0), []);

  const calculateAge = (dob) => {
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const handleGenderSelect = (gender) => setSelectedGender(gender);

  const handleDateChange = (e) => {
    const selected = e.target.value;
    const age = calculateAge(selected);
    if (age < 12) alert("You must be at least 12 years old.");
    else setBirthDate(selected);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.trim();
    if (/^01[3-9][0-9]{8}$/.test(value)) setPhoneNumber(value);
  };

  const handleUpdate = () => {
    if (!phoneNumber && !deliveryAddress.Phone_Number) return alert("Enter a valid Bangladeshi phone number.");
    if (!birthDate && !userData.dateOfBirth) return alert("Enter your birth date.");
    if (!selectedGender && !userData.gender) return alert("Select your gender.");

    const updatedUser = {
      ...userData,
      gender: selectedGender || userData.gender || '',
      dateOfBirth: birthDate || userData.dateOfBirth || '',
      bio: bio || userData.bio || '', // <-- Add bio here
      Delivery_address: {
        ...deliveryAddress,
        Phone_Number: phoneNumber ? `+88${phoneNumber}` : deliveryAddress.Phone_Number,
      },
    };

    set(ref(db, `users/${userData.uid}`), updatedUser)
      .then(() => navigate("/my-account"))
      .catch((error) => console.error("Update failed:", error));
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-md bg-white/25 backdrop-blur-xl border border-white/20 rounded-3xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
          Edit Profile
        </h1>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <img
            src={userData.profile_picture || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
            alt="Profile"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md object-cover"
          />
        </div>

        {/* Username */}
        <input
          type="text"
          value={userData.username || ''}
          disabled
          className="w-full mb-3 px-4 py-2 rounded-2xl border border-white/20 bg-white/25 font-semibold text-gray-600 placeholder-gray-400"
          placeholder="Username"
        />

        {/* Email */}
        <div className="w-full mb-3 flex items-center justify-between px-4 py-2 rounded-2xl border border-white/20 bg-white/25 font-semibold text-gray-800">
          <span>{userData.email}</span>
          <IoIosDoneAll className="text-green-600 text-2xl" />
        </div>

        {/* User Bio */}
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write something about yourself..."
          className="w-full mb-3 px-4 py-2 rounded-2xl border border-white/20 bg-white/25 text-gray-900 resize-none"
          rows={3}
        />

        {/* Phone */}
        <div className="flex items-center mb-3">
          <span className="bg-white/25 border border-white/20 px-4 py-2 rounded-l-2xl font-semibold text-gray-800">+88</span>
          <input
            type="text"
            onChange={handlePhoneChange}
            className="flex-1 py-2 px-4 rounded-r-2xl border border-l-0 border-white/20 bg-white/25 outline-none text-gray-900 placeholder-gray-400"
placeholder={deliveryAddress?.Phone_Number ? `${deliveryAddress.Phone_Number.slice(-11)}` : "01XXXXXXXXX"}
          />
        </div>

        {/* Date of Birth */}
        <input
          type="date"
          value={birthDate || (userData?.dateOfBirth || "").trim()}
          onChange={handleDateChange}
          className="w-full mb-3 px-4 py-2 rounded-2xl border border-white/20 bg-white/25 text-gray-900"
        />

        {/* Gender Selection */}
        <div className="flex gap-2 bg-gray-200 rounded-full p-2 mb-4 justify-between">
          {genderOptions.map((gender) => (
            <button
              key={gender}
              onClick={() => handleGenderSelect(gender)}
              className={`px-4 py-2 rounded-full border transition ${
                selectedGender === gender || userData?.gender === gender
                  ? "bg-green-600 text-white"
                  : "border-white/20 text-gray-800 bg-white/25"
              }`}
            >
              {gender}
            </button>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={handleUpdate}
          className="w-full mt-4 py-2 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold hover:scale-105 hover:shadow-lg transition"
        >
          Save
        </button>
      </div>
    </section>
  );
};

export default EditProfile;
