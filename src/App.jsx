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
      </Routes>
      <Footer />
    </>
  )
}

export default App
