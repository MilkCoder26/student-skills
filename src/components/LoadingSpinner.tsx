const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative w-24 h-24 rounded-full animate-spin bg-gradient-to-tr from-white/10 to-white/30 backdrop-blur-md shadow-lg">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-b-transparent border-white rounded-full"></div>
        <div className="absolute top-2 left-2 w-20 h-20 bg-primary-900 rounded-full blur-xl opacity-60"></div>
      </div>
    </div>
  )
}

export default LoadingSpinner
