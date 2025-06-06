import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const aboutRef = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      e.preventDefault()
      const aboutSection = document.querySelector('#about')
      aboutSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMenuOpen(false)
    }

    const currentRef = aboutRef.current
    if (currentRef) {
      currentRef.addEventListener('click', handleClick)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('click', handleClick)
      }
    }
  }, [])

  return (
    <header className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link className="flex items-center gap-3 text-decoration-none" to="/">
          <div className="w-10 h-10 bg-primary-700 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">SS</span>
          </div>
          <span className="text-xl font-bold text-gray-900">
            Student Skills
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          <li>
            <a
              ref={aboutRef}
              href="#about"
              className="text-gray-900 hover:text-primary-600 font-bold transition-colors duration-200"
            >
              A propos
            </a>
          </li>
          <li>
            <Link
              to="/students"
              className="text-gray-900 hover:text-primary-600 font-bold transition-colors duration-200"
              activeProps={{
                style: {
                  color: 'oklch(45.9% 0.187 3.815)',
                },
              }}
            >
              Etudiants
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className="text-gray-900 hover:text-primary-600 font-bold transition-colors duration-200"
              activeProps={{
                style: {
                  color: 'oklch(45.9% 0.187 3.815)',
                },
              }}
            >
              Services
            </Link>
          </li>
          {/* <li>
            <Link
              to="#contact"
              className="text-gray-800 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Contact
            </Link>
          </li> */}
        </ul>
        <div className="flex items-center gap-4">
          <Link
            to="/signin"
            className="hidden md:block px-4 py-2 text-gray-900 border border-primary-950 rounded-lg hover:bg-gray-50 font-medium transition-all duration-200"
          >
            Se connecter
          </Link>
          <Link
            to="/signup"
            className="px-4 hidden md:block py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 font-medium transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            S'inscrire
          </Link>
        </div>

        <div className="md:hidden">
          <button
            id="mobile-menu-button"
            className="p-2 text-gray-600 hover:text-primary-600 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-gray-200 bg-white">
          <div className="px-6 py-4 space-y-4">
            <a
              ref={aboutRef}
              href="#about"
              className="block text-gray-900 hover:text-primary-600 font-medium"
            >
              A propos
            </a>
            <Link
              to="/students"
              className="block text-gray-900 hover:text-primary-600 font-medium"
            >
              Etudiants
            </Link>
            <Link
              to="/services"
              className="block text-gray-900 hover:text-primary-600 font-medium"
            >
              Services
            </Link>
            {/* <Link
              to="#contact"
              className="block text-gray-800 hover:text-primary-600 font-medium"
            >
              Contact
            </Link> */}
            <Link
              to="/signin"
              className="block text-gray-900 hover:text-primary-600 font-medium"
            >
              Se connecter
            </Link>
            <Link
              to="/signup"
              className="block text-gray-900 hover:text-primary-600 font-medium"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
