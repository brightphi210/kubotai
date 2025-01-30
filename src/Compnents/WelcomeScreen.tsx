import { useEffect, useState } from "react"

const WelcomeScreen = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-50">
      <h1
        className={`text-5xl font-bold  transition-opacity duration-1000 ease-in-out ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="animate-gradient tracking-tighter bg-gradient-to-r from-blue-500 via-violet-500 to-orange-500 bg-clip-text text-transparent">
          Kubit Ai
        </span>
      </h1>
    </div>
  )
}

export default WelcomeScreen