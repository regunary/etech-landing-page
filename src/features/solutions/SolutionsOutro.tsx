import React, { useEffect, useRef } from 'react'
import Particles from '@tsparticles/react'

import benefitBg from '@assets/bgs/bg-2.svg'
import { useParticles } from './ParticlesConfig'

const SolutionsOutro: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const { particlesInit, particlesOptions } = useParticles()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add('opacity-100')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    if (contentRef.current) {
      observer.observe(contentRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className='relative w-full px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-24 lg:py-32'>
      <div className='relative w-full mx-auto rounded-[40px] overflow-hidden isolate'>
        {/* [ĐÃ SỬA] Background Image Layer 
            Thay inline style backgroundImage bằng thẻ img để tối ưu performance & SEO */}
        <div className='absolute inset-0 -z-20'>
          <img
            src={benefitBg}
            alt='Background solutions outro'
            className='w-full h-full object-cover object-center'
            loading='lazy'
          />
        </div>

        {/* Gradient Overlay Layer */}
        <div className='absolute inset-0 -z-10 bg-gradient-to-br from-teal-900/90 via-teal-800/80 to-teal-600/70 mix-blend-multiply' />

        {/* Particles Layer */}
        {particlesInit && (
          <div className='absolute inset-0 overflow-hidden rounded-[40px] z-0 pointer-events-none'>
            <Particles id='tsparticles-outro' options={particlesOptions} className='w-full h-full' />
          </div>
        )}

        {/* Content Layer */}
        <div
          ref={contentRef}
          className='relative z-10 flex flex-col items-center sm:items-start px-8 sm:px-12 md:px-20 lg:px-24 text-center sm:text-left gap-8 py-16 sm:py-20 md:py-24 lg:py-32 opacity-0 transition-opacity duration-1000 ease-out'
        >
          <span className='bg-amber-100 text-amber-800 text-xs font-semibold px-4 py-1.5 rounded-full'>
            Liên hệ ngay
          </span>

          <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl'>
            ETECHS - Kết nối dữ liệu,
            <br className='hidden sm:block' /> kiến tạo trí tuệ
          </h2>

          <p className='text-sm sm:text-base md:text-base lg:text-base text-white/90 max-w-3xl leading-relaxed'>
            Chúng tôi tin rằng chuyển đổi số không chỉ là kỹ thuật,
            <br />
            mà là hành trình chuyển hoá cách con người học, làm việc và sáng tạo.
          </p>

          <div className='flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center sm:items-start'>
            <button
              aria-label='Khám phá các giải pháp của ETECHS'
              className='bg-gray-800 hover:bg-gray-900 text-white font-medium px-8 py-4 rounded-full shadow-xl transition-all hover:scale-105 active:scale-100 w-full sm:w-auto text-sm sm:text-base'
            >
              Khám phá Giải pháp
            </button>

            <button
              onClick={scrollToContact}
              className='relative bg-[var(--color-secondary)] hover:bg-yellow-300 text-gray-900 font-semibold px-8 py-4 rounded-full shadow-xl ring-2 ring-white/50 backdrop-blur-sm transition-all hover:scale-105 active:scale-100 w-full sm:w-auto overflow-visible text-sm sm:text-base group'
              aria-label='Liên hệ hợp tác với ETECHS'
            >
              {/* Glow effect using Tailwind */}
              <span className='absolute inset-0 rounded-full shadow-[0_0_8px_4px_rgba(255,255,255,0.9)] blur-[2px] pointer-events-none' />
              <span className='relative z-10'>Hợp tác cùng ETECHS</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SolutionsOutro
