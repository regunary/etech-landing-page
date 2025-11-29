import React from 'react'
import HeroSvg from '@assets/cards/ai2.svg?react'
import ellipseStarWebp from '@assets/cards/ellipseStar.webp'
import EllipseSvg from '@assets/cards/blurGreen.png'

interface ImageLeftProps {
  id: string
  badge?: string
  title: string
  highlightText: string
  description: string
  features?: string[]
  HeroImage?: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | string
  EllipseStarImage?: string
  EclipImage?: string
  highlightFirst?: boolean
  cta_label?: string
  cta_link?: string
}

const ImageLeft: React.FC<ImageLeftProps> = ({
  badge = 'Giải pháp cốt lõi',
  title,
  highlightText,
  description,
  features = [],
  HeroImage = HeroSvg,
  EllipseStarImage = ellipseStarWebp,
  EclipImage = EllipseSvg,
  highlightFirst = false,
  cta_label,
  cta_link
}) => {
  return (
    <section className='w-full bg-white relative overflow-hidden'>
      {/* Background SVGs */}
      <img
        src={EllipseStarImage}
        alt=''
        className='absolute left-0 top-0 h-full w-auto opacity-90 pointer-events-none'
      />
      <img src={EclipImage} alt='' className='absolute left-0 top-0 h-full w-auto opacity-90 pointer-events-none' />
      <div className='w-full mx-auto flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-[120px] min-h-[300px] md:min-h-[400px] xl:min-h-[600px]'>
        <div className='flex flex-col xl:flex-row items-center justify-center gap-6 sm:gap-8 xl:gap-16 w-full max-w-7xl relative'>
          {/* Image Column (Left) - Order 2 on mobile, 1 on XL */}
          <div className='relative flex-1 w-full xl:max-w-2xl order-2 xl:order-1' data-aos='fade-down-right'>
            <div className='group relative flex items-center justify-center xl:justify-start pl-0 xl:pl-12 py-6 sm:py-8 xl:py-0'>
              {typeof HeroImage === 'string' ? (
                <img
                  src={HeroImage}
                  alt='hero'
                  loading='lazy'
                  decoding='async'
                  className='hidden md:block relative z-10 w-[90%] max-w-[520px] h-auto sm:w-[80%] md:w-[90%] xl:w-[520px] max-h-[326px]
               object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105'
                />
              ) : (
                <HeroImage
                  className='hidden md:block relative z-10 w-[90%] max-w-[520px] h-auto sm:w-[80%] md:w-[90%] xl:w-[520px] max-h-[326px]
               object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105'
                />
              )}

              <div
                className='absolute right-2 top-2 sm:right-4 sm:top-4 md:right-6 md:top-6 xl:left-[360px] xl:top-10 
                              z-20 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'
              >
                <div className='bg-white rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-3 md:p-4 w-40 sm:w-48 md:w-56'>
                  <div className='text-xs text-gray-500 mb-1'>Hello Etechs!</div>
                  <div className='text-xs sm:text-sm text-gray-800'>Educational Technology Solutions ✨</div>
                  <div className='mt-1 sm:mt-2 md:mt-3 flex items-center gap-2 text-xs text-gray-400'>
                    <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
                    <span className='hidden sm:inline md:inline'>Active agent preview</span>
                    <span className='sm:hidden md:hidden'>Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Column (Right) - Order 1 on mobile, 2 on XL */}
          <div className='flex-1 w-full xl:max-w-2xl order-1 xl:order-2' data-aos='fade-down-left'>
            <div className='max-w-none sm:max-w-lg md:max-w-xl xl:max-w-xl text-center xl:text-left mx-auto xl:mx-0 px-2 sm:px-4 xl:px-0'>
              <div className='inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full mb-3 sm:mb-4'>
                {badge}
              </div>

              <h2 className='text-xl sm:text-2xl md:text-[32px] xl:text-[40px] font-bold text-gray-900 leading-[1.4] xl:leading-[1.3] mb-3 sm:mb-4'>
                {highlightFirst ? (
                  <>
                    <span className='text-teal-600'>{highlightText}</span> {title}
                  </>
                ) : (
                  <>
                    {title} <span className='text-teal-600'>{highlightText}</span>
                  </>
                )}
              </h2>

              <p className='text-xs sm:text-sm md:text-base xl:text-[16px] font-normal text-gray-600 leading-relaxed mb-1'>
                {description}
              </p>

              {features.length > 0 && (
                <ul className='text-xs sm:text-sm md:text-base xl:text-[16px] font-[400] text-gray-600 leading-relaxed mb-4 sm:mb-6 md:mb-8 xl:mb-[48px] space-y-2'>
                  {features.map((feature, index) => (
                    <li key={index} className='flex items-start gap-2'>
                      <span className='text-gray-400'>•</span>
                      <span className='font-[400]'>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              <button
                onClick={() => window.open(cta_link, '_blank')} // mở link mới
                className='inline-flex items-center gap-2 sm:gap-3 bg-teal-700 hover:bg-teal-800 text-white 
    px-3 sm:px-4 md:px-6 py-2 sm:py-2 md:py-3 
    text-xs sm:text-sm md:text-base 
    rounded-full shadow transform transition-transform duration-300 hover:scale-105'
              >
                {cta_label}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageLeft
