import { createFileRoute } from '@tanstack/react-router'
import MenImage from '@/assets/men-profile.png'
import WomenImage from '@/assets/women-profile.png'
import { useState } from 'react'
import {
  MdEdit,
  MdSave,
  MdCancel,
  MdPerson,
  MdEmail,
  MdPhone,
  MdStar,
  MdAdd,
  MdClose,
} from 'react-icons/md'
import type { Student } from '@/components/StudentCard'

export const Route = createFileRoute('/_protected/dashboard/profile')({
  component: RouteComponent,
})

const mockStudent: Student = {
  id: 1,
  name: 'Ahmed Benali',
  classe: 'Génie Informatique',
  niveau: 3,
  competence: 'Développement Web',
  sexe: 'Homme',
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB'],
  email: 'ahmed.benali@student.ac.ma',
  phone: '+212 6 12 34 56 78',
  bio: "Étudiant passionné par le développement web et les nouvelles technologies. J'aime partager mes connaissances et apprendre de nouveaux concepts. Toujours prêt à relever de nouveaux défis !",
  services: [
    {
      id: 1,
      title: 'Cours de Mathématiques',
      description: 'Aide aux devoirs et préparation aux examens',
      price: '80',
      studentName: 'Ahmed Benali',
      category: 'Éducation',
      priceRange: '50-100',
    },
    {
      id: 2,
      title: 'Développement Web',
      description: 'Création de sites web avec React',
      price: '150',
      studentName: 'Ahmed Benali',
      category: 'Informatique',
      priceRange: '100-200',
    },
  ],
}

function RouteComponent() {
  const [student, setStudent] = useState<Student>(mockStudent)
  const [isEditing, setIsEditing] = useState(false)
  const [editedStudent, setEditedStudent] = useState<Student>(mockStudent)
  const [newSkill, setNewSkill] = useState('')

  const handleEdit = () => {
    setEditedStudent({ ...student })
    setIsEditing(true)
  }

  const handleSave = () => {
    setStudent({ ...editedStudent })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedStudent({ ...student })
    setIsEditing(false)
    setNewSkill('')
  }

  const handleInputChange = (field: keyof Student, value: string | number) => {
    setEditedStudent((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !editedStudent.skills.includes(newSkill.trim())) {
      setEditedStudent((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setEditedStudent((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addSkill()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
            <p className="text-gray-600 mt-2">
              Gérez vos informations personnelles et professionnelles
            </p>
          </div>

          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="bg-primary-900 hover:bg-primary-800 cursor-pointer text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-lg"
            >
              <MdEdit className="text-xl" />
              Modifier le profil
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-lg"
              >
                <MdSave className="text-xl" />
                Enregistrer
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-lg"
              >
                <MdCancel className="text-xl" />
                Annuler
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations personnelles */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <MdPerson className="text-primary-600" />
                Informations personnelles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedStudent.name}
                      onChange={(e) =>
                        handleInputChange('name', e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{student.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Classe
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedStudent.classe}
                      onChange={(e) =>
                        handleInputChange('classe', e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">
                      {student.classe}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Niveau
                  </label>
                  {isEditing ? (
                    <select
                      value={editedStudent.niveau}
                      onChange={(e) =>
                        handleInputChange('niveau', parseInt(e.target.value))
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5].map((niveau) => (
                        <option key={niveau} value={niveau}>
                          {niveau}ème année
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-gray-900 font-medium">
                      {student.niveau}ème année
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compétence principale
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedStudent.competence}
                      onChange={(e) =>
                        handleInputChange('competence', e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">
                      {student.competence}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <MdEmail className="text-primary-600" />
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedStudent.email || ''}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{student.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <MdPhone className="text-primary-600" />
                      Téléphone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedStudent.phone || ''}
                        onChange={(e) =>
                          handleInputChange('phone', e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{student.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  À propos de moi
                </label>
                {isEditing ? (
                  <textarea
                    value={editedStudent.bio || ''}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="Parlez-nous de vous, vos passions, vos objectifs..."
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">{student.bio}</p>
                )}
              </div>
            </div>

            {/* Compétences */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <MdStar className="text-yellow-500" />
                Mes compétences
              </h2>

              <div className="flex flex-wrap gap-3 mb-4">
                {(isEditing ? editedStudent.skills : student.skills).map(
                  (skill, index) => (
                    <span
                      key={index}
                      className={`px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium flex items-center gap-2 ${
                        isEditing ? 'pr-2' : ''
                      }`}
                    >
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => removeSkill(skill)}
                          className="text-primary-600 hover:text-primary-800 transition-colors"
                        >
                          <MdClose className="text-sm" />
                        </button>
                      )}
                    </span>
                  ),
                )}
              </div>

              {isEditing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ajouter une compétence..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  />
                  <button
                    onClick={addSkill}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    <MdAdd />
                    Ajouter
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Photo de profil */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  <img
                    src={student.sexe === 'Homme' ? MenImage : WomenImage}
                    alt="Student Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {student.name}
              </h3>
              <p className="text-gray-600">{student.classe}</p>
              <p className="text-sm text-gray-500 mt-1">
                {student.niveau}ème année
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
