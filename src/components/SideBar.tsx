import React from 'react'
import { Link } from '@tanstack/react-router'
import { AiOutlineClose, AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { MdOutlineMiscellaneousServices } from 'react-icons/md'
import clsx from 'clsx'

interface SideBarProps {
  isOpen: boolean
  toggleSidebar: () => void
}
const studentData = JSON.parse(localStorage.getItem('student') || '{}')
const SideBar: React.FC<SideBarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    {
      name: 'Tableau de bord',
      path: '/dashboard',
      icon: AiOutlineHome,
      gradient: 'from-primary-500 to-primary-600',
    },
    {
      name: 'Services',
      path: '/dashboard/services',
      icon: MdOutlineMiscellaneousServices,
      gradient: 'from-primary-600 to-primary-700',
    },
    {
      name: 'Mon profil',
      path: '/dashboard/profile',
      icon: AiOutlineUser,
      gradient: 'from-primary-400 to-primary-600',
    },
  ]

  return (
    <>
      {/* Enhanced Overlay for mobile */}
      <div
        className={clsx(
          'fixed inset-0 bg-gradient-to-br from-primary-800 to-primary-600 backdrop-blur-sm z-40 transition-all duration-300 lg:hidden',
          {
            'opacity-0 pointer-events-none': !isOpen,
            'opacity-100': isOpen,
          },
        )}
        onClick={toggleSidebar}
      />

      {/* Beautiful Sidebar */}
      <aside
        className={clsx(
          'fixed z-50 inset-y-0 left-0 w-72 bg-primary-100 backdrop-blur-xl border-r border-white/20 shadow-xl transform transition-all duration-300 ease-out lg:static lg:translate-x-0',
          {
            '-translate-x-full': !isOpen,
            'translate-x-0': isOpen,
          },
        )}
      >
        {/* Header with enhanced design */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-800 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">SS</span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-primary-800 to-primary-600 bg-clip-text text-transparent">
                  StudentSkills
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  Plateforme d'échange
                </p>
              </div>
            </div>
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-200 hover:scale-105"
              onClick={toggleSidebar}
            >
              <AiOutlineClose className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Enhanced Navigation */}
        <nav className="p-6 space-y-3">
          <div className="mb-6">
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  activeOptions={{ exact: true }}
                  activeProps={{
                    className:
                      'active-nav-item bg-gradient-to-r from-primary-100 via-primary-100 to-transparent border border-primary-200/50 shadow-lg shadow-primary-500/10',
                  }}
                  className="group flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 ease-out relative overflow-hidden hover:bg-gradient-to-r hover:from-gray-50 hover:to-primary-50/30 hover:shadow-md hover:scale-[1.02] hover:border hover:border-gray-200/50"
                  onClick={toggleSidebar}
                >
                  {/* Active indicator */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-800 rounded-full opacity-0 group-[.active-nav-item]:opacity-100 transition-opacity duration-300" />

                  {/* Icon with gradient background */}
                  <div
                    className={clsx(
                      'flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-gray-200 group-hover:to-primary-100',
                      `group-[.active-nav-item]:bg-gradient-to-br group-[.active-nav-item]:${item.gradient} group-[.active-nav-item]:shadow-lg group-[.active-nav-item]:shadow-primary-500/25`,
                    )}
                  >
                    <Icon className="w-5 h-5 transition-all duration-300 text-gray-600 group-hover:text-primary-600 group-[.active-nav-item]:text-white" />
                  </div>

                  {/* Text */}
                  <span className="font-semibold transition-all duration-300 text-gray-700 group-hover:text-primary-600 group-[.active-nav-item]:text-primary-700">
                    {item.name}
                  </span>

                  {/* Hover effect indicator - only show when not active */}
                  <div className="ml-auto opacity-0 group-hover:opacity-100 group-[.active-nav-item]:!opacity-0 transition-all duration-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full" />
                  </div>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Beautiful Footer with user info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Link
            to="/"
            className="flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 ease-out relative overflow-hidden hover:bg-gradient-to-r hover:from-gray-50 hover:to-primary-50/30 hover:shadow-md hover:scale-[1.02] hover:border hover:border-gray-200/50"
          >
            <AiOutlineUser className="w-7 h-7" />
            <span className="text-md font-bold text-gray-900">Déconnexion</span>
          </Link>
          <div className="bg-gradient-to-r from-primary-50 via-white to-primary-50 border border-primary-100/50 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg">
                  <AiOutlineUser className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  Étudiant
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {studentData.email || 'email non disponible'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default SideBar
