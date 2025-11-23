import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import HeaderOne from './components/HeaderOne/HeaderOne'
import SectionHeading from './components/SectionHeading/SectionHeading'
import ServicesCard from './components/ServicesCard/ServicesCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <HeaderOne />
      <SectionHeading
        title="Our Services"
        subtitle="Comprehensive industrial electrical solutions tailored to your needs"
      />
      <ServicesCard />
      <div style={{ height: '200vh', background: '#111' }}>
        {/* Spacer to enable scrolling */}
        <h2 style={{ color: 'white', textAlign: 'center', paddingTop: '50px' }}>Scroll down to see the effect</h2>
      </div>
    </>
  )
}

export default App
