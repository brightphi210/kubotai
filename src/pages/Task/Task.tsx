import { RoundedButton, RoundedSolidButton } from '@/Compnents/CustomButton'
import { taskData } from '@/Compnents/MockData'
import { SiRakuten } from 'react-icons/si'

const Task = () => {
  return (
    <div className='p-5 text-sm'>
        <div className='text-center pt-5'>
            <h2 className='text-3xl font-semibold'>Task</h2>
            <p className='text-lg font-light text-neutral-500 pt-2'>
                Get Rewarded <br/> for  
                Completing a task
            </p>
        </div>

        <div className='bg-neutral-100 flex items-center mt-2 justify-between p-2 rounded-lg'>
            <div className='p-3 bg-blue-100 w-full rounded-lg'>
                <h2 className='text-center text-[#016FEC]'>Active </h2>
            </div>

            <div className='p-3 w-full rounded-xl'>
                <h2 className='text-center'>Completed </h2>
            </div>
        </div>

        <div className='mt-5 mb-24 bg-neutral-50 p-3 rounded-lg'>
        {
            taskData.map((data, index)=>(
                <div key={index} className='flex justify-between mb-5 pb-3 border-b border-neutral-200'>
                    <div className='flex gap-3 items-center'>
                        <p className='bg-neutral-100 border border-neutral-200 text-neutral-500 rounded-md p-3 text-base'><SiRakuten /></p>
                        <div>
                            <h3 className='text-[12px] font-semibold'>{data?.name}</h3>
                            <p className='text-gray-500 text-xs'>+{data?.price} Kubot</p>
                        </div>
                    </div>

                    <div>
                        {data?.completed === true ?
                            <RoundedButton text='Claim'/> :
                            <RoundedSolidButton text='Join'/>
                        }
                    </div>  
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default Task