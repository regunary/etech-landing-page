import React, { useState } from 'react'
import bgWave from '@assets/bgs/bg-1.svg'
import IconMeg from '@assets/icons/ic-loudSpeaker1.svg?react'

const coreValuesData = [
  {
    title: 'HỢP TÁC (Collaboration)',
    desc: 'Kết nối tri thức và doanh nghiệp.',
    Icon: IconMeg
  },
  {
    title: 'SÁNG TẠO (Creativity)',
    desc: 'Đổi mới, dám nghĩ khác.',
    Icon: IconMeg
  },
  {
    title: 'NHÂN VĂN (Humanity)',
    desc: 'Đặt con người làm trung tâm.',
    Icon: IconMeg
  }
]

const CoreValueSection: React.FC = () => {
  const [bgLoaded, setBgLoaded] = useState(false)

  return (
    <section
      className='relative w-full overflow-hidden 
                 py-12 md:py-24 lg:py-32
                 min-h-[300px] md:min-h-[400px] lg:min-h-[500px]'
    >
      {/* Background Image */}
      <div className='absolute inset-0 -z-20'>
        {!bgLoaded && (
          <div className='w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 animate-pulse' />
        )}
        <img
          src={bgWave}
          alt='Core values background'
          loading='lazy'
          decoding='async'
          onLoad={() => setBgLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      {/* Content */}
      <div className='max-w-7xl mx-auto h-full flex flex-col items-center lg:items-start justify-center gap-10 md:gap-12 px-4 sm:px-8 md:px-12 lg:px-20'>
        <div className='w-full flex flex-col items-center lg:items-start text-center lg:text-left'>
          <div className='inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full mb-3 sm:mb-4 font-medium shadow-sm'>
            Phương châm
          </div>

          <h2
            className='text-[24px] sm:text-[32px] md:text-[36px] xl:text-[40px] font-extrabold mb-5 leading-[1.15] drop-shadow-lg'
            style={{ color: '#FFFFFF' }}
          >
            Giá trị cốt lõi <span style={{ color: 'var(--color-secondary)' }}>Etechs</span>
          </h2>
        </div>

        <div className='w-full flex flex-col sm:flex-row gap-5 sm:gap-6 md:gap-8' data-aos='flip-up'>
          {coreValuesData.map((card, index) => (
            <CoreValueCard key={index} title={card.title} desc={card.desc} Icon={card.Icon} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreValueSection

interface CoreValueCardProps {
  title: string
  desc: string
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

const CoreValueCard: React.FC<CoreValueCardProps> = ({ title, desc, Icon }) => {
  return (
    <div
      className='flex-1 group rounded-2xl overflow-hidden relative transition-all duration-300 
                    hover:-translate-y-2 hover:shadow-2xl 
                    backdrop-blur-md border border-white/20 
                    bg-gradient-to-b from-white/15 to-white/5'
    >
      <div className='relative z-10 p-4 sm:p-5 md:p-6 flex flex-col items-start gap-3 sm:gap-4 text-left'>
        <div
          className='w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full 
                     bg-[var(--color-secondary)] flex items-center justify-center 
                     shadow-md shrink-0'
        >
          <Icon className='w-6 h-6 sm:w-7 sm:h-7 text-black fill-current' />
        </div>

        <div>
          <div className='text-base sm:text-lg md:text-xl font-bold mb-1' style={{ color: '#FFFFFF' }}>
            {title}
          </div>
          <div className='text-xs sm:text-sm md:text-base' style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            {desc}
          </div>
        </div>
      </div>
    </div>
  )
}
