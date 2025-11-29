import React, { useEffect, useRef } from 'react'

import { solutionCards } from './data/SolutionCards'
import unionBg from '@assets/cards/UnionSolution.webp'

const CoreSolution: React.FC = () => {
  const itemsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.add('opacity-100', 'translate-y-0')
            el.classList.remove('opacity-0', 'translate-y-6')
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.15 }
    )

    const currentItems = itemsRef.current.filter((el): el is HTMLElement => el !== null)
    currentItems.forEach((el) => io.observe(el))

    return () => {
      currentItems.forEach((el) => io.unobserve(el))
      io.disconnect()
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className='relative w-full bg-white py-20 md:py-24 lg:py-28 overflow-hidden'>
      {/* Background SVG */}
      <div className='absolute inset-0 flex items-start justify-center pointer-events-none'>
        <img src={unionBg} alt='' className='w-full max-w-7xl h-auto opacity-90' aria-hidden='true' />
      </div>

      {/* Content */}
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12'>
        <header className='flex flex-col items-center gap-4 text-center mb-12 md:mb-16'>
          <span className='inline-block bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full'>
            Giải pháp cốt lõi
          </span>

          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight'>
            Ba trụ cột giải pháp của <span className='text-teal-600'>ETECHS</span>
          </h2>
        </header>

        {/* Cards Grid */}
        <div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 md:mb-16 justify-items-center'
          data-aos='zoom-out-down'
        >
          {solutionCards.map((card, index) => (
            <article
              key={card.title}
              ref={(el) => {
                itemsRef.current[index] = el
              }}
              className={`opacity-0 translate-y-6 transition-all duration-500 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 flex flex-col items-center text-center p-8 border border-gray-100 w-full max-w-sm ${
                index === 2 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className='w-16 h-16 flex-shrink-0 mb-4'>
                <img src={card.icon} alt='' className='w-full h-full object-contain' />
              </div>

              <h3 className='text-xl font-bold text-gray-900 mb-3 whitespace-pre-line'>{card.title}</h3>

              <p className='text-sm text-gray-500 leading-relaxed'>{card.description}</p>
            </article>
          ))}
        </div>

        <div className='flex justify-center'>
          <button
            onClick={scrollToTop}
            className='inline-flex items-center gap-3 bg-teal-700 hover:bg-teal-800 text-white px-8 py-3 text-sm font-medium rounded-full shadow-lg transition-transform duration-300 hover:scale-105'
          >
            Khám phá Giải pháp
          </button>
        </div>
      </div>
    </section>
  )
}

export default CoreSolution
