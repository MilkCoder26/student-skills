import StudentCard from '@/components/StudentCard'
import type { Student } from '@/types'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import LoadingSpinner from '@/components/LoadingSpinner'

export const Route = createFileRoute('/_unprotected/students/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedClasse, setSelectedClasse] = useState<string>('all')
  const [selectedNiveau, setSelectedNiveau] = useState<string>('all')
  const [selectedSexe, setSelectedSexe] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
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

    fetchStudents()
  }, [])

  const filteredStudents = students.filter((student) => {
    const matchesClasse =
      selectedClasse === 'all' || student.classe === selectedClasse
    const matchesNiveau =
      selectedNiveau === 'all' || student.niveau.toString() === selectedNiveau
    const matchesSexe =
      selectedSexe === 'all' || selectedSexe === student.sexe.toLowerCase()
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.competence.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesClasse && matchesNiveau && matchesSexe && matchesSearch
  })

  const clearFilters = () => {
    setSelectedClasse('all')
    setSelectedNiveau('all')
    setSelectedSexe('all')
    setSearchTerm('')
  }

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

  return (
    <section className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Tous les <span className="text-primary-600">Étudiants</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les profils d'étudiants talentueux et trouvez celui qui
            correspond à vos besoins.
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
                placeholder="Rechercher par nom ou compétence..."
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Classe filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Classe
              </label>
              <select
                value={selectedClasse}
                onChange={(e) => setSelectedClasse(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Toutes les classes</option>
                <option value="SDDI">SDDI</option>
                <option value="GC">GC</option>
                <option value="Réseaux & Télécoms">Réseaux & Télécoms</option>
              </select>
            </div>

            {/* Niveau filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveau
              </label>
              <select
                value={selectedNiveau}
                onChange={(e) => setSelectedNiveau(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tous les niveaux</option>
                <option value="1">Niveau 1</option>
                <option value="2">Niveau 2</option>
                <option value="3">Niveau 3</option>
                <option value="4">Niveau 4</option>
                <option value="5">Niveau 5</option>
              </select>
            </div>

            {/* Sexe filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sexe
              </label>
              <select
                value={selectedSexe}
                onChange={(e) => setSelectedSexe(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tous</option>
                <option value="masculin">Homme</option>
                <option value="féminin">Femme</option>
              </select>
            </div>

            {/* Clear filters button */}
            <div>
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-primary-600">
              {filteredStudents.length}
            </span>{' '}
            étudiant(s) trouvé(s)
          </p>
        </div>

        {/* Students grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>

        {/* No results message */}
        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-4">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.137 0-4.146.832-5.657 2.343m0 0L3.515 20.485M21.485 3.515L3.515 20.485"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              Aucun étudiant trouvé
            </h3>
            <p className="text-gray-500 mb-4">
              Essayez de modifier vos critères de recherche
            </p>
            <button
              onClick={clearFilters}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Voir tous les étudiants
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
