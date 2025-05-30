import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import axios from 'axios'
import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'

export const Route = createFileRoute('/_unprotected/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (email === 'malickdiene@esp.sn' && password === 'passer123') {
      const response = await axios.get('http://localhost:8000/api/students/1')
      const studentData = response.data.data

      localStorage.setItem('student', JSON.stringify(studentData))
      console.log('Logged in student:', studentData)
      navigate({ to: '/dashboard' })
    } else {
      setError('Email ou mot de passe incorrect')
      setIsLoading(false)
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-white py-16">
      <div className="w-full max-w-lg px-6 border border-gray-300 rounded-md shadow-lg py-16 mt-10">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
          Connectez vous
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Entrez vos informations et accédez à votre compte.
        </p>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-semibold text-gray-800 mb-2"
              htmlFor="email"
            >
              Adresse email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre adresse email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-semibold text-gray-800 mb-2"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
              required
            />
          </div>

          <div className="text-sm text-center text-gray-700 font-bold">
            Pas encore un compte ?{' '}
            <Link
              to="/signup"
              className="text-gray-600 font-medium text-decoration-none"
            >
              Inscrivez vous
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#0b0c2a] text-white font-semibold text-lg rounded-md hover:bg-[#1b1c3c] transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin h-5 w-5" />
            ) : (
              'Se connecter'
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
