import React from 'react'
import Navigation from '../Components/Navigation';
import Hero from '../Components/Hero';
import Joblisting from '../Components/Joblisting'
import Appdownload from '../Components/Appdownload';
const Home = () => {
  return (
    <div>
      <Navigation></Navigation>
      <Hero></Hero>
      <Joblisting></Joblisting>
      <Appdownload></Appdownload>
    </div>
  )
}

export default Home;