import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import _, { set } from "lodash"; // Lodash for debounce
import { TbLoader2 } from "react-icons/tb";

const apiData = createContext();

const Context = ({children}) => {
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);
    let [ main_category_selet , setmain_category_selet ] = useState(false)
    let [ main_category_selet_index , setmain_category_selet_index ] = useState('')
    let [ subValue , setSubValue ] = useState('')
    let [caT_Main , setcaT_Main ] = useState([])

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
                setcaT_Main([...new set(res.data.map((item) => item.category.main))])
                setTotalItems(total);
                setLoading(false);
                setLoadingMore(false);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setLoading(false);
            });
    };

    let handleSeletCate = (item) =>{
      setmain_category_selet(true)
      try {
        axios.get("https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/products.json")
          .then((res) => {
            // Ensure `res.data` is an array
            if ((res.data)) {
              setSubValue([...new set(res.data.filter((itemx) =>
                itemx.category.main === item?.category?.main).flatMap(item => item?.category?.sub))])
    
            } else {
              console.log("Data is not an array:", res.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      } catch (error) {
        console.error("Unexpected error:", error);
      }
      
    }

    useEffect(() => {
        getData();
        if (info !== "") {
          if (info === totalItems) {
            setLoadingMore(true);
            
          }else{
            setLoadingMore(false);
          }
        } else{
          setLoadingMore(false);
        }
    },[page]);
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 50
            ) {
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
      console.log(subValue);
      
    return (
        <apiData.Provider value={info}>
          <div className="box bg-[#f1efef] mb-[30px] rounded flex items-center container  mx-auto justify-around h-[40px]">
          {info.map((item)=>(
              <h5 onClick={()=>handleSeletCate(item)} className="text-[18px] text-[red] px-[20px] h-[25px] bg-[#fff] rounded flex items-center font-[700]">{item?.category?.main}</h5>
          ))}
          {subValue !== ""
          ?
          <div className="box bg-[#f1efef] rounded flex items-center container  mx-auto justify-around h-[40px]">
            {subValue.map((item)=>(
          <h5 className="text-[18px] text-[red] px-[20px] h-[25px] bg-[#fff] rounded flex items-center font-[700]">{item}</h5>
            ))}
          </div>
          :""
          }
            </div>
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
