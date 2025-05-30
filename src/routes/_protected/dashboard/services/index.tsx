import { createFileRoute } from '@tanstack/react-router'
import { MdOutlineMiscellaneousServices, MdAdd } from 'react-icons/md'
import ServiceCard from '@/components/ServiceCard'
import AddServiceModal from '@/components/AddServiceModal'
import type { Service } from '@/types'
import axios from 'axios'
import { useEffect, useState } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

export const Route = createFileRoute('/_protected/dashboard/services/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [activeTab, setActiveTab] = useState<'my-services' | 'all-services'>(
    'my-services',
  )
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Get logged in student from localStorage
  const studentData = JSON.parse(localStorage.getItem('student') || '{}')
  const studentId = studentData?.id
  console.log('Logged in student ID:', studentId)
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:8000/api/services')
        const servicesData = response.data.data
        setServices(servicesData)
      } catch (err) {
        setError('Erreur lors du chargement des services.')
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [studentId])

  const myServices = services.filter((service) => {
    return service.student_id === studentId
  })
  const otherServices = services.filter((service) => {
    return service.student_id !== studentId
  })

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        {error}
      </div>
    )
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mes Services</h1>
              <p className="text-gray-600 mt-2">
                Gérez vos services et découvrez de nouveaux talents
              </p>
            </div>
            <button
              onClick={openModal}
              className="bg-primary-900 hover:bg-primary-800 cursor-pointer text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-lg"
            >
              <MdAdd className="text-xl" />
              Ajouter un service
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('my-services')}
              className={`px-6 py-2 rounded-md font-medium transition-all cursor-pointer duration-200 ${
                activeTab === 'my-services'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Mes Services ({myServices.length})
            </button>
            <button
              onClick={() => setActiveTab('all-services')}
              className={`px-6 py-2 rounded-md font-medium transition-all cursor-pointer duration-200 ${
                activeTab === 'all-services'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Tous les Services ({otherServices.length})
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'my-services' ? (
          <div>
            {myServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {myServices.map((service) => (
                  <ServiceCard key={service.id} service={service} isOwner />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MdOutlineMiscellaneousServices className="mx-auto text-6xl text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">
                  Aucun service créé
                </h3>
                <p className="text-gray-500 mb-6">
                  Commencez par créer votre premier service
                </p>
                <button
                  onClick={openModal}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
                >
                  <MdAdd className="text-xl" />
                  Créer mon premier service
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {otherServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isOwner={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <AddServiceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        setServices={setServices}
      />
    </div>
  )
}
