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
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [ dateValue , setDateValue ] = useState('')

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

    if (!storedDates.includes(today)) {
      document.body.style.overflowX = "hidden";
      setDateValue(today)
      setShowDoor(true);

      // Doors open animation
      const openTimer = setTimeout(() => {
        leftDoorRef.current.classList.add("open-left");
        rightDoorRef.current.classList.add("open-right");
      }, 500);

      // Show welcome text
      const wel_text = setTimeout(() => setWelcomeVisible(true), 800);

      // Start fade-out after 3s
      const fadeTimer = setTimeout(() => setFadeOut(true), 4000);

      // Remove DOM after fade-out (2s)
      const removeTimer = setTimeout(() => {
        setShowDoor(false);
        document.body.style.overflow = "auto";

        storedDates.push(today);
        localStorage.setItem("doorSplashDate", JSON.stringify(storedDates));
      }, 5000);

      return () => {
        clearTimeout(openTimer);
        clearTimeout(wel_text);
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, []);

  return (
    <div>
      <div className="lg:w-[75%] container mx-auto">
        <RouterProvider router={router} />
      </div>

      {showDoor && (
        <div className={`door-container ${fadeOut ? "fade-out" : ""}`}>
{welcomeVisible && (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-50 pointer-events-none">
    <span className="welcome-text block text-5xl font-extrabold text-white mb-4">
      Welcome
    </span>
    <span className="date-text animate-fadeInGlow block">
      {dateValue}
    </span>
  </div>
)}



          <div ref={leftDoorRef} className="door left-door glow">
            <div className="door-handle" onClick={() => setShowDoor(false)}></div>
          </div>

          <div ref={rightDoorRef} className="door right-door glow">
            <div className="door-handle" onClick={() => setShowDoor(false)}></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
