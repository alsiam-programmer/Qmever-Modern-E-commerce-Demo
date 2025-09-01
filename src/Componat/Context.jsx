import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const apiData = createContext();

const Context = ({ children }) => {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);        // initial load
  const [loadingMore, setLoadingMore] = useState(false); // infinite scroll
  const [totalItems, setTotalItems] = useState(-1);
  const [page, setPage] = useState(1);

  const itemsPerPage = 20;

  const getData = async () => {
    // Prevent fetching beyond total items

    if (totalItems === info.length) return
    setLoading(true);


    try {
      const res = await axios.get(
        "https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
      );

    const data = Object.entries(res?.data || {}).map(([key, item]) => ({
  uid: key, // Firebase key
  Prodectname: item?.Prodectname,
  imgurl: item?.imgurl,
  ProdectId: item?.ProdectId,
  Price: item?.Price,
  category: {
    main: item?.category?.main,
    sub: item?.category?.sub,
    subs: item?.category?.subs,
  },
}));


      setTotalItems(data.length);

      const newItems = data.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
      );

      await setInfo((prev) => [...prev, ...newItems]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when page changes
  useEffect(() => {
    getData();
  }, [page]);

  // Infinite scroll handler
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      setTimeout(() => {
        if (
          (window.location.pathname === "/" ||
            window.location.pathname === "/ProductPage") &&
          window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
          setPage((prev) => prev + 1);
        }
        ticking = false;
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <apiData.Provider value={info}>
  {children}
  
  {loading && (
    <div className="lg:w-[75%] container mx-auto px-4 lg:px-0">
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 4xl:grid-cols-6 gap-4">
          {Array(10).fill(0).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-pulse"
            >
              {/* Image Skeleton */}
              <Skeleton className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-t-2xl" />

              {/* Text Skeletons */}
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-1/2 mx-auto rounded" />
                <Skeleton className="h-6 w-3/4 mx-auto rounded" />
              </div>
            </div>
          ))}
        </div>
      </SkeletonTheme>
    </div>
  )}
</apiData.Provider>

  );
};

export { Context, apiData };
