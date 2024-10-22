'use client'
import { Disclosure } from '@headlessui/react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'

import {
  ThemeContext,
  ThemeContextType,
} from '@/services/custom-theme-provider'

export default function Navbar() {
  const pathname = usePathname()
  const { currentTheme, toggleTheme } = useContext(
    ThemeContext
  ) as ThemeContextType

  const getLinkClass = (url: string) =>
    pathname === url
      ? 'inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-indigo-500'
      : 'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'

  return (
    <Disclosure as="nav" className="bg-card shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Tech Showcase"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/users" className={getLinkClass('/users')}>
                Users
              </Link>
              <Link href="/posts" className={getLinkClass('/posts')}>
                Posts
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="relative rounded-full bg-card p-1 text-muted hover:opacity-60"
            >
              <span className="sr-only">Toggle theme</span>
              {currentTheme === 'light' ? (
                <MoonIcon className="h-6 w-6" />
              ) : (
                <SunIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}
