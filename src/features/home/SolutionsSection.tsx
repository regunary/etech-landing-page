// src/features/home/SolutionsSection/SolutionsSection.tsx
import React from 'react'
import SolutionLayout from './SolutionLayout'

// Imports Assets
import HeroSvg from '@assets/cards/ai.svg?react'
import EllipseSvg from '@assets/cards/ellipse.svg?react'
import BlurYellowImage from '@assets/cards/BlurYellow.png'
import AI4Image from '@assets/cards/ai4.png'
import HeroSvg3 from '@assets/cards/ai3.png'

const SolutionsSection: React.FC = () => {
  return (
    <>
      {/* Inject Animation Styles cho Solution 2 */}
      <style>{`
        @keyframes bubbleIn { 0% { opacity: 0; transform: translateY(8px) scale(.98); } 60% { opacity: 1; transform: translateY(-4px) scale(1.02); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes slideInRight { 0% { opacity: 0; transform: translateX(18px) scale(.99); } 100% { opacity: 1; transform: translateX(0) scale(1); } }
        .ani-bubble { animation: bubbleIn 360ms cubic-bezier(.2,.9,.3,1) forwards; }
        .ani-slide-right { animation: slideInRight 360ms cubic-bezier(.2,.9,.3,1) forwards; }
      `}</style>

      {/* ================= SOLUTION 1 ================= */}
      <SolutionLayout
        className='min-h-[250px] xl:h-[496px] mt-5'
        reverse={false}
        title={
          <>
            Biến Dữ Liệu <span className='text-teal-600'>Thành Trí Tuệ</span>
          </>
        }
        description='Từ dữ liệu rời rạc → hợp nhất thông tin → sinh trí thức → tạo trí tuệ nhân tạo. ETECHS xử lý dữ liệu toàn diện để hình thành tri thức có cấu trúc, phục vụ truy vấn, dự báo, và ra quyết định.'
      >
        {/* Phần Hình ảnh riêng của Sol 1 */}
        <div className='hidden xl:block w-full h-full relative'>
          <EllipseSvg className='absolute -left-40 top-1/2 -translate-y-1/2 w-[620px] h-[620px] object-cover opacity-90 pointer-events-none text-gray-200' />
          <div className='group relative flex items-center justify-start pl-12'>
            <HeroSvg className='relative z-10 w-[560px] h-[460px] max-w-none object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105' />
            {/* Tooltip */}
            <div className='absolute left-[360px] top-10 z-20 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
              <div className='bg-white rounded-2xl shadow-xl p-4 w-56'>
                <div className='text-xs text-gray-500 mb-1'>Hello Etechs!</div>
                <div className='text-sm text-gray-800'>Educational Technology Solutions ✨</div>
                <div className='mt-3 flex items-center gap-2 text-xs text-gray-400'>
                  <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
                  <span>Active agent preview</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SolutionLayout>

      {/* ================= SOLUTION 2 ================= */}
      <SolutionLayout
        className='min-h-[250px] xl:h-[620px] mt-5'
        reverse={true}
        title={
          <>
            Số Hóa Thực Thể – <span className='text-teal-600'>Xây Dựng Đối Tượng Số</span>
          </>
        }
        description='Thiết lập Ontology, meta-data, link-data, hợp nhất quy trình và tạo ra AI Agent – Chatbot – Workflow tự động hóa.'
      >
        {/* Phần Hình ảnh riêng của Sol 2 (Có Chat Animation) */}
        <div className='hidden md:block w-full h-full relative z-0'>
          <EllipseSvg className='absolute top-1/2 -translate-y-1/2 pointer-events-none object-cover text-gray-200 opacity-95 -left-48 w-[140%] h-[140%] scale-110 -z-10' />
          <img
            src={BlurYellowImage}
            alt='Blur'
            className='absolute top-1/2 -translate-y-1/2 pointer-events-none object-cover opacity-40 -right-32 w-[120%] h-[120%] scale-125 -z-10'
          />

          <div className='group relative w-full flex items-center justify-center mx-auto z-20'>
            <img
              src={AI4Image}
              alt='AI Solution'
              className='w-full h-full object-contain drop-shadow-xl transition-all duration-500 group-hover:scale-105'
            />

            {/* Chat Bubble Animation */}
            <div className='absolute right-6 top-6 z-30'>
              <div className='bg-white rounded-full px-4 py-2 shadow ani-bubble' style={{ animationDelay: '100ms' }}>
                <div className='flex items-center gap-2 text-sm font-medium text-gray-800'>
                  <span className='text-lg'>👋</span>
                  <span>Hello Etechs!</span>
                </div>
              </div>
            </div>
            {/* ...Thêm các bubble khác nếu cần... */}
          </div>
        </div>
      </SolutionLayout>

      {/* ================= SOLUTION 3 ================= */}
      <SolutionLayout
        className='min-h-[250px] xl:h-[520px] mt-5 mb-20'
        reverse={false} // Ảnh trái
        title={
          <>
            Kết Nối <span className='text-teal-600'>Mọi Mạng Lưới</span>
          </>
        }
        description={
          <>
            <p className='mb-3'>Cá nhân hoá người dùng dưới dạng đồ thị tri thức, kết nối người – dữ liệu – dịch vụ:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>Mạng lưới giáo dục (Teacher – Student – Parent)</li>
              <li>Mạng lưới doanh nghiệp (Customer – Vendor – Partner)</li>
            </ul>
          </>
        }
      >
        {/* Phần Hình ảnh riêng của Sol 3 */}
        <div className='hidden md:block w-full h-full relative'>
          <EllipseSvg className='absolute -left-40 top-1/2 -translate-y-1/2 w-[620px] h-[620px] object-cover opacity-90 pointer-events-none text-gray-200' />
          <div className='group relative flex items-center justify-start pl-12'>
            <img
              src={HeroSvg3}
              alt='Solution 3'
              className='relative z-10 w-[560px] h-[460px] max-w-none object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105'
            />
            {/* Tooltip */}
            <div className='absolute left-[360px] top-10 z-20 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
              <div className='bg-white rounded-2xl shadow-xl p-4 w-56'>
                <div className='text-xs text-gray-500 mb-1'>Hello Etechs!</div>
                <div className='text-sm text-gray-800'>Educational Technology Solutions ✨</div>
                <div className='mt-3 flex items-center gap-2 text-xs text-gray-400'>
                  <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
                  <span>Active agent preview</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SolutionLayout>
    </>
  )
}

export default SolutionsSection
