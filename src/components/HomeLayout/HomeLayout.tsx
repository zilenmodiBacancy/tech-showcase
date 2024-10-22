import React, { FC, ReactNode } from 'react'

import Navbar from '@/components/Navbar'

interface HomeLayoutProps {
  children: ReactNode
}

const HomeLayout: FC<HomeLayoutProps> = ({ children }) => (
  <div className="flex flex-col h-screen bg-background">
    <Navbar />
    <main className="flex-1 overflow-y-auto">{children}</main>
  </div>
)

export default HomeLayout
