import React, { JSX, useState, useEffect } from 'react'
import LogoFooter from '@assets/logo-etechs-white.svg'

const Footer: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Delay render until page loaded
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section)
  }

  const menuItems = {
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Affiliates', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Blog', href: '#' }
    ],
    compare: [
      { label: 'Hootsuite vs ETECHS', href: '#' },
      { label: 'Buffer vs ETECHS', href: '#' },
      { label: 'SpoutSocial vs ETECHS', href: '#' },
      { label: 'SocialPilot vs ETECHS', href: '#' },
      { label: 'Later vs ETECHS', href: '#' }
    ],
    tools: [
      { label: 'Image Quality Enhancer', href: '#' },
      { label: 'Image to Post Generator', href: '#' },
      { label: 'URL to Post Generator', href: '#' },
      { label: 'Post Idea Generator', href: '#' },
      { label: 'Business Profile Extractor', href: '#' }
    ]
  }

  const socialIcons = [
    { name: 'Instagram', icon: 'instagram' },
    { name: 'Facebook', icon: 'facebook' },
    { name: 'LinkedIn', icon: 'linkedin' },
    { name: 'X', icon: 'x' }
  ]

  const SocialIconSVG = ({ type }: { type: string }): JSX.Element => {
    const icons: Record<string, JSX.Element> = {
      instagram: (
        <svg viewBox='0 0 24 24' className='w-5 h-5' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <linearGradient id='instagramGradient' x1='2' y1='21' x2='22' y2='3' gradientUnits='userSpaceOnUse'>
              <stop offset='0' stopColor='#f09433' />
              <stop offset='0.25' stopColor='#e6683c' />
              <stop offset='0.5' stopColor='#dc2743' />
              <stop offset='0.75' stopColor='#cc2366' />
              <stop offset='1' stopColor='#bc1888' />
            </linearGradient>
          </defs>
          <path
            fill='url(#instagramGradient)'
            d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.646.069 4.85 0 3.204-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.646-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z'
          />
        </svg>
      ),
      facebook: (
        <svg viewBox='0 0 24 24' fill='#1877F2' className='w-5 h-5'>
          <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
        </svg>
      ),
      linkedin: (
        <svg viewBox='0 0 24 24' fill='#0A66C2' className='w-5 h-5'>
          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z' />
        </svg>
      ),
      x: (
        <svg viewBox='0 0 24 24' fill='white' className='w-4 h-4'>
          <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.6l-5.165-6.763-5.868 6.763h-3.306l7.73-8.835L2.818 2.25h6.63l4.678 6.185 5.318-6.185zM16.772 20.08h1.829L5.383 4.126H3.46l13.312 15.954z' />
        </svg>
      )
    }
    return icons[type] || <></>
  }

  const FooterLink = ({ href, label, className = '' }: { href: string; label: string; className?: string }) => (
    <a
      href={href}
      className={`text-white/80 hover:text-white hover:underline hover:decoration-white/50 underline-offset-4 transition-all duration-200 ${className}`}
    >
      {label}
    </a>
  )

  const MenuColumn = ({ label, items }: { label: string; items: typeof menuItems.company }) => (
    <div className='flex flex-col gap-4'>
      <h3 className='text-base font-bold text-white'>{label}</h3>
      <ul className='flex flex-col gap-3'>
        {items.map((item) => (
          <li key={item.label}>
            <FooterLink href={item.href} label={item.label} className='text-base' />
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <footer
      className={`w-full text-white bg-[#0A2626] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12'>
        <div className='py-12 md:py-16 lg:py-20 flex flex-col md:flex-row gap-12 md:gap-12 lg:gap-20 xl:gap-32'>
          {/* --- LEFT --- */}
          <div className='flex flex-col items-center md:items-start gap-3 md:w-64 flex-shrink-0'>
            <a href='/' className='inline-flex items-center gap-2 hover:opacity-80 transition-opacity duration-300'>
              <img src={LogoFooter} alt='ETECHS Logo' className='h-12 w-auto' loading='lazy' width='auto' height='48' />
            </a>

            <div className='w-full md:w-auto'>
              <div className='flex flex-row items-center justify-center md:justify-start gap-3'>
                <h3 className='text-base font-bold text-white whitespace-nowrap md:hidden lg:block'>Follow us:</h3>
                <div className='flex items-center'>
                  {socialIcons.map((social) => (
                    <a
                      key={social.name}
                      href='#'
                      className='transition-all duration-300 p-2 rounded hover:bg-white/10 brightness-0 invert hover:filter-none'
                      title={social.name}
                      aria-label={social.name}
                    >
                      <SocialIconSVG type={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-2 items-center md:items-start'>
              <h3 className='text-base font-bold text-white'>In partnership with:</h3>
            </div>
          </div>

          {/* --- RIGHT --- */}
          <div className='hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-x-20 xl:gap-x-32 flex-grow pt-2'>
            {Object.entries({ company: 'Company', compare: 'Compare', tools: 'Free Tools' }).map(([key, label]) => (
              <MenuColumn key={key} label={label} items={menuItems[key as keyof typeof menuItems]} />
            ))}
          </div>

          {/* Mobile Accordion */}
          <div className='md:hidden w-full border-t border-white/10 mt-2'>
            {Object.entries({ company: 'Company', compare: 'Compare', tools: 'Free Tools' }).map(([key, label]) => (
              <div key={key} className='border-b border-white/10'>
                <button
                  onClick={() => toggleAccordion(key)}
                  className='bg-transparent focus:outline-none w-full flex items-center justify-between py-4 px-2 text-left text-base font-bold text-white hover:text-white transition-colors duration-200'
                  aria-expanded={openAccordion === key}
                  aria-label={`Toggle ${label} menu`}
                >
                  {label}
                  <span
                    className={`transform transition-transform duration-300 ${openAccordion === key ? 'rotate-180' : ''}`}
                    aria-hidden='true'
                  >
                    ▼
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${openAccordion === key ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <ul className='overflow-hidden pl-4 flex flex-col gap-3'>
                    {menuItems[key as keyof typeof menuItems].map((item) => (
                      <li key={item.label}>
                        <FooterLink href={item.href} label={item.label} className='text-sm block' />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className='w-full border-t border-white/20'>
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
            <div className='text-white/70 text-xs md:text-sm text-center sm:text-left'>
              © {new Date().getFullYear()} ETECHS | All Rights Reserved
            </div>
            <div className='flex items-center gap-4 flex-wrap justify-center'>
              <a href='#' className='text-white/70 hover:text-white text-xs md:text-sm transition-colors duration-200'>
                Sitemap
              </a>
              <span className='text-white/20'>•</span>
              <a href='#' className='text-white/70 hover:text-white text-xs md:text-sm transition-colors duration-200'>
                Privacy Policy
              </a>
              <span className='text-white/20'>•</span>
              <a href='#' className='text-white/70 hover:text-white text-xs md:text-sm transition-colors duration-200'>
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
