import React, { useEffect } from 'react'
import AllProductsHome from '../Componat/AllProductsHome'
import Banner from '../Componat/Banner'
import WorkInProgressNotification from '../Componat/WorkInProgressNotification';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
    <WorkInProgressNotification/>
    <Banner/>
    <AllProductsHome/>
    </>
  )
}

export default Home