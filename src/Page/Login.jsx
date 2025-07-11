import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoIosDoneAll } from 'react-icons/io';

const Login = () => {
  const navigate = useNavigate();
  const db = getDatabase();
  const userLoginUid = useSelector((state) => state.counter.user);

  const [userData, setUserData] = useState({});
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [selectedGender, setSelectedGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const genderOptions = ['Male', 'Female', 'Transgender'];

  // Fetch user and address data
  useEffect(() => {
    userLoginUid.forEach((uid) => {
      const userRef = ref(db, `/users/${uid}`);
      const addressRef = ref(db, `/users/${uid}/Delivery_address`);

      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        
        if (data) setUserData(data);
      }, { onlyOnce: true });

      onValue(addressRef, (snapshot) => {
        const address = snapshot.val();
        console.log(address);
        
        if (address) setDeliveryAddress(address);
      }, { onlyOnce: true });
    });
  }, [userLoginUid]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calculateAge = (dob) => {
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleGenderSelect = (gender) => setSelectedGender(gender);

  const handleDateChange = (e) => {
    const selected = e.target.value;
    const age = calculateAge(selected);
    if (age < 12) {
      alert("You must be at least 12 years old.");
    } else {
      setBirthDate(selected);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.trim();
    if (/^01[3-9][0-9]{8}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleUpdate = () => {
    if (!phoneNumber) return alert("Enter a valid Bangladeshi phone number.");
    if (!birthDate && !userData.dateOfBirth) return alert("Enter your birth date.");
    if (!selectedGender && !userData.gender) return alert("Select your gender.");

    const updatedUser = {
      ...userData,
      gender: selectedGender || userData.gender || '',
      dateOfBirth: birthDate || userData.dateOfBirth || '',
      Delivery_address: {
        ...deliveryAddress,
        Phone_Number: `+88${phoneNumber}`,
      },
    };

    set(ref(db, `users/${userData.uid}`), updatedUser)
      .then(() => navigate("/"))
      .catch((error) => console.error("Update failed:", error));
  };

  return (
    <section className="flex items-center justify-center py-10 ">
      <div className="w-full max-w-lg bg-gray-50 shadow-md rounded-xl p-6">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={userData.profile_picture}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        {/* Username (readonly) */}
        <input
          type="text"
          value={userData.username || ''}
          disabled
          className="w-full mb-3 px-4 py-2 rounded border bg-gray-100 font-semibold text-gray-600"
          placeholder="Username"
        />

        {/* Email */}
        <div className="w-full mb-3 flex items-center justify-between px-4 py-2 rounded border bg-gray-100 font-semibold text-pink-600">
          <span>{userData.email}</span>
          <IoIosDoneAll className="text-green-600 text-2xl" />
        </div>


        {/* Phone Input */}
        <div className="flex items-center mb-3">
          <span className="bg-gray-200 px-4 py-2 rounded-l font-semibold text-pink-600">+88</span>
          <input
            type="text"
            onChange={handlePhoneChange}
            className="flex-1 py-2 px-4 rounded-r border border-l-0 bg-gray-50 outline-none"
            placeholder={deliveryAddress?.Phone_Number || "01XXXXXXXXX"}
          />
        </div>

        {/* Date of Birth */}
        <input
          type="date"
          value={birthDate || (userData?.dateOfBirth || "").trim()}
          onChange={handleDateChange}
          className="w-full mb-3 px-4 py-2 rounded border bg-gray-50"
        />

        {/* Gender Selection */}
        <div className="flex gap-2 mb-4">
          {genderOptions.map((gender) => (
            <button
              key={gender}
              onClick={() => handleGenderSelect(gender)}
              className={`px-4 py-2 rounded-full border transition ${
                selectedGender === gender || userData?.gender === gender
                  ? "bg-green-600 text-white"
                  : "border-gray-600 text-gray-800"
              }`}
            >
              {gender}
            </button>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={handleUpdate}
          className="w-full mt-6 bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Login;
