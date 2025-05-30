import { createFileRoute, Link } from '@tanstack/react-router'
import MenImage from '@/assets/men-profile.png'
import WomenImage from '@/assets/women-profile.png'
import { HiArrowLeft } from 'react-icons/hi'
import { MdEmail, MdPhone } from 'react-icons/md'
import { FaGraduationCap } from 'react-icons/fa'
import { FiBookOpen } from 'react-icons/fi'
import { BsBullseye } from 'react-icons/bs'
import type { Service, Student } from '@/types'
import ServiceCard from '@/components/ServiceCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import LoadingSpinner from '@/components/LoadingSpinner'

export const Route = createFileRoute('/_unprotected/students/$studentId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { studentId } = Route.useParams()
  const [student, setStudent] = useState<Student | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const [studentResponse, servicesResponse] = await Promise.all([
          axios.get(`http://localhost:8000/api/students/${studentId}`),
          axios.get(`http://localhost:8000/api/services/${studentId}`),
        ])

        setStudent(studentResponse.data.data)
        setServices(servicesResponse.data.data)
        setLoading(false)
      } catch (err) {
        setError('Erreur lors du chargement des données.')
        setLoading(false)
      }
    }

    fetchStudentData()
  }, [studentId])

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !student) {
    return (
      <div className="min-h-screen overflow-y-hidden flex justify-center items-center text-primary-500">
        {error || 'Étudiant introuvable.'}
      </div>
    )
  }

  const profileImage =
    student.sexe.toLocaleLowerCase() === 'masculin' ? MenImage : WomenImage

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="bg-gradient-to-r from-primary-800 to-primary-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link
            to="/students"
            className="flex items-center text-white hover:text-blue-100 mb-4"
          >
            <HiArrowLeft className="w-5 h-5 mr-2" />
            Retour à la liste
          </Link>

          <div className="flex items-center space-x-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img
                src={profileImage}
                alt="Profil"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-1">{student.name}</h1>
              <p className="text-xl text-blue-100 mb-2">
                {student.classe} • Niveau {student.niveau}/5
              </p>
              <div className="flex flex-col md:flex-row md:space-x-4 text-blue-100 space-y-2 md:space-y-0">
                {student.email && (
                  <div className="flex items-center">
                    <MdEmail className="w-5 h-5 mr-2" />
                    <span>{student.email}</span>
                  </div>
                )}
                {student.phone_number && (
                  <div className="flex items-center">
                    <MdPhone className="w-5 h-5 mr-2" />
                    <span>{student.phone_number}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
        {student.bio && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              🧑‍🎓 À propos
            </h3>
            <p className="text-gray-600 leading-relaxed">{student.bio}</p>
          </div>
        )}

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-yellow-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <BsBullseye className="w-6 h-6 mr-2 text-orange-500" />
            Compétence Principale
          </h2>
          <div className="bg-white rounded-xl p-4 border-l-4 border-orange-400">
            <p className="text-lg text-gray-800 font-medium">
              {student.competence}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FiBookOpen className="w-6 h-6 mr-2 text-primary-500" />
            Compétences Clés
          </h2>
          <div className="flex flex-wrap gap-3">
            {student.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-primary-700 to-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {services?.length ? (
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaGraduationCap className="w-6 h-6 mr-2 text-primary-500" />
              Services Proposés
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
