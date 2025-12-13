import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavbarBackend from './components/NavbarOne/NavbarBackend'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import ServicesBackend from './components/ServicesPage/ServicesBackend'
import ServicesDetailsTwoBackend from './components/ServiceDetails/ServicesDetailsTwoBackend'
import ProjectsPage from './components/ProjectsPage/ProjectsPage'
import ProjectDetailsBackEnd from './components/ProjectDetails/ProjectDetailsBackEnd'
import ProductCategoriesBackend from './components/ProductCategories/ProductCategoriesBackend'
import ProductSubcategoriesBackend from './components/ProductSubcategories/ProductSubcategoriesBackend'
import ProductsListBackend from './components/ProductsList/ProductsListBackend'
import ProductDetailsBackend from './components/ProductDetails/ProductDetailsBackend'
import FaqPage from './components/FaqPage/FaqPage'
import AboutPage from './components/AboutPage/AboutPage'
import DownloadsPage from './components/DownloadsPage/DownloadsPage'
import ContactPage from './components/ContactPage/ContactPage'
import CareersPage from './components/CareersPage/CareersPage'

function App() {
  return (
    <>
      <NavbarBackend />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesBackend />} />
        <Route path="/services/:slug" element={<ServicesDetailsTwoBackend />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailsBackEnd />} />
        <Route path="/products" element={<ProductCategoriesBackend />} />
        <Route path="/products/:category_slug" element={<ProductSubcategoriesBackend />} />
        <Route path="/products/:category_slug/:subcategory_slug" element={<ProductsListBackend />} />
        <Route path="/products/:category_slug/:subcategory_slug/:slug" element={<ProductDetailsBackend />} />
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
