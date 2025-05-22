import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import MenImage from '../../assets/men-profile.png'
import WomenImage from '../../assets/women-profile.png'
import { HiArrowLeft } from 'react-icons/hi'
import { MdEmail, MdPhone } from 'react-icons/md'
import { FaGraduationCap } from 'react-icons/fa'
import { FiBookOpen } from 'react-icons/fi'
import { BsBullseye } from 'react-icons/bs'
import type { Student } from '@/components/StudentCard'
import ServiceCard from '@/components/ServiceCard'

const mockStudents: Student[] = [
  {
    id: 1,
    name: 'Jean Dupont',
    classe: 'SDDI',
    niveau: 3,
    sexe: 'male',
    competence: 'Développement web',
    skills: ['React', 'Node.js', 'UI/UX'],
    email: 'jean.dupont@school.fr',
    phone: '+33 6 12 34 56 78',
    bio: 'Étudiant passionné par le développement et le design d’interfaces intuitives.',
    services: [
      {
        id: 1,
        title: 'Cours de Mathématiques',
        studentName: 'Jean Dupont',
        description:
          'Soutien scolaire en mathématiques pour tous niveaux. Algèbre, géométrie, analyse et statistiques.',
        price: '25',
        category: 'Soutien scolaire',
        priceRange: '20-30',
      },
      {
        id: 2,
        title: 'Aide aux devoirs',
        studentName: 'Jean Dupont',
        description:
          "Accompagnement personnalisé pour l'organisation du travail et la réalisation des devoirs.",
        price: '20',
        category: 'Éducation',
        priceRange: '15-25',
      },
    ],
  },
]

export const Route = createFileRoute('/students/$studentId')({
  component: RouteComponent,
})

function RouteComponent() {
  const id = useParams({
    from: '/students/$studentId',
    select: (p) => p.studentId,
  })
  const student = mockStudents.find((s) => s.id.toString() === id)

  if (!student) {
    return (
      <div className="min-h-screen overflow-y-hidden flex justify-center items-center text-primary-500">
        Étudiant introuvable.
      </div>
    )
  }

  const profileImage = student.sexe === 'male' ? MenImage : WomenImage

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="bg-gradient-to-r from-primary-600 to-primary-600 text-white shadow-lg">
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
                {student.phone && (
                  <div className="flex items-center">
                    <MdPhone className="w-5 h-5 mr-2" />
                    <span>{student.phone}</span>
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

        {student.services?.length ? (
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaGraduationCap className="w-6 h-6 mr-2 text-primary-500" />
              Services Proposés
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {student.services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
