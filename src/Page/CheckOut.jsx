import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BuyProDucts from '../Componat/BuyProDucts';
import UserContact from '../Componat/UserContact';
import { getDatabase, get , ref, set, onValue } from "firebase/database";
import { removeAllcartPro } from '../Componat/slice/AllSlice';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
  const db = getDatabase();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userUid = useSelector((state) => state.counter.user);
  const BuyItem = useSelector((state) => state.counter.BuyItem);
  const cartItem = useSelector((state) => state.counter.cartItem);
  
  const [userDelivery, setUserDelivery] = useState({});
  const [sendOTP, setSendOTP] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ids, setids] = useState(1);
  const [Qty , setQty] = useState('')
  let [ errorItem , seterrorItem ] = useState('') 
  let [ errorItem1 , seterrorItem1 ] = useState('') 
  let [ errorItem2 , seterrorItem2 ] = useState('') 
  let [ errorItem3 , seterrorItem3 ] = useState('') 
  let [ errorItem4 , seterrorItem4 ] = useState('') 
  let [ errorItem5 , seterrorItem5 ] = useState('') 
  let [ errorItem6 , seterrorItem6 ] = useState('') 
  
  let [test , settest] = useState(false)
  
  let [ building_data , setbuilding_data ] = useState({})
  let [ TotalBuild , settotalBuild ] = useState('')


  useEffect(() => {
    const starCountRef = ref(db, `users/${userUid}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val()?.Delivery_address;
      if (data) {
        setUserDelivery(data);
        setPhoneNumber(data.Phone_Number);
      }
    });
  }, [db, userUid]);
  
  useEffect(()=>{

  },[db])
  
  const HandleSendOTP = async () => {
    settest(true)
    const phoneRegex = /^(?:\+8801|8801|01)\d{9}$/;

    let valid = true;
    
    if (!phoneRegex.test(userDelivery.Phone_Number)) {
      valid = false;
      seterrorItem("Invalid phone number");
    } else{
      seterrorItem("")
    }
    if ( userDelivery.Division === "") {
      valid = false;
      seterrorItem1("Division is required");
    } else{
      seterrorItem1("")
    }
    if ( userDelivery.District === "") {
      valid = false;
      seterrorItem2("District is required");
    } else{
      seterrorItem2("")

    }
    if ( userDelivery.local_address === "") {
      valid = false;
      seterrorItem5("Local address is required");
    } else{
      seterrorItem5("")

    }
    if ( userDelivery.username === "") {
      valid = false;
      seterrorItem6("Username is required");
    } else{
      seterrorItem6("")
    }

    setTimeout(()=>{
      settest(false)
    },[1000])
    const orderId = ref(db , `orders/${userUid}`)
    onValue(orderId , (snapshot) => {
      const orders = snapshot.val()
      if (orders !== null) {
        const id = snapshot.val().length
        setids(id)
      } else{
        setids(1)
      }
      
    } )
    if (!valid) return;


    try {
      // await axios.post('https://serverrupkotha.onrender.com/send-otp', { to: userDelivery.Phone_Number });
      setSendOTP(true);
      console.log("OTP sent successfully");
   
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerifyOTP = () => {
    placeOrder();
  };

  const placeOrder = async () => {
 
    try {
      const orderRef = ref(db, `orders/${userUid}/${ids}`);
      await set(orderRef, {
        orderId: ids,
        customerUid: userUid,
        customer: userDelivery,
        orderItem: BuyItem,
        TotalBuild: TotalBuild,
        orderStatus: {
          orderStatus: "Processing"
        }
      })
        .then(() => {
          dispatch(removeAllcartPro(cartItem));
          window.scrollTo(0,0)
          console.log("Order placed successfully.");
          setTimeout(() => {
            navigate("/orders");
          }, 100);
        });
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };


  useEffect(()=>{
    let fetchData = async () => {
      try {
        
        const buildingDataPath = ref(db , 'building/')
        const snapshot = await get(buildingDataPath)
        if (snapshot.exists()) {
          const building_data = snapshot.val();
          setbuilding_data(building_data)
                    
          const total = BuyItem.flatMap(item => item || []);
          const total_Cart = BuyItem.flatMap(item => item.totalPrice || []);
          const total_cartItem = BuyItem.flatMap(item => item.cartItem || []);
          setQty(total_cartItem)
          if (total_cartItem.length >= 1) {
            const total_B_C_Cart = Number(total_Cart) +
            Number(building_data?.delivery_charges) +
            Number(building_data?.VAT);
            settotalBuild(total_B_C_Cart);
            
          } else {
            const itemTotal = total.reduce((sum, item) => {
              const price = Number(item?.Pricesub || item?.Price || 0); 
              return sum + price;
            }, 0);
            const total_B_C = itemTotal +
            Number(building_data?.delivery_charges) +
            Number(building_data?.VAT);
            settotalBuild(total_B_C);
          }
        }
      } catch (error) {
       console.log(error);
        
      }
    }
    fetchData()
  },[ BuyItem , db ])
  
  return (
<section className="py-10 bg-[#f9f9f9] min-h-screen text-sm sm:text-base">
  <div className="container mx-auto px-4 flex justify-center">
    <div className="w-full lg:w-4/5 bg-white shadow-xl rounded-xl space-y-6">

      {/* User Contact Section */}
      <UserContact userDelivery={userDelivery} />

      {/* Product List Section */}
      <BuyProDucts 
        HandleSendOTP={HandleSendOTP} 
        building_data={building_data} 
        Qty={Qty}
        TotalBuild={TotalBuild} 
        BuyItem={BuyItem} 
      />
    </div>


    {/* Error Modal */}
    {test && (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100%] md:w-[50%] bg-[#1a1a1a] text-white p-5 sm:p-6 rounded-xl shadow-2xl border border-red-600 z-50">
        <h3 className="text-lg sm:text-xl font-bold text-center text-[#ff6f61] mb-4">
          Error Notification
        </h3>
        {[errorItem, errorItem1, errorItem2, errorItem3, errorItem6].map(
          (item, index) =>
            item && (
              <div
                key={index}
                className="bg-[#282828] my-2 px-4 py-2 rounded-md text-xs sm:text-sm border border-[#444]"
              >
                {item}
              </div>
            )
        )}
        <button
          onClick={() => settest(false)}
          className="mt-6 w-full py-2 bg-red-600 hover:bg-red-800 text-white text-sm font-semibold rounded-md transition duration-300"
        >
          Close
        </button>
      </div>
    )}

    {/* OTP Modal */}
    {sendOTP && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="w-[90%] sm:w-[400px] bg-white rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5 border border-gray-200">

          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">OTP Verification</h2>
            <p className="text-xs sm:text-sm text-gray-500">Please check your message inbox</p>
          </div>

          <div className="text-center">
            <p className="text-green-600 text-base sm:text-lg font-semibold tracking-wider">
              {phoneNumber.replace(/\d(?=\d{4})/g, '*')}
            </p>
          </div>

          <div className="flex items-center justify-center px-4 py-6">
            <input
              type="tel"
              inputMode="numeric"
              pattern='[0-9]*'
              maxLength={6}
              className="w-full max-w-xs h-14 px-4 text-center text-lg sm:text-xl tracking-[0.6em] placeholder-gray-400 focus:outline-none"
              placeholder="******"
              onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
            />
          </div>

          <button
            onClick={handleVerifyOTP}
            className="w-full h-11 bg-black text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-900 transition duration-300"
          >
            Verify OTP
          </button>
        </div>
      </div>
    )}

    {/* reCAPTCHA */}
    <div id="recaptcha-container"></div>
  </div>
</section>


  );
};

export default CheckOut;
