import AccountImage from '../assets/create-account.png'
import ServiceImage from '../assets/offer-service.svg'
import CommunityImage from '../assets/finish.svg'

const Card = ({ card }: any) => {
  return (
    <div
      className={`rounded-lg shadow-md p-4 flex flex-col items-center relative overflow-hidden bg-white transition-all duration-300 hover:shadow-lg`}
    >
      <div className="w-sm mb-6 flex justify-center">
        {card.image === 'account' && (
          <img src={AccountImage} alt="Create Account illustration" />
        )}
        {card.image === 'job' && (
          <img src={ServiceImage} alt="Offer service illustration" />
        )}
        {card.image === 'community' && (
          <img src={CommunityImage} alt="Create Account illustration" />
        )}
      </div>
      <p className="text-center font-medium text-gray-800 text-lg">
        {card.id}. {card.title}
      </p>
    </div>
  )
}

export default Card
