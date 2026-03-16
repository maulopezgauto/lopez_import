'use client'

import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import paraguayCircle from '../assets/img/logo/paraguay_flag_circle.webp'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../config/services/supabase'


export default function PrivateNavBar() {
  // eslint-disable-next-line no-unused-vars
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate()

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <header
        className="
          fixed top-0 left-0 right-0 z-40
          bg-black/80 backdrop-blur-md
          border-b border-white/10
          shadow-[0_10px_30px_rgba(0,0,0,0.6)]
        ">
      <nav aria-label="Global" className=" flex w-full items-center justify-between p-6 lg:px-8">
      <div className="flex lg:flex-1">
                <a href="/private/lobby" className="-m-1.5 p-1.5">
                  <span className="sr-only">Lopez Import</span>
                  <img
                    alt=""
                    src={paraguayCircle}
                    className="h-8 w-auto dark:hidden"
                  />
                  <img
                    alt=""
                    src={paraguayCircle}
                    className="h-8 w-auto not-dark:hidden"
                  />
                </a>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

      <PopoverGroup className="flex gap-4 items-center">
        <NavLink to="/private/privateCatalogue"
        className={({ isActive }) =>
          `
          text-sm font-medium tracking-wide
          transition-colors duration-300
          ${isActive ? "text-white relative after:absolute after:left-0 after:-bottom-1 after:w-full after:h-px after:bg-red-600" : "text-gray-300 hover:text-red-600"}
          `
        }>
        Catálogo
        </NavLink>
        <NavLink to="/private/shopCart"
        className={({ isActive }) =>
          `
          text-sm font-medium tracking-wide
          transition-colors duration-300
          ${isActive ? "text-white relative after:absolute after:left-0 after:-bottom-1 after:w-full after:h-px after:bg-red-600" : "text-gray-300 hover:text-red-600"}
          `
        }>
        Carrito
        </NavLink><NavLink to="/private/orders"
        className={({ isActive }) =>
          `
          text-sm font-medium tracking-wide
          transition-colors duration-300
          ${isActive ? "text-white relative after:absolute after:left-0 after:-bottom-1 after:w-full after:h-px after:bg-red-600" : "text-gray-300 hover:text-red-600"}
          `
        }>
        Pedidos
        </NavLink>
        <NavLink to="/private/profile"
        className={({ isActive }) =>
          `
          text-sm font-medium tracking-wide
          transition-colors duration-300
          ${isActive ? "text-white relative after:absolute after:left-0 after:-bottom-1 after:w-full after:h-px after:bg-red-600" : "text-gray-300 hover:text-red-600"}
          `
        }>
        Perfil
        </NavLink>

        <NavLink
          to="/login"
          onClick={logout}
          className={({ isActive }) =>
          `
          text-sm font-medium tracking-wide
          transition-colors duration-300
          ${isActive ? "text-white relative after:absolute after:left-0 after:-bottom-1 after:w-full after:h-px after:bg-red-600" : "text-gray-300 hover:text-red-600"}
          `
        }
        >
          Salir
        </NavLink>
      </PopoverGroup>
    </nav>
    </header>
  )
}
