import { Link } from '@tanstack/react-router'
import MenImage from '../assets/men-profile.png'
import WomenImage from '../assets/women-profile.png'
import type { Student } from '../types'

const StudentCard = ({ student }: { student: Student }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 transform hover:-translate-y-2 border border-gray-100">
      {/* Avatar section - Réduite */}
      <div className="flex justify-center mb-3">
        <div className="relative w-20 h-20 rounded-full overflow-hidden">
          <img
            src={
              student.sexe.toLocaleLowerCase() === 'masculin'
                ? MenImage
                : WomenImage
            }
            alt="Student Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Student info - Compacte */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-800 mb-3">{student.name}</h3>

        {/* Info compacte en 2 colonnes */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-50 rounded-lg px-2 py-1">
            <span className="text-xs text-gray-600">Classe</span>
            <div className="text-sm font-bold text-blue-600">
              {student.classe}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg px-2 py-1">
            <span className="text-xs text-gray-600">Niveau</span>
            <div className="text-sm font-bold text-purple-600">
              {student.niveau}
            </div>
          </div>
        </div>

        {/* Compétence - Plus compacte */}
        <div className="mb-3">
          <p className="text-xs font-medium text-gray-600 mb-1">Compétence :</p>
          <p className="text-sm text-gray-800 bg-yellow-50 rounded-lg p-2 border-l-3 border-yellow-400">
            {student.competence}
          </p>
        </div>

        {/* Skills tags - Plus petites */}
        <div className="mb-3">
          <div className="flex flex-wrap justify-center gap-1">
            {student.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <Link
          to="/students/$studentId"
          params={{ studentId: student.id.toString() }}
          className="w-full inline-block text-center bg-primary-600 text-white font-medium py-2 px-3 rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
        >
          Voir le profil
        </Link>
      </div>
    </div>
  )
}

export default StudentCard
