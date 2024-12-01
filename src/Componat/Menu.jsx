import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaBars } from "react-icons/fa";
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout, userUidLogin } from './slice/AllSlice';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoSearchOutline, IoCloseOutline, IoCameraOutline } from "react-icons/io5";
import axios from 'axios';
import { useNavigate , Link } from 'react-router-dom';
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
  let [getDataSearch , setGetDataSearch] = useState([])
  let [ searchItemIndex , setSearchItemIndex ] = useState(-1)
  
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


  let handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        if (user !== null) {
          set(ref(db, 'users/' + user.uid), {
            username: user.displayName,
            email: user.email,
            profile_picture: user.photoURL,
            uid: user.uid,
            gender: `${userData.gender !== "" ? userData.gender : ""}`,
            dateOfBirth: `${userData.dateOfBirth !== "" ? userData.dateOfBirth : ""}`,
            Delivery_address: {
              username: user.displayName,
              email: user.email,
              Phone_Number: `${userDelivery.Phone_Number !== "" ? userDelivery.Phone_Number : ""}`,
              Division: `${userDelivery.Division !== "" ? userDelivery.Division : ""}`,
              District: `${userDelivery.District !== "" ? userDelivery.District : ""}`,
              unions: `${userDelivery.unions !== "" ? userDelivery.unions : ""}`,
              upazila: `${userDelivery.upazila !== "" ? userDelivery.upazila : ""}`,
              local_address: `${userDelivery.local_address !== "" ? userDelivery.local_address : ""}`,
            }
          });
          dispatch(userUidLogin(user.uid))
          console.log(user, "done");

        } else {
          console.log("error datadase");

        }
      })
      .then(() => {
        navigate('/Login')
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        console.log(errorCode);
        console.log(error);

        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }

  let handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(userLogout(userLoginUid))
      setUseruid('')
      navigate("/")
    }).catch((error) => {
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
  let [ searchBoxShow , setSearchBoxShow ] = useState(false)
  const handleSearch = (e) => {
    setSearch(e.target.value)
    axios.get("https://rupkotha-a706e-default-rtdb.asia-southeast1.firebasedatabase.app/products.json").then((res) => {
      setGetDataSearch(res?.data?.filter((item) => item?.Prodectname?.toLowerCase().includes(e?.target?.value.toLowerCase())))
      setSearchBoxShow(true)
    })
  };

  const GoSearchEnter = (e) => {
    if (e.key === "Enter") {
      if (searchItemIndex === -1 || searchItemIndex === (getDataSearch.length + 1) ) {
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
      if ( getDataSearch.length - 1 > searchItemIndex ) {
        setSearchItemIndex(item => item + 1)
      }
    }
    if (e.key === "ArrowUp") {
      if (searchItemIndex > -1 ) {
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


  let Day = [
    { "day": "01", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "02", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "03", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "04", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "05", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "06", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "07", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "08", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "09", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "10", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "11", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "12", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "13", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "14", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "15", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "16", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "17", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "18", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "19", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "20", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "21", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "22", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "23", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "24", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "25", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "26", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "27", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "28", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "29", "mounth_id": "0", "January": "January", "February": "February", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "30", "mounth_id": "0", "January": "January", "March": "March", "April": "April", "May": "May", "June": "June", "July": "July", "August": "August", "September": "September", "October": "October", "November": "November", "December": "December" },
    { "day": "31", "mounth_id": "0", "January": "January", "March": "March", "May": "May", "July": "July", "August": "August", "October": "October", "December": "December" },
  ]

  let Mounth = [
    { "mounth": "January", "mounth_id": "0", "mounth_level": "01" },
    { "mounth": "February", "mounth_id": "1", "mounth_level": "02" },
    { "mounth": "March", "mounth_id": "2", "mounth_level": "03" },
    { "mounth": "April", "mounth_id": "3", "mounth_level": "04" },
    { "mounth": "May", "mounth_id": "4", "mounth_level": "05" },
    { "mounth": "June", "mounth_id": "5", "mounth_level": "06" },
    { "mounth": "July", "mounth_id": "6", "mounth_level": "07" },
    { "mounth": "August", "mounth_id": "7", "mounth_level": "08" },
    { "mounth": "September", "mounth_id": "8", "mounth_level": "09" },
    { "mounth": "October", "mounth_id": "9", "mounth_level": "10" },
    { "mounth": "November", "mounth_id": "10", "mounth_level": "11" },
    { "mounth": "December", "mounth_id": "11", "mounth_level": "12" },

  ]


  let handleItemName = ({item , index}) => {
    setSearch(item.Prodectname)
    console.log(index);
    
  }
  return (
    <section>
      <h5 className='text-[#fff] lg:text-[20px] fixed top-0 translate-x-[50%] left-[10%] animate-[animake_9s_linear_infinite] z-[990] '><FaSnowflake /></h5>
      <h5 className='text-[#fff] lg:text-[20px] fixed top-0 translate-x-[50%] left-[22%] animate-[animake_8s_linear_infinite] z-[990] '><FaSnowflake /></h5>
      <h5 className='text-[#fff] lg:text-[20px] fixed top-0 translate-x-[50%] left-[22%] animate-[animake_12s_linear_infinite] z-[990] '><FaSnowflake /></h5>
      <h5 className='text-[#fff] lg:text-[20px] fixed top-0 translate-x-[50%] left-[35%] animate-[animake_9s_linear_infinite] z-[990] '><FaSnowflake /></h5>
      <h5 className='text-[#fff] lg:text-[20px] fixed top-0 translate-x-[50%] left-[50%] animate-[animake_11s_linear_infinite] z-[990] '><FaSnowflake /></h5>
      <h5 className='text-[#fff] lg:text-[20px] fixed top-0 translate-x-[50%] left-[50%] animate-[animake_13s_linear_infinite] z-[990] '><FaSnowflake /></h5>
      <h5 className='text-[#fff] lg:text-[20px] fixed top-0 translate-x-[50%] left-[65%] animate-[animake_8s_linear_infinite] z-[990] '><FaSnowflake /></h5>
      <h5 className='text-[#fff] lg:text-[20px] fixed top-0 translate-x-[50%] left-[80%] animate-[animake_10s_linear_infinite] z-[990] '><FaSnowflake /></h5>
      <h5 className='text-[#fff] lg:text-[20px] fixed top-0 translate-x-[50%] left-[98%] animate-[animake_6s_linear_infinite] z-[990] '><FaSnowflake /></h5>

      
      <section className='w-[100%] h-[100px] mb-[10px] sm:mb-[0px] sm:h-[120px] '>
               <div className=' z-[990] px-[10px] bg-[#062919] fixed top-0 left-[50%] translate-x-[-50%] w-[100%] '>
          <div className=" relative container mx-auto h-[60px] sm:h-[70px] md:h-[80px]">
            <div className="webLogo cursor-pointer w-[100%] flex justify-center items-center h-[60px] sm:h-[70px] md:h-[80px] lg:justify-start">
              <h1 className='text-[#fff] text-[30px] noselect font-[700]'>Qmever.com</h1>
            </div>
            <div className="Search rounded-l-[40px] shadow-2xl lg:shadow-none rounded-r-[40px] lg:my-[0px] w-[100%] lg:w-[70%] h-[40px] justify-center flex lg:top-[50%] relative lg:translate-y-[-50%] lg:left-[50%] lg:translate-x-[-50%] lg:absolute">
              <div className="Search rounded-l-[40px] shadow-2xl lg:shadow-none my-[10px] rounded-r-[40px] lg:my-[0px] w-[100%] lg:w-[50%] h-[40px] justify-center flex lg:top-[50%] relative lg:translate-y-[-50%] lg:left-[50%] lg:translate-x-[-50%] lg:absolute">
                <input value={search} onKeyDown={GoSearchEnter} onChange={handleSearch} type="text" className=' w-[100%] px-[20px] outline-none rounded-l-[40px] lg:rounded-l-[5px] h-[40px]  text-[#000000a9] ' placeholder='what you need' />
                <h5 onClick={valueDelet} className={` ${search !== "" ? "block" : "hidden"} h-[40px] w-[40px] top-0 right-[15%] lg:right-[10%] absolute z-[999] rounded-[50%] flex justify-center items-center text-[19px] bg-[#f0f0f0] text-[#000] font-[600] cursor-pointer`} ><IoCloseOutline /></h5>
                <h5 onClick={GoSearchPage} className='h-[40px] rounded-r-[40px] lg:rounded-none w-[50px] flex justify-center items-center text-[19px] bg-[#f0f0f0] text-[#000] font-[600] cursor-pointer'><IoSearchOutline /></h5>
              </div>
              {
                search.length >= 1 && searchBoxShow !== false
                  ?
                  <div className=" w-[100%] h-[300px] lg:h-[500px] absolute z-[999] bg-[#fff] top-[60px] ">
                    {getDataSearch.map((item , index)=>(
                      <h5 onClick={()=>handleItemName({item , index})} className={` ${ index === searchItemIndex ? "bg-[black] text-white" : ""} text-[14px] my-[2px] p-[10px] py-[5px] text-[#061227] bg-[#f4f4f4]`} >{item.Prodectname}</h5>
                    ))}
                  </div>
                  : ""
              }
            </div>
            <div ref={MenuRef} onKeyDown={handleKeysystem} className="MenuBar cursor-pointer absolute top-[50%] right-[0px] translate-y-[-50%]">
              <icon className='text-[38px] text-[#fff]' ><FaBars /></icon>
            </div>
          </div>
        </div>
      </section>
      {MenuShow === true ?
        <div className="fixed w-[200px] sm:w-[300px] md:w-[400px] 2xl:w-[600px] h-[100%] bg-[#fff] duration-300 right-0 top-0 z-[999]">

          <ul className='w-[100%] mt-[60px]'>
            {
              useruid === ""
                ? <li className=' font-sans text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] flex justify-between font-[700]'>Nice to meet you.will you be my friend</li>
                : <div className=' bg-[#062919] cursor-pointer py-[30px] gap-[10px] items-center font-sans h-[50px] flex text-[22px] px-[20px] rounded-[10px] m-[10px] group font-[700]'>
                  <img className=' rounded-[50%] w-[45px] border-[3px] border-[gold] h-[45px]' src={userData.profile_picture} alt="" />
                  <h2 className=' group-hover:underline text-[15px] text-[gold] font-[600]'>{userData.username}</h2>
                </div>
            }

            {
              useruid === ""
                ? <li onKeyDown={handleKeysystem} onClick={handleLogin} className=' font-sans absolute left-[50%] translate-x-[-50%] bottom-[200px] text-[22px] px-[20px] py-[5px] text-[#fff] bg-[green] rounded-[10px] font-[700]'>Login</li>
                : <div className="">
                  <Link to={'/'}><li className=' font-sans text-[17px] md:text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] font-[700]'>Home</li></Link>
                  <li className=' font-sans text-[17px] md:text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] font-[700]'>Products</li>
                  <li className=' font-sans text-[17px] md:text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] font-[700]'>Notification</li>
                  <Link to={'/Orders'}><li className=' font-sans text-[17px] md:text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] font-[700]'>My Order</li></Link>
                  <Link to={'/CartPage'}><li className=' font-sans text-[17px] md:text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] font-[700]'>Cart</li></Link>
                  <li onClick={handleLogout} className=' font-sans absolute left-[50%] translate-x-[-50%] bottom-[200px] text-[17px] md:text-[22px] px-[20px] py-[5px] text-[#fff] bg-[red] rounded-[10px] font-[700]'>Logout</li>
                </div>
            }
          </ul>
        </div>
        :
        <div className="fixed w-[200px] sm:w-[300px] md:w-[400px] 2xl:w-[600px] h-[100%] bg-[#fff] duration-300 right-[-60%] top-0 z-[999]">

          <ul className='w-[100%] mt-[60px]'>
            {
              useruid === ""
                ? <li className=' font-sans text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] flex justify-between font-[700]'>Nice to meet you.will you be my friend</li>
                : <div className=' bg-[#081939] cursor-pointer py-[30px] gap-[10px] items-center font-sans h-[50px] flex text-[22px] px-[20px] rounded-[10px] m-[10px] group font-[700]'>
                  <img className=' rounded-[50%] w-[45px] border-[3px] border-[gold] h-[45px]' src={userData.profile_picture} alt="" />
                  <h2 className=' group-hover:underline text-[15px] text-[gold] font-[600]'>{userData.username}</h2>
                </div>
            }

            {
              useruid === ""
                ? <li onClick={handleLogin} className=' font-sans absolute left-[50%] translate-x-[-50%] bottom-[200px] text-[22px] px-[20px] py-[5px] text-[#fff] bg-[green] rounded-[10px] font-[700]'>Login</li>
                : <div className="">
                  <Link to={'/'}><li className=' font-sans text-[17px] md:text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] font-[700]'>Home</li></Link>
                  <li className=' font-sans text-[17px] md:text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] font-[700]'>Products</li>
                  <li className=' font-sans text-[17px] md:text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] font-[700]'>Notification</li>
                  <Link to={'/Orders'}><li className=' font-sans text-[17px] md:text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] font-[700]'>My Order</li></Link>
                  <Link to={'/CartPage'}><li className=' font-sans text-[17px] md:text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] font-[700]'>Cart</li></Link>
                  <li onClick={handleLogout} className=' font-sans absolute left-[50%] translate-x-[-50%] bottom-[200px] text-[17px] md:text-[22px] px-[20px] py-[5px] text-[#fff] bg-[red] rounded-[10px] font-[700]'>Logout</li>
                </div>
            }
          </ul>
        </div>
      }
    </section>
  )
}

export default Menu