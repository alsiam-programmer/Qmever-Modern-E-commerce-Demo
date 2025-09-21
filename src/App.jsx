import { lazy, Suspense } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./Componat/RootLayout";

const Home = lazy(() => import("./Page/Home"));
const EditProfile = lazy(() => import("./Page/EditProfile"));
const ProductDetails = lazy(() => import("./Page/ProductDetails"));
const CheckOut = lazy(() => import("./Page/CheckOut"));
const Cartpage = lazy(() => import("./Page/Cartpage"));
const Order = lazy(() => import("./Page/Order"));
const SearchItem = lazy(() => import("./Page/SearchItem"));
const My_account = lazy(() => import("./Page/My_account"));
const Watch_users_account = lazy(() => import("./Page/Watch_users_account"));
const NotFound = lazy(() => import("./Page/NotFound"));
const Contact = lazy(() => import("./Page/Contact"));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/my-account/user-edit_profile" element={<EditProfile />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/CheckOut" element={<CheckOut />} />
        <Route path="/CartPage" element={<Cartpage />} />
        <Route path="/Orders" element={<Order />} />
        <Route path="/search" element={<SearchItem />} />
        <Route path="/my-account" element={<My_account />} />
        <Route path="/watch/:id" element={<Watch_users_account />} />
        <Route path="/about-qc" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <div className="lg:w-[75%] container mx-auto">
<Suspense 
  fallback={
    <div className=" h-[120px] lg:h-[170px] xl:h-[180px]">

    
      <div className='z-[990] px-[10px]  h-[60px] lg:h-[70px] xl:h-[80px] bg-[#062919] fixed top-0 left-[50%] translate-x-[-50%] w-[100%]'></div>
    </div>
  }
>
  <RouterProvider router={router} />
</Suspense>


    </div>
  );
}

export default App;
