import React, { useEffect } from 'react'
import AllProductsHome from '../Componat/AllProductsHome'
import Banner from '../Componat/Banner'
import { Context } from '../Componat/Context';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
    <Banner/>
    <Context>
    <AllProductsHome/>
    </Context>
    </>
  )
}

export default Home