import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
const apiData = createContext();

const Context = ({ children }) => {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);

  const itemsPerPage = 20;

  const getData = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        "https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
      );

      const data = Object.values(res?.data || {}).map((item)=>
        
        
        ({
          "Prodectname": item?.Prodectname,
          "imgurl": item?.imgurl,
          "ProdectId": item?.ProdectId,
          "Price": item?.Price,
          "category" : {
            "main": item?.category?.main,
            "sub": item?.category?.sub,
            "subs": item?.category?.subs,
          }
        }),
      )
      // console.log(data);
      
      const total = data.length;
      setTotalItems(total)
      const newItems = data.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
      );

      // Update state with new data
      await setInfo((prevInfo) => [...prevInfo, ...newItems]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  
  console.log(totalItems,info.length);
  

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {    
    const handleScroll = () => {
if (
  (window.location.pathname === "/" || window.location.pathname === "/ProductPage")
   &&
  (window.innerHeight + document.documentElement.scrollTop >=
    document.documentElement.offsetHeight - 100) 
  && 
  (totalItems >= info.length)
) {
  setPage((prevPage) => prevPage + 1);
}

    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [info.length, totalItems]);
  
  return (
    <apiData.Provider value={info}>
      {children}
      {loading && (
        <div className="container px-[10px] mx-auto">
          <SkeletonTheme>
            <div className="flex flex-wrap">
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="w-[50%] md:w-[33.333333%] lg:w-[20%] px-[4px] md:px-4"
                  >
                    <Skeleton className="h-48 mb-4" />
                    <Skeleton className="h-4 mb-2" />
                    <Skeleton className="h-6 mb-2" />
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
