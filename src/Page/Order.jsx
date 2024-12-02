import { getDatabase, ref, set, onValue } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { TbLoader2 } from 'react-icons/tb';
import { useSelector } from 'react-redux'

const Order = () => {

    const db = getDatabase();
    const [orders, setOrders] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [OrderStatus, setOrderStatus] = useState('');
    const userUid = useSelector((state) => state.counter.user);

    useEffect(() => {
        const starCountRef = ref(db, 'orders/' + userUid);
        const unsubscribe = onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setOrders(data); // Directly set the orders from the database
            }
        });

        return () => unsubscribe(); // Cleanup the listener
    }, [db, userUid]); // Added userUid to dependency array

    useEffect(() => {
        // Flatten the orderItems from orders array
        const items = orders.flatMap(order => order.orderItem);
        const itemsx = orders.flatMap(order => order?.orderStatus?.orderStatus);
        setOrderItems(items)
        setOrderStatus(itemsx)
    }, [orders]); // Trigger this effect when orders change
    
        
    // console.log(OrderStatus);
    
    console.log(orderItems , "fuck");


    return (
<div className="container mx-auto py-10">
  {/* Order Status Filter */}
  <div className="w-full bg-[#f4f4f4] rounded-[15px] my-8 flex flex-wrap justify-center items-center gap-4 py-6 px-4 shadow-xl border border-[#e0e0e0]">
    {/* Status Buttons */}
    {['All', 'Processing', 'Confirmed', 'Picking', 'Shipped', 'Delivered', 'Cancelled'].map((status, index) => (
      <h5
        key={index}
        className={`text-xs sm:text-sm md:text-base font-medium py-3 px-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out 
          ${status === 'Cancelled' ? 'bg-red-600 text-white border-red-600 hover:bg-red-500' :
          status === 'Delivered' ? 'bg-green-500 text-white border-green-500 hover:bg-green-400' :
          status === 'Shipped' ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-400' :
          status === 'Picking' ? 'bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-400' :
          status === 'Confirmed' ? 'bg-orange-500 text-white border-orange-500 hover:bg-orange-400' :
          status === 'Processing' ? 'bg-gray-600 text-white border-gray-600 hover:bg-gray-500' :
          'bg-black text-white border-black hover:bg-white hover:text-black hover:border-black'}`}
      >
        {status}
      </h5>
    ))}
  </div>

    {orderItems ? "" :
  <div className="flex w-[100%] justify-center my-8">
  <TbLoader2 className="w-10 h-10 animate-spin text-[#ff1586]" />
  </div>}
  {/* Order Items Section */}
  {orderItems.map((item, index_M) => (
    <div key={index_M} className="my-6">
      <div className="flex flex-wrap justify-between items-start">

        {/* Order Details */}
        <div className="w-full lg:w-[75%] xl:w-[70%] bg-white rounded-lg shadow-2xl border border-[#f0f0f0] p-4 relative">

          {/* Order Status Indicator */}
          <div className="flex flex-col mb-[10px] space-y-4">
            {OrderStatus.map((orderStatus, index) => (
              <h2
                key={index}
                className={`text-lg font-bold py-3 px-8 rounded-full shadow-md 
                ${index === index_M ? 'block' : 'hidden'} 
                ${orderStatus === 'Delivered' && 'bg-green-600 text-white'}
                ${orderStatus === 'Shipped' && 'bg-blue-600 text-white'}
                ${orderStatus === 'Picking' && 'bg-yellow-600 text-white'}
                ${orderStatus === 'Confirmed' && 'bg-orange-600 text-white'}
                ${orderStatus === 'Processing' && 'bg-gray-600 text-white'}`}
              >
                {orderStatus}
              </h2>
            ))}
          </div>

          {/* Cart Items */}
          {item.cartItem?.map((ItemPro, index) => (
      
            <div key={index} className="flex items-center gap-5 mb-6 flex-wrap justify-between">
              <img className="w-32 h-32 object-cover rounded-xl shadow-md mb-4 sm:mb-0" src={ItemPro.imgurl} alt={ItemPro.Prodectname} />
              
              {/* Total Price */}
              <h2 className="text-[15px] md:text-[22px] font-semibold text-[#ff1586] bg-[#ffffff1f] py-3 px-8 rounded-full shadow-xl">
                {item.totalPrice.toFixed(2)}৳
              </h2>

              {/* Product Details */}
              <div className="flex flex-col w-full sm:w-auto">
                <h3 className="text-lg font-semibold text-[#000]">{ItemPro.Prodectname}</h3>
                <p className="text-lg text-[#555]">{ItemPro.Price}৳</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ))}
</div>


    )
}

export default Order