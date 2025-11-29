  import React from 'react'
  import { ButtonProps } from './types'

  const PrimaryButton: React.FC<ButtonProps> = ({ text, href, className = '' }) => {
    return (
      <a
        href={href}
        className={`group relative overflow-hidden text-[14px] sm:text-[16px] mx-auto sm:mx-0
                    px-7 py-3 rounded-full 
                    bg-[rgba(60,90,100,0.35)] backdrop-blur-sm border border-white/10
                    text-[#F2F2F2] font-semibold 
                    transition-all duration-300 
                    min-w-[200px]
                    hover:text-[#F2F2F2] visited:text-[#F2F2F2]
                    hover:-translate-y-0.5 
                    hover:border-[#38bdf8]/60 
                    hover:bg-[rgba(23,90,90,0.9)] 
                    hover:shadow-[0_8px_20px_rgba(56,189,248,0.4)]
                    ${className}`}
      >
        <span className='relative z-20 block'>{text}</span>
        <span
          className='absolute inset-0 rounded-full 
                    opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300 
                    -z-10 blur-md
                    bg-[linear-gradient(45deg,#237ea4,#1c8b66,#4997b9)] 
                    bg-[length:200%_200%] 
                    animate-borderGlow'
        />
      </a>
    )
  }

  export default PrimaryButton
