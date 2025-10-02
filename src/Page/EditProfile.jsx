import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosDoneAll } from "react-icons/io";
import SocialIcons from "../Componat/SocialIcons";
import { 
  FaUser, 
  FaPhoneAlt, 
  FaIdCard, 
} from "react-icons/fa";

const EditProfile = () => {
  const navigate = useNavigate();
  const db = getDatabase();
  const userLoginUid = useSelector((state) => state.counter.user);

  const [userData, setUserData] = useState({});
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [selectedGender, setSelectedGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [allValues, setAllValues] = useState([]); // Social links state
  const [address, setAddress] = useState("");
  const [education, setEducation] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [healthInfo, setHealthInfo] = useState("");
  const [occupation, setOccupation] = useState("");

  const genderOptions = ["Male", "Female", "Transgender"];
useEffect(() => {
  userLoginUid.forEach((uid) => {
    const userRef = ref(db, `/users/${uid}`);
    const addressRef = ref(db, `/users/${uid}/Delivery_address`);

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUserData(data);
        setBio(data.bio || "");
        setAllValues(data.Contact_Info?.socialLinks || []);
        setAddress(data.Contact_Info?.Home_Address || "");
        setPhoneNumber(
          data.Contact_Info?.Phone_Number
            ? data.Contact_Info.Phone_Number.replace("+88", "")
            : ""
        ); // Pre-fill phone without +88
        setBirthDate(data.Personal_Info?.dateOfBirth || "");
        setSelectedGender(data.Personal_Info?.gender || "");
        setEducation(data.Personal_Info?.education || "");
        setOccupation(data.Personal_Info?.occupation || "");
        setMaritalStatus(data.Personal_Info?.maritalStatus || "");
        setBloodGroup(data.Personal_Info?.bloodGroup || "");
        setHealthInfo(data.Personal_Info?.healthInfo || "");
      }
    }, { onlyOnce: true });

    // Optional: keep deliveryAddress if you need a separate copy
    onValue(addressRef, (snapshot) => {
      const addr = snapshot.val();
      if (addr) setDeliveryAddress(addr);
    }, { onlyOnce: true });
  });
}, [userLoginUid]);


  useEffect(() => window.scrollTo(0, 0), []);

  // utils: age calculation
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
  if (!phoneNumber && !deliveryAddress.Phone_Number)
    return alert("Enter a valid Bangladeshi phone number.");
  if (!birthDate) return alert("Enter your birth date.");
  if (!selectedGender) return alert("Select your gender.");

  // Merge socialLinks safely (your version)
  let mergedLinks = [];
  if (allValues.length < (userData.Contact_Info?.socialLinks?.length || 0)) {
    // Use only current allValues if smaller than existing links
    mergedLinks = [...allValues];
  } else {
    // Merge existing and new links
    mergedLinks = [...(userData.Contact_Info?.socialLinks || []), ...allValues];
  }

  // Remove duplicates by name, keeping the latest
  const uniqueLinks = Array.from(
    new Map(mergedLinks.map((item) => [item.name, item])).values()
  );

