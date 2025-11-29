import React from 'react'
import iconMeg from '@assets/icons/ic-loudSpeaker.svg'

const RoadmapSession = () => {
  return (
    <section className='w-full bg-white'>
      <div
        className='w-full mx-auto px-4 sm:px-6 md:px-8 xl:px-[105px] pt-10 sm:pt-14 md:pt-16 xl:pt-[80px] pb-10 sm:pb-14 md:pb-16 xl:pb-[64px]'
        style={{
          height: 'auto',
          minHeight: '400px',
          maxHeight: '614px'
        }}
      >
        {/* FIX: Responsive heading - bỏ paddingLeft cố định */}
        <div className='mb-8 sm:mb-12 md:mb-14 xl:mb-[64px] text-center xl:text-left xl:pl-[100px]'>
          <div className='inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full mb-3 sm:mb-4'>
            Lộ trình chiến lược
          </div>

          <h2
            className='leading-tight text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[40px] max-w-4xl mx-auto xl:mx-0'
            style={{ fontWeight: 700 }}
          >
            <span className='text-teal-600 inline-block mb-3'>Công nghệ ETECHS –</span>
            <br />
            <span className='text-gray-800'>Đồng hành cùng Giáo dục và Doanh nghiệp</span>
          </h2>
        </div>

        {/* FIX: Cards container - responsive layout */}
        <div
          className='flex flex-col sm:flex-col md:flex-row xl:flex-row justify-center items-center md:items-stretch gap-6 sm:gap-8 md:gap-8 xl:gap-[24px] max-w-6xl mx-auto'
          data-aos='zoom-in-down'
        >
          {/* Card 1 - Education */}
          <div
            className='
                        w-full max-w-[320px] sm:max-w-[400px] md:w-1/2 md:max-w-none xl:w-[644px] 
                        rounded-2xl xl:rounded-[18px] shadow-md overflow-hidden relative
                        bg-white border border-gray-200
                        flex flex-col
                        transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
                    '
          >
            <div
              className='absolute inset-0 pointer-events-none rounded-2xl xl:rounded-[18px]'
              style={{
                background: `radial-gradient(circle 246px at top right, rgba(0, 255, 229, 0.49) 0%, transparent 100%)`
              }}
            />

            <div className='relative z-10 flex-1 flex flex-col p-4 sm:p-6 md:p-7 xl:p-[24px]'>
              <div className='w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-teal-700 flex items-center justify-center shadow-sm mb-3 sm:mb-4 xl:mb-3'>
                <img src={iconMeg} alt='icon' className='w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 xl:w-14 xl:h-14' />
              </div>

              <div className='text-gray-800 font-bold text-base sm:text-lg md:text-xl xl:text-[20px] mb-2 sm:mb-3 xl:mb-1'>
                Trong Giáo Dục
              </div>

              <div className='text-gray-500 font-normal text-[13px] sm:text-[14px] md:text-[15px] xl:text-[16px] leading-relaxed flex-1'>
                <ul className='list-disc list-inside space-y-1 sm:space-y-2 xl:space-y-1'>
                  <li>Hệ thống CDS cho trường học, trung tâm.</li>
                  <li>Quản lý đào tạo, học liệu, sinh viên, thư viện, ký túc xá.</li>
                  <li>Mạng lưới kết nối Student–Teacher–Parent.</li>
                  <li>Chatbot hỗ trợ học tập, AI trợ giảng, AI cố vấn.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 2 - Business */}
          <div
            className='
                        w-full max-w-[320px] sm:max-w-[400px] md:w-1/2 md:max-w-none xl:w-[644px]
                        rounded-2xl xl:rounded-[18px] shadow-md overflow-hidden relative
                        bg-white border border-gray-200
                        flex flex-col
                        transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
                    '
          >
            <div
              className='absolute inset-0 pointer-events-none rounded-2xl xl:rounded-[18px]'
              style={{
                background: `radial-gradient(circle 246px at top right, rgba(204, 255, 0, 0.41), transparent 100%)`
              }}
            />

            <div className='relative z-10 flex-1 flex flex-col p-4 sm:p-6 md:p-7 xl:p-[24px]'>
              <div className='w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-teal-700 flex items-center justify-center shadow-sm mb-3 sm:mb-4 xl:mb-3'>
                <img src={iconMeg} alt='icon' className='w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 xl:w-14 xl:h-14' />
              </div>

              <div className='text-gray-800 font-bold text-base sm:text-lg md:text-xl xl:text-[20px] mb-2 sm:mb-3 xl:mb-1'>
                Trong Doanh Nghiệp
              </div>

              <div className='text-gray-500 font-normal text-[13px] sm:text-[14px] md:text-[15px] xl:text-[16px] leading-relaxed flex-1'>
                <ul className='list-disc list-inside space-y-1 sm:space-y-2 xl:space-y-1'>
                  <li>Cầu nối social network ↔ hệ thống vận hành nội bộ.</li>
                  <li>Quản lý đơn hàng, kho bãi, logistics, chăm sóc khách hàng.</li>
                  <li>AI phân tích hành vi, dự báo nhu cầu, tối ưu marketing.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RoadmapSession
