import React, { useEffect, useRef } from 'react'
import { futureCards } from './data/futureCards'

const FutureSection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null)
  const itemsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, futureCards.length)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) {
            el.classList.add('opacity-100', 'translate-y-0')
            el.classList.remove('opacity-0', 'translate-y-6')
          }
        })
      },
      { threshold: 0.15 }
    )
    itemsRef.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={containerRef}
      aria-labelledby='future-section-title'
      className='relative py-8 sm:py-12 md:py-16 overflow-hidden'
      style={{ minHeight: '600px' }}
    >
      <div
        className='absolute inset-0 -z-30'
        style={{
          background: 'linear-gradient(180deg, #175A5A 0%, #FFFFFF 100%)',
          width: '100%',
          height: '100%'
        }}
      />

      <div
        className='absolute left-1/2 -translate-x-1/2 -z-10 pointer-events-none'
        style={{
          top: 0,
          width: '90%',
          height: '92%',
          borderRadius: '30px',
          backgroundColor: 'rgba(255, 255, 255, 0.16)',
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.5) 1px, rgba(0,0,0,0) 1px)',
          backgroundSize: '15px 15px'
        }}
      />

      <div className='relative px-4 sm:px-6 md:px-8 lg:px-12'>
        <div className='text-center mb-6 sm:mb-8 px-4'>
          <h2 className='text-[32px] sm:text-[36px] md:text-[40px] lg:text-[40px] font-bold leading-tight text-white mb-4 mx-auto'>
            Kiến tạo tương lai số bằng <span className='text-yellow-300'>dữ liệu và trí tuệ nhân tạo</span>
          </h2>

          <p className='text-[14px] sm:text-[16px] md:text-[18px] lg:text-[18px] font-normal leading-relaxed text-white/80 max-w-[700px] mx-auto'>
            ETECHS là đơn vị R&D công nghệ chuyên sâu, tập trung vào dữ liệu và AI.
          </p>
        </div>

        <div className='flex flex-wrap justify-center gap-6' data-aos='flip-down'>
          {futureCards.map((c, i) => (
            <article
              key={c.title}
              ref={(el) => {
                itemsRef.current[i] = el
              }}
              className='opacity-0 translate-y-6 transform transition-all duration-500 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 flex flex-col items-start p-4 sm:p-6'
              style={{
                width: '384px',
                height: '222px'
              }}
            >
              <div className='w-14 h-14 rounded-full bg-emerald-700 flex items-center justify-center mb-4'>
                <img src={c.icon} alt='' className='w-14 h-14 object-contain' />
              </div>

              <h3 className='text-lg md:text-xl font-bold text-gray-900 mb-2'>{c.title}</h3>

              <p className='text-sm md:text-base text-gray-600'>{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FutureSection
