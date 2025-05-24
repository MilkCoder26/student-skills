import { createFileRoute } from '@tanstack/react-router'
import { MdOutlineMiscellaneousServices, MdAdd } from 'react-icons/md'
import { useState } from 'react'
import ServiceCard from '@/components/ServiceCard'
import AddServiceModal from '@/components/AddServiceModal'

export const Route = createFileRoute('/_protected/dashboard/services/')({
  component: RouteComponent,
})

export type Service = {
  id: number
  title: string
  description: string
  price: string
  studentName: string
  category: string
  priceRange: string
  isOwner?: boolean
}

const mockServices: Service[] = [
  {
    id: 1,
    title: 'Cours de Mathématiques',
    description:
      'Aide aux devoirs et préparation aux examens en mathématiques niveau lycée et première année universitaire.',
    price: '80',
    studentName: 'Ahmed Benali',
    category: 'Éducation',
    priceRange: '50-100',
    isOwner: true,
  },
  {
    id: 2,
    title: 'Développement Web',
    description:
      'Création de sites web responsive avec React et Node.js. Portfolio inclus.',
    price: '150',
    studentName: 'Ahmed Benali',
    category: 'Informatique',
    priceRange: '100-200',
    isOwner: true,
  },
  {
    id: 3,
    title: 'Traduction Français-Arabe',
    description:
      'Traduction de documents académiques et professionnels avec relecture incluse.',
    price: '60',
    studentName: 'Fatima Zahra',
    category: 'Langues',
    priceRange: '40-80',
    isOwner: false,
  },
  {
    id: 4,
    title: 'Design Graphique',
    description:
      'Création de logos, flyers, et supports visuels pour événements étudiants.',
    price: '120',
    studentName: 'Youssef Amrani',
    category: 'Design',
    priceRange: '80-150',
    isOwner: false,
  },
  {
    id: 5,
    title: 'Cours de Guitare',
    description:
      'Apprentissage de la guitare acoustique pour débutants et intermédiaires.',
    price: '90',
    studentName: 'Sarah Bennani',
    category: 'Musique',
    priceRange: '60-120',
    isOwner: false,
  },
]

function RouteComponent() {
  const [activeTab, setActiveTab] = useState<'my-services' | 'all-services'>(
    'my-services',
  )
  const [services, setServices] = useState<Service[]>(mockServices)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const myServices = services.filter((service) => service.isOwner)
  const otherServices = services.filter((service) => !service.isOwner)

  const handleAddService = (
    newServiceData: Omit<Service, 'id' | 'isOwner'>,
  ) => {
    const newService: Service = {
      ...newServiceData,
      id: Math.max(...services.map((s) => s.id), 0) + 1,
      isOwner: true,
    }

    setServices((prev) => [...prev, newService])
    setIsModalOpen(false)
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
                  <ServiceCard
                    key={service.id}
                    service={service}
                    isOwner={service.isOwner}
                  />
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
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
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
                  isOwner={service.isOwner}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <AddServiceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddService}
      />
    </div>
  )
}
