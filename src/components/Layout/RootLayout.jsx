import { Outlet } from 'react-router-dom'
import React from 'react'
import Header from './Header'
import Footer from './Footer'


const RootLayout = () => {
  return (
    <>
    <Header/>
    <main>
        <Outlet/>
    </main>
    <Footer/>
    </>
  
)
}

export default RootLayout