import React, { useEffect } from 'react'
import AllProductsHome from '../Componat/AllProductsHome'
import Banner from '../Componat/Banner'
import WorkInProgressNotification from '../Componat/WorkInProgressNotification';
import InstallPWAButton from '../Componat/InstallPWAButton'

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
    <WorkInProgressNotification/>
    <Banner/>
    <InstallPWAButton/>
    <AllProductsHome/>
    </>
  )
}




export default Home