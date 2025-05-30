import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import {
  MdArrowBack,
  MdOutlineMiscellaneousServices,
  MdStar,
  MdEmail,
  MdPhone,
  MdPerson,
  MdSchool,
  MdVerified,
} from 'react-icons/md'
import type { Service } from '@/types'
import type { Student } from '@/types'
import { useEffect, useState } from 'react'
import axios from 'axios'
import LoadingSpinner from '@/components/LoadingSpinner'

export const Route = createFileRoute('/_unprotected/services/$serviceId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { serviceId } = Route.useParams()
  const [service, setService] = useState<Service | null>(null)
  const [student, setStudent] = useState<Student | null>(null)
  const [categoryName, setCategoryName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [otherServices, setOtherServices] = useState<Service[]>([])

  useEffect(() => {
    const fetchServiceAndStudent = async () => {
      try {
        // First fetch service
        const serviceResponse = await axios.get(
          `http://localhost:8000/api/services/${serviceId}`,
        )
        const serviceData = serviceResponse.data.data

        setService(serviceData)

        // Then fetch student using student_id from service
        const studentResponse = await axios.get(
          `http://localhost:8000/api/students/${serviceData.student_id}`,
        )
        const studentData = studentResponse.data.data

        setStudent(studentData)

        const categoryResponse = await axios.get(
          `http://localhost:8000/api/categories/${serviceData.category_id}`,
        )
        setCategoryName(categoryResponse.data.data.name)

        const otherServicesResponse = await axios.get(
          `http://localhost:8000/api/services?student_id=${serviceData.student_id}&exclude=${serviceId}`,
        )
        setOtherServices(otherServicesResponse.data.data)

        setLoading(false)
      } catch (err) {
        setError('Erreur lors du chargement des données.')
        setLoading(false)
      }
    }

    fetchServiceAndStudent()
  }, [serviceId])

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !service || !student) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        {error || 'Service ou étudiant introuvable.'}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-16">
      {/* Header avec navigation */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            to="/services"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors duration-200"
          >
            <MdArrowBack className="mr-2" />
            Retour aux services
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Section principale - Détails du service */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              {/* En-tête du service */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="bg-primary-100 p-4 rounded-2xl mr-4">
                    <MdOutlineMiscellaneousServices className="text-3xl text-primary-600" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h1>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full mr-3">
                        {categoryName || 'Catégorie inconnue'}
                      </span>
                      <span>{service.price_range} DH</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prix */}
              <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-6">
                <div className="text-center">
                  <p className="text-sm text-primary-600 mb-1">
                    Prix du service
                  </p>
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary-700">
                      {service.price}
                    </span>
                    <span className="text-xl text-primary-600 ml-2">DH</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">par session</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Description du service
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {service.description}
                </p>
              </div>

              {/* Bouton de contact */}
              <div className="flex gap-4">
                <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Contacter pour ce service
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-6 rounded-xl transition-colors duration-300">
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Profil de l'étudiant */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              {/* Photo et nom */}
              <div className="text-center mb-6">
                <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MdPerson className="text-3xl text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {student.name}
                </h3>
                <div className="flex items-center justify-center text-primary-600 mb-2">
                  <MdVerified className="mr-1" />
                  <span className="text-sm font-medium">Profil vérifié</span>
                </div>
                <p className="text-gray-600 text-sm">{student.classe}</p>
              </div>

              {/* Évaluation */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Évaluation</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <MdStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">4.9/5 (23 avis)</p>
              </div>

              {/* Informations de contact */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Contact</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MdEmail className="mr-3 text-primary-500" />
                    <span className="text-sm break-all">{student.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MdPhone className="mr-3 text-primary-500" />
                    <span className="text-sm">{student.phone_number}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MdSchool className="mr-3 text-primary-500" />
                    <span className="text-sm">Niveau {student.niveau}</span>
                  </div>
                </div>
              </div>

              {/* Compétences */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Compétences
                </h4>
                <div className="flex flex-wrap gap-2">
                  {student.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-800 text-xs px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bio */}
              {student.bio && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">À propos</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {student.bio}
                  </p>
                </div>
              )}

              {/* Boutons d'action */}
              <div className="space-y-3">
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-300">
                  Envoyer un message
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors duration-300">
                  Voir le profil complet
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section supplémentaire - Services similaires */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Autres services de {student.name}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherServices.map((otherService) => (
                <div
                  key={otherService.id}
                  className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center mb-3">
                    <MdOutlineMiscellaneousServices className="text-primary-500 mr-2" />
                    <h3 className="font-medium text-gray-900">
                      {otherService.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    {otherService.description.substring(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary-600">
                      {otherService.price} DH
                    </span>
                    <Link
                      to="/services/$serviceId"
                      params={{ serviceId: otherService.id.toString() }}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      Voir →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
