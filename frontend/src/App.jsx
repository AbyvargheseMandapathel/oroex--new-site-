import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavbarOne from './components/NavbarOne/NavbarOne'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import ServicesPage from './components/ServicesPage/ServicesPage'
import ServiceDetails from './components/ServiceDetails/ServiceDetails'
import ProjectsPage from './components/ProjectsPage/ProjectsPage'
import ProjectDetails from './components/ProjectDetails/ProjectDetails'
import ProductCategories from './components/ProductCategories/ProductCategories'
import ProductSubcategories from './components/ProductSubcategories/ProductSubcategories'
import ProductsList from './components/ProductsList/ProductsList'
import ProductDetails from './components/ProductDetails/ProductDetails'
import FaqPage from './components/FaqPage/FaqPage'
import AboutPage from './components/AboutPage/AboutPage'
import DownloadsPage from './components/DownloadsPage/DownloadsPage'
import ContactPage from './components/ContactPage/ContactPage'
import CareersPage from './components/CareersPage/CareersPage'

function App() {
  return (
    <>
      <NavbarOne />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/products" element={<ProductCategories />} />
        <Route path="/products/:category" element={<ProductSubcategories />} />
        <Route path="/products/:category/:subcategory" element={<ProductsList />} />
        <Route path="/products/:category/:subcategory/:id" element={<ProductDetails />} />
        <Route path="/faqs" element={<FaqPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/downloads" element={<DownloadsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<CareersPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
