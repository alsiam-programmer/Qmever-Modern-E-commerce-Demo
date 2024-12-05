import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BuyProDucts from '../Componat/BuyProDucts';
import UserContact from '../Componat/UserContact';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { removeAllcartPro } from '../Componat/slice/AllSlice';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
  const db = getDatabase();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userUid = useSelector((state) => state.counter.user);
  const BuyItem = useSelector((state) => state.counter.BuyItem);
  const cartItem = useSelector((state) => state.counter.cartItem);

  console.log(cartItem);
  
  const [userDelivery, setUserDelivery] = useState({});
  const [sendOTP, setSendOTP] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ids, setids] = useState(1);
  let [ errorItem , seterrorItem ] = useState('') 
  let [ errorItem1 , seterrorItem1 ] = useState('') 
  let [ errorItem2 , seterrorItem2 ] = useState('') 
  let [ errorItem3 , seterrorItem3 ] = useState('') 
  let [ errorItem4 , seterrorItem4 ] = useState('') 
  let [ errorItem5 , seterrorItem5 ] = useState('') 
  let [ errorItem6 , seterrorItem6 ] = useState('') 

  let [test , settest] = useState(false)

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
        console.log(id);
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

  let [ building_data , setbuilding_data ] = useState({})
  let [ TotalBuild , settotalBuild ] = useState('')

  useEffect(()=>{
    const buildingDataPath = ref(db , 'building/')
    onValue(buildingDataPath , ( snapshot )=>{
      const building_data = snapshot.val()
      setbuilding_data(building_data);
    })
    const total = BuyItem.flatMap(item => item || []);
    const total_Cart = BuyItem.flatMap(item => item.totalPrice || []);
    const total_cartItem = BuyItem.flatMap(item => item.cartItem || []);
 
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
  },[db , TotalBuild , building_data])
  
  return (
    <section>
      <div className="container px-[10px] my-[30px] flex justify-center mx-auto">

        <div className="w-[100%] lg:w-[80%]">
        <UserContact userDelivery={userDelivery} />
        <BuyProDucts HandleSendOTP={HandleSendOTP} building_data={building_data} TotalBuild={TotalBuild} BuyItem={BuyItem} />
        </div>
        {test && (
  <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%] md:w-[50%] bg-[#1a1a1a] text-[#f5f5f5] py-[20px] px-[30px] rounded-[15px] shadow-lg border border-[#d32f2f]">
    <h3 className="text-[20px] font-bold text-center mb-[10px] text-[#ff6f61]">
      Error Notification
    </h3>
    {[errorItem, errorItem1, errorItem2, errorItem3 , errorItem6].map(
      (item, index) => (
        item !== "" &&
        <div
          key={index}
          className="bg-[#282828] my-[5px] px-[10px] py-[5px] rounded text-[15px] font-medium border border-[#555]"
        >
          {item}
        </div>
      )
    )}
    <button
      onClick={() => setTest(false)}
      className="mt-[20px] w-full py-[10px] bg-[#d32f2f] text-[#fff] text-[16px] rounded hover:bg-[#a00000] transition duration-300"
    >
      Close
    </button>
  </div>
)}

        {sendOTP && (
          <div className="p-[30px] rounded OTPInput fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[300px] h-[200px] sm:w-[500px] sm:h-[300px] bg-[#fff]">
            <h2 className="flex justify-center mb-[20px] text-[18px] font-[600]">Please check your message box</h2>
            <h2 className="flex justify-center my-[20px] text-[18px] text-[green] font-[600]">
              {phoneNumber.replace(/\d(?=\d{4})/g, '*')}
            </h2>
            <div className="flex justify-center items-center">
              <input
                type="text"
                className="w-[100%] h-[40px] outline-none px-[5px] border-[2px] border-[#00000097] rounded"
                placeholder="Enter OTP"
                onChange={(e) => setOtpInput(e.target.value)}
              />
            </div>
            <h2
              onClick={handleVerifyOTP}
              className="flex justify-center items-center mt-[10px] rounded w-[80px] h-[30px] bg-[#000] text-[#fff] text-[15px] font-[600] cursor-pointer"
            >
              Verify
            </h2>
          </div>
        )}
        <div id="recaptcha-container"></div>
      </div>
    </section>
  );
};

export default CheckOut;
