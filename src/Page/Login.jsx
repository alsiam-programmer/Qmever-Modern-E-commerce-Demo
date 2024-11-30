import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoIosDoneAll } from "react-icons/io";

const Login = () => { 
  let navigate = useNavigate()
  let userLoginUid = useSelector((item)=>item.counter.user)
  const db = getDatabase();
  let [ userData , setUserdata ] = useState([])
  let [ genderSelet , setgenderSelet ] = useState('')
  useEffect(()=>{
    userLoginUid.map((useruid)=>{
      return onValue(ref(db, '/users/' + useruid), (snapshot) => {
        const userDetails = snapshot.val()
        setUserdata(userDetails);
      }, {
        onlyOnce: true
      })

    })

  },[userLoginUid])
  console.log(userData);
  
  let Join = () =>{
    navigate('/')
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  let hs = (e) =>{
    console.log(e.target.value);
    
  }
  let Gender = [
    { "Gender": "Male", "Main_category": "man" },
    { "Gender": "Female", "Main_category": "woman" },
    { "Gender": "Transgender", "Main_category": "transgender" },
  ]
  let handleselectG = (item) => {
    setgenderSelet(item.Gender)
  }
   // let handleupData = () => {
  //   let valid = true; // Start by assuming it's valid

  //   // Validation for Gender
  //   if (userSEXdata.Gender === undefined) {
  //     valid = false;
  //     setErrorGen(`SORRY MY DEAR ${(userData.username).substring(0, 6) + "..."} SELECT YOU GENDER `)
  //   }

  //   // Validation for dateOfBirth
  //   if (`${userDaydata.day}/${userMounthdata.mounth}/${userYeardata}` === "undefined/undefined/") {
  //     valid = false;
  //     setErrorDateofbirth(`SORRY MY DEAR ${(userData.username).substring(0, 6) + "..."} SELECT YOU DATE OF BIRTH `)
  //   }

  //   // If validation fails, do not continue to Firebase update
  //   if (!valid) {
  //     console.log("fuck");
  //     return { valid }; // Return early if invalid

  //   }

  //   // If valid, update the data in Firebase
  //   set(ref(db, 'users/' + `${useruid}/`), {
  //     username: userData.username,
  //     email: userData.email,
  //     profile_picture: userIMG || userData.profile_picture,
  //     uid: userData.uid,
  //     gender: userSEXdata.Gender,
  //     dateOfBirth: `${userDaydata.day}/${userMounthdata.mounth}/${userYeardata}`,
  //     Delivery_address: {
  //       username: userData.username,
  //       email: userData.email,
  //       Phone_Number: userDelivery.Phone_Number || "",  // Use default value if empty
  //       Division: userDelivery.Division || "",
  //       District: userDelivery.District || "",
  //       unions: userDelivery.unions || "",
  //       upazila: userDelivery.upazila || "",
  //       local_address: userDelivery.local_address || "",
  //     }
  //   }).then(() => {
  //     window.location.reload();  // Reload the page after the update
  //   }).catch(error => {
  //     console.error("Error updating user data: ", error);  // Handle any errors
  //   });
  // };

  return (
    <section>
      <div className="container mx-auto flex justify-center items-center px-[10px]">
        <div className="userLogin_Box w-[100%] xl:w-[550px] md:w-[80%] md:mt-[100px] lg:mt-[10px] lg:w-[60%] p-[20px] xl:h-[600px] md:border-[3px] rounded md:border-[#fff]">
          <div className="w-[100%] flex justify-center mb-[10px]">
          <img className='w-[100px] rounded-[50%] h-[100px]' src={userData.profile_picture} alt="" />
          </div>
          <input className='w-[100%] h-[40px] bg-[#ffffffcc] outline-none my-[5px] rounded px-[10px] font-[600] ' type="text" placeholder={`${userData.username}`} />
          <h5 className='w-[100%] h-[40px] bg-[#ffffff63] flex items-center justify-between my-[5px] text-pink-600 rounded px-[10px] font-[600]'>{userData.email} <span className='text-[40px] text-green-600 '><IoIosDoneAll/></span> </h5>
          <div className="flex items-center gap-1 w-[100%] mb-[5px] h-[40px]">
          <h5 className='w-[10%] h-[40px] rounded-l bg-[#ffffff63] flex items-center justify-between my-[5px] text-pink-600 rounded px-[10px] font-[600]'>+880</h5>
          <input className=' w-[90%] h-[40px] bg-[#ffffff63] outline-none rounded-r px-[10px] font-[600] ' type="text" placeholder={`Enter You phone numer`} />
          </div>
          <input onChange={hs} className='w-[100%] h-[40px] bg-[#ffffff63] outline-none mb-[5px] rounded px-[10px] font-[600] ' type="date"  />
          <div className="'w-[100%] h-[50px] bg-[#ffffff63] mb-[5px] rounded flex items-center gap-[10px] px-[10px] font-[600]">
            {Gender.map((item)=>(
              <h5 onClick={()=>handleselectG(item)} className={` ${genderSelet === item.Gender ? "bg-[green] text-[#fff]" :"text-[#000] border-[2px] border-[#000]"} noselect cursor-pointer px-[10px] rounded h-[35px] flex items-center`} >{item.Gender}</h5>
            ))}
          </div>
          <h5 onClick={handleupData} className='noselect w-[100%] h-[40px] bg-[green] flex items-center justify-center mt-[60px] my-[5px] text-[#fff] rounded px-[10px] font-[600] cursor-pointer' >Next</h5>
          {/* <div className="imgBox flex relative justify-center my-[40px]">
            <img className=' absolute top-[50px] w-[300px] h-[300px]' src="https://i.ibb.co.com/42kqS9s/Picsart-24-09-13-20-42-41-421.png" alt="" />
          </div>
          <div className="welcome relative text-center ">
            <h1 className='  text-[#000] text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-[700] font-sans'>Welcome to Rupkotha</h1>
            <h2 className='text-[#000] text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-[700] font-sans'>Dear {userData.username}</h2>
          </div>
          <h2 onClick={Join} className='px-[20px] py-[7px] absolute bottom-[60px] left-[50%] translate-x-[-50%] bg-[#43af43] text-[18px] text-[#fff] font-[600] rounded-[10px] uppercase ' >Join Now</h2> */}
        </div>
      </div>
    </section>
  );
};

export default Login;
