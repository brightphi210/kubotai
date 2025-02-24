

import position1 from '../../assets/Vector 9.png'
import position2 from '../../assets/Vector 10.png'
import position3 from '../../assets/Vector 11.png'

import group1 from '../../assets/Group 13.png'
import group2 from '../../assets/Group 14.png'
import group3 from '../../assets/Group 15.png'
import { leaderData } from '@/Compnents/MockData'
const LeaderBoard = () => {
  return (
    <div className='p-5 text-sm overflow-y-scroll'>
        <div className='text-center pt-5'>
            <h2 className='text-3xl font-semibold'>Leaderboard</h2>
        </div>

        <div className='flex gap-8 p-5 pt-20'>
            <div className='relative pt-10'>
                <div className='absolute top-[-5px] z-10'>
                    <img src={group2} className='full' alt="" />
                </div>

                <div className='relative'>
                    <img src={position1} className='full' alt="" />
                    <div className='text-xs text-center absolute bottom-6 right-0 left-0'>
                        <h2 className='font-semibold'>Collins</h2>
                        <p className='text-[9px] pt-[1px]'>50,000 KA</p>
                    </div>
                </div>
            </div>

            <div className='relative '>
                <div className='absolute top-[-48px] z-10'>
                    <img src={group1} className='full' alt="" />
                </div>

                <div className='relative'>
                    <img src={position2} className='full' alt="" />
                    <div className='text-xs text-center absolute bottom-6 right-0 left-0'>
                        <h2 className='font-semibold'>iamkvisuals</h2>
                        <p className='text-[9px] pt-[1px]'>50,000 KA</p>
                    </div>
                </div>
            </div>

            <div className='relative pt-10'>
                <div className='absolute top-[-5px] z-10'>
                    <img src={group3} className='full' alt="" />
                </div>

                <div className='relative'>
                    <img src={position3} className='full' alt="" />
                    <div className='text-xs text-center absolute bottom-6 right-0 left-0'>
                        <h2 className='font-semibold'>Bright</h2>
                        <p className='text-[9px] pt-[1px]'>50,000 KA</p>
                    </div>
                </div>
            </div>
        </div>

        <div className='pb-24'>
            <div className='flex flex-col gap-4'>
                {leaderData.map((data)=>(
                    <div>
                        <div className='flex bg-neutral-100 p-3 rounded-md justify-between gap-4 items-center'>

                            <div className='flex items-center gap-4'>
                                <div className='flex overflow-hidden rounded-full object-cover w-10 h-10'>
                                    <img src={data?.avatar} className='w-full h-full object-cover' alt="" />
                                </div>
                                <div>
                                    <h2 className='font-semibold text-sm'>{data?.name}</h2>
                                    <p className='text-xs text-gray-500'>2022-02-14</p>
                                </div>
                            </div>
                            <div>
                                <p className='text-gray-500 text-xs'>{data?.price} Kubot</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default LeaderBoard