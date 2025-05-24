import { Link } from '@tanstack/react-router'
import { MdEdit, MdOutlineMiscellaneousServices } from 'react-icons/md'

export type Service = {
  id: number
  title: string
  description: string
  price: string
  studentName: string
  category: string
  priceRange: string
}

const ServiceCard = ({
  service,
  isOwner = false,
}: {
  service: Service
  isOwner?: boolean
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 transform hover:-translate-y-1 border border-gray-100 relative">
      {/* Badge pour mes services */}
      {isOwner && (
        <div className="absolute top-2 right-2 bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full font-medium">
          Mon service
        </div>
      )}

      {/* Bouton modifier pour mes services */}
      {isOwner && (
        <Link
          to="/dashboard/services/$serviceId"
          params={{ serviceId: service.id.toString() }}
          className="absolute top-2 left-2 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors duration-200 inline-block"
        >
          <MdEdit className="text-gray-600 text-sm" />
        </Link>
      )}

      {/* Service image */}
      <div className="mb-3 text-center mt-8">
        <MdOutlineMiscellaneousServices className="mx-auto text-4xl text-primary-500" />
      </div>

      {/* Service info */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {service.title}
        </h3>
        <p className="text-gray-600 mb-3 text-sm leading-relaxed">
          {service.description}
        </p>

        {/* Student name */}
        <div className="mb-3">
          <p className="text-xs text-gray-500">Proposé par</p>
          <p className="text-md font-medium text-primary-600">
            {service.studentName}
          </p>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-gray-800">
            {service.price}
          </span>
          <span className="text-gray-500 text-sm ml-1">DH</span>
        </div>

        {/* Action button */}
        {isOwner ? (
          <Link
            to="/dashboard/services/$serviceId"
            params={{ serviceId: service.id.toString() }}
            className="block w-full bg-gray-100 text-gray-800 hover:bg-gray-200 font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm text-center"
          >
            Gérer ce service
          </Link>
        ) : (
          <Link
            to="/services/$serviceId"
            params={{ serviceId: service.id.toString() }}
            className="block w-full bg-gray-100 text-gray-800 hover:bg-gray-200 font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm text-center"
          >
            Choisir ce service
          </Link>
        )}
      </div>
    </div>
  )
}

export default ServiceCard
