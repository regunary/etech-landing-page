// src/features/home/SolutionsSection/SolutionLayout.tsx
import React from 'react'

interface SolutionLayoutProps {
  id?: string
  badge?: string
  title: React.ReactNode
  description: React.ReactNode
  reverse?: boolean // True: Ảnh phải, Chữ trái (Desktop)
  className?: string // Để chỉnh margin/height riêng cho từng section
  children: React.ReactNode // Chỗ để nhét khối hình ảnh (Illustration) vào
}

const SolutionLayout: React.FC<SolutionLayoutProps> = ({
  id,
  badge = 'Giải pháp cốt lõi',
  title,
  description,
  reverse = false,
  className = '',
  children
}) => {
  return (
    <section id={id} className='w-full bg-white'>
      <div
        className={`w-full mx-auto flex items-center justify-center px-4 sm:px-6 md:px-8 xl:px-[120px] ${className}`}
      >
        <div className='flex flex-col xl:flex-row items-center justify-center gap-6 sm:gap-8 xl:gap-16 w-full max-w-7xl'>
          {/* --- CỘT HÌNH ẢNH (ILLUSTRATION) --- */}

          <div
            className={`relative flex-1 w-full xl:max-w-2xl order-2 ${reverse ? 'xl:order-2' : 'xl:order-1'}`}
            data-aos={reverse ? 'fade-down-left' : 'fade-down-right'}
          >
            {children}
          </div>

          {/* --- CỘT NỘI DUNG (TEXT) --- */}
          <div
            className={`flex-1 w-full xl:max-w-2xl order-1 ${reverse ? 'xl:order-1' : 'xl:order-2'}`}
            data-aos={reverse ? 'fade-down-right' : 'fade-down-left'}
          >
            <div className='max-w-none sm:max-w-lg md:max-w-xl xl:max-w-xl text-center xl:text-left mx-auto xl:mx-0 px-2 sm:px-4 xl:px-0'>
              {/* Badge */}
              <div className='inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full mb-3 sm:mb-4'>
                {badge}
              </div>

              {/* Title */}
              <h2 className='text-xl sm:text-2xl md:text-[32px] xl:text-[40px] font-bold text-gray-900 !leading-normal mb-3 sm:mb-4'>
                {title}
              </h2>

              {/* Description */}
              <div className='text-xs sm:text-sm md:text-base xl:text-[16px] font-normal text-gray-600 leading-relaxed mb-4 sm:mb-6 md:mb-8 xl:mb-[48px]'>
                {description}
              </div>

              {/* Button */}
              <button className='inline-flex items-center gap-2 sm:gap-3 bg-teal-700 hover:bg-teal-800 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base rounded-full shadow transform transition-transform duration-300 hover:scale-105'>
                <span>Khám phá Giải pháp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SolutionLayout
