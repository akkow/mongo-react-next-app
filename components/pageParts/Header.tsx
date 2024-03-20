"use client"
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  BuildingOffice2Icon,
  Bars3Icon,
  CalculatorIcon,
  CommandLineIcon,
  Cog6ToothIcon,
  CpuChipIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, DocumentPlusIcon, PhoneArrowDownLeftIcon } from '@heroicons/react/20/solid'
import { signIn, signOut, useSession } from 'next-auth/react'

const products = [
  { name: 'Informacinės technologijos', description: 'Programavimas, IT ar tinklų administravimas', href: '/itOffers', icon: CommandLineIcon },
  { name: 'Finansai', description: 'Verslas, bankai ir nekilnojamas turtas', href: '/financeOffers', icon: CalculatorIcon },
  { name: 'Gamyba', description: 'Gamyba, vadyba ir administravimas', href: '/productionOffers', icon: Cog6ToothIcon },
  { name: 'Eleketronika', description: 'Elektronika ir jos inžinerija', href: '/electronicsOffers', icon: CpuChipIcon },
  { name: 'Statyba', description: 'Statyba, inžinerija ir architektura', href: '/constructionOffers', icon: BuildingOffice2Icon },
]
const callsToAction = [
  { name: 'Sukurti savo CV', href: '#', icon: DocumentPlusIcon },
  { name: 'Kontaktai darbdaviams', href: '#', icon: PhoneArrowDownLeftIcon },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { data: session } = useSession()

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8" aria-label="Global">
        <div className="-mx-8 flex lg:flex-1">
          <a href="/" className="-mx-8 p-1.5">
            <span className="sr-only">CV</span>
            <img className="h-12" src="https://icons.iconarchive.com/icons/academicons-team/academicons/128/cv-icon.png" alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <a href='/dashboard' className="p-2 transition-colors bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-xl text-md font-bold leading-6 text-black flex items-center gap-x-2">
            ADMIN
          </a>
          <a href='/offers' className="transition-colors hover:text-green-500 text-md font-bold leading-6 text-black flex items-center gap-x-2">
            Darbo skelbimai
          </a>
          <a href="/companies" className="transition-colors hover:text-green-500 text-md font-bold leading-6 text-black flex items-center gap-x-2">
            Darbdaviai
          </a>
          <a href="/create-cv" className="transition-colors hover:text-green-500 text-md font-bold leading-6 text-black flex items-center gap-x-2">
            Mano CV
          </a>
          <a href="/savedoffers" className="transition-colors hover:text-green-500 text-md font-bold leading-6 text-black flex items-center gap-x-2">
            Įsiminti skelbimai
          </a>
          {
          session && 
          <a className='shadow-xl transition-colors hover:bg-green-600 gap-x-2 inline-flex px-2 py-2 bg-green-500 rounded-full text-white text-md font-bold leading-6' href='/profile'>
            {`${session?.user.name} ${session?.user.surname}`}
            <div className='inline-flex items-center justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </a>
          }
          {
          session && <button className="transition-colors shadow bg-black hover:shadow-xl hover:bg-green-500 hover:rounded-lg py-2 px-6 focus:shadow-outline focus:outline-none font-bold text-md rounded font-semibold leading-6 text-white" type='submit' id="save-btn" onClick={() => signOut()}>
              <div className='flex items-center gap-x-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
                Atsijungti
              </div>
            </button>
          }
        </Popover.Group>
        {!session &&  <div id="sign-in-button" className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button className="transition-colors shadow bg-black hover:shadow-xl hover:bg-green-500 hover:rounded-lg py-2 px-6 focus:shadow-outline focus:outline-none font-bold text-md rounded font-semibold leading-6 text-white" id="save-btn" onClick={() => signIn()}>
            <div className='flex items-center gap-x-2'>
             <svg className='fill-white' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/></svg>
             Prisijungti
            </div>
          </button>
        </div>}
      </nav>
      <nav className='bg-gray-300 h-0.5'></nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Product
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
