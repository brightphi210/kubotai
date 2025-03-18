"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// Move the global type declaration here
// You can also reference this in your global.d.ts file if you prefer
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string
        initDataUnsafe: {
          user?: {
            id: number
            first_name: string
            last_name?: string
            username?: string
            language_code?: string
            image?: string
          }
        }
      }
    }
  }
}

// Define the user type
type TelegramUser = {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  photo_url?: string
} | null

// Define the context type
interface TelegramContextType {
  user: TelegramUser
  isLoading: boolean
}

// Create the context with default values
const TelegramContext = createContext<TelegramContextType>({
  user: null,
  isLoading: true,
})

// Create a provider component
export function TelegramProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TelegramUser>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const telegramUser = window.Telegram.WebApp.initDataUnsafe.user
      if (telegramUser) {
        setUser(telegramUser)
      }
    }

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return <TelegramContext.Provider value={{ user, isLoading }}>{children}</TelegramContext.Provider>
}

// Create a custom hook to use the context
export function useTelegram() {
  const context = useContext(TelegramContext)
  if (context === undefined) {
    throw new Error("useTelegram must be used within a TelegramProvider")
  }
  return context
}

