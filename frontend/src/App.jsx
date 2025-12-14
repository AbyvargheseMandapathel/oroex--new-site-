import { useState, useEffect } from 'react'
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
import FAQBackend from './components/FaqPage/FAQBackend'
import AboutPageBackend from './components/AboutPage/AboutPageBackend'
import DownloadsPageBackend from './components/DownloadsPage/DownloadsPageBackend'
import ContactPage from './components/ContactPage/ContactPage'
import CareersPageBackend from './components/CareersPage/CareersPageBackend'
import CareerDetailsBackend from './components/CareersPage/CareerDetailsBackend'
import NotFound from './components/NotFound/NotFound'

const RedirectToAdmin = () => {
  useEffect(() => {
    window.location.href = 'http://localhost:8001/admin';
  }, []);
  return null;
};

function App() {
  return (
    <>
      <NavbarBackend />
      <Routes>
        <Route path="/admin/*" element={<RedirectToAdmin />} />
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesBackend />} />
        <Route path="/services/:slug" element={<ServicesDetailsTwoBackend />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailsBackEnd />} />
        <Route path="/products" element={<ProductCategoriesBackend />} />
        <Route path="/products/:category_slug" element={<ProductSubcategoriesBackend />} />
        <Route path="/products/:category_slug/:subcategory_slug" element={<ProductsListBackend />} />
        <Route path="/products/:category_slug/:subcategory_slug/:slug" element={<ProductDetailsBackend />} />
        <Route path="/faqs" element={<FAQBackend />} />
        <Route path="/about" element={<AboutPageBackend />} />
        <Route path="/downloads" element={<DownloadsPageBackend />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<CareersPageBackend />} />
        <Route path="/careers/:slug" element={<CareerDetailsBackend />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
