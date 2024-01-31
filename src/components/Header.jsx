'use client'
import {  useState } from 'react'
import { Dialog, Popover} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Avatar, Box, Divider } from '@mui/material'
import { useCookies } from 'next-client-cookies';

export default function Header() {

  const cookies = useCookies()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const user = cookies.get()
  console.log(user)

  return (
    <header className="bg-amber-800">
      <nav className="mx-auto flex max-w-7xl items-center justify-between lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <img className="h-20 w-auto mx-10" src="/images/logo-no-background.svg" alt="logo" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="m-2 inline-flex items-center justify-center rounded-md p-2.5 text-anti-flash-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-16">
          <a href="/clientes" className="text-lg font-semibold leading-6 text-anti-flash-white">
            Clientes
          </a>
          <a href="/pedidos" className="text-lg font-semibold leading-6 text-anti-flash-white">
            Pedidos
          </a>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {
              user?
                <Box className='flex flex-row justify-center items-center'>
                  <Avatar alt={user.username} src={user.avatar}/>
                  <span className="text-sm font-semibold leading-6 text-anti-flash-white mx-3">{user.username}</span>
                </Box>
                :
                <a href="#" className="text-sm font-semibold leading-6 text-anti-flash-white">
                  Entrar  <span aria-hidden="true">&rarr;</span>
                </a>
          }
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-amber-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <img
                className="h-auto w-20"
                src="/images/logo_transparente.png/"
                alt="Logo"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/clientes"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-anti-flash-white hover:bg-hover-blues"
                >
                  Clientes
                </a>
                <a
                  href="/pedidos"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-anti-flash-white hover:bg-hover-blue"
                >
                  Pedidos
                </a>
              </div>
              <div className="py-6">

                {
              user?
                <Box className='flex flex-row justify-start items-center'>
                  <Avatar alt={user.username} src={user.avatar}/>
                  <span className="-my-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-anti-flash-white hover:bg-hover-blue">{user.username}</span>
                </Box>
                :
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-anti-flash-white hover:bg-hover-blue"
                >
                  Entrar
                </a>
          }
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
      <Divider component="div" role="presentation" className='bg-[#F4F0EC]'></Divider>
    </header>
  )
}
