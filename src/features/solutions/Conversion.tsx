import React from 'react'
import HeroBanner from '@components/shared'
import backgroundDot from '@assets/banner-solutions.svg'

const Conversion = () => {
  return (
    <div className='mx-4 sm:mx-8 md:mx-12 lg:mx-16 my-8'>
      <HeroBanner
        className='min-h-[400px] sm:min-h-[500px] rounded-3xl'
        contentClassName='transition-all duration-700'
        maxWidth='max-w-6xl'
        title={
          <>
            ETECHS Solutions –<span className='block'>Giải pháp chuyển đổi số thông minh</span>
          </>
        }
        description='ETECHS phát triển nền sinh thái giải pháp chuyển đổi số hợp nhất, kết nối dữ liệu – quy trình – con người thông qua AI, Big Data và tự động hoá.'
        backgroundImage={backgroundDot}
        primaryButton={{ text: 'Khám phá Giải pháp', href: '#' }}
        secondaryButton={{ text: 'Hợp tác cùng ETECHS', href: '#' }}
        footerText='Thử ngay, hoàn toàn miễn phí'
      />
    </div>
  )
}

export default Conversion
