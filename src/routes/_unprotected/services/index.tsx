import ServiceCard from '@/components/ServiceCard'
import type { Service, Category } from '@/types'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { MdOutlineMiscellaneousServices } from 'react-icons/md'
import axios from 'axios'
import LoadingSpinner from '@/components/LoadingSpinner'

export const Route = createFileRoute('/_unprotected/services/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('name')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Get services
        const servicesResponse = await axios.get(
          'http://localhost:8000/api/services',
        )
        const servicesData = servicesResponse.data.data
        setServices(servicesData)

        // Get categories
        const categoriesResponse = await axios.get(
          'http://localhost:8000/api/categories',
        )
        setCategories(categoriesResponse.data.data)

        setLoading(false)
      } catch (err) {
        setError('Erreur lors du chargement des données.')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter and sort services
  const filteredAndSortedServices = services
    .filter((service) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        service.category_id.toString() === selectedCategory
      const matchesPriceRange =
        selectedPriceRange === 'all' ||
        service.price_range === selectedPriceRange
      const matchesSearch =
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesCategory && matchesPriceRange && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return parseInt(a.price) - parseInt(b.price)
        case 'price-desc':
          return parseInt(b.price) - parseInt(a.price)
        case 'name':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  if (loading) {
    return (
      <div>
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

  const clearFilters = () => {
    setSelectedCategory('all')
    setSelectedPriceRange('all')
    setSearchTerm('')
    setSortBy('name')
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Tous les <span className="text-primary-600">Services</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les services proposés par des étudiants talentueux. Des
            solutions professionnelles à prix étudiants.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* Search bar */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Rechercher un service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-900 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            {/* Category filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Toutes catégories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id.toString()}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price range filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fourchette de prix
              </label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tous les prix</option>
                <option value="200-500">200 - 500 DH</option>
                <option value="500-1500">500 - 1500 DH</option>
                <option value="1000-2500">1000 - 2500 DH</option>
                <option value="2000-5000">2000 - 5000 DH</option>
                <option value="3000-6000">3000 - 6000 DH</option>
              </select>
            </div>

            {/* Sort by */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trier par
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Nom du service</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="student">Nom de l'étudiant</option>
              </select>
            </div>

            {/* Clear filters button */}
            <div className="md:col-span-2">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        </div>

        {/* Results count and summary */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <p className="text-gray-600 mb-2 md:mb-0">
            <span className="font-semibold text-primary-600">
              {filteredAndSortedServices.length}
            </span>{' '}
            service(s) trouvé(s)
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>
              Prix moyen:{' '}
              {Math.round(
                filteredAndSortedServices.reduce(
                  (sum, service) => sum + parseInt(service.price),
                  0,
                ) / filteredAndSortedServices.length || 0,
              )}{' '}
              DH
            </span>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* No results message */}
        {filteredAndSortedServices.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-4">
              <MdOutlineMiscellaneousServices className="w-16 h-16 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              Aucun service trouvé
            </h3>
            <p className="text-gray-500 mb-4">
              Essayez de modifier vos critères de recherche
            </p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Voir tous les services
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
