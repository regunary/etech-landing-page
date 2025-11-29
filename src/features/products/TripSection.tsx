import React from 'react'

import eclip from '@assets/cards/blurGreen.png'
import bgHeroSocialMedia from '@assets/journeySteps/socialMediaMarketing.png'

const steps = [
  { title: 'GĐ1 – Thiết lập', desc: 'Thời gian: 6 tháng • Hạ tầng, nhân sự, website, nghiên cứu ban đầu' },
  { title: 'GĐ2 – Thử nghiệm', desc: 'Thời gian: 6 tháng • Phát triển demo và dữ liệu thử nghiệm' },
  { title: 'GĐ3 – Xây dựng sản phẩm', desc: 'Thời gian: 6 tháng • Hệ thống AI & Data hoàn chỉnh' },
  { title: 'GĐ4 – Chuyển giao công nghệ', desc: 'Thời gian: 6 tháng • Ứng dụng thực tế cho giáo dục và doanh nghiệp' },
  { title: 'GĐ5 – Cộng đồng số', desc: 'Thời gian: 6 tháng • Nền tảng mở & mạng lưới kết nối xã hội' }
]

const TripSection = () => {
  return (
    <section className='w-full bg-white overflow-x-hidden'>
      <style>{`
        .step-item { transition: transform .22s ease, box-shadow .22s ease; }
        .step-item:hover { transform: translateX(8px); box-shadow: 0 18px 40px rgba(10,20,30,0.08); }
        .num-circle { width:36px; height:36px; border-radius:9999px; border:2px solid #e6e6e6; display:flex; align-items:center; justify-content:center; font-weight:600; color:#1f2937; background:#fff; }
        @media (max-width: 1024px) {
          .trip-container { flex-direction:column; gap:32px; height:auto; padding-bottom:40px; }
        }
      `}</style>
      <div
        className='
    relative w-full mx-auto px-4 sm:px-6 md:px-8 xl:px-[105px]       
    pt-10 sm:pt-14 md:pt-16 xl:pt-[80px]
    pb-10 sm:pb-14 md:pb-16 xl:pb-[64px]
    h-auto xl:h-[954px]
  '
      >
        <div className='mb-8 sm:mb-12 md:mb-14 xl:mb-[64px] flex flex-col items-center text-center px-4 sm:px-6 md:px-8 xl:px-0'>
          <div className='inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full mb-3 sm:mb-4'>
            Lộ trình chiến lược
          </div>
          <h2
            className='text-[30px] sm:text-[34px] md:text-[38px] xl:text-[40px] font-extrabold text-gray-800 leading-tight text-center'
            style={{ fontWeight: 700 }}
          >
            <span className='text-teal-600'>Hành trình 5 năm</span> – từ nghiên cứu <br className='hidden sm:block' />{' '}
            đến hệ sinh thái trí tuệ
          </h2>
        </div>

        <img
          src={eclip}
          alt='eclip'
          loading='lazy'
          decoding='async'
          className='absolute -left-20 sm:-left-24 md:-left-32 lg:-left-40 top-1/2 -translate-y-1/2 w-[200px] sm:w-[350px] md:w-[600px] lg:w-[820px] h-[200px] sm:h-[350px] md:h-[600px] lg:h-[820px] object-cover pointer-events-none opacity-95 z-0'
        />

        <div className='w-full flex flex-col md:flex-row items-start relative trip-container'>
          <div
            className=' hidden xl:block  relative flex items-center justify-center w-full lg:w-1/2 h-[586px] group z-10'
            data-aos='flip-left'
          >
            <img
              src={bgHeroSocialMedia}
              alt='hero'
              loading='lazy'
              decoding='async'
              className='w-full h-full object-contain transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:shadow-2xl group-hover:rounded-[15px]'
            />
          </div>

          <div
            className='w-full lg:w-1/2 flex flex-col items-start relative z-10 mt-8 lg:mt-[58px]'
            style={{ left: '0' }}
            data-aos='fade-left'
          >
            <div className='w-full max-w-[520px] flex flex-col relative lg:left-[100px]'>
              <div className='absolute left-4 top-0 bottom-[calc(20%)] border-l-2 border-dashed border-gray-300 hidden md:block' />

              {steps.map((s, idx) => (
                <div
                  key={idx}
                  className='flex items-start gap-4 sm:gap-6 mb-4 relative z-10 transition-transform duration-200 ease-in-out hover:scale-[1.05]'
                >
                  <div className='num-circle flex-none w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11'>{idx + 1}</div>
                  <div className='flex-1'>
                    <div className='font-semibold text-gray-800 text-[14px] sm:text-[15px] md:text-[16px]'>
                      {s.title}
                    </div>
                    <div className='mt-1 flex flex-col gap-1'>
                      <span className='text-gray-500 text-[12px] sm:text-[13px] md:text-[14px]'>
                        {s.desc.split('•')[0]}
                      </span>
                      {s.desc.split('•')[1] && (
                        <span className='text-gray-400 text-[12px] sm:text-[13px] md:text-[14px]'>
                          {s.desc.split('•')[1]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className='mt-4 sm:mt-6'>
                <button className='inline-flex items-center gap-3 bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-full shadow transform transition-transform duration-300 hover:scale-105'>
                  Hợp tác cùng Etechs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TripSection
