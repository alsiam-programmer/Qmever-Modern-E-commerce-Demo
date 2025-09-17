import React, { useEffect } from 'react'
import AllProductsHome from '../Componat/AllProductsHome'
import Banner from '../Componat/Banner'
import WorkInProgressNotification from '../Componat/WorkInProgressNotification';
import InstallPWAButton from '../Componat/InstallPWAButton'
import { Context } from '../Componat/Context';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
    <Context>
    <WorkInProgressNotification/>
    <Banner/>
    <InstallPWAButton/>
    <AllProductsHome/>
    </Context>
    </>
  )
}




export default Home