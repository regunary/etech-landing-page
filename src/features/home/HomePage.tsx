import { lazy, Suspense } from 'react'
import HeroSection from './HeroSection'

// Lazy load ALL sections below hero
const FutureSection = lazy(() => import('./FutureSection'))
const SolutionsSection = lazy(() => import('./SolutionsSection'))
const CoreValueSection = lazy(() => import('./CoreValuesSection'))
const StrategicSection = lazy(() => import('./StrategicSection'))
const NetworkSection = lazy(() => import('./NetworkSection'))

// Lightweight skeleton
const SectionSkeleton = () => (
  <div className='w-full min-h-[400px] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white'>
    <div className='w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin' />
  </div>
)

const HomePage = () => {
  return (
    <div>
      <HeroSection />

      {/* Lazy Load */}
      <Suspense fallback={<SectionSkeleton />}>
        <FutureSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <SolutionsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <CoreValueSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <StrategicSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <NetworkSection />
      </Suspense>
    </div>
  )
}

export default HomePage
