import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logoEtechs from '../../assets/logo-etechs.svg'

const navItems = [
  { path: '/', label: 'Trang chủ' },
  { path: '/solutions', label: 'Giải pháp' },
  { path: '/products', label: 'Sản phẩm' },
  { path: '/services', label: 'Dịch vụ' },
  { path: '/news', label: 'Tin tức' },
  { path: '/about-us', label: 'Về chúng tôi' }
]

const Header: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled ? 'bg-white  py-2' : 'bg-white/95  xl:mt-[12px] xl:mx-[40px] xl:rounded-[12px]'
      }`}
      aria-label='Main header'
    >
      <div
        className={`flex items-center justify-between font-sans transition-all duration-300 ${
          isScrolled ? 'px-6 xl:px-[40px]' : 'px-6 py-3'
        }`}
      >
        <NavLink to='/' onClick={() => setOpen(false)} className='inline-flex items-center gap-3 flex-shrink-0'>
          <img src={logoEtechs} alt='ETECHS' className='h-8 xl:h-10 w-auto' />
        </NavLink>

        <nav className='hidden xl:flex items-center gap-4'>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className='px-3 py-2 rounded-md text-base flex items-center transition-all duration-300 relative group'
            >
              {({ isActive }) => (
                <>
                  <span
                    aria-hidden
                    className={`inline-block w-2 h-2 mr-2 rounded-sm transition-opacity duration-150`}
                    style={{
                      backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                      opacity: isActive ? 1 : 0
                    }}
                  />

                  <span
                    className={`transition-all duration-300 ${
                      isActive
                        ? 'font-semibold text-[var(--color-primary)]'
                        : 'font-normal text-[#787878] hover:text-[var(--color-primary)]'
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className='hidden xl:flex items-center gap-3 flex-shrink-0'>
          <NavLink
            to='/dang-nhap'
            className='px-5 py-2.5 rounded-full border border-[var(--color-primary)] text-base font-bold text-[var(--color-primary)] transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white'
          >
            Đăng nhập
          </NavLink>

          <NavLink
            to='/dang-ky-demo'
            className='px-5 py-2.5 rounded-full text-base font-bold shadow-sm bg-[var(--color-primary)] text-[var(--color-secondary)] transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg hover:text-white'
          >
            Đăng ký Demo
          </NavLink>
        </div>

        <button
          aria-label='Mở menu'
          className='xl:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors'
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
        >
          <svg className='w-6 h-6 text-gray-700' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            {open ? (
              <path strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            ) : (
              <path strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`fixed inset-y-0 right-0 w-[320px] bg-gradient-to-br from-white to-gray-50 shadow-xl transform transition-transform duration-300 ease-in-out z-50 xl:hidden ${
          open ? 'translate-x-0' : 'translate-x-[100%]'
        }`}
        role='dialog'
        aria-modal='true'
      >
        <div className='p-5 flex items-center justify-between border-b border-gray-100'>
          <NavLink to='/' className='inline-flex items-center' onClick={() => setOpen(false)}>
            <img src={logoEtechs} alt='ETECHS' className='h-9 w-auto' />
          </NavLink>
          <button
            aria-label='Đóng'
            onClick={() => setOpen(false)}
            className='p-2 rounded-full hover:bg-black/5 transition-colors'
          >
            <svg className='w-6 h-6 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        <div className='py-5 px-5 overflow-y-auto max-h-[calc(100vh-80px)]'>
          <nav className='flex flex-col'>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className='flex items-center py-3.5 transition-all duration-300 border-b border-gray-100/50 last:border-none relative group'
                onClick={() => setOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <span
                      aria-hidden
                      className={`inline-block w-2 h-2 mr-2 rounded-sm transition-opacity duration-150`}
                      style={{
                        backgroundColor: isActive ? 'var(--color-secondary)' : 'transparent',
                        opacity: isActive ? 1 : 0
                      }}
                    />
                    <span
                      className={`transition-all duration-300 ${
                        isActive
                          ? 'font-semibold text-[var(--color-primary)]'
                          : 'font-normal text-[#787878] hover:text-[var(--color-primary)]'
                      }`}
                    >
                      {item.label}
                    </span>
                    <span
                      className={`absolute inset-0 bg-yellow-50 rounded-md opacity-0 transition-opacity duration-300 ${
                        isActive ? 'opacity-20' : 'group-hover:opacity-10'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className='mt-8 flex flex-col gap-3'>
            <NavLink
              to='/dang-nhap'
              className='px-5 py-3 rounded-full border text-center text-[15px] font-bold transition-all border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white'
            >
              Đăng nhập
            </NavLink>

            <NavLink
              to='/dang-ky-demo'
              className='px-5 py-3 rounded-full text-center text-[15px] font-bold bg-[var(--color-primary)] text-[var(--color-secondary)] hover:shadow-lg transition-all'
            >
              Đăng ký Demo
            </NavLink>
          </div>
        </div>
      </div>

      {open && (
        <div
          className='fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 z-40 xl:hidden'
          onClick={() => setOpen(false)}
          aria-hidden='true'
        />
      )}
    </header>
  )
}

export default Header
