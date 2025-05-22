export default function ContactSection() {
  return (
    <section className="py-16 bg-[url('src/assets/bubbles.svg')]">
      <div className="container mx-auto px-6">
        <h1 className="text-gray-900 text-5xl text-center font-extrabold mb-12">
          <span className="text-primary-800">C</span>ontactez-nous
        </h1>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Adresse</h2>
              <p>123 Rue de l'Innovation, Dakar, Sénégal</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Téléphone</h2>
              <p>+221 33 123 45 67</p>
            </div>
          </div>

          <div className="pt-4 animate-fade-in-up-delay-2 text-center">
            <a
              href="#"
              className="inline-block bg-linear-to-r from-primary-800 to-primary-600 text-white text-bred-900 px-6 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Envoyer un message
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
