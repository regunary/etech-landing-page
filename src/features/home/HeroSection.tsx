import React from 'react'
import HeroBanner from '@components/shared/index'
import heroBannerBg from '@assets/banner-hero.svg'

const HeroSection: React.FC = () => {
  return (
    <div className='-mt-[96px]'>
      <HeroBanner
        className='min-h-[70vh] sm:min-h-[600px] lg:min-h-[909px]'
        contentClassName='transition-all duration-700'
        title={
          <>
            Từ Dữ Liệu Đến Trí Tuệ –<span className='block'>Từ Kết Nối Đến Cách Mạng Số</span>
          </>
        }
        description='ETECHS tiên phong trong chuyển đổi số và trí tuệ nhân tạo, hợp nhất dữ liệu – quy trình – con người để kiến tạo hệ sinh thái số thông minh cho giáo dục và doanh nghiệp.'
        backgroundImage={heroBannerBg}
        showSkeleton
        showOverlay
        lazyParticles
        primaryButton={{ text: 'Khám phá Giải pháp', href: '#solutions' }}
        secondaryButton={{ text: 'Hợp tác cùng ETECHS', href: '#contact' }}
        footerText='Thử ngay, hoàn toàn miễn phí'
      />
    </div>
  )
}

export default HeroSection
