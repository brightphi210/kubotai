import { MainButtonIcon, MainButtonLoadingIcon } from '@/Compnents/CustomButton'
import { friendsData } from '@/Compnents/MockData'
import { useState } from 'react'
import { toast, ToastContainer } from "react-toastify"
import { IoCopyOutline } from "react-icons/io5";
import { useTelegram } from '@/Providers/TelegramContext';
import noData from '../../assets/no-data.png'
import useGetWalletDetails from '@/hooks/queries/useGetWalletDetails';


interface WalletData {
    id: number
    user: string
    eth_address: string
    balance: number,
    referral_id: string
}
const Friends = () => {

    const { user } = useTelegram()
    const [isDataEmpty, setIsDataEmpty] = useState(false)

    const handleShow = () =>{
        setIsDataEmpty(true);
    }

    // const {data: walletData, isLoading} = useGetWalletDetails({userName:  user?.username || 'brightscode'})
    const {data: walletData, isLoading} = useGetWalletDetails({userName:  user?.username || ''})
    const myWalletData = walletData?.data?.data as WalletData | undefined

    // console.log(`https://t.me/kuubot_bot?start=${myWalletData?.referral_id}`)

    const numberToCopy = `https://t.me/kuubot_bot?start=${myWalletData?.referral_id}`;

    const handleCopy = async () => {
        try {
        await navigator.clipboard.writeText(numberToCopy);
        toast.success("Link Copied")
        } catch (err) {
        console.error("Failed to copy!", err);
        }
    };
  return (
    <div className='p-5 text-sm bg-gray-100 h-screen overflow-y-scroll'>
        <div className='text-center pt-5'>
            <h2 className='text-2xl font-semibold'>Invite Friends</h2>
            <p className='text-sm font-light text-neutral-500 pt-2'>
                Earn 3% daily mining pool <br /> for every of your referrals
            </p>
        </div>
        <ToastContainer theme="light"  autoClose={3000} />


        {
            isDataEmpty !== false ?
            <div>
                <div className='bg-neutral-100 flex items-center mt-2 justify-between p-5 rounded-lg'>
                    <h2 className='text-center text-black text-sm'>Total </h2>
                    <h2 className='text-center text-black text-sm'>20 Referrals </h2>
                </div>

                <div className='mt-5 mb-48 bg-neutral-50 p-3 rounded-lg'>
                {
                    friendsData.map((data, index)=>(
                        <div key={index} className='flex justify-between mb-5 pb-3 border-b border-neutral-200'>
                            <div className='flex gap-3 items-center'>
                                <div className='w-10 h-10'>
                                    <img src={data?.avatar} alt={data?.name} className='w-full h-full object-cover rounded-md'/>
                                </div>
                                <div>
                                    <h3 className='text-[12px] font-semibold'>{data?.name}</h3>
                                    <p className='text-gray-500 text-xs'>{data?.date}</p>
                                </div>
                            </div>

                            <div>
                                <p className='text-neutral-600 text-sm font-medium'>+{data?.price} (ka)</p>
                                <p className='text-green-600 text-[10px] text-right'>Recieved</p>
                            
                            </div>  
                        </div>
                    ))
                }
                </div>
            </div> :

            <div className='mt-[3rem] h-[20rem] justify-center m-auto flex items-center'>
                <div className='text-center  flex flex-col gap-3 items-center justify-center'>
                    {/* <p className='text-6xl'><PiEmptyLight /></p> */}
                    <div className='w-24 m-auto justify-center flex'>
                        <img src={noData} alt="" />
                    </div>
                    <h2 onClick={handleShow} className='text-xs text-neutral-400'>Invite Friends and get more rewards.</h2>
                </div>
            </div>
        }


        <div className='w-full space-y-2 fixed bottom-[6rem] mb-2'>
            <div className='w-[90%] flex flex-col gap-2'>
                <p className='bg-white border border-gray-300 rounded-lg p-3.5 text-xs text-center'>https://t.me/kuubot_bot?start={myWalletData?.referral_id}</p>

                {isLoading ? 
                    <MainButtonLoadingIcon text='Copy Invite Link' />:
                    <MainButtonIcon text='Copy Invite Link' icon={<IoCopyOutline />} onClick={handleCopy}/>
                }
            </div>
        </div>

    </div>
  )
}

export default Friends