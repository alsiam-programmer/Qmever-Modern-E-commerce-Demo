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
      <Helmet>
        <title>Qmever.com - {query}</title>
        <meta name="description" content={`Buy ${query} online at the best price. Free shipping and amazing discounts. Get it now!`} />
        <meta property="og:url" content={`https://qmever.com/search_query?query=${query}`} />
            </Helmet>
      <div className="container mx-auto">
        {/* Product List */}
        <div className="ProPraBox my-[40px] cursor-pointer w-[100%] flex flex-wrap gap-[4px] sm:gap-[12px]">
          { getDataSearch.length > 0 ?  getDataSearch.map((item) => (
            <div
            key={item.ProdectId}
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
            <h2 className="text-lg font-semibold text-[#cf0cbf] shadow-black mt-2">
              Price: {Number(item.Price).toFixed(2) || "N/A"}৳
            </h2>
            <h3 className="text-md font-medium italic text-customized">
              {item.Prodectname || "Unnamed Product"}
            </h3>
          </div>
          )): failedSearch !== true ?
          <div className="flex w-[100%] justify-center my-8">
          <TbLoader2 className="w-10 h-10 animate-spin text-pink-500" />
        </div>:""}
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
