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



export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
          <a href="/" className="-m-1.5 p-1.5">
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
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">

          <NavLink to="/landingpage" 
          className={({ isActive }) =>
                `
                text-sm font-medium tracking-wide
                transition-colors duration-300
                ${isActive ? "text-white relative after:absolute after:left-0 after:-bottom-1 after:w-full after:h-px after:bg-red-600" : "text-gray-300 hover:text-red-600"}
                `
              }
            >
            Home
          </NavLink>
          <NavLink to="/catalogue" className={({ isActive }) =>
                `
                text-sm font-medium tracking-wide
                transition-colors duration-300
                ${isActive ? "text-white relative after:absolute after:left-0 after:-bottom-1 after:w-full after:h-px after:bg-red-600" : "text-gray-300 hover:text-red-600"}
                `
              }
            >
            Marketplace
          </NavLink>
          <NavLink to="/contactPage" className={({ isActive }) =>
                `
                text-sm font-medium tracking-wide
                transition-colors duration-300
                ${isActive ? "text-white relative after:absolute after:left-0 after:-bottom-1 after:w-full after:h-px after:bg-red-600" : "text-gray-300 hover:text-red-600"}
                `
              }
            >
            Contact
          </NavLink>
        </PopoverGroup>
        
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto dark:hidden"
              />
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto not-dark:hidden"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
              <div className="space-y-2 py-6">
                {/*<Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5">
                    Home
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>*/}
                <Link
                  to="/landingpage"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                >
                  Home
                </Link>
                <Link
                  to="/catalogue"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                >
                  Catalogo
                </Link>
                <Link
                  to="/contactPage"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                >
                  Contact
                </Link>
              </div>
              <div className="py-6">
               {/* <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                >
                  Log in
                </a>*/}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
