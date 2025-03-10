
import { useEffect, useState } from "react";
import WelcomeScreen from "./Compnents/WelcomeScreen"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllRoute from "./Routes/Route";
import BottomSheet from "./Compnents/BottomSheet";
import { TonConnectUIProvider } from "@tonconnect/ui-react"

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

function App() {
  const [user, setUser] = useState<{
    id: number
    first_name: string
    last_name?: string
    username?: string
    language_code?: string
    photo_url?: string
  } | null>(null)

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

  if (isLoading || !user) {
    return <WelcomeScreen />
  }

  return (
    <TonConnectUIProvider manifestUrl="https://brown-calm-koi-328.mypinata.cloud/ipfs/bafkreihisybjfal2vklw2tj74xfzhk4dafay45ezp7yjfhn46ak2c2a2qi">
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={
              <div>
                <AllRoute />
                <BottomSheet />
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </div>
    </TonConnectUIProvider>
  )
}

export default App

