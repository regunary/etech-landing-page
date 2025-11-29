import React from 'react'
import HeroBanner from '@components/shared'
import bannerProducts from '@assets/banner-products.svg'

const ProductsBanner: React.FC = () => {
  return (
    <div className='mx-4 sm:mx-8 md:mx-12 lg:mx-16 my-8'>
      <HeroBanner
        className='min-h-[400px] sm:min-h-[500px] rounded-3xl'
        contentClassName='transition-all duration-700'
        maxWidth='max-w-7xl'
        title='ETECHS Products – Hệ sinh thái sản phẩm trí tuệ nhân tạo & chuyển đổi số'
        description='ETECHS xây dựng hệ sinh thái sản phẩm công nghệ hợp nhất giữa AI, dữ liệu lớn (Big Data), Blockchain và tự động hoá, giúp doanh nghiệp và tổ chức vận hành bằng trí tuệ – phát triển bằng dữ liệu.'
        backgroundImage={bannerProducts}
        primaryButton={{ text: 'Khám phá Giải pháp', href: '#solutions' }}
        secondaryButton={{ text: 'Hợp tác cùng ETECHS', href: '#contact' }}
        footerText='Thử ngay, hoàn toàn miễn phí'
      />
    </div>
  )
}

export default ProductsBanner
