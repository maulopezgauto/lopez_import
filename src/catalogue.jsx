import React, { useEffect, useMemo, useState } from 'react';
import carnes from './components/catalogues/catalogoCarnes.jsx';
import ProductGrid from './components/Products/productGride.jsx';
import paraguayFlag from './assets/img/backgrounds/paraguay-flag-png.png'
import SidebarFilters from './components/sideBarFilters.jsx';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import  Pagination  from './components/pagination.jsx';



const CatalogoCarnes = () => {

  const [corte, setCorte] = useState("all")

  const filteredCarnes = useMemo(() => {
    if (corte === "all") return carnes
    return carnes.filter(
      (carne) => carne.corte.toLowerCase() === corte  
    )
  }, [corte])

  const ITEMS_PER_PAGE = 8

  const [page, setPage] = useState(1)

  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  const carnesPaginadas = filteredCarnes.slice(startIndex, endIndex)

  const totalPages = Math.ceil(filteredCarnes.length / ITEMS_PER_PAGE)

  

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

export default CatalogoCarnes;