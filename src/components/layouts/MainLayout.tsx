import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import { useEffect, Suspense, lazy } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css'

const LazyFooter = lazy(() => import('./Footer'))

const MainLayout = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 1500,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true
    })
  }, [])

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 w-full p-0'>
        <Outlet />
      </main>
      <Suspense fallback={<div className='h-16'></div>}>
        <LazyFooter />
      </Suspense>
    </div>
  )
}

export default MainLayout
