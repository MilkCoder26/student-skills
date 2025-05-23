import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_unprotected/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white py-16">
      <div className="w-full max-w-lg px-6 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
          Enregistrez vous
        </h1>

        <form className="space-y-6">
          <div>
            <label
              className="block text-sm font-semibold text-gray-800 mb-2"
              htmlFor="lastname"
            >
              Nom
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Entrez votre nom"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
            />
          </div>

          <div>
            <label
              className="block text-sm font-semibold text-gray-800 mb-2"
              htmlFor="firstname"
            >
              Prénom
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Entrez votre prénom"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
            />
          </div>

          <div>
            <label
              className="block text-sm font-semibold text-gray-800 mb-2"
              htmlFor="classe"
            >
              Classe
            </label>
            <select
              name="classe"
              id="classe"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
            >
              <option value="">-- Sélectionnez une classe --</option>
              <option value="sddi">SDDI</option>
              <option value="srt">SRT</option>
              <option value="gc">GC</option>
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-semibold text-gray-800 mb-2"
              htmlFor="niveau"
            >
              Niveau
            </label>
            <select
              name="niveau"
              id="niveau"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
            >
              <option value="">-- Sélectionnez un niveau --</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

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
              placeholder="Entrez votre adresse email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
            />
          </div>

          <div>
            <label
              className="block text-sm font-semibold text-gray-800 mb-2"
              htmlFor="phoneNumber"
            >
              Numéro de téléphone Whatsapp
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Entrez votre numéro de téléphone"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
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
              placeholder="Entrez votre mot de passe"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
            />
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirmez votre mot de passe"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
            />
          </div>

          <div className="text-sm text-center text-gray-700 font-bold">
            Déjà un compte ?{' '}
            <a href="/signin" className="text-gray-600 font-medium">
              Connectez vous
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#0b0c2a] text-white font-semibold text-lg rounded-md hover:bg-[#1b1c3c] transition"
          >
            S'enregistrer
          </button>
        </form>
      </div>
    </section>
  )
}
