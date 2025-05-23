import SideBar from '@/components/SideBar'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

export const Route = createFileRoute('/_protected/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SS</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">StudentSkills</h1>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <AiOutlineMenu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <SideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          <main className="min-h-screen">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
