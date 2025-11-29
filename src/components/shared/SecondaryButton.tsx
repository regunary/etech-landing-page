import React from 'react'
import { ButtonProps } from './types'

const SecondaryButton: React.FC<ButtonProps> = ({ text, href, className = '' }) => {
  return (
    <a
      href={href}
      className={`group relative overflow-hidden text-[13px] sm:text-[16px] mx-auto sm:mx-0
                  px-6 py-2.5 rounded-full 
                  bg-secondary text-black font-semibold 
                  border-2 border-primary 
                  shadow-[0_0_15px_3px_#175A5A]
                  transition-all duration-300 
                  min-w-[180px]
                  hover:-translate-y-0.5 
                  hover:bg-white 
                  hover:shadow-[0_8px_20px_rgba(255,236,0,0.6)]
                  ${className}`}
    >
      <span className='relative z-10 group-hover:text-black transition-colors'>{text}</span>
      <span
        className='absolute inset-0 rounded-full 
                   opacity-60 group-hover:opacity-100 
                   transition-opacity duration-300 
                   -z-10 blur-sm
                   bg-[linear-gradient(45deg,#ebe9cf,#ebda75,#e4e4d6)] 
                   bg-[length:200%_200%] 
                   animate-borderGlow'
      />
    </a>
  )
}

export default SecondaryButton
