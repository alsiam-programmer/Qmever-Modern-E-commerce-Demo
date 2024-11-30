import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TbLoader2, TbMoodSad } from "react-icons/tb";

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
        const filteredData = res.data.filter((item) =>
          item?.Prodectname?.toLowerCase().includes(query.toLowerCase())
        );
        setGetDataSearch(filteredData);
        if (filteredData.length === 0) {
          setFailedSearch(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
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
    navigate(`/productDetails/${item.ProdectId}`);
  };

  return (
    <section>
      <div className="container mx-auto">
        {/* Product List */}
        <div className="ProPraBox my-[40px] cursor-pointer w-[100%] flex flex-wrap gap-[4px] sm:gap-[12px]">
          { getDataSearch.length > 0 ?  getDataSearch.map((item) => (
            <div
              key={item.ProdectId}
              onClick={() => handleProDetails(item)}
              className="ProBox w-[49%] sm:w-[32%] lg:w-[24%] bg-[#fff] py-[6px] px-[6px] rounded-[20px]"
            >
              <div className="proImgBox w-[100%] flex">
                <img
                  className="w-[100%] rounded-[20px]"
                  src={item.imgurl}
                  alt={item.Prodectname}
                />
              </div>
              <h2 className="text-[15px] font-[600] py-[3px] sm:text-[20px] lg:text-[25px] text-[#9a0ec5]">
                Price: <span>{item.Price}</span>
              </h2>
              <h2 className="text-[15px] font-[600] py-[3px] sm:text-[20px] lg:text-[25px]">
                {item.Prodectname}
              </h2>
            </div>
          )): failedSearch !== true ?
          <div className="flex w-[100%] justify-center my-8">
          <TbLoader2 className="w-10 h-10 animate-spin text-[#fff]" />
        </div>:""}
        </div>

        {/* Loading or Failed Search */}
        {failedSearch && (
           <div className="flex flex-col items-center justify-center">
           <div className="text-[#ffffffcb]">
             <TbMoodSad className="text-7xl md:text-9xl" />
           </div>
           <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
             No Products Found
           </h1>
           <p className="text-[#ffffffa6] text-center mt-2">
             We couldn't find any results for{' '}
             <span className="text-indigo-500 font-bold">{query}</span>. <br />
             Please try searching with a different keyword.
           </p>
         </div>
        )}
      </div>
    </section>
  );
};

export default SearchItem;
