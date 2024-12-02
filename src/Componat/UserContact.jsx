import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDatabase, ref, onValue, set } from "firebase/database";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const UserContact = ({ userDelivery }) => {
    const db = getDatabase();
    const selectDivRef = useRef();
    const selectDisRef = useRef();
    const selectupaRef = useRef();
    const selectuniRef = useRef();
    let userUid = useSelector((item) => item.counter.user)
    let [DivSelect, SetDivSelect] = useState(false)
    let [DisSelect, SetDisSelect] = useState(false)
    let [upaSelect, SetupaSelect] = useState(false)
    let [uniSelect, setuniSelect] = useState(false)
    let [userNameup, setuserNameup] = useState('')
    let [userNumber, setuserNumber] = useState('')
    let [userNumberUp, setuserNumberup] = useState('')
    let [userCity, setuserCity] = useState('')
    let [userCityup, setuserCityup] = useState('')
    let [userDivision, setuserDivision] = useState('')
    let [userDivisionup, setuserDivisionup] = useState('')
    let [userAddress, setuserAddress] = useState('')
    let [userupazilaup, setuserupazilaup] = useState('')
    let [userunionsup, setuserunionsup] = useState('')
    let [userAddressup, setuserAddressup] = useState('')
    let [undefended, setundefended] = useState('undefended')
    let [indexArea, setindexArea] = useState('undefended')
    let [districtid, setdistrictid] = useState('undefended')
    let [upazilsID, setupazilsID] = useState('undefended')
    let [divisions, setdivisions] = useState([])
    let [district, setdistrict] = useState([])
    let [upazila, setupazila] = useState([])
    let [unions, setunions] = useState([])

    useEffect(() => {
        setuserNumber(userDelivery.Phone_Number)
        setuserCity(userDelivery.City)
        setuserDivision(userDelivery.Division)
        setuserAddress(userDelivery.local_address)
    }, [userDelivery, db])


    let Handleupload = () => {
        set(ref(db, 'users/' + `${userUid}/` + 'Delivery_address/'), {
            username: userNameup === "" ? userDelivery.username : userNameup,
            Phone_Number: userNumberUp === "" ? userDelivery.Phone_Number : userNumberUp,
            local_address: userAddressup === "" ? userDelivery.local_address : userAddressup,
            email: userDelivery.email,
            Division: userDivisionup === "" ? userDelivery.Division : userDivisionup,
            District: userCityup === "" ? userDelivery.District : userCityup,
            upazila: userupazilaup === "" ? userDelivery.upazila : userupazilaup,
            unions: userunionsup === "" ? userDelivery.unions : userunionsup,
        })
            .then(() => {
                console.log(userDelivery);
            }).catch(() => {
                console.log("error");

            })
        setEdit(false)
    }
    let HandleName = (e) => {
        setuserNameup(e.target.value)
    }
    let HandleNumber = (e) => {
        setuserNumberup(e.target.value)
    }
    let HandleDivision = (e) => {
        setuserDivisionup(e.target.value)
    }
    let HandleCity = (e) => {
        setuserCityup(e.target.value)
    }
    let HandleAddress = (e) => {
        setuserAddressup(e.target.value)
    }
    let HandleDiv = ({ item, index }) => {
        setuserDivisionup(item.name);
        setindexArea(item.id);
    }
    let HandleDis = ({ item, index }) => {
        setuserCityup(item.name)
        setdistrictid(item.id)
    }
    let HandleUpa = ({ item, index }) => {
        setupazilsID(item.id)
        setuserupazilaup(item.name)
    }
    let HandleUni = ({ item, index }) => {
        setuserunionsup(item.name)
    }
    useEffect(() => {
        if (window.location.pathname === "/CheckOut") {
            const starCountRef = ref(db, 'bangladesharea/');
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                setdivisions(data?.divisions?.map((item) => item))
                setdistrict(data?.district?.map((item) => item))
                setupazila(data?.upazila?.map((item) => item))
                setunions(data?.unions?.map((item) => item))
            });
        }
    }, [window.location.pathname])
    useEffect(() => {

        let HandleSel = (e) => {
            if (DivSelect !== true) {
                SetDivSelect(selectDivRef.current.contains(e.target))
            } else {
                SetDivSelect(false)
            }
            if (DisSelect !== true) {
                SetDisSelect(selectDisRef.current.contains(e.target))
            } else {
                SetDisSelect(false)
            }
            if (upaSelect !== true) {
                SetupaSelect(selectupaRef.current.contains(e.target))
            } else {
                SetupaSelect(false)
            }
            if (uniSelect !== true) {
                setuniSelect(selectuniRef.current.contains(e.target))
            } else {
                setuniSelect(false)
            }
        }
        document.addEventListener("click", HandleSel);
        return () => document.removeEventListener("click", HandleSel);
    })

    return (
        <div className="contact w-full mx-auto p-4 bg-white shadow-lg rounded-md">
        <div className="yourCon w-full">
            {/* Name Input */}
            <div className="Name my-3">
                <h2 className="text-black text-lg md:text-xl lg:text-2xl font-semibold">Your Name:</h2>
                <input
                    placeholder={`${userDelivery.username}`}
                    onChange={HandleName}
                    type="text"
                    className="text-black bg-white px-3 py-2 w-full h-12 outline-none border-b-2 border-gray-200 focus:border-green-600 transition"
                />
            </div>
    
            {/* Phone Number Input */}
            <div className="PhoneNumber my-3">
                <h2 className="text-black text-lg md:text-xl lg:text-2xl font-semibold">Your Phone Number:</h2>
                <input
                    placeholder={`${userDelivery.Phone_Number}`}
                    onChange={HandleNumber}
                    type="text"
                    className="text-black bg-white px-3 py-2 w-full h-12 outline-none border-b-2 border-gray-200 focus:border-green-600 transition"
                />
            </div>
    
            {/* Division & District Selection */}
            <div className="flex flex-wrap justify-between w-full">
                {/* Division Selector */}
                <div className="Division w-[47%] my-3">
                    <h4
                        ref={selectDivRef}
                        className="rounded-lg text-white px-4 py-2 bg-green-800 text-sm md:text-lg font-bold flex justify-between items-center cursor-pointer"
                        onClick={() => setDivSelect(!DivSelect)}
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
                        className="text-black bg-white px-3 py-2 w-full h-12 outline-none border-b-2 border-gray-200 focus:border-green-600 transition mt-2"
                    />
                </div>
    
                {/* District Selector */}
                <div className="District w-[47%] my-3">
                    <h4
                        ref={selectDisRef}
                        className="rounded-lg text-white px-4 py-2 bg-green-800 text-sm md:text-lg font-bold flex justify-between items-center cursor-pointer"
                        onClick={() => setDisSelect(!DisSelect)}
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
                        className="text-black bg-white px-3 py-2 w-full h-12 outline-none border-b-2 border-gray-200 focus:border-green-600 transition mt-2"
                    />
                </div>
            </div>
    
            {/* Local Address Input */}
            <div className="localAddress my-3">
                <h2 className="text-black text-lg md:text-xl lg:text-2xl font-semibold">Your Local Address:</h2>
                <input
                    placeholder={`${userDelivery.local_address}`}
                    onChange={HandleAddress}
                    type="text"
                    className="text-black bg-white px-3 py-2 w-full h-12 outline-none border-b-2 border-gray-200 focus:border-green-600 transition"
                />
            </div>
    
            {/* Upload Button */}
            <div className="my-5">
                <button
                    onClick={Handleupload}
                    className="py-3 text-white text-lg uppercase bg-green-600 hover:bg-blue-900 rounded-md w-full md:w-auto px-5 transition"
                >
                    Upload Your Address
                </button>
            </div>
        </div>
    </div>
    
    )
}

export default UserContact