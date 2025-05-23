import { Link } from '@tanstack/react-router'
import illustration from '../assets/illustration.png'

export default function HomeSection() {
  return (
    <section
      id="accueil"
      className="bg-[url('src/assets/home-bg.png')] bg-cover h-screen py-16 lg:py-0"
    >
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen">
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight animate-fade-in-up">
              <span className="bg-gradient-to-r from-primary-800 to bg-primary-600 inline-block text-transparent bg-clip-text">
                Student Skills
              </span>
              <span className="text-gray-900"> vous aide à montrer</span>
              <br />
              <span className="text-gray-900">ce que vous savez faire.</span>
            </h1>

            <p className="text-2xl text-gray-900 font-bold max-w-lg animate-fade-in-up-delay-1">
              Inspirez tous les étudiants.
            </p>

            <div className="pt-4 animate-fade-in-up-delay-2">
              <Link
                to="/signin"
                className="inline-block bg-linear-to-r from-primary-800 to-primary-600 text-white text-bred-900 px-6 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Commencez
              </Link>
            </div>
          </div>

          <div className="hidden md:block lg:w-1/2 justify-center lg:justify-end mt-12 lg:mt-0">
            <div className="relative animate-fade-in-up-delay-1">
              <img
                src={illustration}
                alt="Professional illustration"
                className="w-full max-w-md lg:max-w-lg object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
