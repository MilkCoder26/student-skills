import { Link } from '@tanstack/react-router'
import type { Student } from '../types'
import StudentCard from './StudentCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner'

export default function StudentSection() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/students')
      setStudents(response.data.data)
      setLoading(false)
    } catch (err) {
      setError('Erreur lors du chargement des étudiants.')
      setLoading(false)
    }
  }

  return (
    <section className="py-16 bg-[url('src/assets/bubbles.svg')]">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            <span className="text-primary-800">Q</span>uelques étudiants
          </h2>
        </div>

        {loading ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}

        <div className="pt-4 mt-12 animate-fade-in-up-delay-2 text-center">
          <Link
            to="/students"
            className="inline-block bg-linear-to-r from-primary-800 to-primary-600 text-white text-bred-900 px-6 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Voir tous les étudiants
          </Link>
        </div>
      </div>
    </section>
  )
}
