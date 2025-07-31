'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [admin, setAdmin] = useState(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin')
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin))
    } else if (pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [router, pathname])

  const logout = () => {
    localStorage.removeItem('admin')
    setAdmin(null)
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') {
    return children
  }

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} admin={admin} logout={logout} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none md:ml-64">
          <div className="py-6 px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}