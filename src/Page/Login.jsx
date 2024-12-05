import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoIosDoneAll } from "react-icons/io";

const Login = () => { 
  const navigate = useNavigate();
  const userLoginUid = useSelector((item) => item.counter.user);
  const db = getDatabase();
  const [userData, setUserdata] = useState({});
  const [Delivery_address, setDelivery_address] = useState({});
  const [genderSelet, setGenderSelet] = useState('');
  const [userDaydata, setUserDaydata] = useState('');
  const [userPH_Num, setUserPH_Num] = useState('');

  // Fetch user data
  useEffect(() => {
    userLoginUid.forEach((useruid) => {
      onValue(ref(db, '/users/' + useruid), (snapshot) => {
        const userDetails = snapshot.val();
        setUserdata(userDetails);
      }, { onlyOnce: true });
    });
  }, [userLoginUid]);

  // Fetch delivery address data
  useEffect(() => {
    userLoginUid.forEach((useruid) => {
      onValue(ref(db, '/users/' + useruid + '/Delivery_address/'), (snapshot) => {
        const address = snapshot.val();
        setDelivery_address(address);
      }, { onlyOnce: true });
    });
  }, [userLoginUid]);

  const Gender = [
    { "Gender": "Male" },
    { "Gender": "Female" },
    { "Gender": "Transgender" },
  ];

  // Handle gender selection
  const handleGenderSelect = (item) => {
    setGenderSelet(item.Gender);
  };

  // Handle phone number change with validation for Bangladeshi format
  const handlePhoneChange = (e) => {
    let phoneNumber = e.target.value;

    // Allow only numbers and enforce +880 as the starting sequence
    if (/^01[3-9][0-9]{8}$/.test(phoneNumber)) {
      setUserPH_Num(phoneNumber);
    }
  };

  // Update user data in Firebase
  const handleUpdateData = () => {
    if (!userPH_Num) {
      alert("Please enter a valid Bangladeshi phone number");
      return;
    }
    if (!userDaydata) {
      alert("You not 12 Year old");
      return;
    }
    if (!genderSelet) {
      alert("select Gender");
      return;
    }

    set(ref(db, `users/${userData.uid}`), {
      ...userData,
      gender: genderSelet || userData.gender,
      dateOfBirth: userDaydata || userData.dateOfBirth,
      Delivery_address: {
        ...Delivery_address,
        Phone_Number: `+88${userPH_Num}`,
      }
    }).then(() => {
      navigate("/")
    }).catch(error => {
      console.error("Error updating user data: ", error);
    });
  };

  // Handle date input
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const currentDate = new Date();
    const birthDate = new Date(selectedDate);
  
    // Calculate age in years
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
  
    // If the current month is before the birth month, or the month is the same but the current date is before the birth date, subtract 1 from the age
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }
  
    // If the user is less than 12 years old
    if (age < 12) {
      alert("You must be at least 12 years old.");
    } else {
      setUserDaydata(selectedDate);
    }
  };

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <div className="container mx-auto flex justify-center items-center px-4">
        <div className="userLogin_Box w-full xl:w-[550px] md:w-4/5 md:mt-24 lg:mt-10 lg:w-3/5 p-4 md:p-8 xl:h-[600px] border-3 rounded border-white">
          <div className="flex justify-center mb-4">
            <img className="w-24 h-24 rounded-full" src={userData.profile_picture} alt="Profile" />
          </div>
          <input 
            className="w-full h-10 bg-[#ffffffcc] outline-none my-2 rounded px-4 font-semibold" 
            type="text" 
            placeholder={userData.username} 
            disabled 
          />
          <h5 className="w-full h-10 bg-[#ffffff63] flex items-center justify-between my-2 text-pink-600 rounded px-4 font-semibold overflow-hidden">
            {userData.email} <span className="text-4xl text-green-600"><IoIosDoneAll /></span>
          </h5>
          <div className="flex items-center gap-1 w-full mb-2 h-10">
            <h5 className="w-1/5 lg:w-1/10 h-10 rounded-l bg-[#ffffff63] flex items-center justify-center my-2 text-pink-600 rounded px-4 font-semibold">+88</h5>
            <input 
              onChange={handlePhoneChange} 
              className="w-4/5 lg:w-9/10 h-10 bg-[#ffffff63] outline-none rounded-r px-4 font-semibold"
              type="text" 
              placeholder="Enter Your phone number"
            />
          </div>
          <input 
            onChange={handleDateChange} 
            className="w-full h-10 bg-[#ffffff63] outline-none mb-2 rounded px-4 font-semibold" 
            type="date" 
          />
          <div className="w-full h-12 bg-[#ffffff63] mb-2 rounded flex items-center gap-2 px-4 font-semibold">
            {Gender.map((item) => (
              <h5
                key={item.Gender}
                onClick={() => handleGenderSelect(item)}
                className={`${
                  genderSelet === item.Gender ? "bg-green-600 text-white" : "text-black border-2 border-black"
                } cursor-pointer px-4 rounded h-9 flex items-center`}
              >
                {item.Gender}
              </h5>
            ))}
          </div>
          <h5 
            onClick={handleUpdateData} 
            className="noselect w-full h-10 bg-green-600 flex items-center justify-center mt-14 my-2 text-white rounded px-4 font-semibold cursor-pointer"
          >
            Next
          </h5>
        </div>
      </div>
    </section>
  );
};

export default Login;
