import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white py-16">
      <div className="w-full max-w-lg px-6 border border-gray-300 rounded-md shadow-lg py-16 mt-10">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
          Connectez vous
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Entrez vos informations et accédez à votre compte.
        </p>

        <form className="space-y-6">
          <div>
            <label
              className="block text-sm font-semibold text-gray-800 mb-2"
              htmlFor="email"
            >
              Adresse email
            </label>
            <input
              type="text"
              name="username"
              id="email"
              placeholder="Entrez votre adresse email"
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
            className="w-full py-3 bg-[#0b0c2a] text-white font-semibold text-lg rounded-md hover:bg-[#1b1c3c] transition"
          >
            Se connecter
          </button>
        </form>
      </div>
    </section>
  )
}
