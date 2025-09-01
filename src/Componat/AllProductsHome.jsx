import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiData } from "./Context";

const AllProductsHome = () => {
  let info = useContext(apiData)


  const navigate = useNavigate()



  const handleProDetails = (item) => {
    navigate(`/productDetails/${item.uid}`);
    window.scrollTo(0, 0);
  }
  return (
<section className="py-3 lg:py-10">
  <div className="container px-3 lg:px-0 mx-auto">
    <div className="flex flex-wrap -mx-2">
      {info
        .filter(item => item)
        .map((item, index) => (
          <div
            key={item.uid || index}
            onClick={() => handleProDetails(item)}
            className="w-1/2 sm:w-1/3 xl:w-1/4 2xl:w-1/5 4xl:w-1/6 sm:px-1 px-[2px] mb-6 cursor-pointer"
          >
            <div className="group relative w-full h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
              
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={item.imgurl}
                  alt={item.Prodectname || "Product Image"}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                {/* Badge (optional) */}
                {item?.tag && (
                  <span className="absolute top-3 left-3 bg-purple-600 text-white text-[11px] sm:text-xs font-medium px-2 py-1 rounded-md shadow">
                    {item.tag}
                  </span>
                )}
              </div>

              {/* Overlay Quick View */}
              <div className="hidden lg:flex absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
                <button className="px-4 py-2 bg-white text-gray-800 text-sm font-semibold rounded-lg shadow hover:bg-gray-100">
                  Quick View
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-2">
                <h2 className="text-base sm:text-lg font-bold text-[#062919] text-center">
                  {Number(item.Price).toFixed(2) || "N/A"}৳
                </h2>
                <h3 className="text-sm sm:text-base font-medium text-gray-700 text-center line-clamp-2">
                  {item.Prodectname || "Unnamed Product"}
                </h3>
              </div>

            </div>
          </div>
        ))}
    </div>
  </div>
</section>



  );
};

export default AllProductsHome;
