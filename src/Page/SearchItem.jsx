import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TbLoader2, TbMoodSad } from "react-icons/tb";
import { Helmet } from 'react-helmet';

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
        <meta name="description" content={`Buy ${query} online at the best price. Free shipping and amazing discounts. Get it now!`} />
        <meta property="og:url" content={`https://qmever.com/search_query?query=${query}`} />
      </Helmet>
      <div className="container mx-auto">
        {/* Product List */}
        <div className="flex flex-wrap ">
          {getDataSearch.length > 0 ? (
            getDataSearch
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
        ))
          ) : failedSearch !== true ? (
            <div className="flex w-full justify-center my-8">
              <TbLoader2 className="w-10 h-10 animate-spin text-pink-500" />
            </div>
          ) : null}
        </div>



        {/* Loading or Failed Search */}
        {failedSearch && (
          <div className="flex flex-col items-center justify-center">
            <div className="text-[#ffffffcb]">
              <TbMoodSad className="text-7xl text-customized md:text-9xl" />
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
              No Products Found
            </h1>
            <p className="italic text-customized text-center mt-2">
              We couldn't find any results for{' '}
              <span className="text-red-500 font-bold">{query}</span>. <br />
              Please try searching with a different keyword.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchItem;
