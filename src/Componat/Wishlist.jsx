import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Wishlist = ({ info }) => {
    const db = getDatabase();
    const userUid = useSelector((state) => state.counter.user);

    // Force array form
    const dataArray = Array.isArray(info) ? info : [info];

    const [wishlist, setWishlist] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load wishlist in real-time
    useEffect(() => {
        if (!userUid) return;
        const wishlistRef = ref(db, `/users/${userUid}/Wishlist`);

        const unsubscribe = onValue(
            wishlistRef,
            (snapshot) => {
                setWishlist(snapshot.exists() ? snapshot.val() : {});
                setLoading(false);
            },
            (err) => {
                console.error("Error loading wishlist:", err);
                setError(err.message);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [db, userUid]);

    // Toggle wishlist item
    const toggleWishlist = useCallback(
        async (item) => {
            if (!userUid) {
                alert("You must be logged in to use wishlist!");
                return;
            }

            const itemRef = ref(db, `/users/${userUid}/Wishlist/${item.uid}`);
            try {
                if (wishlist[item.uid]) {
                    await remove(itemRef); // remove if exists
                } else {
                    await update(ref(db, `/users/${userUid}/Wishlist`), {
                        [item.uid]: {
                            uid: item.uid,
                            Prodectname: item.Prodectname,
                            imgurl: item.imgurl

                        },
                    }); // add if not exists
                }
            } catch (err) {
                console.error("Error updating wishlist:", err);
                setError("Failed to update wishlist.");
            }
        },
        [db, userUid, wishlist]
    );

    if (loading) {
        return <p className="text-center mt-4 text-gray-500"><AiFillHeart className="w-7 h-7" /></p>;
    }

    if (error) {
        return <p className="text-center mt-4 text-red-500">{error}</p>;
    }

    return (
        <div className="flex justify-center mt-6">
            {dataArray.map((item) => {
                const isWished = !!wishlist[item.uid];
                return (
                    <button
                        key={item.uid}
                        onClick={() => toggleWishlist(item)}
                        className={`flex items-center font-semibold  transition transform hover:scale-105 ${isWished ? "text-red-600" : "text-gray-500"
                            }`}
                    >
                        {isWished ? (
                            <AiFillHeart className="w-7 h-7" />
                        ) : (
                            <AiOutlineHeart className="w-7 h-7" />
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default Wishlist;
