import React, { useEffect } from 'react'
import AllProductsHome from '../Componat/AllProductsHome'
import Banner from '../Componat/Banner'
import { Helmet } from 'react-helmet';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
    <Helmet>
    <title>Qmever Home</title>
    </Helmet>
    <Banner/>
    <AllProductsHome/>
    </>
  )
}

export default Home