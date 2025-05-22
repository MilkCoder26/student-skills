import { Link } from '@tanstack/react-router'
import type { Service } from './ServiceCard'
import ServiceCard from './ServiceCard'

export default function ServiceSection() {
  const services: Service[] = [
    {
      id: 1,
      title: 'Développement Web',
      description:
        'Création de sites web modernes et responsives avec les dernières technologies',
      price: '499',
      studentName: 'Tenena SEKONGO',
      category: 'web',
      priceRange: '2000-5000',
    },
    {
      id: 2,
      title: 'Application Mobile',
      description:
        "Développement d'applications mobiles natives pour iOS et Android",
      price: '899',
      studentName: 'Marie DUBOIS',
      category: 'web',
      priceRange: '2000-5000',
    },
    {
      id: 3,
      title: 'Design Graphique',
      description:
        "Création d'identités visuelles et supports de communication",
      price: '299',
      studentName: 'Ahmed HASSAN',
      category: 'web',
      priceRange: '2000-5000',
    },
  ]

  return (
    <section className="py-16 bg-[url('src/assets/bubbles.svg')]">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            <span className="text-primary-800">Q</span>uelques services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez des solutions proposées par des étudiants talentueux. Des
            services professionnels adaptés à vos besoins.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="pt-4 mt-12 animate-fade-in-up-delay-2 text-center">
          <Link
            to="/services"
            className="inline-block bg-linear-to-r from-primary-800 to-primary-600 text-white text-bred-900 px-6 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Voir tous les services
          </Link>
        </div>
      </div>
    </section>
  )
}
