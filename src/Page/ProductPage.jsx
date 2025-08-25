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
        <title>{`${query || "Explore Products"} buy the best quality with - Qmever.com "happy shopping" `}</title>
        <meta name="description" content={`Discover ${query || "our products"} at Qmever - Best quality and exceptional service tailored for your needs.`} />
        <meta property="og:title" content={`Explore ${query || "Our Products"} - Qmever`} />
        <meta property="og:description" content={`Shop the best products at Qmever. Browse ${query || "our diverse collection"} and enjoy high-quality service.`} />
        <meta property="og:url" content={`https://qmever.com/ProductPage?category=${query}`} />
        <meta property="og:image" content="https://qmever.com/images/your-default-image.jpg" />
      </Helmet>
      <div className="container sm:flex py-[5px] md:py-10 mx-auto">
        {/* Sidebar for Categories */}
        <div className="sm:w-[25%] p-4">
          {/* Main Category */}
          <div className="mb-4 w-[100%]">
            {/* <label className="block mb-2 text-sm font-medium text-white">Main Category</label> */}
            <select
              value={selectedMainCategory}
              onChange={MainCategory}
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
          <div className="mb-4 w-[100%]">
            {/* <label className="block mb-2 text-sm font-medium text-white">Sub Category</label> */}
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

          <div className="w-[100%]">
            {/* <label className="block mb-2 text-sm font-medium text-white">Subs Category</label> */}
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
        <div className="sm:w-[75%]">
          {filteredProducts.length > 0 ? (
            <div className="flex flex-wrap">
              {filteredProducts
               .filter(item => item)
        .map((item, index) => (
          <div
            key={item.uid || index}
            onClick={() => handleProDetails(item)}
            className=" flex w-1/2 sm:w-1/3 lg:w-1/4 2xl:w-1/5 4xl:w-1/6  px-1 mb-6"
          >
            <div className="group w-full relative bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300">

              {/* Product Image */}
              <div className="overflow-hidden w-full rounded-t-2xl">
                <img
                  src={item.imgurl}
                  alt={item.Prodectname || "Product Image"}
                  className="w-full object-cover lg:group-hover:scale-105 transform transition-transform duration-300"
                />
              </div>

              {/* Overlay on Hover (only lg and above) */}
              <div className="hidden lg:flex absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
                <button className="px-4 py-2 bg-white text-[#062919] font-semibold rounded-lg shadow hover:bg-gray-100">
                  Quick View
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h2 className="text-sm sm:text-base lg:bg-[#ff00001e] rounded-lg font-bold text-purple-600 flex justify-center items-center">
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
          ) : (
            <div className="flex justify-center my-8">
              <TbLoader2 className="w-10 h-10 animate-spin text-[#fff]" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
