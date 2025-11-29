import ImageLeft from './sections/ImageLeft'
import ImageRight from './sections/ImageRight'
import { lazy, Suspense } from 'react'
import { productSections } from './data/productData'
import ProductsBanner from './ProductsBanner'

const TripSection = lazy(() => import('@features/products/TripSection'))
const ProductPage = () => {
  return (
    <div>
      <div className='pt-[100px]' />
      <ProductsBanner />
      {productSections.map((section) =>
        section.type === 'left' ? (
          <ImageLeft
            id={section.id}
            badge={section.badge}
            title={section.title}
            highlightText={section.highlightText}
            description={section.description}
            features={section.features}
            HeroImage={section.image}
            highlightFirst={section.highlightFirst}
            cta_label={section.cta_label}
            cta_link={section.cta_link}
          />
        ) : (
          <ImageRight
            id={section.id}
            badge={section.badge}
            title={section.title}
            highlightText={section.highlightText}
            description={section.description}
            features={section.features}
            HeroImage={section.image}
            highlightFirst={section.highlightFirst}
            cta_label={section.cta_label}
            cta_link={section.cta_link}
          />
        )
      )}
      <Suspense fallback={<div className='h-screen bg-gray-100 animate-pulse' />}>
        <TripSection />
      </Suspense>{' '}
      <div className='pt-[100px]' />
    </div>
  )
}

export default ProductPage
