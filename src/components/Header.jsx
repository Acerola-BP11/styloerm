'use client'
import { memo, useEffect, useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Box, Button, Divider, Menu, MenuItem } from '@mui/material'
import { ArrowDropDown, ArrowRight } from '@mui/icons-material'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

function Header() {


  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(localStorage.getItem('username'))
  }, [])
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setOpen(false)
  }
  const handleLogout = async () => {
    await axios.get('https://styloapi.vercel.app/user/logout', {
      headers: {
        "Authorization": localStorage.getItem('token')
      }
    })
    setUser(null)
    localStorage.clear()
    handleClose()
    router.push('/login')
  }

  return (
    <header className="bg-amber-800 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image
              className="h-20 w-auto mx-10"
              src="/images/logo-no-background.svg"
              alt="logo"
              width={20}
              height={40}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="m-2 inline-flex items-center justify-center rounded-md p-2.5 text-anti-flash-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-16">
          <Link href="/clientes" className="text-lg font-semibold leading-6 text-white">
            Clientes
          </Link>
          <Link href="/pedidos" className="text-lg font-semibold leading-6 text-white">
            Pedidos
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {
            user ?
              <>
                <Box className='flex flex-row justify-center items-center'>
                  <Button
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    variant='text'
                  >
                    <span className="text-sm font-semibold leading-6 text-white flex items-center justify-center">{user}<ArrowDropDown /></span>
                  </Button>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'bottom',
                  }}
                  transformOrigin={{
                    horizontal: 'right',
                    vertical: 'top'
                  }}
                >
                  <MenuItem onClick={handleClose}>Perfil</MenuItem>
                  <MenuItem onClick={handleLogout}><span className='text-red-600'>Sair</span></MenuItem>
                </Menu>
              </>
              :
              <div>
                <Link href="/login" className="text-sm font-semibold leading-6 text-white">
                  Entrar  <ArrowRight />
                </Link>
              </div>
          }
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-amber-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image
                className="h-auto w-20"
                src="images\logo-no-background.svg"
                alt="Logo"
                width={20}
                height={40}
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/clientes"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-hover-blues"
                >
                  Clientes
                </Link>
                <Link
                  href="/pedidos"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-hover-blue"
                >
                  Pedidos
                </Link>
                <Button
                  onClick={handleLogout}
                  className="-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-anti-flash-white hover:bg-hover-blue text-white border border-white border-solid bg-red-700 w-1/5 text-center visited:none"
                >
                  Sair
                </Button>
              </div>
              <div className="py-6">

                {
                  user ?
                    <Box className='flex flex-row justify-start items-center'>
                      <span className="-my-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-anti-flash-white hover:bg-hover-blue">{user.username}</span>
                    </Box>
                    :
                    <Link
                      href="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-hover-blue"
                    >
                      Entrar
                    </Link>
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

export default memo(Header)