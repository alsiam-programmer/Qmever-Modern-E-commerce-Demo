import { createBrowserRouter , createRoutesFromElements , Route , RouterProvider } from "react-router-dom"
import RootLayout from "./Componat/RootLayout"
import Home from "./Page/Home"
import Login from "./Page/Login"
import ProductDetails from "./Page/ProductDetails"
import CheckOut from "./Page/CheckOut"
import Cartpage from "./Page/Cartpage"
import Order from "./Page/Order"
import SearchItem from "./Page/SearchItem"
import UserProfile from "./Page/UserProfile"
import ProductPage from "./Page/ProductPage"

function App() {

  let router = createBrowserRouter(createRoutesFromElements(
    <Route element={<RootLayout/>}>
      <Route path="/" element={<Home/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/productDetails/:id" element={<ProductDetails/>} />
      <Route path="/CheckOut" element={<CheckOut/>} />
      <Route path="/CartPage" element={<Cartpage/>} />
      <Route path="/Orders" element={<Order/>} />
      <Route path="/search_query" element={<SearchItem />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/ProductPage" element={<ProductPage />} />
    </Route>
  ), {
    future: {
      v7_normalizeFormMethod: true,
      v7_skipActionErrorRevalidation: true,
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_partialHydration: true,
    },
  })

  return ( 
  <div className=" lg:w-[80%] mx-auto">
    <RouterProvider router={router} />
  </div>
  )
}

export default App
