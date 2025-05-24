import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  MdArrowBack,
  MdEdit,
  MdDelete,
  MdSave,
  MdCancel,
  MdWarning,
} from 'react-icons/md'
import type { Service } from '.'

export const Route = createFileRoute(
  '/_protected/dashboard/services/$serviceId',
)({
  component: RouteComponent,
})

const categories = [
  'Éducation',
  'Informatique',
  'Langues',
  'Design',
  'Musique',
  'Autre',
]
const priceRanges = ['0-50', '50-100', '100-200', '200-300', '300+']

// Mock service data - in real app, this would come from API
const mockService: Service = {
  id: 1,
  title: 'Cours de Mathématiques',
  description:
    'Aide aux devoirs et préparation aux examens en mathématiques niveau lycée et première année universitaire.',
  price: '80',
  studentName: 'Ahmed Benali',
  category: 'Éducation',
  priceRange: '50-100',
  isOwner: true,
}

function RouteComponent() {
  const router = useRouter()
  const [service, setService] = useState<Service>(mockService)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [formData, setFormData] = useState({
    title: service.title,
    description: service.description,
    price: service.price,
    studentName: service.studentName,
    category: service.category,
    priceRange: service.priceRange,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      studentName: service.studentName,
      category: service.category,
      priceRange: service.priceRange,
    })
  }, [service])

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = 'Le titre est requis'
    if (!formData.description.trim())
      newErrors.description = 'La description est requise'
    if (!formData.price.trim()) newErrors.price = 'Le prix est requis'
    if (!formData.studentName.trim())
      newErrors.studentName = 'Le nom est requis'
    if (!formData.category) newErrors.category = 'La catégorie est requise'
    if (!formData.priceRange)
      newErrors.priceRange = 'La fourchette de prix est requise'

    // Validate price is a number
    if (formData.price && isNaN(Number(formData.price))) {
      newErrors.price = 'Le prix doit être un nombre valide'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update service
      const updatedService = { ...service, ...formData }
      setService(updatedService)
      setIsEditing(false)

      // In real app, you would make API call here
      console.log('Service updated:', updatedService)
    } catch (error) {
      console.error('Error updating service:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In real app, you would make API call here
      console.log('Service deleted:', service.id)

      // Navigate back to services page
      router.navigate({ to: '/dashboard/services' })
    } catch (error) {
      console.error('Error deleting service:', error)
    } finally {
      setIsLoading(false)
      setShowDeleteModal(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      studentName: service.studentName,
      category: service.category,
      priceRange: service.priceRange,
    })
    setErrors({})
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.navigate({ to: '/dashboard/services' })}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <MdArrowBack className="text-xl" />
            Retour aux services
          </button>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Gérer le service
              </h1>
              <p className="text-gray-600">
                Modifiez ou supprimez votre service
              </p>
            </div>

            {!isEditing && (
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-transparent border-1 border-primary-900 hover:bg-primary-100 text-black px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  <MdEdit className="text-lg" />
                  Modifier
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <MdDelete className="text-lg" />
                  Supprimer
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Service Form/Display */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {isEditing ? (
            // Edit Mode
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Modifier le service
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <MdCancel />
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-primary-900 hover:bg-primary-800 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <MdSave />
                    {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre du service *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Price and Student Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix (DH) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                    min="0"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Votre nom *
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.studentName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.studentName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.studentName}
                    </p>
                  )}
                </div>
              </div>

              {/* Category and Price Range Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fourchette de prix *
                  </label>
                  <select
                    name="priceRange"
                    value={formData.priceRange}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.priceRange ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Sélectionner une fourchette</option>
                    {priceRanges.map((range) => (
                      <option key={range} value={range}>
                        {range} DH
                      </option>
                    ))}
                  </select>
                  {errors.priceRange && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.priceRange}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // Display Mode
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {service.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Description
                    </h3>
                    <p className="text-gray-800 mt-1 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Catégorie
                    </h3>
                    <p className="text-gray-800 mt-1">{service.category}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Prix
                    </h3>
                    <p className="text-2xl font-bold text-gray-800">
                      {service.price}{' '}
                      <span className="text-lg text-gray-600">DH</span>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Fourchette de prix
                    </h3>
                    <p className="text-gray-800 mt-1">
                      {service.priceRange} DH
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Proposé par
                    </h3>
                    <p className="text-gray-800 mt-1 font-medium">
                      {service.studentName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <MdWarning className="text-red-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Supprimer le service
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Cette action est irréversible
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                Êtes-vous sûr de vouloir supprimer le service "
                <strong>{service.title}</strong>" ? Cette action ne peut pas
                être annulée.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {isLoading ? 'Suppression...' : 'Supprimer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
