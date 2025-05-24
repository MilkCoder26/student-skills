import { createFileRoute, Link } from '@tanstack/react-router'
import { AiOutlineHome, AiOutlineUser, AiOutlinePlus } from 'react-icons/ai'
import { MdOutlineMiscellaneousServices } from 'react-icons/md'

// Sidebar Component

export const Route = createFileRoute('/_protected/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tableau de bord
        </h1>
        <p className="text-gray-600">
          Bienvenue sur votre espace StudentSkills
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MdOutlineMiscellaneousServices className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Services proposés
              </p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <AiOutlineUser className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Services demandés
              </p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AiOutlineHome className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Échanges réalisés
              </p>
              <p className="text-2xl font-bold text-gray-900">7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Action Section */}
      <div className="bg-white rounded-xl p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AiOutlinePlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Proposer un service
            </h2>
            <p className="text-gray-600">
              Partagez vos compétences avec la communauté étudiante et commencez
              à échanger des services.
            </p>
          </div>

          <Link
            to="/dashboard/services"
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform"
          >
            Proposer un service
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Activité récente
        </h3>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MdOutlineMiscellaneousServices className="w-6 h-6 text-primary-600" />
              </div>
              <p className="text-gray-500">Aucune activité récente</p>
              <p className="text-sm text-gray-400 mt-1">
                Vos prochains échanges apparaîtront ici
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
