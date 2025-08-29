
const BuyProDucts = ({ BuyItem, building_data, TotalBuild, HandleSendOTP }) => {  

  console.log(BuyItem);
  
  return (
    <div className="w-full space-y-6">
      {BuyItem.map((Buyitemuser, i) =>
        Buyitemuser.totalPrice ? (
          <div key={i} className="bg-white text-black rounded-xl p-4 shadow-md space-y-4">
            {/* Product List */}
            {Buyitemuser.cartItem.map((item, j) => (
              <div
                key={j}
                className="flex flex-wrap md:flex-nowrap items-center justify-between border border-gray-300 rounded-lg p-3 gap-4"
              >
                <img src={item.imgurl} alt="" className="h-[70px] w-[70px] object-cover rounded" />
                <h2 className="flex-1 text-sm sm:text-base font-medium">{item.Prodectname}</h2>
                {item.ModelName && (
                  <h2 className="text-sm sm:text-base text-gray-700">
                    {item.ModelName} : {item.size}
                  </h2>
                )}
                <h2 className="text-sm sm:text-base text-gray-700">Size: {item.size || "Regular"}</h2>
                <h2 className="text-sm sm:text-base text-gray-700">Qty × {item.ProdectQun}</h2>
                <h2 className="text-sm sm:text-base font-semibold text-green-600">
                  ৳ {item.Pricesub || item.Price}
                </h2>
                
                  {
                    item.modleColor.Color !== ""
                    &&
                  <div className={`${item.modleColor.Color ? "block" : "hidden"} flex gap-2`}>
                                <span className='text-[#000000] text-sm font-bold'>Color:</span>      <div className="w-4 h-4 rounded-[50%]" style={{ backgroundColor: item.modleColor.Color }}></div>
                  </div>
                  }
              </div>
            ))}
            {/* Summary */}
            <div className="space-y-1 text-sm sm:text-base font-medium text-gray-800">
              <h2 className="text-black font-bold">
                Total Price:{" "}
                <span className="text-green-600  font-semibold">
                  {Buyitemuser.totalPrice} ৳
                </span>
              </h2>
              <h2 className="text-black font-bold">
                Total Qty:{" "}
                <span className=" text-black font-semibold">
                  {Buyitemuser.totalQun} <span className="text-[red]" >x</span>
                </span>
              </h2>
              <h2 className="text-black font-bold">VAT: {" "} {building_data.VAT} ৳</h2>
              <h2 className="text-black font-bold">Delivery Charges: {" "} {building_data.delivery_charges} ৳</h2>
              <h2 className="text-black font-bold">
                TotalBuild:{` ${Buyitemuser.totalPrice} + ${building_data.VAT} + ${building_data.delivery_charges} = `}
                <span className="text-pink-600 font-semibold">{TotalBuild} ৳</span>
              </h2>
            </div>


            {/* Payment Options */}
            <div className="flex gap-4 flex-col sm:flex-row text-sm sm:text-base text-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-[18px] h-[18px] border-2 border-red-500 rounded-full" />
                <h3>Cash on Delivery</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[18px] h-[18px] border-2 border-red-500 rounded-full" />
                <h3>Pay Online</h3>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={HandleSendOTP}
              className="w-full mt-6 py-2 rounded-md bg-[#d32f2f] hover:bg-[#a00000] text-white font-bold text-lg transition-all duration-300"
            >
              Pay Now
            </button>
          </div>
        ) : (

          <div key={i} className="bg-white text-black rounded-xl p-4 shadow-md space-y-4">

            <div className="flex flex-wrap md:flex-nowrap items-center justify-between border border-gray-300 rounded-lg p-3 gap-4">
              <img src={Buyitemuser.imgurl} alt="" className="h-[70px] w-[70px] object-cover rounded" />
              <h2 className="flex-1 text-sm sm:text-base font-medium">{(Buyitemuser.Prodectname).slice(0, 17) + "..."}</h2>
              {Buyitemuser.ModelName && (
                <h2 className="text-sm sm:text-base text-gray-700">
                  {Buyitemuser.ModelName} : {Buyitemuser.size}
                </h2>
              )}
              <h2 className="text-sm sm:text-base text-gray-700">Qty × {Buyitemuser.ProdectQun}</h2>
              <h2 className="text-sm sm:text-base font-semibold text-green-600">
                ৳ {Buyitemuser.Pricesub || Buyitemuser.Price}
              </h2>
                        {
                    Buyitemuser.modleColor.Color !== ""
                    &&
                  <div className={`${Buyitemuser.modleColor.Color ? "block" : "hidden"} flex gap-2`}>
                                <span className='text-[#000000] text-sm font-bold'>Color:</span>      <div className="w-4 h-4 rounded-[50%]" style={{ backgroundColor: Buyitemuser.modleColor.Color }}></div>
                  </div>
                  }
            </div>

            <div className="space-y-1 text-sm sm:text-base font-medium text-gray-800">
              <h2>Price: ৳ {Buyitemuser.Pricesub || Buyitemuser.Price}</h2>
              <h2>VAT: ৳ {building_data.VAT}</h2>
              <h2>Delivery Charges: ৳ {building_data.delivery_charges}</h2>
              <h2>
                Total:{" "}
                <span className="text-yellow-600 font-semibold">৳ {TotalBuild}</span>
              </h2>
            </div>

            <button
              onClick={HandleSendOTP}
              className="w-full mt-6 py-2 rounded-md bg-[#d32f2f] hover:bg-[#a00000] text-white font-bold text-lg transition-all duration-300"
            >
              Buy Now
            </button>
          </div>
        )
      )}
    </div>



  )
}

export default BuyProDucts