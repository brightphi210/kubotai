import { MainButton } from '@/Compnents/CustomButton'
import { friendsData } from '@/Compnents/MockData'
import { useState } from 'react'
import { PiEmptyLight } from "react-icons/pi";


const Friends = () => {

    const [isDataEmpty, setIsDataEmpty] = useState(false)

    const handleShow = () =>{
        setIsDataEmpty(true);
    }
  return (
    <div className='p-5 text-sm'>
        <div className='text-center pt-5'>
            <h2 className='text-4xl font-semibold'>Invite Friends</h2>
            <p className='text-lg font-light text-neutral-500 pt-2'>
            Earn 3% daily mining pool <br /> for every of your referrals
            </p>
        </div>

        {
            isDataEmpty !== false ?
            <div>
                <div className='bg-neutral-100 flex items-center mt-2 justify-between p-5 rounded-lg'>
                    <h2 className='text-center text-black text-sm'>Total </h2>
                    <h2 className='text-center text-black text-sm'>20 Referrals </h2>
                </div>

                <div className='mt-5 mb-32 bg-neutral-50 p-3 rounded-lg'>
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
                                <p className='text-neutral-600 text-sm font-medium'>+{data?.price} Kai</p>
                                <p className='text-green-600 text-xs text-right'>Recieved</p>
                            
                            </div>  
                        </div>
                    ))
                }
                </div>
            </div> :

            <div className='bg-neutral-100 mt-[10rem] p-5 justify-center flex items-center'>
                <div>
                    <PiEmptyLight />
                    <h2>There is no reward yet! Invite Friends and get more rewards.</h2>
                </div>
            </div>
        }


        <div className='w-full space-y-2 fixed bottom-[6rem] bg-white p-2'>
            <div className='w-[90%]'>
                <MainButton text='Copy Invite Link' onClick={handleShow}/>
            </div>
        </div>


    </div>
  )
}

export default Friends