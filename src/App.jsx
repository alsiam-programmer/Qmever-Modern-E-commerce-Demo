import { useEffect, useState, useRef } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./Componat/RootLayout";
import Home from "./Page/Home";
import Login from "./Page/Login";
import ProductDetails from "./Page/ProductDetails";
import CheckOut from "./Page/CheckOut";
import Cartpage from "./Page/Cartpage";
import Order from "./Page/Order";
import SearchItem from "./Page/SearchItem";
import UserProfile from "./Page/UserProfile";
import ProductPage from "./Page/ProductPage";
import NotFound from "./Page/NotFound";
import "./door.css";

function App() {
  const [showDoor, setShowDoor] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/CheckOut" element={<CheckOut />} />
        <Route path="/CartPage" element={<Cartpage />} />
        <Route path="/Orders" element={<Order />} />
        <Route path="/search" element={<SearchItem />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/ProductPage" element={<ProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  useEffect(() => {
    if (window.location.pathname !== "/") return;

    const today = new Date().toISOString().slice(0, 10);
    const storedDates = JSON.parse(localStorage.getItem("doorSplashDate")) || [];

    // একদিনে একবার splash দেখানোর চেক
    if (!storedDates.includes(today)) {
      setShowDoor(true);
      document.body.style.overflow = "hidden";

      const openTimer = setTimeout(() => {
        leftDoorRef.current.classList.add("open-left");
        rightDoorRef.current.classList.add("open-right");
      }, 500);

      const fadeTimer = setTimeout(() => setFadeOut(true), 2000);

      const removeTimer = setTimeout(() => {
        setShowDoor(false);
        document.body.style.overflow = "auto";

        // আজকের তারিখ save করুন localStorage এ
        storedDates.push(today);
        localStorage.setItem("doorSplashDate", JSON.stringify(storedDates));
      }, 3000);

      return () => {
        clearTimeout(openTimer);
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, []);

  return (
    <div>
      {/* Always render router */}
      <RouterProvider router={router} />

      {/* Door overlay */}
      {showDoor && (
        <div className={`door-container ${fadeOut ? "fade-out" : ""}`}>
          <div ref={leftDoorRef} className="door left-door">
            <div className="door-handle" onClick={() => setShowDoor(false)}></div>
          </div>
          <div ref={rightDoorRef} className="door right-door">
            <div className="door-handle" onClick={() => setShowDoor(false)}></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
