import React, { useContext, useState } from "react";
import { apiData } from "../Componat/Context";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();
  const info = useContext(apiData) || []; // Fallback to an empty array if `info` is null/undefined.

  // State for selected categories
  const [selectedMainCategory, setSelectedMainCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [selectedSubsCategory, setSelectedSubsCategory] = useState("All");

  // Extract unique categories
  const categoriesMain = ["All", ...new Set(info.map((item) => item?.category?.main || "Uncategorized"))];
  const categoriesSub = ["All", ...new Set(info.map((item) => item?.category?.sub || "Uncategorized"))];
  const categoriesSubs = ["All", ...new Set(info.map((item) => item?.category?.subs || "Uncategorized"))];

  // Filter products based on selected categories
  const filteredProducts = info.filter((item) => {
    const matchesMain = selectedMainCategory === "All" || item?.category?.main === selectedMainCategory 
    const matchesSub = selectedSubCategory === "All" || item?.category?.sub === selectedSubCategory;
    const matchesSubs = selectedSubsCategory === "All" || item?.category?.subs === selectedSubsCategory;
    return matchesMain && matchesSub && matchesSubs;
  });

  const handleProDetails = (item) => {
    navigate(`/productDetails/${item.ProdectId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container flex py-[5px] md:py-10 mx-auto">
      {/* Sidebar for Categories */}
      <div className="w-[25%] p-4">
        {/* Main Category */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white">Main Category</label>
          <select
            value={selectedMainCategory}
            onChange={(e) => setSelectedMainCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-black"
          >
            {categoriesMain.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sub Category */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white">Sub Category</label>
          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-black"
          >
            {categoriesSub.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Subs Category */}
        <div>
          <label className="block mb-2 text-sm font-medium text-white">Subs Category</label>
          <select
            value={selectedSubsCategory}
            onChange={(e) => setSelectedSubsCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-black"
          >
            {categoriesSubs.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="w-[75%]">
        <div className="flex flex-wrap">
          {filteredProducts.map((item, index) => (
            item !== null && (
              <div
                key={item.ProdectId || index}
                onClick={() => handleProDetails(item)}
                className="group w-[50%] md:w-[33.333333%] lg:w-[20%] p-[10px] rounded-lg cursor-pointer"
              >
                {/* Product Image */}
                <div className="w-full overflow-hidden rounded-lg">
                  <img
                    className="w-full h-[190px] md:h-[240px] object-cover group-hover:scale-110 transition-transform duration-300"
                    src={item.imgurl}
                    alt={item.Prodectname || "Product Image"}
                  />
                </div>

                {/* Product Price */}
                <h2 className="text-lg font-semibold text-[#cf0cbf] shadow-black mt-2">
                  Price: {Number(item.Price).toFixed(2) || "N/A"}৳
                </h2>

                {/* Product Name */}
                <h3 className="text-md font-medium text-[#fff]">
                  {item.Prodectname || "Unnamed Product"}
                </h3>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
