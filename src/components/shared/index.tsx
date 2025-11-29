import React, { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { HeroBannerProps } from './types'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'

const DataParticles = lazy(() => import('@features/home/data/DataParticles'))

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  description,
  badge,
  footerText,
  backgroundImage,
  backgroundAlt = 'Hero Background',
  showOverlay = false,
  overlayGradient,
  showParticles = true,
  lazyParticles = false,
  primaryButton,
  secondaryButton,
  className = '',
  contentClassName = '',
  maxWidth = 'max-w-5xl',
  showSkeleton = false
}) => {
  const [bgLoaded, setBgLoaded] = useState(false)
  const [particlesVisible, setParticlesVisible] = useState(!lazyParticles)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (lazyParticles) {
      const ob = new IntersectionObserver(([e]) => e.isIntersecting && setParticlesVisible(true), { threshold: 0.25 })
      if (sectionRef.current) ob.observe(sectionRef.current)
      return () => ob.disconnect()
    }
  }, [lazyParticles])

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden flex items-center justify-center z-0 ${className}`}
      aria-label='Hero Banner'
    >
      {/* Background Loading Skeleton */}
      {showSkeleton && !bgLoaded && <div className='absolute inset-0 -z-30 bg-[#0b1f3a] animate-pulse' />}

      {/* Background Image */}
      <img
        src={backgroundImage}
        alt={backgroundAlt}
        className={`absolute inset-0 -z-30 w-full h-full object-cover object-center 
                   contrast-[1.08] saturate-[1.18] brightness-[1.02]
                   transition-opacity duration-500 ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading='eager'
        fetchPriority='high'
        draggable={false}
        onLoad={() => setBgLoaded(true)}
      />

      {/* Overlay Gradient */}
      {showOverlay && (
        <div className='absolute inset-0 -z-20 pointer-events-none'>
          <div className='absolute inset-0 bg-[#0b1f3a]/35' />
          <div
            className='absolute inset-0'
            style={{
              background: overlayGradient || 'linear-gradient(to bottom, transparent, rgba(23,90,90,0) 75%, #175A5A)'
            }}
          />
        </div>
      )}

      {/* Data Particles */}
      {showParticles &&
        particlesVisible &&
        (lazyParticles ? (
          <Suspense fallback={null}>
            <DataParticles />
          </Suspense>
        ) : (
          <DataParticles />
        ))}

      {/* Content */}
      <div
        className={`container mx-auto px-6 sm:px-8 md:px-10 relative z-10 py-6 sm:py-8 ${contentClassName}`}
        data-aos='zoom-in-up'
      >
        <div className={`${maxWidth} items-center justify-center mx-auto text-center`}>
          {/* Badge */}
          {badge && (
            <div className='inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full mb-3 sm:mb-4 font-medium'>
              {badge}
            </div>
          )}

          {/* Title */}
          <h1 className='font-bold drop-shadow-lg text-[24px] md:text-[36px] lg:text-[64px] pt-[150px] lg:pt-0 text-[#F2F2F2] leading-[120%] font-sans'>
            {title}
          </h1>

          {/* Description */}
          {description && (
            <div className='hidden sm:block space-y-1 text-[16px] lg:text-[18px] mt-7 mb-7 font-light text-[#F2F2F2] leading-[120%]'>
              <p>{description}</p>
            </div>
          )}

          {/* CTA Buttons */}
          {(primaryButton || secondaryButton) && (
            <div className='flex flex-col sm:flex-row flex-wrap justify-center gap-2.5 sm:gap-4 mt-5 sm:mt-0'>
              {primaryButton && <PrimaryButton text={primaryButton.text} href={primaryButton.href} />}
              {secondaryButton && <SecondaryButton text={secondaryButton.text} href={secondaryButton.href} />}
            </div>
          )}

          {/* Footer Text */}
          {footerText && <p className='hidden sm:block mt-3 text-[14px] font-normal text-[#F2F2F2]'>{footerText}</p>}
        </div>
      </div>

      {/* Inline Styles */}
      <style>{`
        @keyframes borderGlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-borderGlow {
          animation: borderGlow 3s ease infinite;
        }
      `}</style>
    </section>
  )
}

export default HeroBanner
