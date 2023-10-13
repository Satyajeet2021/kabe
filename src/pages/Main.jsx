
import React from 'react'
import Navbar from '../components/Navbar'
import Search from '../components/Search'
import Footer from '../components/Footer'

const Main = () => {
  return (
    <div className='light dog-background'>
        <Navbar />
        <Search />
        {/* <Footer /> */}
    </div>
  )
}

export default Main