import React, {  useMemo, useState, useEffect } from 'react';
import { supabase } from '../config/services/supabase';
import ProductGrid from '../components/Products/productGride.jsx';
import paraguayFlag from '../assets/img/backgrounds/paraguay-flag-png.png'
import SidebarFilters from '../components/catalogue/public/sideBarFilters.jsx';
import {
  SidebarProvider,
} from "@/components/ui/sidebar";
import  Pagination  from '../components/pagination.jsx';



 export default function PrivateCatalogue() {

  const [carnes, setCarnes] = useState([])
  const [loading, setLoading] = useState(true)
  const [corte, setCorte] = useState("all")

  // 📦 Cargar productos desde Supabase
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('productos')
          .select('*')
        
        if (error) throw error
        
        // Filtrar solo productos activos y con stock
        const productosValidos = data
          ?.filter(p => p.activo === true && (p.stock > 0))
          .map(p => ({
            ...p,
            // la UI espera la propiedad "imagen" en lugar de imagen_url
            imagen: p.imagen_url || p.imagen || ''
          })) || []
        
        setCarnes(productosValidos)
      } catch (error) {
        setCarnes([])
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filteredCarnes = useMemo(() => {
    if (corte === "all") return carnes
    return carnes.filter(
      (carne) => carne.categoria && carne.categoria.toLowerCase() === corte.toLowerCase()  
    )
  }, [corte, carnes])

  const ITEMS_PER_PAGE = 9

  const [page, setPage] = useState(1)

  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  const carnesPaginadas = filteredCarnes.slice(startIndex, endIndex)

  const totalPages = Math.ceil(filteredCarnes.length / ITEMS_PER_PAGE)

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
        <p className="text-white text-xl">Cargando productos...</p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Mapa Sudamérica */}
        <div 
          className="absolute mx-95 top-0 h-full w-[65%] z-0 opacity-20 bg-no-repeat bg-right pointer-events-none"
          style={{ 
            backgroundImage: `url(${paraguayFlag})`,
            backgroundSize: 'contain',
          }}
        />

    
    {/*<div className="relative z-10 max-w-7xl mx-auto px-8 py-12 flex gap-12"/>*/}

      <SidebarProvider>
        <div className="w-full min-h-screen bg-neutral-950 text-white pt-20">         
          <SidebarFilters
          carnes={carnes}
          corte={corte}
          setCorte={setCorte}/>
          <div className="w-full mx-18 px-32 py-8 overflow-hidden">
            <ProductGrid carnes={carnesPaginadas} />
            <div className='mt-20'>
              <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
 )
};
