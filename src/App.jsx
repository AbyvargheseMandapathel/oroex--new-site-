import { useState } from 'react'
import './App.css'
import NavbarOne from './components/NavbarOne/NavbarOne'
import HeaderOne from './components/HeaderOne/HeaderOne'
import HeaderTwo from './components/HeaderTwo/HeaderTwo'
import HeaderThree from './components/HeaderThree/HeaderThree'
import ExploreServices from './components/ExploreServices/ExploreServices'
import ServicesThree from './components/ServicesThree/ServicesThree'
import ServicesFour from './components/ServicesFour/ServicesFour'
import ServicesFive from './components/ServicesFive/ServicesFive'
import ServicesSix from './components/ServicesSix/ServicesSix'
import ServicesSeven from './components/ServicesSeven/ServicesSeven'
import ServicesEight from './components/ServicesEight/ServicesEight'
import ServicesNine from './components/ServicesNine/ServicesNine'
import ProductsOne from './components/ProductsOne/ProductsOne'
import ProductsTwo from './components/ProductsTwo/ProductsTwo'
import ProductsThree from './components/ProductsThree/ProductsThree'
import ProductsFour from './components/ProductsFour/ProductsFour'
import ProductsFive from './components/ProductsFive/ProductsFive'
import ProductsSix from './components/ProductsSix/ProductsSix'
import ProductsSeven from './components/ProductsSeven/ProductsSeven'
import ProductsEight from './components/ProductsEight/ProductsEight'
import ProductsNine from './components/ProductsNine/ProductsNine'
import ProductsTen from './components/ProductsTen/ProductsTen'
import ProductsEleven from './components/ProductsEleven/ProductsEleven'
import ProductsTwelve from './components/ProductsTwelve/ProductsTwelve'
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
      {/* <ExploreServices
        backgroundColor="#030303ff"
        backgroundImage={exploreBg}
      /> */}
      {/* <ServicesThree
        backgroundColor="#000000ff"
        accentColor="#e63946"
        textColor="#ffffffff"
        subTextColor="#ffffffff"
        cardBgColor="#000000ff"
      /> */}
      {/* <ServicesFour /> */}
      {/* <ServicesFive /> */}
      {/* <ServicesSix /> */}
      <ServicesSeven />
      {/* <ServicesEight /> */}
      {/* <ServicesNine /> */}
      {/* <ServicesNine /> */}
      {/* <ProductsOne /> */}
      {/* <ProductsTwo /> */}
      {/* <ProductsThree /> */}
      {/* <ProductsFour /> */}
      {/* <ProductsFive /> */}
      {/* <ProductsSix /> */}
      {/* <ProductsSeven /> */}
      {/* <ProductsEight /> */}
      {/* <ProductsNine /> */}
      {/* <ProductsTen /> */}
      {/* <ProductsEleven /> */}
      <ProductsTwelve />
      {/* <div style={{ height: '200vh', background: '#111' }}>
        {/* Spacer to enable scrolling */}
      {/* <h2 style={{ color: 'white', textAlign: 'center', paddingTop: '50px' }}>Scroll down to see the effect</h2>
      </div> */}
    </>
  )
}

export default App
