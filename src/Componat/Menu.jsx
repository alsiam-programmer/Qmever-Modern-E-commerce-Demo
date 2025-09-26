import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaBars } from "react-icons/fa";
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, onValue, ref, set , get } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout, userUidLogin } from './slice/AllSlice';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoSearchOutline, IoCloseOutline, IoCameraOutline } from "react-icons/io5";
import axios from 'axios';
import { useNavigate, Link, useLocation, useMatch } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";

const Menu = () => {
  let userLoginUid = useSelector((item) => item.counter.user)
  const location = useLocation()
  let [userData, setUserdata] = useState([])
  let dispatch = useDispatch()
  const matchProduct = useMatch("/watch/:id");
  let navigate = useNavigate()
  const auth = getAuth();
  const db = getDatabase();
  let [userDelivery, setuserDelivery] = useState({})
  const provider = new GoogleAuthProvider();
  let MenuRef = useRef()
  let [MenuShow, setMenuShow] = useState(false)
  let [loader , setloader] = useState(false)
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
        setloader(true)
        // User does not exist, create new data
        await set(userRef, {
          username: user.displayName,
          email: user.email,
          profile_picture: user.photoURL,
          uid: user.uid,
          role: "users",
          type:"public",
          gender: "",
          dateOfBirth: "",
          Wishlist: [],
          Delivery_address: {
            username: user.displayName,
            email: user.email,
            Phone_Number: "",
            Division: "",
            District: "",
            local_address: "",
          }
        });
        await new Promise(res => setTimeout(res, 2000)); window.location.href = '/my-account/user-edit_profile';
        setloader(false)
      } else {
        
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

const handleSearch = async (e) => {
  const value = e.target.value;
  setSearch(value);

  if (value.length === 0) return;

  try {
    const res = await axios.get(
      "https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
    );

    const SD = Object.values(res?.data || {})
      .filter((item) =>
        item?.Prodectname?.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 10);

    setGetDataSearch(
  SD
    );

    setSearchBoxShow(true);

    
  } catch (error) {
  }
};
  
  const GoSearchEnter = (e) => {
    if(search.length === 0 || search === "NO ITEM HAVE IN QMEVER") return;
    if (e.key === "Enter") {
      if (searchItemIndex === -1 || searchItemIndex === (getDataSearch.length + 1)) {
        navigate(`/search?query=${encodeURIComponent(search)}`)
        setSearchBoxShow(false)
        setSearchItemIndex(-1)
      } else {
        const selectedItem = getDataSearch.find((item, idx) => idx === searchItemIndex);
        setSearch(selectedItem.Prodectname)
        navigate(`/search?query=${encodeURIComponent(selectedItem.Prodectname)}`)
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
    if(search.length === 0 || search === "NO ITEM HAVE IN QMEVER") return;
    navigate(`/search?query=${encodeURIComponent(search)}`)
    setSearchBoxShow(false)
    setSearchItemIndex(-1)
  }
  let valueDelet = () => {
    setSearch("")
  }

  let handleItemName = ({ item, index }) => {
    setSearch(item.Prodectname)
  }
  
    const navLinks = [
    { name: "Home", path: "/" },
    { name: "My Orders", path: "/Orders" },
    { name: "Cart", path: "/CartPage" },
  ];


  
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

{
  loader && (
    <div className="fixed inset-0 bg-black/50 z-[9998] flex items-center justify-center">
      <div className="w-[60px] h-[60px] flex items-center justify-center">
        <div className="loader w-full h-full" />
      </div>
    </div>
  )
}


      <section className={`w-[100%] h-[60px] lg:h-[70px] xl:h-[80px] ${(location.pathname === "/my-account" || location.pathname === "/my-account/user-edit_profile" || location.pathname === "/Orders" || location.pathname === "/CheckOut" || matchProduct) ? "" : "mb-[65px]" } lg:mb-3`}>
        <div className=' z-[990] px-[10px] bg-[#062919] fixed top-0 left-[50%] translate-x-[-50%] w-[100%] '>
          <div className=" lg:w-[75%] relative container mx-auto h-[60px] lg:h-[70px] xl:h-[80px]">
            <div className="webLogo cursor-pointer w-[100%] flex justify-center items-center h-[60px] lg:h-[70px] xl:h-[80px] lg:justify-start">
              <h1 className='text-[#fff] text-[30px] noselect italic font-[700]'>Qmever</h1>
            </div>
{

     (location.pathname === "/my-account" || location.pathname === "/my-account/user-edit_profile" || location.pathname === "/Orders" || location.pathname === "/CheckOut" || matchProduct)  ? "" :
      (
        <div className="Search rounded-l-[40px] shadow-2xl lg:shadow-none rounded-r-[40px] lg:my-[0px] w-[100%] lg:w-[70%] h-[40px] justify-center flex lg:top-[50%] relative lg:translate-y-[-50%] lg:left-[50%] lg:translate-x-[-50%] lg:absolute">


<div className="Search relative w-full lg:w-[50%] h-[40px] flex items-center my-3 lg:my-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 shadow-2xl lg:shadow-none shadow-black rounded-full overflow-hidden bg-white">

  {/* Input */}
  <input
    value={search}
    onKeyDown={GoSearchEnter}
    onChange={handleSearch}
    type="text"
    placeholder="What are you looking for?"
    className="flex-1 h-full px-4 lg:px-5 text-[#1f2937] placeholder-[#9ca3af] font-medium outline-none"
  />

  {/* Clear Button */}
  {search && (
    <button
      onClick={valueDelet}
      className="absolute top-1/2 right-[15%] lg:right-[10%] -translate-y-1/2 h-8 w-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-black font-semibold rounded-full transition"
    >
      <IoCloseOutline size={18} />
    </button>
  )}

  {/* Search Button */}
  <button
    onClick={GoSearchPage}
    className="h-[40px] rounded-r-[40px] lg:rounded-none w-[50px] flex justify-center items-center text-[19px] bg-[#f0f0f0] text-[#000] font-[600] cursor-pointer"
  >
    <IoSearchOutline size={20} />
  </button>
</div>


             {search.length >= 1 && searchBoxShow && (
  <div className="absolute top-[60px] w-full z-[999] bg-white shadow-lg rounded-md">
    {getDataSearch.map((item, index) => (
      <h5
        key={index}
        onClick={() => handleItemName({ item, index })}
        className={`text-[14px] my-[2px] p-[10px] py-[5px] cursor-pointer rounded transition-colors ${
          index === searchItemIndex
            ? "bg-green-600 text-white"
            : "bg-[#f9fafb] text-[#1f2937] hover:bg-[#e5e7eb]"
        }`}
      >
        {item.Prodectname}
      </h5>
    ))}
  </div>
)}

            </div>
      )
}
            <div ref={MenuRef} onKeyDown={handleKeysystem} className="MenuBar cursor-pointer absolute top-[50%] right-[0px] translate-y-[-50%]">
              <div className='text-[38px] text-[#fff]/80' ><FaBars /></div>
            </div>
          </div>
        </div>
      </section>
      
<aside
  className={`fixed top-0 right-0 h-full shadow-2xl transform transition-transform duration-300 z-[1000]
    ${MenuShow ? "translate-x-0" : "translate-x-full"}
  `}
  style={{ width: "80%", maxWidth: "400px" }}
>
  <div className="h-full bg-gradient-to-b from-[#062919] to-[#062919]/30 backdrop-blur-xl border-l border-white/20">
    <ul className="flex flex-col h-full justify-between py-8 px-6">
      {useruid === "" ? (
        <div className="flex flex-col gap-8">
          {/* Placeholder / Welcome */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 flex items-center justify-center bg-white/10 rounded-full shadow-lg">
              <span className="text-white font-bold text-xl">👋</span>
            </div>
            <p className="mt-4 text-white/80 font-medium">
              Welcome, guest! <br />
              Sign in to unlock more features.
            </p>
          </div>

          {/* Nav Links */}
          <nav className="space-y-2">
            {navLinks.slice(0,1).map((link, index) =>
              link.path ? (
                <li key={index}>
                  <Link
                    to={link.path}
                    className={`block px-5 py-3 rounded-xl font-semibold transition shadow-sm
                      ${
                        location.pathname === link.path
                          ? "bg-green-600/80 text-white shadow-inner"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ) : (
                <li
                  key={index}
                  className="px-5 py-3 rounded-xl font-semibold text-white/80 hover:bg-white/10 transition cursor-pointer"
                >
                  {link.name}
                </li>
              )
            )}
          </nav>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Profile */}
          <Link to={"/my-account"}>
  <div className="group overflow-hidden relative flex items-center gap-4 px-4 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition cursor-pointer shadow-lg hover:shadow-green-500/20 hover:scale-[1.02] duration-300">
    
    {/* Avatar with gradient border */}
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-400 via-blue-500 to-purple-600 p-[2px]">
        <div className="w-12 h-12 rounded-full bg-gray-900"></div>
      </div>
      <img
        src={
          userData?.profile_picture ||
          "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
        }
        className="relative w-12 h-12 rounded-full border-2 border-white/20 object-cover"
      />
    </div>

    {/* User info */}
    <div className="flex flex-col overflow-hidden">
      <h2 className="text-white font-semibold text-lg truncate">
        {userData?.username
          ? userData.username.slice(0, 12) +
            (userData.username.length > 12 ? "..." : "")
          : ""}
      </h2>
      <p className="text-sm text-white/60 truncate">
        {userData?.email || "View profile"}
      </p>
    </div>

  </div>
</Link>


          {/* Nav Links */}
 <nav className="space-y-3">
  {navLinks.map((link, index) =>
    link.path ? (
      <li key={index}>
        <Link
          to={link.path}
          className={`
            block px-5 py-3 rounded-2xl font-semibold transition 
            backdrop-blur-md border border-white/20 shadow-md
            ${
              location.pathname === link.path
                ? " bg-green-500 text-white shadow-inner"
                : "bg-white/20 text-gray-100 hover:bg-white/40 hover:text-gray-50"
            }
          `}
        >
          {link.name}
        </Link>
      </li>
    ) : (
      <li
        key={index}
        className="px-5 py-3 rounded-2xl font-semibold text-gray-800/90 
          hover:bg-white/30 backdrop-blur-md transition cursor-pointer shadow-sm"
      >
        {link.name}
      </li>
    )
  )}
</nav>

        </div>
      )}

      {/* Auth Button */}
      <div>
        {useruid === "" ? (
          <button
            onClick={handleLogin}
            className="flex items-center justify-center gap-3 w-full bg-white text-gray-900 py-3 rounded-xl font-bold shadow-md hover:bg-gray-100 transition border border-gray-300"
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full bg-red-600/90 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition shadow-md"
          >
            <FiLogOut className="text-lg" />
            Logout
          </button>
        )}
      </div>
    </ul>
  </div>
</aside>


    </section>
  )
}

export default Menu