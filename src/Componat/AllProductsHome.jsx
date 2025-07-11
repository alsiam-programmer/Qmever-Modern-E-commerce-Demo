import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiData } from "./Context";

const AllProductsHome = () => {
  let info = useContext(apiData)


  const navigate = useNavigate()

  

  const handleProDetails = (item) => {
    navigate(`/productDetails/${item.ProdectId}`);
    window.scrollTo(0, 0);
  }
  return (
    <section className=" ">
      <div className="container py-[5px] md:py-10 mx-auto">
        <div className="flex flex-wrap ">
          {info.map((item, index) => (
            item !== null
              ?
              <div
                key={item.ProdectId || index}
                onClick={() => handleProDetails(item)}
                className="group w-[50%] md:w-[33.333333%] lg:w-[20%] p-[10px] rounded-lg cursor-pointer"
              >
                <div className="w-full overflow-hidden rounded-lg">
                  <img
                    className="w-full h-[190px] md:h-[240px] xl:h-[350px] object-cover group-hover:scale-110 transition-transform duration-300"
                    src={item.imgurl}
                    alt={item.Prodectname || "Product Image"}
                  />
                </div>
                <h2 className=" text-[12px] xl:text-lg font-semibold text-[#cf0cbf] shadow-black mt-2">
                  Price: {Number(item.Price).toFixed(2) || "N/A"}৳
                </h2>
                <h3 className=" text-[13px] xl:text-lg font-medium text-customized ">

                  {
                    item.Prodectname && item.Prodectname.length > 30 
                    ?
                    (item.Prodectname).slice(0 , 45)+"..." 
                    : item.Prodectname || "Unnamed Product"
                  }
                </h3>
                
              </div>
              : ""
          ))}
        </div>

      </div>
    </section>
  );
};

export default AllProductsHome;
