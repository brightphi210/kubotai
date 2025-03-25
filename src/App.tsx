import { BrowserRouter, Route, Routes } from "react-router-dom"
import WelcomeScreen from "./Compnents/WelcomeScreen"
import AllRoute from "./Routes/Route"
import BottomSheet from "./Compnents/BottomSheet"
import { TonConnectUIProvider } from "@tonconnect/ui-react"
import QueryProvider from "./Providers/QueryProvider"
import { TelegramProvider, useTelegram } from "./Providers/TelegramContext"

function AppContent() {
  const { user, isLoading } = useTelegram()

  if (isLoading || !user) {
    return <WelcomeScreen />
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <div>
                <AllRoute />
                <BottomSheet />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function App() {
  return (
    <TelegramProvider>
      <QueryProvider>
        <TonConnectUIProvider manifestUrl="https://brown-calm-koi-328.mypinata.cloud/ipfs/bafkreihisybjfal2vklw2tj74xfzhk4dafay45ezp7yjfhn46ak2c2a2qi">
          <AppContent />
        </TonConnectUIProvider>
      </QueryProvider>
    </TelegramProvider>
  )
}

export default App

