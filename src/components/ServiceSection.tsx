import { Link } from '@tanstack/react-router'
import type { Service } from '../types'
import ServiceCard from './ServiceCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner'

export default function ServiceSection() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/services')
        setServices(response.data.data)
        setLoading(false)
      } catch (err) {
        setError('Erreur lors du chargement des services.')
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center text-red-500">
        {error}
      </div>
    )
  }

  return (
    <section className="py-16 bg-[url('src/assets/bubbles.svg')]">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            <span className="text-primary-800">Q</span>uelques services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez des solutions proposées par des étudiants talentueux. Des
            services professionnels adaptés à vos besoins.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="pt-4 mt-12 animate-fade-in-up-delay-2 text-center">
          <Link
            to="/services"
            className="inline-block bg-linear-to-r from-primary-800 to-primary-600 text-white text-bred-900 px-6 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Voir tous les services
          </Link>
        </div>
      </div>
    </section>
  )
}
