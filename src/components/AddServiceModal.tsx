import { useState, useEffect } from 'react'
import { MdClose, MdAdd } from 'react-icons/md'
import { FaSpinner } from 'react-icons/fa'
import type { Service, Category } from '../types'
import axios from 'axios'

type AddServiceModalProps = {
  isOpen: boolean
  onClose: () => void
  setServices: React.Dispatch<React.SetStateAction<Service[]>>
}

const priceRanges = ['0-50', '50-100', '100-200', '200-300', '300+']

export default function AddServiceModal({
  isOpen,
  onClose,
  setServices,
}: AddServiceModalProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category_id: '',
    price_range: '',
    student_id: 1,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories')
        setCategories(response.data.data)
      } catch (err) {
        console.error('Error fetching categories:', err)
        setSubmitError('Erreur lors du chargement des catégories')
      }
    }

    if (isOpen) {
      fetchCategories()
    }
  }, [isOpen])

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
    setSubmitError(null)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = 'Le titre est requis'
    if (!formData.description.trim())
      newErrors.description = 'La description est requise'
    if (!formData.price.trim()) newErrors.price = 'Le prix est requis'
    if (!formData.category_id)
      newErrors.category_id = 'La catégorie est requise'
    if (!formData.price_range)
      newErrors.price_range = 'La fourchette de prix est requise'

    if (formData.price && isNaN(Number(formData.price))) {
      newErrors.price = 'Le prix doit être un nombre valide'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (validateForm()) {
      setIsLoading(true)
      try {
        const serviceData: Omit<Service, 'id'> = {
          title: formData.title,
          description: formData.description,
          price: formData.price,
          price_range: formData.price_range,
          category_id: parseInt(formData.category_id),
          student_id: 1,
        }

        const response = await axios.post(
          'http://localhost:8000/api/services',
          serviceData,
        )

        const newService = response.data.data
        setServices((prev) => [...prev, newService])
        handleClose()
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setSubmitError(
            error.response?.data?.message ||
              'Erreur lors de la création du service',
          )
        } else {
          setSubmitError('Une erreur inattendue est survenue')
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      category_id: '',
      price_range: '',
      student_id: 1,
    })
    setErrors({})
    setSubmitError(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Ajouter un nouveau service
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        {submitError && (
          <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{submitError}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]"
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Titre du service *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: Cours de Mathématiques"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Décrivez votre service en détail..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Prix (DH) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: 80"
                  min="0"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="price_range"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Fourchette de prix *
                </label>
                <select
                  id="price_range"
                  name="price_range"
                  value={formData.price_range}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    errors.price_range ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Sélectionner une fourchette</option>
                  {priceRanges.map((range) => (
                    <option key={range} value={range}>
                      {range} DH
                    </option>
                  ))}
                </select>
                {errors.price_range && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price_range}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="category_id"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Catégorie *
              </label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                  errors.category_id ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category_id}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary-900 hover:bg-primary-800 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin h-5 w-5" />
              ) : (
                <>
                  <MdAdd className="text-xl" />
                  Créer le service
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
