import React from 'react'

const BuyProDucts = ({ BuyItem , building_data , TotalBuild , HandleSendOTP }) => {
 

  return (
    <div className="BuyProDuct w-[100%]">
    {BuyItem.map((Buyitemuser) => (
      Buyitemuser.totalPrice
        ? 
        <div className="bg-[#1a1a1a] text-[#f5f5f5] rounded-lg p-[10px]">
          {Buyitemuser.cartItem.map((item) => (
            <div className="box justify-between w-[99%] my-[10px] md:m-[10px] border-[2px] border-[#444] flex flex-wrap p-[10px] items-center gap-[10px]">
              <img className="h-[70px] rounded" src={item.imgurl} alt="" />
              <h2 className="pr-[10px] sm:border-r-[1px] flex items-center h-[70px] sm:border-x-[#666]">{item.Prodectname}</h2>
              {item.ModelName && (
                <h2 className="pr-[10px] sm:border-r-[1px] flex items-center h-[70px] sm:border-x-[#666]">{item.ModelName} : {item.size}</h2>
              )}
              <h2 className="pr-[10px] sm:border-r-[1px] flex items-center h-[70px] sm:border-x-[#666]">ProdectQun x {item.ProdectQun}</h2>
              <h2 className="pr-[10px] flex items-center h-[70px]">Price: {item.Pricesub || item.Price}৳</h2>
            </div>
          ))}
          <h2 className="pl-[10px] flex items-center h-[30px]">Total Price: {Buyitemuser.Pricesub || Buyitemuser.Price}৳</h2>
          <h2 className="pl-[10px] flex items-center h-[30px]">VAT: {building_data.VAT} ৳</h2>
          <h2 className="pl-[10px] flex items-center h-[30px]">Delivery charges: {building_data.delivery_charges} ৳</h2>
          <h2 className="pl-[10px] flex items-center h-[30px]">Total build: {TotalBuild} ৳</h2>
          <div className="flex items-center gap-[10px]">
            <div className="w-[20px] h-[20px] rounded-full border-[2px] border-[red]"></div>
            <h3 className="text-[18px]">Cash on delivery</h3>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="w-[20px] h-[20px] rounded-full border-[2px] border-[red]"></div>
            <h3 className="text-[18px]">Pay Online</h3>
          </div>
          <h2
            onClick={HandleSendOTP}
            className="pay w-[100%] my-[40px] md:mx-[10px] h-[40px] text-[#fff] font-[700] flex justify-center items-center text-[18px] bg-[#d32f2f] rounded hover:bg-[#a00000]"
          >
            Pay Now {Buyitemuser.totalPrice}৳
          </h2>
        </div>
        : 
        <div className="bg-[#1a1a1a] text-[#f5f5f5] rounded-lg p-[10px]">
          <div className="box justify-between w-[100%] my-[10px] md:m-[10px] border-[2px] border-[#444] flex flex-wrap p-[10px] items-center gap-[10px]">
            <img className="h-[70px] rounded" src={Buyitemuser.imgurl} alt="" />
            <h2 className="pr-[10px] sm:border-r-[1px] flex items-center h-[70px] sm:border-x-[#666]">{Buyitemuser.Prodectname}</h2>
            {Buyitemuser.ModelName && (
              <h2 className="pr-[10px] sm:border-r-[1px] flex items-center h-[70px] sm:border-x-[#666]">{Buyitemuser.ModelName} : {Buyitemuser.size}</h2>
            )}
            <h2 className="pr-[10px] sm:border-r-[1px] flex items-center h-[70px] sm:border-x-[#666]">ProdectQun x {Buyitemuser.ProdectQun}</h2>
            <h2 className="pr-[10px] flex items-center h-[70px]">Price: {Buyitemuser.Pricesub || Buyitemuser.Price}৳</h2>
          </div>
          <h2 className="pl-[10px] flex items-center h-[30px]">Price: {Buyitemuser.Pricesub || Buyitemuser.Price}৳</h2>
          <h2 className="pl-[10px] flex items-center h-[30px]">VAT: {building_data.VAT} ৳</h2>
          <h2 className="pl-[10px] flex items-center h-[30px]">Delivery charges: {building_data.delivery_charges} ৳</h2>
          <h2 className="pl-[10px] flex items-center h-[30px]">Total build: {TotalBuild} ৳</h2>
          <h2
            onClick={HandleSendOTP}
            className="pay w-[100%] my-[40px] md:mx-[10px] h-[40px] text-[#fff] font-[700] flex justify-center items-center text-[18px] bg-[#d32f2f] rounded hover:bg-[#a00000]"
          >
            Buy Now {Buyitemuser.Pricesub || Buyitemuser.Price}৳
          </h2>
        </div>
    ))}
  </div>
  
  )
}

export default BuyProDucts