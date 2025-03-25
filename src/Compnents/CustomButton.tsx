import React from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { TiStarOutline } from "react-icons/ti";


interface ButtonProps {
    text: string;
    onClick?: () => void;
}
export const MainButton:React.FC<ButtonProps> = ({text, onClick}) => {
  return (
    <div>
        <button className='bg-[#016FEC] py-4 w-full text-xs text-white rounded-lg font-semibold' onClick={onClick}>{text}</button>
    </div>
  )
}


export const MainButtonDisable:React.FC<ButtonProps> = ({text, onClick}) => {
    return (
      <div>
          <button className='bg-neutral-100 py-4 w-full text-xs text-neutral-400 border border-neutral-200 cursor-not-allowed rounded-lg font-semibold' onClick={onClick}>{text}</button>
      </div>
    )
}

export const MainButtonLight:React.FC<ButtonProps> = ({text, onClick}) => {
    return (
      <div>
          <button className='text-[#016FEC] px-4 border border-blue-300  flex items-center gap-2 py-4 w-full text-xs bg-blue-50 rounded-lg font-semibold' onClick={onClick}>
            <>
                <TiStarOutline className='text-lg'/>
                {text}
            </>
            <FaAngleRight className='ml-auto text-base'/>
          </button>
      </div>
    )
  }


export const RoundedSolidButton:React.FC<ButtonProps> = ({text, onClick}) => {
    return (
      <div>
        <button className='bg-[#016FEC] font-medium text-xs text-white p-2 px-4 rounded-full' onClick={onClick}>{text}</button>
      </div>
    )
}

export const RoundedSolidButtonFull:React.FC<ButtonProps> = ({text, onClick}) => {
  return (
    <div className='w-full'>
      <button className='bg-[#016FEC] font-medium text-xs text-white p-3 rounded-full !w-full' onClick={onClick}>{text}</button>
    </div>
  )
}

export const RoundedButtonFull:React.FC<ButtonProps> = ({text, onClick}) => {
  return (
    <div className='w-full'>
        <button className='bg-blue-50 border-2 border-blue-400 font-medium text-xs text-[#016FEC] p-3 rounded-full !w-full' onClick={onClick}>{text}</button>
    </div>
  )
}




export const RoundedButton:React.FC<ButtonProps> = ({text, onClick}) => {
  return (
    <div>
        <button className='bg-blue-100 font-light text-xs text-[#016FEC] p-2 px-4 rounded-full' onClick={onClick}>{text}</button>
    </div>
  )
}
