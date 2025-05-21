import type { Student } from './StudentCard'
import StudentCard from './StudentCard'

export default function StudentSection() {
  const students: Student[] = [
    {
      id: 1,
      name: 'Tenena SEKONGO',
      classe: 'SDDI',
      niveau: 4,
      competence: 'Développement site web',
      sexe: 'male',
      bgColor: 'bg-pink-200',
      skills: ['React', 'JavaScript', 'CSS'],
    },
    {
      id: 2,
      name: 'Marie DUBOIS',
      classe: 'SRII',
      niveau: 3,
      competence: 'Cybersécurité et réseaux',
      sexe: 'female',
      bgColor: 'bg-blue-200',
      skills: ['Sécurité', 'Réseaux', 'Linux'],
    },
    {
      id: 3,
      name: 'Ahmed HASSAN',
      classe: 'SLAM',
      niveau: 5,
      competence: 'Applications mobiles',
      sexe: 'male',
      bgColor: 'bg-green-200',
      skills: ['Flutter', 'Dart', 'Firebase'],
    },
  ]

  return (
    <section className="py-16 bg-[url('src/assets/bubbles.svg')]">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            <span className="text-primary-800">Q</span>uelques étudiants
          </h2>
        </div>

        {/* Students grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-primary-800 to-primary-600 text-white font-bold py-3 px-8 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Voir tous les étudiants
          </button>
        </div>
      </div>
    </section>
  )
}
