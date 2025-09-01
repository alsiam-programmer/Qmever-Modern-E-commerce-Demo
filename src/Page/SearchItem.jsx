import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TbLoader2 } from "react-icons/tb";
import { Helmet } from 'react-helmet';
import { IoSearchOutline } from "react-icons/io5";

const SearchItem = () => {
  // Hooks to handle location, navigation, and state
  const location = useLocation();
  const navigate = useNavigate();

  // States
  const [getDataSearch, setGetDataSearch] = useState([]);
  const [failedSearch, setFailedSearch] = useState(false);

  // Extract query parameter from the URL
  const query = new URLSearchParams(location.search).get('query');

  

  

  // Fetch and filter product data
  const fetchData = () => {
    setGetDataSearch([]); // Clear previous results
    setFailedSearch(false); // Reset failed search state
    axios
      .get("https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/products.json")
      .then((res) => {


        const filteredData = Object.values(res.data || {}).filter((item) =>
          item?.Prodectname?.toLowerCase().includes(query.toLowerCase())
        );

        setGetDataSearch(filteredData);
        if (filteredData.length === 0) {
          setFailedSearch(true);
        }
      })
      .catch((err) => {
        setFailedSearch(true);
      });
  };

  // Fetch data when `query` changes
  useEffect(() => {
    fetchData();
  }, [query]);

  // Navigate to product details page
  const handleProDetails = (item) => {
    window.scrollTo(0, 0); // Scroll to the top
    navigate(`/productDetails/${item.uid}`);
  };
  return (
<section>
  <Helmet>
    <title>Qmever.com - {query}</title>
    <meta
      name="description"
      content={`Buy ${query} online at the best price. Free shipping and amazing discounts. Get it now!`}
    />
    <meta
      property="og:url"
      content={`https://qmever.com/search_query?query=${query}`}
    />
  </Helmet>

  <div className="container mx-auto px-3 sm:px-6 lg:px-10">
    {/* Product List */}
    <div className="flex flex-wrap -mx-2">
      {getDataSearch.length > 0 ? (
        getDataSearch
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
          ))
      ) : failedSearch !== true ? (
        <div className="flex w-full justify-center my-8">
          <TbLoader2 className="w-10 h-10 animate-spin text-pink-500" />
        </div>
      ) : null}
    </div>

    {/* No Products Found */}
{failedSearch && (
  <div className="flex flex-col items-center justify-center py-16 px-4 animate-fadeIn">
    <div className="flex items-center justify-center w-32 h-32 mb-6">
      <IoSearchOutline className="text-8xl text-blue-500 animate-bounce" />
    </div>
    <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-2 text-center">
      No Products Found
    </h1>
    <p className="text-gray-500 text-center text-lg max-w-md">
      We couldn't find any results for{" "}
      <span className="text-blue-500 underline font-semibold">{query}</span>. <br />
      Try searching with a different keyword or check your spelling.
    </p>
  </div>
)}

  </div>
</section>

  );
};

export default SearchItem;
