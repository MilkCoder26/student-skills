import { Link } from '@tanstack/react-router'
import Card from './AboutCard'

export default function AboutSection() {
  const topCards = [
    {
      id: 1,
      title: 'Creez vous un compte en moins de 2 minutes.',
      image: 'account',
      textColor: 'text-blue-800',
    },
    {
      id: 2,
      title: 'Offrez ou demandez un service.',
      image: 'job',
      textColor: 'text-purple-800',
    },
  ]

  const bottomCard = {
    id: 3,
    title: "C'est tout ! Vous avez votre service !",
    image: 'community',
    textColor: 'text-blue-700',
  }

  return (
    <section
      className="bg-[url('src/assets/bubbles.svg')] py-16 bg-cover min-h-screen  lg:py-0"
      id="about"
    >
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-gray-900 text-5xl text-center font-extrabold mb-12">
          <span className="text-primary-800">P</span>ar où commencer ?
        </h1>

        {/* Cards layout */}
        <div className="max-w-6xl mx-auto">
          {/* Top row: 2 cards horizontally */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {topCards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>

          {/* Bottom row: 1 card centered */}
          <div className="max-w-md mx-auto mb-10">
            <Card card={bottomCard} />
          </div>
        </div>
        <div className="pt-4 animate-fade-in-up-delay-2 text-center">
          <Link
            to="/signin"
            className="inline-block bg-linear-to-r from-primary-800 to-primary-600 text-white text-bred-900 px-6 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Commencez
          </Link>
        </div>
      </div>
    </section>
  )
}
