import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import './index.css'
import App from './App.jsx'
import CatalogoCarnes from './catalogue.jsx'
import ContactPage from './contactPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/landingpage" element={<App />} />
        <Route path="/catalogue" element={<CatalogoCarnes />} />
        <Route path="/contactPage" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
