import React from 'react'

import number1 from '@assets/journeySteps/1.svg'
import number2 from '@assets/journeySteps/2.svg'
import number3 from '@assets/journeySteps/3.svg'
import number4 from '@assets/journeySteps/4.svg'
import number5 from '@assets/journeySteps/5.svg'
import snake from '@assets/journeySteps/snake.svg'
import roadmap from '@assets/journeySteps/bg-roadmap.png'
import arrowDown from '@assets/journeySteps/arrow-down.svg'
import arrowUp from '@assets/journeySteps/arrow-top.svg'
import blurGreen from '@assets/cards/blurGreen.png'
import blurYellow from '@assets/cards/blurYellow.png'

const JourneySteps = () => {
  const steps = [
    {
      id: 1,
      image: number1,
      title: 'Thiết lập',
      description: 'Hạ tầng, nhân sự, website, nghiên cứu ban đầu',
      hasTopText: true
    },
    {
      id: 2,
      image: number2,
      title: 'Thử nghiệm',
      description: 'Phát triển demo và dữ liệu thử nghiệm',
      hasTopText: false
    },
    {
      id: 3,
      image: number3,
      title: 'Xây dựng sản phẩm',
      description: 'Hệ thống AI & Data hoàn chỉnh',
      hasTopText: true
    },
    {
      id: 4,
      image: number4,
      title: 'Chuyển giao công nghệ',
      description: 'Ứng dụng thực tế cho giáo dục và doanh nghiệp',
      hasTopText: false
    },
    {
      id: 5,
      image: number5,
      title: 'Cộng đồng số',
      description: 'Nền tảng mở và mạng lưới kết nối xã hội',
      hasTopText: true
    }
  ]

  return (
    <div className='w-full bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50 py-8 sm:py-12 md:py-16 lg:py-24 mt-[100px] sm:mt-[220px] md:mt-0'>
      <div className='text-center px-4 mb-6 sm:mb-8 lg:mb-8'>
        <div className='inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full mb-3 sm:mb-4'>
          Lộ trình chiến lược
        </div>
        <h2 className='text-xl sm:text-2xl md:text-[32px] xl:text-[40px] font-bold text-gray-900 leading-snug sm:leading-snug md:leading-snug mb-2 sm:mb-3'>
          <span className='text-teal-600'>Hành trình 5 năm</span> – từ nghiên cứu
          <br />
          <span className='inline-block'>đến hệ sinh thái trí tuệ</span>
        </h2>
      </div>

      <div className='relative w-full px-2 sm:px-4'>
        <div className='max-w-7xl mx-auto'>
          <div
            className='hidden lg:block relative w-full h-[618px] bg-center bg-no-repeat bg-contain'
            style={{
              backgroundImage: `url(${roadmap})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <img
              src={blurGreen}
              alt=''
              className='absolute left-[20%] top-1/2 w-[600px] h-[600px] -translate-y-1/2 pointer-events-none z-10 opacity-80'
            />
            <img
              src={blurYellow}
              alt=''
              className='absolute right-[10%] top-[60%] w-[600px] h-[600px] -translate-y-1/2 pointer-events-none z-0 opacity-70'
            />
            <div className='relative w-full h-full'>
              <div className='absolute top-[11%] left-0 right-0 flex justify-around px-[1%]'>
                {steps
                  .filter((step) => step.hasTopText)
                  .map((step) => (
                    <div
                      key={`top-${step.id}`}
                      className='flex flex-col items-center justify-between w-44 xl:w-60 h-[165px] group cursor-pointer'
                      data-aos='fade-down'
                    >
                      <div className='text-center'>
                        <h4 className='text-base xl:text-lg font-bold mb-2 leading-tight text-black transition-transform transition-colors duration-300 transform group-hover:text-primary group-hover:scale-105 group-hover:-translate-y-0.5'>
                          {step.title}
                        </h4>
                        <p className='text-sm xl:text-base text-gray-600 font-normal leading-relaxed transition-transform transition-colors duration-300 transform group-hover:text-primary group-hover:scale-102 group-hover:-translate-y-0.5'>
                          {step.description}
                        </p>
                      </div>
                      <img
                        src={arrowDown}
                        alt='Arrow Down'
                        className='transition-transform duration-300 group-hover:scale-110'
                      />
                    </div>
                  ))}
              </div>

              <div className='absolute top-1/2 left-0 right-0 -translate-y-1/2'>
                <div className='relative w-full h-[248px]'>
                  <img
                    src={snake}
                    alt='Journey path'
                    className='absolute inset-0 w-full h-full object-contain'
                    data-aos='flip-up'
                  />
                  <div className='absolute inset-0 flex justify-around items-center px-[9%]'>
                    {steps.map((step) => (
                      <div
                        key={`num-${step.id}`}
                        className='flex-shrink-0 transform hover:scale-110 transition-transform duration-300 '
                      >
                        <img
                          src={step.image}
                          alt={`Step ${step.id}`}
                          className='drop-shadow-2xl object-contain'
                          style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                          data-aos='zoom-in'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className='absolute bottom-[12%] left-0 right-0 flex justify-around px-[17%]'>
                {steps
                  .filter((step) => !step.hasTopText)
                  .map((step) => (
                    <div
                      key={`bottom-${step.id}`}
                      className='flex flex-col items-center w-44 xl:w-52 group cursor-pointer'
                      data-aos='fade-up'
                    >
                      <img
                        src={arrowUp}
                        alt='Arrow Up'
                        className='mb-4 mt-[4%] transition-transform duration-300 group-hover:scale-110'
                      />
                      <div className='text-center'>
                        <h4 className='text-base xl:text-lg font-bold text-gray-800 mb-2 leading-tight transition-transform transition-colors duration-300 transform group-hover:text-primary group-hover:scale-105 group-hover:-translate-y-0.5'>
                          {step.title}
                        </h4>
                        <p className='text-sm xl:text-base text-gray-600 font-normal leading-relaxed transition-transform transition-colors duration-300 transform group-hover:text-primary group-hover:scale-102 group-hover:-translate-y-0.5'>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className='hidden md:block lg:hidden'>
            <div
              className='relative w-full h-[480px] bg-center bg-no-repeat bg-contain'
              style={{
                backgroundImage: `url(${roadmap})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className='relative w-full h-full'>
                <div className='absolute top-[11%] left-0 right-0 flex justify-around px-[1%]'>
                  {steps
                    .filter((step) => step.hasTopText)
                    .map((step) => (
                      <div key={`ipad-top-${step.id}`} className='flex flex-col items-center w-32 group cursor-pointer'>
                        <div className='text-center mb-3'>
                          <h4 className='text-sm font-bold text-gray-800 mb-1.5 leading-tight transition-colors transition-transform duration-300 transform group-hover:text-primary group-hover:scale-105 group-hover:-translate-y-0.5'>
                            {step.title}
                          </h4>
                          <p className='text-xs text-gray-600 font-normal leading-snug transition-colors transition-transform duration-300 transform group-hover:text-primary group-hover:scale-102 group-hover:-translate-y-0.5'>
                            {step.description}
                          </p>
                        </div>
                        <img
                          src={arrowDown}
                          alt='Arrow'
                          className='w-6 h-6 mt-1 transition-transform duration-300 group-hover:scale-110'
                        />
                      </div>
                    ))}
                </div>

                <div className='absolute top-1/2 left-0 right-0 -translate-y-1/2'>
                  <div className='relative w-full h-[200px]'>
                    <img
                      src={snake}
                      alt='Journey path'
                      className='absolute inset-0 w-full h-full object-contain pointer-events-none'
                    />
                    <div className='absolute inset-0 flex justify-around items-center px-[9%]'>
                      {steps.map((step) => (
                        <div
                          key={`ipad-num-${step.id}`}
                          className='flex-shrink-0 group cursor-pointer transition-transform duration-300 transform hover:scale-105'
                        >
                          <img src={step.image} alt={`Step ${step.id}`} className='w-16 h-16 drop-shadow-lg' />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className='absolute bottom-[12%] left-0 right-0 flex justify-around px-[17%]'>
                  {steps
                    .filter((step) => !step.hasTopText)
                    .map((step) => (
                      <div
                        key={`ipad-bottom-${step.id}`}
                        className='flex flex-col items-center w-32 group cursor-pointer'
                      >
                        <img
                          src={arrowUp}
                          alt='Arrow'
                          className='w-6 h-6 mb-3 mt-1 transition-transform duration-300 group-hover:scale-110'
                        />
                        <div className='text-center'>
                          <h4 className='text-sm font-bold text-gray-800 mb-1.5 leading-tight transition-colors transition-transform duration-300 transform group-hover:text-primary group-hover:scale-105 group-hover:-translate-y-0.5'>
                            {step.title}
                          </h4>
                          <p className='text-xs text-gray-600 font-normal leading-snug transition-colors transition-transform duration-300 transform group-hover:text-primary group-hover:scale-102 group-hover:-translate-y-0.5'>
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className='md:hidden'>
            {/* Roadmap với numbers */}
            <div className='relative w-full h-[200px] mb-6'>
              <img src={roadmap} alt='Background' className='absolute inset-0 w-full h-full object-cover opacity-20' />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='relative w-full h-[100px]'>
                  <img src={snake} alt='Journey path' className='w-full h-full object-contain' />
                  <div className='absolute inset-0 flex justify-around items-center px-4'>
                    {steps.map((step) => (
                      <img
                        key={`mobile-num-${step.id}`}
                        src={step.image}
                        alt={`Step ${step.id}`}
                        className='w-10 h-10 drop-shadow-lg'
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Text content */}
            <div className='space-y-4 px-4'>
              {steps.map((step) => (
                <div key={`mobile-text-${step.id}`} className='bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md'>
                  <div className='flex items-start space-x-3'>
                    <img src={step.image} alt={`Step ${step.id}`} className='w-12 h-12 flex-shrink-0 drop-shadow-lg' />
                    <div className='flex-1'>
                      <h4 className='text-sm font-bold text-gray-800 mb-1'>{step.title}</h4>
                      <p className='text-xs text-gray-600 leading-relaxed'>{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='text-center px-4 mt-8 sm:mt-10 md:mt-12 lg:mt-8'>
        <button className='inline-flex items-center gap-2 sm:gap-3 bg-teal-700 hover:bg-teal-800 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105'>
          <span>Hợp tác cùng Etechs</span>
        </button>
      </div>
    </div>
  )
}

export default JourneySteps
