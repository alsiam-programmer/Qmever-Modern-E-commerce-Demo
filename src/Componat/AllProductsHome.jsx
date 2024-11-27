import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiData } from "./Context";

const AllProductsHome = () => {
  let info = useContext(apiData)
  console.log(info);
  


  const navigate = useNavigate()

  

  const handleProDetails = (item) => {
    navigate(`/productDetails/${item.ProdectId}`);
    window.scrollTo(0, 0);
  }
  return (
    <section className="py-10 px-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap ">
          {info.map((item, index) => (
            item !== null
              ?
              <div
                key={item.ProdectId || index}
                onClick={() => handleProDetails(item)}
                className="group w-[50%] md:w-[33.333333%] lg:w-[20%] p-[4px]  md:p-4 rounded-lg cursor-pointer"
              >
                <div className="w-full overflow-hidden rounded-lg">
                  <img
                    className="w-full md:h-[240px] object-cover group-hover:scale-110 transition-transform duration-300"
                    src={item.imgurl}
                    alt={item.Prodectname || "Product Image"}
                  />
                </div>
                <h2 className="text-lg font-semibold text-purple-700 mt-2">
                  Price: {item.Price || "N/A"}
                </h2>
                <h3 className="text-md font-medium text-gray-800">
                  {item.Prodectname || "Unnamed Product"}
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
