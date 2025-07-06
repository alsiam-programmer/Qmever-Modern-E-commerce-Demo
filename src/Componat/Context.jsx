import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import { TbLoader2 } from "react-icons/tb";

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
      const newItems = data.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
      );

      // Update state with new data
      setInfo((prevInfo) => [...prevInfo, ...newItems]);
      setTotalItems(total);
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.location.pathname === "/" &&
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (info.length !== 0 && info.length < totalItems) {
      setLoadingMore(true);
    } else {
      setLoadingMore(false);
    }
  }, [info, totalItems]);

  
  return (
    <apiData.Provider value={info}>
      {children}
      {loading && info.length === 0 && window.location.pathname === "/" && (
        <div className="container px-[10px] mx-auto">
          <SkeletonTheme>
            <div className="flex flex-wrap">
              {Array(2)
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
      {loadingMore && (
        <div className="flex justify-center my-8">
          <TbLoader2 className="w-10 h-10 animate-spin text-[#fff]" />
        </div>
      )}
    </apiData.Provider>
  );
};

export { Context, apiData };
