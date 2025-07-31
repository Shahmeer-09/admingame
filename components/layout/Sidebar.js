'use client'

import { Fragment } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import { 
  X, 
  LayoutDashboard, 
  FolderOpen, 
  HelpCircle, 
  Users, 
  Ticket, 
  Shield, 
  Settings,
  ChevronRight,
  Sparkles
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Categories', href: '/admin/categories', icon: FolderOpen },
  { name: 'Questions', href: '/admin/questions', icon: HelpCircle },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Coupons', href: '/admin/coupons', icon: Ticket },
  { name: 'Admins', href: '/admin/admins', icon: Shield },
  { name: 'Meta Data', href: '/admin/metadata', icon: Settings },
]

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname()

  const SidebarContent = ({ mobile = false }) => (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center flex-shrink-0 px-6 py-6">
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin Portal</h1>
            <p className="text-xs text-gray-500">Management Dashboard</p>
          </div>
        </motion.div>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                onClick={() => mobile && setSidebarOpen(false)}
                className={`
                  group flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:scale-105'
                  }
                `}
              >
                <item.icon className={`mr-3 flex-shrink-0 h-5 w-5 transition-colors ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                }`} />
                {item.name}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto"
                  >
                    <ChevronRight className="h-4 w-4 text-white" />
                  </motion.div>
                )}
              </Link>
            </motion.div>
          )
        })}
      </nav>

      <div className="flex-shrink-0 p-4">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
          <p className="text-xs font-semibold text-indigo-600 mb-1">Need Help?</p>
          <p className="text-xs text-gray-600">Contact support for assistance</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>
          
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-2xl">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white bg-white/20 backdrop-blur-sm"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <SidebarContent mobile />
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white shadow-lg">
          <SidebarContent />
        </div>
      </div>
    </>
  )
}