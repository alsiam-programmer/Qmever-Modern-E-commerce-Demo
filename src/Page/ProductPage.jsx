import React, { useContext, useEffect, useState } from "react";
import { apiData } from "../Componat/Context";
import { useLocation, useNavigate } from "react-router-dom";
import { TbLoader2 } from "react-icons/tb";
import { Helmet } from "react-helmet";

const ProductPage = () => {
  const navigate = useNavigate();
  const info = useContext(apiData) || []; // Fallback to an empty array if `info` is null/undefined.

  let location = useLocation();
  // State for selected categories
  const [selectedMainCategory, setSelectedMainCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [selectedSubsCategory, setSelectedSubsCategory] = useState("All");

  // Extract unique categories
  const query = new URLSearchParams(location.search).get("category");

  console.log(info);
  
  const categoriesMain = ["All", ...new Set(info.map((item) => item?.category?.main || "Uncategorized"))];
  const categoriesSub = ["All", ...new Set(info.map((item) => item?.category?.sub || "Uncategorized"))];
  const categoriesSubs = ["All", ...new Set(info.map((item) => item?.category?.subs || "Uncategorized"))];

  // Filter products based on selected categories
  const filteredProducts = info.filter((item) => {
    const matchesMain = query === "All" || item?.category?.main === query;

    const matchesSub = selectedSubCategory === "All" || item?.category?.sub === selectedSubCategory;
    const matchesSubs = selectedSubsCategory === "All" || item?.category?.subs === selectedSubsCategory;
    return matchesMain && matchesSub && matchesSubs;
  });

  useEffect(() => {
    if (query !== null) {
      setSelectedMainCategory(query);
      navigate(`?category=${encodeURIComponent(query)}`);
    } else {
      navigate(`?category=${encodeURIComponent("All")}`);
    }
  }, [selectedMainCategory, query]);

  const handleProDetails = (item) => {
    navigate(`/productDetails/${item.uid}`);
    window.scrollTo(0, 0);
  };

  let MainCategory = (e) => {
    navigate(`?category=${encodeURIComponent(e.target.value)}`);
  };

  return (
 <section>
    <Helmet>
      <title>{`${query || "Explore Products"} buy the best quality with - Qmever.com "happy shopping"`}</title>
      <meta
        name="description"
        content={`Discover ${query || "our products"} at Qmever - Best quality and exceptional service tailored for your needs.`}
      />
      <meta
        property="og:title"
        content={`Explore ${query || "Our Products"} - Qmever`}
      />
      <meta
        property="og:description"
        content={`Shop the best products at Qmever. Browse ${query || "our diverse collection"} and enjoy high-quality service.`}
      />
      <meta
        property="og:url"
        content={`https://qmever.com/ProductPage?category=${query}`}
      />
      <meta
        property="og:image"
        content="https://qmever.com/images/your-default-image.jpg"
      />
    </Helmet>

    <div className="container flex-wrap flex gap-4 py-6 md:py-10 mx-auto px-3 lg:px-0">
      {/* Sidebar for Categories */}
      <aside className="w-[100%] bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-4">
        <select
          value={selectedMainCategory}
          onChange={MainCategory}
          className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        >
          {categoriesMain.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={selectedSubCategory}
          onChange={(e) => setSelectedSubCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        >
          {categoriesSub.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={selectedSubsCategory}
          onChange={(e) => setSelectedSubsCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        >
          {categoriesSubs.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </aside>

      {/* Product Grid */}
      <div className="w-[100%]">
        {filteredProducts.length > 0 ? (
          <div className="flex flex-wrap -mx-2">
            {filteredProducts
              .filter(item => item)
              .map((item, index) => (
                <div
              key={item.uid || index}
              onClick={() => handleProDetails(item)}
              className="w-1/2 sm:w-1/3 xl:w-1/4 2xl:w-1/5 4xl:w-1/6 lg:px-1 px-[2px] mb-6 cursor-pointer"
            >
              <div className="group relative w-full h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={item.imgurl}
                    alt={item.Prodectname || "Product Image"}
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Optional badge */}
                  {item?.tag && (
                    <span className="absolute top-3 left-3 bg-purple-600 text-white text-[11px] sm:text-xs font-medium px-2 py-1 rounded-md shadow">
                      {item.tag}
                    </span>
                  )}
                </div>

                {/* Hover Overlay */}
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
        ) : (
          <div className="flex justify-center my-8">
            <TbLoader2 className="w-10 h-10 animate-spin text-purple-600" />
          </div>
        )}
      </div>
    </div>
  </section>
  );
};

export default ProductPage;
