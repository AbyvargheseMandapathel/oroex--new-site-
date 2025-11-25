import { useState } from 'react'
import './App.css'
import NavbarOne from './components/NavbarOne/NavbarOne'
import HeaderOne from './components/HeaderOne/HeaderOne'
import HeaderTwo from './components/HeaderTwo/HeaderTwo'
import HeaderThree from './components/HeaderThree/HeaderThree'
import ExploreServices from './components/ExploreServices/ExploreServices'
import exploreBg from './assets/mini.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Navbar /> */}
      <NavbarOne />
      {/* <HeaderOne /> */}
      {/* <HeaderTwo /> */}
      <HeaderThree />
      {/* <SectionHeading
        title="Our Services"
        subtitle="Comprehensive industrial electrical solutions tailored to your needs"
      /> */}
      {/* <ServicesCard /> */}
      <ExploreServices
        backgroundColor="#030303ff"
        backgroundImage={exploreBg}
      />
      {/* <div style={{ height: '200vh', background: '#111' }}>
        {/* Spacer to enable scrolling */}
      {/* <h2 style={{ color: 'white', textAlign: 'center', paddingTop: '50px' }}>Scroll down to see the effect</h2>
      </div> */}
    </>
  )
}

export default App
