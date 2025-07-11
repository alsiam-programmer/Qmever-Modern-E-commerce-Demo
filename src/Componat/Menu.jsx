import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaBars } from "react-icons/fa";
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, onValue, ref, set , get } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout, userUidLogin } from './slice/AllSlice';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoSearchOutline, IoCloseOutline, IoCameraOutline } from "react-icons/io5";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaSnowflake } from "react-icons/fa";

const Menu = () => {
  let userLoginUid = useSelector((item) => item.counter.user)

  let [userData, setUserdata] = useState([])
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const auth = getAuth();
  const db = getDatabase();
  let [userDelivery, setuserDelivery] = useState({})
  const provider = new GoogleAuthProvider();
  let MenuRef = useRef()
  let SupportRef = useRef()
  let [MenuShow, setMenuShow] = useState(false)
  let [Year, setYear] = useState([])
  let [useruid, setUseruid] = useState('')
  let [getDataSearch, setGetDataSearch] = useState([])
  let [searchItemIndex, setSearchItemIndex] = useState(-1)
  

  useEffect(() => {
    userLoginUid.map((item) => {
      setUseruid(item);
    })
  }, [userLoginUid])

  useEffect(() => {

    let HandleCon = (e) => {
      setMenuShow(MenuRef.current.contains(e.target))
      // setSuppoutShow(SupportRef.current.contains(e.target))
    }

    document.addEventListener("click", HandleCon);
    return () => document.removeEventListener("click", HandleCon)
  })

  let handleKeysystem = (e) => {
    if (e.key === "ArrowLeft") {
      setMenuShow(true)
    }
    if (e.key === "ArrowRight") {
      setMenuShow(false)
    }
    // if (e.key === "Enter") {
    //   handleupData()
    // }

  }
  document.addEventListener('keydown', handleKeysystem);
  useEffect(() => {
    const yearArray = [];
    for (let i = 2024; i > 1900; i--) {
      yearArray.push(i); // Push the year directly
    }
    setYear(yearArray); // Set the state
  }, []); // Empty dependency array, so this runs only once after the component mounts

  // unions: `${userDelivery.unions !== "" ? userDelivery.unions : ""}`,
  // upazila: `${userDelivery.upazila !== "" ? userDelivery.upazila : ""}`,
let handleLogin = () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      // Dispatch Redux action
      await dispatch(userUidLogin(user.uid));

      const userRef = ref(db, 'users/' + user.uid);

      // Check if user already exists
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        // User does not exist, create new data
        await set(userRef, {
          username: user.displayName,
          email: user.email,
          profile_picture: user.photoURL,
          uid: user.uid,
          gender: "",
          dateOfBirth: "",
          Delivery_address: {
            username: user.displayName,
            email: user.email,
            Phone_Number: "",
            Division: "",
            District: "",
            local_address: "",
          }
        });
        await navigate('/Login')
        window.location.reload()
        console.log("new");
        
      } else {
        navigate('/')
        console.log('old');
        
      }
    })

    .catch((error) => {
      console.error("Auth Error:", error.code, error.message);
    });
};



  let handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(userLogout(userLoginUid))
      setUseruid('')
      navigate("/")
    })
    .then(()=>{
      window.location.reload()
    })
    .catch((error) => {
      console.log(error);

    });
  }
  useEffect(() => {

  }, [useruid])
  useEffect(() => {
    userLoginUid.map((useruid) => {
      return onValue(ref(db, '/users/' + useruid), (snapshot) => {
        const userDetails = snapshot.val()
        setUserdata(userDetails);
      }, {
        onlyOnce: true
      })

    })

  }, [userLoginUid, useruid])
  useEffect(() => {
    const starCountRef = ref(db, 'users/' + userLoginUid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val().Delivery_address;
      setuserDelivery(data)
    });
  }, [db])
  const [search, setSearch] = useState("");
  let [searchBoxShow, setSearchBoxShow] = useState(false)
  const handleSearch = (e) => {
    setSearch(e.target.value)
    axios.get("https://qmever-default-rtdb.asia-southeast1.firebasedatabase/products.json").then((res) => {
      setGetDataSearch(res?.data?.filter((item) => item?.Prodectname?.toLowerCase().includes(e?.target?.value.toLowerCase())))
      setSearchBoxShow(true)
    })
  };

  const GoSearchEnter = (e) => {
    if (e.key === "Enter") {
      if (searchItemIndex === -1 || searchItemIndex === (getDataSearch.length + 1)) {
        navigate(`/search_query?query=${encodeURIComponent(search)}`)
        setSearchBoxShow(false)
        setSearchItemIndex(-1)
      } else {
        const selectedItem = getDataSearch.find((item, idx) => idx === searchItemIndex);
        setSearch(selectedItem.Prodectname)
        navigate(`/search_query?query=${encodeURIComponent(selectedItem.Prodectname)}`)
        setSearchBoxShow(false)
        setSearchItemIndex(-1)
      }
    }
    if (e.key === "ArrowDown") {
      if (getDataSearch.length - 1 > searchItemIndex) {
        setSearchItemIndex(item => item + 1)
      }
    }
    if (e.key === "ArrowUp") {
      if (searchItemIndex > -1) {
        setSearchItemIndex(item => item - 1)
      }
    }
  }
  let GoSearchPage = () => {
    navigate(`/search_query?query=${encodeURIComponent(search)}`)
    setSearchBoxShow(false)
    setSearchItemIndex(-1)
  }
  let valueDelet = () => {
    setSearch("")
  }

  let handleItemName = ({ item, index }) => {
    setSearch(item.Prodectname)
    console.log(index);

  }
  return (
    <section>
      {/* <h5 className='text-[#fff] lg:text-[20px] fixed top-0 translate-x-[50%] left-[10%] animate-[animake_9s_linear_infinite] z-[990] '><FaSnowflake /></h5>
      <h5 className='text-[#fff] lg:text-[20px] fixed top-0 translate-x-[50%] left-[22%] animate-[animake_8s_linear_infinite] z-[990] '><FaSnowflake /></h5>
      <h5 className='text-[#fff] lg:text-[20px] fixed top-0 translate-x-[50%] left-[22%] animate-[animake_12s_linear_infinite] z-[990] '><FaSnowflake /></h5>
      <h5 className='text-[#fff] lg:text-[20px] fixed top-0 translate-x-[50%] left-[35%] animate-[animake_9s_linear_infinite] z-[990] '><FaSnowflake /></h5>
      <h5 className='text-[#fff] lg:text-[20px] fixed top-0 translate-x-[50%] left-[50%] animate-[animake_11s_linear_infinite] z-[990] '><FaSnowflake /></h5>
      <h5 className='text-[#fff] lg:text-[20px] fixed top-0 translate-x-[50%] left-[50%] animate-[animake_13s_linear_infinite] z-[990] '><FaSnowflake /></h5>
      <h5 className='text-[#fff] lg:text-[20px] fixed top-0 translate-x-[50%] left-[65%] animate-[animake_8s_linear_infinite] z-[990] '><FaSnowflake /></h5>
      <h5 className='text-[#fff] lg:text-[20px] fixed top-0 translate-x-[50%] left-[80%] animate-[animake_10s_linear_infinite] z-[990] '><FaSnowflake /></h5>
      <h5 className='text-[#fff] lg:text-[20px] fixed top-0 translate-x-[50%] left-[98%] animate-[animake_6s_linear_infinite] z-[990] '><FaSnowflake /></h5> */}


      <section className='w-[100%] h-[100px] mb-[10px] sm:mb-[0px] sm:h-[120px] '>
        <div className=' z-[990] px-[10px] bg-[#062919] fixed top-0 left-[50%] translate-x-[-50%] w-[100%] '>
          <div className=" relative container mx-auto h-[60px] sm:h-[70px] md:h-[80px]">
            <div className="webLogo cursor-pointer w-[100%] flex justify-center items-center h-[60px] sm:h-[70px] md:h-[80px] lg:justify-start">
              <h1 className='text-[#fff] text-[30px] noselect italic font-[700]'>Qmever</h1>
            </div>
            <div className="Search rounded-l-[40px] shadow-2xl lg:shadow-none rounded-r-[40px] lg:my-[0px] w-[100%] lg:w-[70%] h-[40px] justify-center flex lg:top-[50%] relative lg:translate-y-[-50%] lg:left-[50%] lg:translate-x-[-50%] lg:absolute">
              <div className="Search rounded-l-[40px] shadow-2xl lg:shadow-none my-[10px] rounded-r-[40px] lg:my-[0px] w-[100%] lg:w-[50%] h-[40px] justify-center flex lg:top-[50%] relative lg:translate-y-[-50%] lg:left-[50%] lg:translate-x-[-50%] lg:absolute">
                <input value={search} onKeyDown={GoSearchEnter} onChange={handleSearch} type="text" className=' italic font-[600] w-[100%] px-[20px] outline-none rounded-l-[40px] lg:rounded-l-[5px] h-[40px]  text-[#000000a9] ' placeholder='what you need' />
                <h5 onClick={valueDelet} className={` ${search !== "" ? "block" : "hidden"} h-[40px] w-[40px] top-0 right-[15%] lg:right-[10%] absolute z-[999] rounded-[50%] flex justify-center items-center text-[19px] bg-[#f0f0f0] text-[#000] font-[600] cursor-pointer`} ><IoCloseOutline /></h5>
                <h5 onClick={GoSearchPage} className='h-[40px] rounded-r-[40px] lg:rounded-none w-[50px] flex justify-center items-center text-[19px] bg-[#f0f0f0] text-[#000] font-[600] cursor-pointer'><IoSearchOutline /></h5>
              </div>
              {/* {
                search.length >= 1 && searchBoxShow !== false
                  ?
                  <div className=" w-[100%] h-[300px] lg:h-[500px] absolute z-[999] bg-[#fff] top-[60px] ">
                    {getDataSearch.map((item , index)=>(
                      <h5 onClick={()=>handleItemName({item , index})} className={` ${ index === searchItemIndex ? "bg-[black] text-white" : ""} text-[14px] my-[2px] p-[10px] py-[5px] text-[#061227] bg-[#f4f4f4]`} >{item.Prodectname}</h5>
                    ))}
                  </div>
                  : ""
              } */}
            </div>
            <div ref={MenuRef} onKeyDown={handleKeysystem} className="MenuBar cursor-pointer absolute top-[50%] right-[0px] translate-y-[-50%]">
              <icon className='text-[38px] text-[#fff]' ><FaBars /></icon>
            </div>
          </div>
        </div>
      </section>
      {
        MenuShow ? (
          <div className="fixed top-0 right-0 z-[999] h-full w-[200px] sm:w-[300px] md:w-[400px] 2xl:w-[600px] bg-white shadow-xl duration-300">
            <ul className="w-full mt-16 px-4 space-y-3">
              {
                useruid === "" ? (
                  <div className=" w-full flex justify-center">

                    <img
                      src="https://i.ibb.co/vC8zmqHv/low-self-esteem-1-1.jpg"
                      alt="Nice to meet you"
                      className=" w-[80%] h-auto object-contain"
                    />
                  </div>


                ) : (
                  <Link to={'/user-profile'}>
                    <div className="flex items-center gap-4 px-5 py-3 bg-green-950 rounded-xl hover:bg-green-900 cursor-pointer transition-all">
                      <img
                        src={userData?.profile_picture}
                        alt="User"
                        className="w-12 h-12 rounded-full border-4 border-yellow-400"
                      />
                      <h2 className="text-sm font-semibold text-yellow-400 group-hover:underline">{userData.username}</h2>
                    </div>
                  </Link>
                )
              }

              {
                useruid === "" ? (
                  <li
                    onKeyDown={handleKeysystem}
                    onClick={handleLogin}
                    className="absolute left-1/2 -translate-x-1/2 bottom-48 bg-green-600 text-white px-6 lg:py-2 py-[5px] text-lg font-bold rounded-xl hover:bg-green-700 cursor-pointer"
                  >
                    Login
                  </li>
                ) : (
                  <div className="space-y-2">
                    <Link to="/"><li className=" hover:text-green-700 text-[black]
 text-[15px] lg:text-[20px] font-bold px-5 py-3 hover:bg-gray-100 border-b-[1px] lg:border-b-[3px] border-b-gray-700">Home</li></Link>
                    <Link to="/ProductPage"><li className=" hover:text-green-700 text-[black]
 text-[15px] lg:text-[20px] font-bold px-5 py-3 hover:bg-gray-100 border-b-[1px] lg:border-b-[3px] border-b-gray-700">Products</li></Link>
                    <li className=" hover:text-green-700 text-[black]
 text-[15px] lg:text-[20px] font-bold px-5 py-3 hover:bg-gray-100 border-b-[1px] lg:border-b-[3px] border-b-gray-700">Notification</li>
                    <Link to="/Orders"><li className=" hover:text-green-700 text-[black]
 text-[15px] lg:text-[20px] font-bold px-5 py-3 hover:bg-gray-100 border-b-[1px] lg:border-b-[3px] border-b-gray-700">My Order</li></Link>
                    <Link to="/CartPage"><li className=" hover:text-green-700 text-[black]
 text-[15px] lg:text-[20px] font-bold px-5 py-3 hover:bg-gray-100 border-b-[1px] lg:border-b-[3px] border-b-gray-700">Cart</li></Link>

                    <li
                      onClick={handleLogout}
                      className="absolute left-1/2 -translate-x-1/2 bottom-48 bg-red-600 text-white px-6 lg:py-2 py-[5px] text-lg font-bold rounded-xl hover:bg-red-700 cursor-pointer"
                    >
                      Logout
                    </li>
                  </div>
                )
              }
            </ul>
          </div>
        ) : (
          <div className="fixed top-0 right-[-60%] z-[999] h-full w-[200px] sm:w-[300px] md:w-[400px] 2xl:w-[600px] bg-white shadow-xl duration-300">
            <ul className="w-full mt-16 px-4 space-y-3">
              {
                useruid === "" ? (
                  <div className=" w-full flex justify-center">

                    <img
                      src="https://i.ibb.co/vC8zmqHv/low-self-esteem-1-1.jpg"
                      alt="Nice to meet you"
                      className=" w-[80%] h-auto object-contain"
                    />
                  </div>


                ) : (
                  <Link to={'/user-profile'}>
                    <div className="flex items-center gap-4 px-5 py-3 bg-green-950 rounded-xl hover:bg-green-900 cursor-pointer transition-all">
                      <img
                        src={userData?.profile_picture}
                        alt="User"
                        className="w-12 h-12 rounded-full border-4 border-yellow-400"
                      />
                      <h2 className="text-sm font-semibold text-yellow-400 group-hover:underline">{userData.username}</h2>
                    </div>
                  </Link>
                )
              }

              {
                useruid === "" ? (
                  <li
                    onKeyDown={handleKeysystem}
                    onClick={handleLogin}
                    className="absolute left-1/2 -translate-x-1/2 bottom-48 bg-green-600 text-white px-6 lg:py-2 py-[5px] text-lg font-bold rounded-xl hover:bg-green-700 cursor-pointer"
                  >
                    Login
                  </li>
                ) : (
                  <div className="space-y-2">
                    <Link to="/"><li className=" hover:text-green-700 text-[black]
 text-[15px] lg:text-[20px] font-bold px-5 py-3 hover:bg-gray-100 border-b-[1px] lg:border-b-[3px] border-b-gray-700">Home</li></Link>
                    <Link to="/ProductPage"><li className=" hover:text-green-700 text-[black]
 text-[15px] lg:text-[20px] font-bold px-5 py-3 hover:bg-gray-100 border-b-[1px] lg:border-b-[3px] border-b-gray-700">Products</li></Link>
                    <li className=" hover:text-green-700 text-[black]
 text-[15px] lg:text-[20px] font-bold px-5 py-3 hover:bg-gray-100 border-b-[1px] lg:border-b-[3px] border-b-gray-700">Notification</li>
                    <Link to="/Orders"><li className=" hover:text-green-700 text-[black]
 text-[15px] lg:text-[20px] font-bold px-5 py-3 hover:bg-gray-100 border-b-[1px] lg:border-b-[3px] border-b-gray-700">My Order</li></Link>
                    <Link to="/CartPage"><li className=" hover:text-green-700 text-[black]
 text-[15px] lg:text-[20px] font-bold px-5 py-3 hover:bg-gray-100 border-b-[1px] lg:border-b-[3px] border-b-gray-700">Cart</li></Link>

                    <li
                      onClick={handleLogout}
                      className="absolute left-1/2 -translate-x-1/2 bottom-48 bg-red-600 text-white px-6 lg:py-2 py-[5px] text-lg font-bold rounded-xl hover:bg-red-700 cursor-pointer"
                    >
                      Logout
                    </li>
                  </div>
                )
              }
            </ul>
          </div>
        )
      }

    </section>
  )
}

export default Menu