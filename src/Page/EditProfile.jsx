import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosDoneAll } from "react-icons/io";
import SocialIcons from "../Componat/SocialIcons";

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
<section className="min-h-[95vh] flex items-center justify-center bg-gray-100 p-4 sm:p-6">
  <div className="w-full max-w-3xl space-y-8">
    {/* Profile Section */}
    <div className="bg-white shadow-lg rounded-3xl p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>

      <div className="flex flex-col items-center gap-4">
        <img
          src={userData.profile_picture || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-md object-cover"
        />

        <input
          type="text"
          value={userData.username || ""}
          disabled
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 font-semibold text-gray-700"
        />

        <div className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 font-semibold text-gray-700">
          <span>{userData.email}</span>
          <IoIosDoneAll className="text-green-600 text-2xl" />
        </div>

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write something about yourself..."
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 resize-none"
          rows={3}
        />
      </div>
    </div>

    {/* Contact Info Section */}
    <div className="bg-white shadow-lg rounded-3xl p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Contact Info</h2>

      <SocialIcons AllValues={allValues} setAllValues={setAllValues} />

      <div className="flex items-center gap-2">
        <span className="bg-indigo-100 px-4 py-3 rounded-l-xl text-gray-700 font-medium">+88</span>
        <input
          type="text"
          value={phoneNumber ||""}
          onChange={handlePhoneChange}
          placeholder="01XXXXXXXXX"
          className="flex-1 px-4 py-3 rounded-r-xl border border-gray-300 bg-gray-100 text-gray-800 outline-none"
        />
      </div>

      <textarea
        value={address || ""}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter your home address..."
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 resize-none"
        rows={2}
      />
    </div>

    {/* Personal Info Section */}
    <div className="bg-white shadow-lg rounded-3xl p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Personal Info</h2>

      <input
        type="date"
        value={birthDate}
        onChange={handleDateChange}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800"
      />

      <div className="flex gap-3">
        {genderOptions.map((gender) => (
          <button
            key={gender}
            onClick={() => handleGenderSelect(gender)}
            className={`flex-1 px-4 py-2 rounded-full border font-medium transition ${
              selectedGender === gender 
                ? "bg-indigo-600 text-white"
                : "border-gray-300 text-gray-700 bg-gray-100"
            }`}
          >
            {gender}
          </button>
        ))}
      </div>

      <input
        type="text"
        value={education}
        onChange={(e) => setEducation(e.target.value)}
        placeholder="Your highest education (e.g. B.Sc in CSE)"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800"
      />

      <input
        type="text"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
        placeholder="Your current occupation (e.g. Software Engineer)"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800"
      />

      <select
        value={maritalStatus}
        onChange={(e) => setMaritalStatus(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800"
      >
        <option value="">Select Marital Status</option>
        <option value="Single">Single</option>
        <option value="Married">Married</option>
        <option value="Divorced">Divorced</option>
        <option value="Widowed">Widowed</option>
      </select>

      <select
        value={bloodGroup}
        onChange={(e) => setBloodGroup(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800"
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

      <textarea
        value={healthInfo}
        onChange={(e) => setHealthInfo(e.target.value)}
        placeholder="Health details (e.g. allergies, conditions)"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 resize-none"
        rows={2}
      />
    </div>

    {/* Save Button */}
    <div className="text-center">
      <button
        onClick={handleUpdate}
        className="w-full py-4 rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold text-lg hover:scale-105 hover:shadow-xl transition"
      >
        Save All Changes
      </button>
    </div>
  </div>
</section>

  );
};

export default EditProfile;
