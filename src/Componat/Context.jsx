import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import _, { set } from "lodash"; // Lodash for debounce
import { TbLoader2 } from "react-icons/tb";

const apiData = createContext();

const Context = ({ children }) => {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  let [main_category_selet, setmain_category_selet] = useState(false)
  let [subValue, setSubValue] = useState([])
  let [subsValue, setSubsValue] = useState([])
  let [caT_Main, setcaT_Main] = useState([])
  let [ SubsPRValue , setSubsPRValue ] = useState([])

  const itemsPerPage = 20;

  console.log(SubsPRValue);

  const getData = () => {
    axios
      .get(
        "https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
      )
      .then((res) => {
        setcaT_Main([...new Set(res.data.map((item) => item.category.main))])
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

  // let handleSeletCate = (item) => {
  //   setmain_category_selet(true)
  //   try {
  //     axios.get("https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/products.json")
  //       .then((res) => {
  //         // Ensure `res.data` is an array
  //         if ((res.data)) {
  //           setSubValue([...new Set(res.data.filter((itemx) =>
  //             itemx.category.main === item).flatMap(item => item).flatMap(item => item?.category?.sub))])
  //           setmain_category_selet(false)

  //         } else {
  //           console.log("Data is not an array:", res.data);
  //           setmain_category_selet(false)

  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //         setmain_category_selet(false)

  //       });
  //   } catch (error) {
  //     console.error("Unexpected error:", error);
  //     setmain_category_selet(false)

  //   }

  // }

  // let handleSeletSubCATE = (item) => {
  //   setmain_category_selet(true)
  //   try {
  //   axios.get("https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/products.json").then((res)=>{
  //     if (res.data) {
  //         setSubsValue([...new Set(res.data.filter((ssitem)=>ssitem.category.sub === item).flatMap(item => item?.category?.subs))])
  //         setmain_category_selet(false)
  //       } else{
  //         setmain_category_selet(false)
  //       }
  //     })
  //   } catch (error) {
  //     setmain_category_selet(false)
      
  //   }
  // }
  // let handleSeletSUBSCATE = (item) =>{
  //   setmain_category_selet(true)
  //   setSubsPRValue([])
  //   axios.get("https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/products.json").then((res)=>{
  //     if (res.data) {
  //       try {
  //         setSubsPRValue(res.data.filter((ssitem)=>ssitem.category.subs === item))
  //         setmain_category_selet(false)
  //         console.log("i am ok");
          
  
  //       } catch (error) {
  //         setmain_category_selet(false)
          
  //       }
  //     } else{
  //       setmain_category_selet(false)
  //     }
  //   })
  // }



  useEffect(() => {
    getData();
   
  }, [page]);
  useEffect(() => {
    
    const handleScroll = () => {
      if (
        window.location.pathname === "/" && window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(()=>{
    if (info !== "") {
      if (info.length !== totalItems) {
        setLoadingMore(true);
      } else {
        setLoadingMore(false);
      }
    } else {
      setLoadingMore(false);
    }
  })

  return (
    <apiData.Provider value={info}>
      {/* <div className="box bg-[#062919] mb-[30px] rounded container  mx-auto justify-around p-[10px] ">
        <div className="flex items-center w-[100%]">
          {caT_Main.map((item) => (
            <h5 onClick={() => handleSeletCate(item)} className="text-[18px] text-[red] px-[20px] h-[25px] bg-[#fff] rounded flex items-center font-[700]">{item}</h5>
          ))}
        </div>
        {subValue.length > 0
          ?
          <div className="box bg-[#fff] w-[100%] mt-[10px] rounded flex items-center gap-[10px] container  mx-auto px-[10px] h-[40px]">
            {subValue.map((item) => (
              <h5 onClick={()=>handleSeletSubCATE(item)} className="text-[18px] text-[red] px-[20px] h-[25px] bg-[#f1efef] rounded flex items-center font-[700]">{item}</h5>
            ))}
          </div>
          : ""
        }
        {subsValue.length > 0
          ?
          <div className="box bg-[#fff] w-[100%] mt-[10px] rounded flex items-center container gap-[10px] mx-auto px-[10px] h-[40px]">
            {subsValue.map((item) => (
              <h5 onClick={()=>handleSeletSUBSCATE(item)} className="text-[18px] text-[red] px-[20px] h-[25px] bg-[#f1efef] rounded flex items-center font-[700]">{item}</h5>
            ))}
          </div>
          : ""
        }
              <div className="container mx-auto">
        <div className="flex flex-wrap ">
          {SubsPRValue.map((item, index) => (
            item !== null
              ?
              <div
                key={item.ProdectId || index}
                onClick={() => handleProDetails(item)}
                className="group w-[50%] md:w-[33.333333%] lg:w-[20%] p-[10px] rounded-lg cursor-pointer"
              >
                <div className="w-full overflow-hidden rounded-lg">
                  <img
                    className="w-full md:h-[240px] object-cover group-hover:scale-110 transition-transform duration-300"
                    src={item.imgurl}
                    alt={item.Prodectname || "Product Image"}
                  />
                </div>
                <h2 className="text-lg font-semibold text-[#fff] mt-2">
                  Price: {Number(item.Price).toFixed(2) || "N/A"}
                </h2>
                <h3 className="text-md font-medium text-[#fff]">
                  {item.Prodectname || "Unnamed Product"}
                </h3>
              </div>
              : ""
          ))}
        </div>

      </div>
        {
          main_category_selet !== false 
          ?
          <h5 className='text-[#fff]'>Loading...</h5>
          :""
        }
      </div> */}
      {children}
      {
        loading && info.length === 0
        ?
        <div className="container mx-auto">
        <SkeletonTheme baseColor="#ffffff5d" highlightColor="#f9f9f9">
          <div className="flex flex-wrap">
            {Array(20)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className=" w-[50%] md:w-[33.333333%] lg:w-[20%] px-[4px]  md:px-4"
                >
                  <Skeleton className="h-48 mb-4" />
                  <Skeleton className="h-4 mb-2" />
                  <Skeleton className="h-6 mb-2" />
                </div>
              ))}
          </div>
        </SkeletonTheme>
      </div>
        :""
      }
      {loadingMore && (
        <div className="flex justify-center my-8">
          <TbLoader2 className="w-10 h-10 animate-spin text-[#fff]" />
        </div>
      )}
    </apiData.Provider>
  );
};

export { Context, apiData };
