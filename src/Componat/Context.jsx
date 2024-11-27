import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import _ from "lodash"; // Lodash for debounce
import { TbLoader2 } from "react-icons/tb";

const apiData = createContext();

const Context = ({children}) => {
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);
    const itemsPerPage = 12;

    const getData = () => {
        axios
            .get(
                "https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
            )
            .then((res) => {
                const data = Object.values(res.data); // Convert object to array
                const total = data.length;
                const newItems = data.slice(
                    (page - 1) * itemsPerPage,
                    page * itemsPerPage
                );
                setInfo((prevInfo) => [...prevInfo, ...newItems]);
                setTotalItems(total);
                setLoading(false);
                setLoadingMore(false);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        getData();
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 50
            ) {
                setLoadingMore(true);
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    if (loading && info.length === 0) {
        return (
          <div className="container mx-auto my-10">
            <SkeletonTheme baseColor="#f9f9f9" highlightColor="#fff">
              <div className="flex flex-wrap">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className=" bg-white w-[50%] md:w-[33.333333%] lg:w-[20%] p-[4px]  md:p-4"
                    >
                      <Skeleton className="h-48 mb-4" />
                      <Skeleton className="h-6 mb-2" />
                      <Skeleton className="h-6 mb-2" />
                    </div>
                  ))}
              </div>
            </SkeletonTheme>
          </div>
        );
      }
    return (
        <apiData.Provider value={info}>
            {children}
            {loadingMore && (
          <div className="flex justify-center my-8">
            <TbLoader2 className="w-10 h-10 animate-spin text-purple-700" />
          </div>
        )}
        </apiData.Provider>
    );
};

export { Context, apiData };