const updatedUser = {
  ...userData,
bio:
   bio.length < (userData.bio?.length || 0)
    ? bio
    : (bio || userData.bio || ""),

  // Contact Info section
Contact_Info: {
  type :	"public",
  Phone_Number:
    phoneNumber.length < (userData.Contact_Info?.Phone_Number?.length || 0)
      ? `+88${phoneNumber}`
      : (phoneNumber ? `+88${phoneNumber}` : userData.Contact_Info?.Phone_Number || ""),
  Home_Address:
    address.length < (userData.Contact_Info?.Home_Address?.length || 0)
      ? address
      : (address || userData.Contact_Info?.Home_Address || ""),
  socialLinks: uniqueLinks || [] ,
},


  // Personal Info section
  Personal_Info: {
    type :	"public",
    dateOfBirth:
      birthDate.length < (userData.Personal_Info?.dateOfBirth?.length || 0)
        ? birthDate
        : (birthDate || userData.Personal_Info?.dateOfBirth || ""),
    gender:
      selectedGender.length < (userData.Personal_Info?.gender?.length || 0)
        ? selectedGender
        : (selectedGender || userData.Personal_Info?.gender || ""),
    education:
      education.length < (userData.Personal_Info?.education?.length || 0)
        ? education
        : (education || userData.Personal_Info?.education || ""),
    occupation:
      occupation.length < (userData.Personal_Info?.occupation?.length || 0)
        ? occupation
        : (occupation || userData.Personal_Info?.occupation || ""),
    maritalStatus:
      maritalStatus.length < (userData.Personal_Info?.maritalStatus?.length || 0)
        ? maritalStatus
        : (maritalStatus || userData.Personal_Info?.maritalStatus || ""),
    bloodGroup:
      bloodGroup.length < (userData.Personal_Info?.bloodGroup?.length || 0)
        ? bloodGroup
        : (bloodGroup || userData.Personal_Info?.bloodGroup || ""),
    healthInfo:
      healthInfo.length < (userData.Personal_Info?.healthInfo?.length || 0)
        ? healthInfo
        : (healthInfo || userData.Personal_Info?.healthInfo || ""),
  },
};



  set(ref(db, `users/${userData.uid}`), updatedUser)
    .then(() => navigate("/my-account"))
    .catch((error) => console.error("Update failed:", error));
};

  return (
<section className="min-h-[95vh] flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 p-4 sm:p-6">
  <div className="w-full max-w-4xl space-y-10">

    {/* Profile Section */}
    <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 space-y-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <span className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
          <FaUser className="w-5 h-5" />
        </span>
        Edit Profile
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-6">
        {/* Avatar */}
        <img
          src={userData.profile_picture || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
          alt="Profile"
          className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full border-4 border-indigo-500 shadow-lg object-cover mx-auto"
        />

        <div className="flex-1 flex flex-col gap-4 w-full">
          {/* Username */}
          <input
            type="text"
            value={userData.username || ""}
            disabled
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-100 font-semibold text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-400"
          />

          {/* Email */}
          <div className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-700 font-medium shadow-sm">
            <span className="truncate">{userData.email}</span>
            <IoIosDoneAll className="text-green-600 text-2xl" />
          </div>

          {/* Bio */}
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-800 resize-none shadow-sm focus:ring-2 focus:ring-indigo-400"
            rows={3}
          />
        </div>
      </div>
    </div>

    {/* Contact Info Section */}
    <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 space-y-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <span className="p-2 bg-blue-100 rounded-xl text-blue-600">
          <FaPhoneAlt className="w-5 h-5" />
        </span>
        Contact Info
      </h2>

      {/* Social Icons */}
      <SocialIcons AllValues={allValues} setAllValues={setAllValues} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone Number */}
        <div className="flex items-center gap-2">
          <span className="bg-indigo-100 px-4 py-3 rounded-l-xl text-gray-700 font-medium border border-gray-200">+88</span>
          <input
            type="text"
            value={phoneNumber || ""}
            onChange={handlePhoneChange}
            placeholder="01XXXXXXXXX"
            className="flex-1 px-4 py-3 rounded-r-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none shadow-sm focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Address */}
        <textarea
          value={address || ""}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your home address..."
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-800 resize-none shadow-sm focus:ring-2 focus:ring-indigo-400"
          rows={2}
        />
      </div>
    </div>

    {/* Personal Info Section */}
    <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 space-y-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <span className="p-2 bg-pink-100 rounded-xl text-pink-600">
          <FaIdCard className="w-5 h-5" />
        </span>
        Personal Info
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Date of Birth */}
        <input
          type="date"
          value={birthDate}
          onChange={handleDateChange}
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-400"
        />

        {/* Gender */}
        <div className="flex gap-2 sm:gap-3">
          {genderOptions.map((gender) => (
            <button
              key={gender}
              onClick={() => handleGenderSelect(gender)}
              className={`flex-1 px-3 sm:px-4 py-2 rounded-full border font-medium transition shadow-sm ${
                selectedGender === gender
                  ? "bg-indigo-600 text-white shadow-md"
                  : "border-gray-200 text-gray-700 bg-gray-50"
              }`}
            >
              {gender}
            </button>
          ))}
        </div>

        {/* Education */}
        <input
          type="text"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          placeholder="Your highest education"
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-400"
        />

        {/* Occupation */}
        <input
          type="text"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          placeholder="Your current occupation"
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-400"
        />

        {/* Marital Status */}
        <select
          value={maritalStatus}
          onChange={(e) => setMaritalStatus(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Select Marital Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </select>

        {/* Blood Group */}
        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        {/* Health Info */}
        <textarea
          value={healthInfo}
          onChange={(e) => setHealthInfo(e.target.value)}
          placeholder="Health details (e.g. allergies, conditions)"
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-800 resize-none shadow-sm focus:ring-2 focus:ring-indigo-400"
          rows={2}
        />
      </div>
    </div>

    {/* Save Button */}
    <div className="text-center !mb-6">
      <button
        onClick={handleUpdate}
        className="w-full py-4 rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-500 text-white font-bold text-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition"
      >
        Save All Changes
      </button>
    </div>
  </div>
</section>


  );
};

export default EditProfile;
