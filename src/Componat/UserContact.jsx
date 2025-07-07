import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDatabase, ref, onValue, set } from "firebase/database";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const UserContact = ({ userDelivery }) => {
    const db = getDatabase();
    const selectDivRef = useRef();
    const selectDisRef = useRef();

    // Get current user's UID from Redux store
    const userUid = useSelector((item) => item.counter.user);

    const [dotCount, setDotCount] = useState(1);

    // Dropdown state toggles
    const [DivSelect, SetDivSelect] = useState(false);
    const [DisSelect, SetDisSelect] = useState(false);

    // Input field states
    const [userNameup, setuserNameup] = useState('');
    const [userNumberUp, setuserNumberup] = useState('');
    const [userCityup, setuserCityup] = useState('');
    const [userDivisionup, setuserDivisionup] = useState('');
    const [userAddressup, setuserAddressup] = useState('');
    const [alert , SetAlert ] = useState(false)
    // Helper states
    const [indexArea, setindexArea] = useState('undefended');
    const [districtid, setdistrictid] = useState('undefended');

    // Area data lists
    const [divisions, setdivisions] = useState([]);
    const [district, setdistrict] = useState([]);

 
    // Handle form submission to Firebase
    const Handleupload = () => {
        SetAlert(true)
        
        const dInterval = setInterval (() => {
            setDotCount((prev)=>(prev < 4 ? prev + 1 : 1 ))
        }, 500)



        set(ref(db, 'users/' + `${userUid}/` + 'Delivery_address/'), {
            username: userNameup === "" ? userDelivery.username : userNameup,
            Phone_Number: userNumberUp === "" ? userDelivery.Phone_Number : userNumberUp,
            local_address: userAddressup === "" ? userDelivery.local_address : userAddressup,
            email: userDelivery.email,
            Division: userDivisionup === "" ? userDelivery.Division : userDivisionup,
            District: userCityup === "" ? userDelivery.District : userCityup,
        })
        .then(() => {
            setTimeout(() => {
                SetAlert(false)
                clearInterval(dInterval)
            }, 500);
        }).catch(() => {
            SetAlert(false)
            clearInterval(dInterval)
        });
    };

    // Input field handlers
    const HandleName = (e) => setuserNameup(e.target.value);
    const HandleNumber = (e) => setuserNumberup(e.target.value);
    const HandleDivision = (e) => setuserDivisionup(e.target.value);
    const HandleCity = (e) => setuserCityup(e.target.value);
    const HandleAddress = (e) => setuserAddressup(e.target.value);

    // Division and District selection handlers
    const HandleDiv = ({ item }) => {
        setuserDivisionup(item.name);
        setindexArea(item.id);
    };
    const HandleDis = ({ item }) => {
        setuserCityup(item.name);
        setdistrictid(item.id);
    };

    // Load area data from Firebase if on checkout page
    useEffect(() => {
        if (window.location.pathname === "/CheckOut") {
            const starCountRef = ref(db, 'bangladesharea/');
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                setdivisions(data?.divisions?.map((item) => item));
                setdistrict(data?.district?.map((item) => item));
                setupazila(data?.upazila?.map((item) => item));
                setunions(data?.unions?.map((item) => item));
            });
        }
    }, [window.location.pathname]);

    // Close dropdowns on outside click
    const HandleSel = (e) => {
        
        if (DivSelect !== true) {
            SetDivSelect(selectDivRef.current.contains(e.target));
        } else {
            SetDivSelect(false);
        }
        if (DisSelect !== true) {
            SetDisSelect(selectDisRef.current.contains(e.target));
        } else {
            SetDisSelect(false);
        }
        
    };
    useEffect(() => {
        document.addEventListener("click", HandleSel);
        return () => document.removeEventListener("click", HandleSel);
    });

    return (
        <div className="contact w-full mx-auto p-4 bg-white shadow-lg rounded-md">
            <div className="yourCon w-full">
                {/* Name Input */}
                <div className="Name my-3">
                    <h2 className="text-black text-[13px] md:text-[15px] xl:text-xl font-semibold">Your Name:</h2>
                    <input
                        placeholder={`${userDelivery.username}`}
                        onChange={HandleName}
                        type="text"
                        className="text-black text-[12px] md:text-[13px] xl:text-lg bg-white w-full lg:h-12 h-10 outline-none border-b-2 border-gray-200 focus:border-green-600 transition"
                    />
                </div>

                {/* Phone Number Input */}
                <div className="PhoneNumber my-3">
                    <h2 className="text-black text-[13px] md:text-[15px] xl:text-xl font-semibold">Your Phone Number:</h2>
                    <input
                        placeholder={`${userDelivery.Phone_Number}`}
                        onChange={HandleNumber}
                        type="text"
                        className="text-black text-[12px] md:text-[13px] xl:text-lg bg-white w-full lg:h-12 h-10 outline-none border-b-2 border-gray-200 focus:border-green-600 transition"
                    />
                </div>

                {/* Division & District Selection */}
                <div className="flex flex-wrap justify-between w-full">
                    {/* Division Selector */}
                    <div className="Division w-[100%] sm:w-[47%] my-3">
                        <h4
                            ref={selectDivRef}
                            className="rounded-lg text-center lg:text-start text-white px-4 py-1 bg-green-800 text-[13px] md:text-[15px] xl:text-xl font-bold flex justify-between items-center cursor-pointer"
                        >
                            <span>Select Your Division</span>
                            {DivSelect ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </h4>
                        {DivSelect && (
                            <div className="bg-gray-100 mt-1 rounded-md overflow-hidden">
                                {divisions.map((item, index) => (
                                    <h5
                                        key={index}
                                        onClick={() => HandleDiv({ item, index })}
                                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm lg:text-lg"
                                    >
                                        {item.name}
                                    </h5>
                                ))}
                            </div>
                        )}
                        <input
                            value={userDivisionup}
                            placeholder={`${userDelivery.Division}`}
                            onChange={HandleDivision}
                            type="text"
                        className="text-black text-[12px] md:text-[13px] xl:text-lg bg-white w-full lg:h-12 h-10 outline-none border-b-2 border-gray-200 focus:border-green-600 transition"
                        />
                    </div>

                    {/* District Selector */}
                    <div className="District w-[100%] sm:w-[47%] my-3">
                        <h4
                            ref={selectDisRef}
                            className="rounded-lg text-center lg:text-start text-white px-4 py-1 bg-green-800 text-[13px] md:text-[15px] xl:text-xl font-bold flex justify-between items-center cursor-pointer"
                        >
                            <span>Select Your District</span>
                            {DisSelect ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </h4>
                        {DisSelect && (
                            <div className="bg-gray-100 mt-1 rounded-md overflow-hidden">
                                {district
                                    .filter((item) => item.division_id === indexArea)
                                    .map((item, index) => (
                                        <h5
                                            key={index}
                                            onClick={() => HandleDis({ item, index })}
                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm lg:text-lg"
                                        >
                                            {item.name}
                                        </h5>
                                    ))}
                            </div>
                        )}
                        <input
                            value={userCityup}
                            placeholder={`${userDelivery.District}`}
                            onChange={HandleCity}
                            type="text"
                        className="text-black text-[12px] md:text-[13px] xl:text-lg bg-white w-full lg:h-12 h-10 outline-none border-b-2 border-gray-200 focus:border-green-600 transition"
                        />
                    </div>
                </div>

                {/* Local Address Input */}
                <div className="localAddress my-3">
                    <h2 className="text-black text-[13px] md:text-[15px] xl:text-xl font-semibold">Your Local Address:</h2>
                    <input
                        placeholder={`${userDelivery.local_address}`}
                        onChange={HandleAddress}
                        type="text"
                        className="text-black text-[12px] md:text-[13px] xl:text-lg bg-white w-full lg:h-12 h-10 outline-none border-b-2 border-gray-200 focus:border-green-600 transition"
                    />
                </div>

                {/* Upload Button */}
                <div className="my-5">
                    <button
                        onClick={Handleupload}
                        className="xl:py-3 text-white xl:text-lg uppercase bg-green-700 lg:hover:bg-blue-900 rounded-md w-full lg:w-auto lg:px-5 transition text-[13px] lg:[15px] py-[5px]"
                    >
                        Upload Your Address
                    </button>
                    {
                        alert !== false
                        ?
                        <div className=" fixed bg-[#0000004d] w-[100%] h-[100%] translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] ">
                            <h4 className=' absolute translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] font-bold text-[15px] shadow-bla' >Uploading{".".repeat(dotCount)}</h4>
                        </div>
                        :""
                    } 
                </div>
            </div>
        </div>
    );
};

export default UserContact;
