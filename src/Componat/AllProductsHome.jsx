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
<section className="py-10">
  <div className="container bg-gray-50 mx-auto py-4">
    <div className="flex flex-wrap">
      {info
        .filter(item => item && Number.isInteger(item.ProdectId) && item.ProdectId > 0)
        .map((item, index) => (
          <div
            key={item.ProdectId || index}
            onClick={() => handleProDetails(item)}
            className=" flex w-1/2 sm:w-1/3 lg:w-1/5 px-1 mb-6"
          >
            <div className="group relative bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300">

              {/* Product Image */}
              <div className="overflow-hidden rounded-t-2xl">
                <img
                  src={item.imgurl}
                  alt={item.Prodectname || "Product Image"}
                  className="w-full h-52 sm:h-64 xl:h-72 object-cover lg:group-hover:scale-105 transform transition-transform duration-300"
                />
              </div>

              {/* Overlay on Hover (only lg and above) */}
              <div className="hidden lg:flex absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
                <button className="px-4 py-2 bg-white text-[#062919] font-semibold rounded-lg shadow hover:bg-gray-100">
                  Quick View
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h2 className="text-sm sm:text-base font-bold text-purple-600">
                  {Number(item.Price).toFixed(2) || "N/A"}৳
                </h2>
                <h3 className="text-[13px] sm:text-sm xl:text-base font-medium text-gray-800 mt-1 line-clamp-2">
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
