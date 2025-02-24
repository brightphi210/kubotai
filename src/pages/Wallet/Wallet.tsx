
import { useState, useEffect, useCallback } from "react"
import { useTonConnectUI } from "@tonconnect/ui-react"
import { MainButton } from "../../Compnents/CustomButton"
import walleta from "../../assets/wallet.png"
import { SiTon } from "react-icons/si";
import { GoEye, GoEyeClosed } from "react-icons/go";
import {TiStarOutline } from "react-icons/ti";

              

const Wallet = () => {
  const [tonConnectUI] = useTonConnectUI()
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [showWallet, setShowWallet] = useState(false)

  const [user, setUser] = useState<{
    id: number
    first_name: string
    last_name?: string
    username?: string
    language_code?: string
    photo_url?: string
  } | null>(null)


  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const telegramUser = window.Telegram.WebApp.initDataUnsafe.user;
      if (telegramUser) {
        setUser(telegramUser);
      }
    }
  }, []);

  const handleWalletConnection = useCallback((address: string) => {
    setTonWalletAddress(address)
    console.log("Wallet connected successfully!")
    setIsLoading(false)
  }, [])

  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null)
    console.log("Wallet disconnected successfully!")
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address) {
        handleWalletConnection(tonConnectUI.account?.address)
      } else {
        handleWalletDisconnection()
      }
    }

    checkWalletConnection()

    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnection(wallet.account.address)
      } else {
        handleWalletDisconnection()
      }
    })

    return () => {
      unsubscribe()
    }
  }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection])

  const handleWalletAction = async () => {
    if (tonConnectUI.connected) {
      setIsLoading(true)
      await tonConnectUI.disconnect()
    } else {
      await tonConnectUI.openModal()
    }
  }

  // Function to format the wallet address
  const formatAddress = (address: string) => {
    if (address.length > 10) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`
    }
    return address
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <div className="p-5 text-sm overflow-y-scroll">
      <div className="text-center pt-5">
        <h2 className="text-3xl font-semibold">Wallet</h2>
        <p className="text-lg font-light text-neutral-500 pt-2">
          Connect your wallet <br />
          to claim rewards
        </p>
      </div>


        
      <div className="">
        {tonWalletAddress ? (
          <div className="mt-[3rem] bg-neutral-100 rounded-lg p-8">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex justify-center items-center rounded-full overflow-hidden">
                    <img src={user?.photo_url || "/placeholder.svg"} alt="user" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h2 className="text-sm font-semibold">{user?.first_name} {user?.last_name}</h2>
                    <p className="text-xs text-gray-500">@{user?.username}</p>
                </div>
            </div>
            <div className="bg-white p-3 px-6 mt-3 flex justify-between rounded-full">
                <p className="flex items-center gap-2"><SiTon className="text-3xl text-[#016FEC]"/>
                   {showWallet ? <> {formatAddress(tonWalletAddress)}</>: 
                    <p className="text-lg flex items-center gap-1 text-neutral-600">
                        <TiStarOutline /> 
                        <TiStarOutline  /> 
                        <TiStarOutline  /> 
                        <TiStarOutline  />
                        <TiStarOutline  />
                        <TiStarOutline  />
                    </p>
                    }
                </p>
                <p onClick={()=>setShowWallet(!showWallet)} className="flex text-blue-700 items-center rounded-full gap-2 text-2xl bg-neutral-100 w-fit p-2">
                    {showWallet ? <GoEye /> : <GoEyeClosed />}
                </p>
            </div>
          </div>
        ) : (
            <div className="flex justify-center m-auto w-[70%] pt-[7rem]">
                <img src={walleta || "/placeholder.svg"} alt="wallet" className="w-full" />
            </div>
        )}
      </div>

      <div className="w-full space-y-2 fixed bottom-[6rem] bg-white p-2">
        <div className="w-[90%]">
          <MainButton text={tonWalletAddress ? "Disconnect Wallet" : "Connect Wallet"} onClick={handleWalletAction} />
        </div>
      </div>
    </div>
  )
}

export default Wallet

