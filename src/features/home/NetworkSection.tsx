import React from 'react'
// Import SVG dạng Component
import IconMeg from '@assets/icons/ic-loudSpeaker.svg?react'
import circle from '@assets/cards/blurGreen.png'
import LogoEtechs from '@assets/logo-etechs-ETS.svg?react'

const networkData = {
  topCard: { title: 'Trí thức', desc: 'Dữ liệu – Quy trình – AI – Blockchain.' },
  middleCards: [
    { title: 'Giáo dục', desc: 'Học sinh – Giáo viên – Nhà trường.' },
    { title: 'Doanh nghiệp', desc: 'Khách hàng – Nhà cung cấp – Đối tác.' }
  ]
}

const NetworkSection = () => {
  return (
    <section className='relative overflow-hidden py-12 sm:py-16 md:py-20 min-h-[650px] md:min-h-[827px] xl:min-h-[942px]'>
      <div className='absolute inset-0 -z-30' />

      <div
        className='relative w-[92%] mx-auto rounded-[40px] overflow-hidden flex flex-col justify-start p-8 sm:p-10 md:p-12'
        style={{
          backgroundColor: '#FFFDE6',
          backgroundImage: 'radial-gradient(rgba(139,139,139,0.3) 1px, transparent 1px)',
          backgroundSize: '15px 15px',
          minHeight: '600px'
        }}
      >
        {/* Graphic trung tâm */}
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none'>
          <img
            src={circle}
            alt='ellipse'
            className='w-[80vw] max-w-[652px] md:w-[652px] aspect-square object-contain'
          />

          <div className='absolute inset-0 flex items-center justify-center'>
            <span className='absolute w-[80vw] max-w-[652px] h-[80vw] max-h-[652px] rounded-full border border-teal-400 opacity-70 animate-ripple-delay0'></span>
            <span className='absolute w-[80vw] max-w-[652px] h-[80vw] max-h-[652px] rounded-full border border-yellow-300 opacity-70 animate-ripple-delay1'></span>
            <span className='absolute w-[80vw] max-w-[652px] h-[80vw] max-h-[652px] rounded-full border border-gray-400 opacity-70 animate-ripple-delay2'></span>

            <div className='hidden md:block w-[30vw] max-w-[215px] md:w-[215px]'>
              <LogoEtechs className='w-full h-auto object-contain' />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12'>
          {/* Top Card */}
          <div className='flex justify-center mb-8 sm:mb-12 md:mb-16' data-aos='flip-left'>
            <NetworkCard title={networkData.topCard.title} desc={networkData.topCard.desc} />
          </div>

          {/* Middle Cards */}
          <div className='mb-12 sm:mb-16 md:mb-20 relative'>
            <div
              className='grid grid-cols-1 md:grid-cols-2 justify-items-center gap-8 md:gap-[550px]'
              data-aos='flip-left'
            >
              <NetworkCard title={networkData.middleCards[0].title} desc={networkData.middleCards[0].desc} />
              <NetworkCard title={networkData.middleCards[1].title} desc={networkData.middleCards[1].desc} />
            </div>
          </div>

          {/* Text Bottom */}
          <div className='text-center'>
            <h2 className='text-[40px] font-bold text-gray-800 mb-4 leading-tight'>
              Mạng lưới trí tuệ kết nối <br /> <span className='text-teal-600'>con người, dữ liệu và dịch vụ</span>
            </h2>
            <p className='text-[16px] mb-8 max-w-2xl mx-auto'>ETECHS kiến tạo mạng lưới kết nối đa tầng:</p>
            <div className='inline-block bg-teal-700 text-white px-6 py-3 rounded-[12px] shadow-lg text-[16px] font-medium transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer'>
              Tất cả hợp nhất trên một nền tảng duy nhất –
              <span className='text-yellow-300 font-bold'> ETECHS Intelligent Network</span>.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NetworkSection

// ==========================================
// Sub-component: Network Card
// ==========================================
const NetworkCard = ({ title, desc }: { title: string; desc: string }) => (
  <div className='w-[243.4px] h-[193px] bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300'>
    <IconMeg className='w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4' />

    <h3 className='text-lg sm:text-xl font-bold text-gray-800 mb-2'>{title}</h3>
    <p className='text-sm sm:text-base text-gray-600'>{desc}</p>
  </div>
)
