import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

const SIMILAR_PRODUCTS = ({ SIMILAR_PRODUCTSX, id }) => {
  const navigate = useNavigate();

  // State
  const [similarItems, setSimilarItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const itemsPerPage = 10;

  /** 🔹 Fetch Products */
  const getData = useCallback(async () => {
    if (!SIMILAR_PRODUCTSX) return;

    try {
      setLoading(true);

      const res = await axios.get(
        "https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
      );

      const allItems = Object.values(res.data || {});
      const filtered = allItems.filter(
        (item) => item.uid !== id && item.category?.subs.toLowerCase() === SIMILAR_PRODUCTSX.toLowerCase()
      );

      setTotalItems(filtered.length);

      const newItems = filtered.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
      );

      setSimilarItems((prev) => [...prev, ...newItems]);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [page, id, SIMILAR_PRODUCTSX]);

  /** 🔹 Reset when category/id changes */
  useEffect(() => {
    setSimilarItems([]);
    setPage(1);
  }, [id, SIMILAR_PRODUCTSX]);

  /** 🔹 Fetch data on change */
  useEffect(() => {
    getData();
  }, [getData]);

  /** 🔹 Infinite Scroll */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking || loading) return;
      ticking = true;

      requestAnimationFrame(() => {
        const reachedBottom =
          window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 150;

        if (reachedBottom && page * itemsPerPage < totalItems) {
          setPage((prev) => prev + 1);
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, totalItems, loading]);

  /** 🔹 Navigate to product details */
  const handleProDetails = (item) => {
    navigate(`/productDetails/${item.uid}`);
    window.scrollTo(0, 0);
  };

  return (
<section className="py-6 lg:py-12">
  <div className="container mx-auto px-2 sm:px-4">
    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
      Similar Products
    </h2>

    {/* Empty State */}
    {!loading && similarItems.length === 0 && (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">No similar products found.</p>
      </div>
    )}

    {/* Products Flex Layout */}
    <div className="flex flex-wrap -mx-[2px] sm:-mx-1">
      {similarItems.map((item) => (
        <div
          key={item.uid}
          onClick={() => handleProDetails(item)}
          className="w-1/2 sm:w-1/3 xl:w-1/4 2xl:w-1/5 4xl:w-1/6 sm:px-1 px-[2px] mb-6 cursor-pointer"
        >
          <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={item.imgurl}
                alt={item.Prodectname || "Product"}
                className="w-full h-48 sm:h-56 lg:h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              {item?.tag && (
                <span className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
                  {item.tag}
                </span>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="px-4 py-2 bg-white text-gray-800 text-sm font-semibold rounded-lg shadow hover:bg-gray-100">
                  Quick View
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 space-y-2 text-center">
              <h2 className="text-lg font-bold text-[#062919]">
                {item.Price ? `${Number(item.Price).toFixed(2)}৳` : "N/A"}
              </h2>
              <h3 className="text-sm sm:text-base font-medium text-gray-700 line-clamp-2">
                {item.Prodectname || "Unnamed Product"}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Skeleton Loader */}
    {loading && (
      <div className="mt-8">
        <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
          <div className="flex flex-wrap -mx-[2px] sm:-mx-1">
            {Array(itemsPerPage)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="w-1/2 sm:w-1/3 xl:w-1/4 2xl:w-1/5 4xl:w-1/6 sm:px-1 px-[2px] mb-6"
                >
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <Skeleton className="w-full h-48 sm:h-56 lg:h-64 rounded-t-2xl" />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-4 w-1/2 mx-auto rounded" />
                      <Skeleton className="h-6 w-3/4 mx-auto rounded" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </SkeletonTheme>
      </div>
    )}
  </div>
</section>

  );
};

export default SIMILAR_PRODUCTS;
