import React, { useRef, useEffect, useState } from 'react'
// [ĐÃ SỬA] Import SVG dạng Component
import LogoTechPlatform from '@assets/logo-etechs-ETS.svg?react'
import IconMeg from '@assets/icons/ic-loudspeaker.svg?react'

// =========================================
// 1. CONFIG & CONSTANTS
// =========================================

type PositionKey = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

interface TechPlatformItem {
  id: number
  title: string
  desc: string
  position: PositionKey
  curvature?: number
}

const STYLES = {
  shadow:
    'shadow-[0px_6px_13px_0px_#86CACA1A,-2px_24px_24px_0px_#86CACA17,-4px_53px_32px_0px_#86CACA0D,-6px_94px_38px_0px_#86CACA03,-10px_147px_41px_0px_#86CACA00]',
  glassPanel:
    'relative z-10 w-full min-h-[640px] rounded-3xl bg-white/90 shadow-[0px_4px_100px_0px_#F3F3F380] backdrop-blur-[10.8px] overflow-hidden',
  glowEffect:
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none w-[800px] h-[800px] bg-[radial-gradient(circle,#FFEC0080_0%,rgba(255,255,255,0)_60%)] blur-[60px]'
}

const DESKTOP_POSITIONS: Record<PositionKey, string> = {
  'top-left': 'top-[81px] left-[10%]',
  'top-right': 'top-[81px] right-[10%]',
  'bottom-left': 'bottom-[81px] left-[10%]',
  'bottom-right': 'bottom-[81px] right-[10%]'
}

const TECH_PLATFORM_DATA: TechPlatformItem[] = [
  { id: 1, title: 'AI Middleware', desc: 'Huấn luyện & triển khai AI Model', position: 'top-left', curvature: -0.3 },
  {
    id: 2,
    title: 'AI Agent / Chatbot',
    desc: 'Tự động hoá & phân tích thông minh',
    position: 'top-right',
    curvature: 0.3
  },
  {
    id: 3,
    title: 'Blockchain Layer',
    desc: 'Xác thực và truy xuất dữ liệu minh bạch',
    position: 'bottom-left',
    curvature: 0.3
  },
  { id: 4, title: 'Data', desc: 'Data Lake → Data Hub → Data Warehouse', position: 'bottom-right', curvature: -0.3 }
]

// =========================================
// 2. LOGIC & HOOKS
// =========================================

const calculateBezierPath = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  curvature: number = 0.5
): string => {
  const midX = (startX + endX) / 2
  const midY = (startY + endY) / 2
  const distance = Math.hypot(endX - startX, endY - startY)

  const perpX = -(endY - startY)
  const perpY = endX - startX
  const perpLength = Math.hypot(perpX, perpY) || 1
  const curveFactor = distance * curvature

  const controlX = midX + (perpX / perpLength) * curveFactor
  const controlY = midY + (perpY / perpLength) * curveFactor

  return `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`
}

const useConnectorPaths = (
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  centerRef: React.MutableRefObject<HTMLDivElement | null>,
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
  data: TechPlatformItem[]
) => {
  const [paths, setPaths] = useState<string[]>([])
  const [centerRadius, setCenterRadius] = useState(85)

  useEffect(() => {
    const calculate = () => {
      if (!containerRef.current || !centerRef.current) return
      const container = containerRef.current.getBoundingClientRect()
      const center = centerRef.current.getBoundingClientRect()
      const radius = center.width / 2
      setCenterRadius(radius)

      const VIEWBOX = 1200
      const scale = VIEWBOX / container.width
      const centerX = VIEWBOX / 2
      const centerY = (VIEWBOX / 2) * (container.height / container.width)
      const scaledRadius = radius * scale

      const newPaths = cardRefs.current.map((cardEl, index) => {
        if (!cardEl) return ''
        const card = cardEl.getBoundingClientRect()
        const cardCX = (card.left + card.width / 2 - container.left) * scale
        const cardCY = (card.top + card.height / 2 - container.top) * scale
        const angle = Math.atan2(cardCY - centerY, cardCX - centerX)
        const startX = centerX + Math.cos(angle) * scaledRadius * 1
        const startY = centerY + Math.sin(angle) * scaledRadius * 0.05
        return calculateBezierPath(startX, startY, cardCX, cardCY, data[index]?.curvature)
      })
      setPaths(newPaths)
    }
    calculate()
    window.addEventListener('resize', calculate)
    return () => window.removeEventListener('resize', calculate)
  }, [data])

  return { paths, centerRadius }
}

// =========================================
// 3. SUB-COMPONENTS
// =========================================

const BackgroundCircles: React.FC<{ centerRadius: number }> = ({ centerRadius }) => {
  const s = centerRadius / 85
  return (
    <svg
      className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none'
      width='1600'
      height='1600'
      viewBox='0 0 1600 1600'
      fill='none'
    >
      <circle cx='800' cy='800' r={630 * s} stroke='#E7F4F4' strokeOpacity='0.8' />
      <circle cx='800' cy='800' r={275 * s} stroke='#E7F4F4' strokeOpacity='0.2' strokeWidth={50 * s} />
      <circle cx='800' cy='800' r={520 * s} stroke='#E7F4F4' strokeOpacity='0.3' strokeWidth={50 * s} />
      <circle cx='800' cy='800' r={440 * s} stroke='#E7F4F4' strokeDasharray='4 4' />
      <circle cx='800' cy='800' r={210 * s} stroke='#E7F4F4' strokeDasharray='4 4' />
      <circle cx='800' cy='800' r={146.5 * s} stroke='#fffeeb84' strokeWidth={12 * s} />
    </svg>
  )
}

const ConnectorLines: React.FC<{ paths: string[] }> = ({ paths }) => (
  <svg
    className='hidden lg:block absolute top-0 left-0 w-full h-full pointer-events-none'
    viewBox='0 0 1200 560'
    preserveAspectRatio='none'
    fill='none'
    data-aos='flip-left'
  >
    <defs>
      <filter id='yellow-blur' x='-50%' y='-50%' width='200%' height='200%'>
        <feGaussianBlur stdDeviation='8' />
      </filter>
    </defs>
    {paths.map((d, i) => (
      <g key={i} data-aos='flip-up'>
        <path d={d} stroke='#FFEC00' strokeWidth='17' opacity='0.12' filter='url(#yellow-blur)' />
        <path d={d} stroke='#ccb53eff' strokeWidth='1.5' strokeDasharray='2 2' opacity='0.7' />
      </g>
    ))}
  </svg>
)

const PlatformCard: React.FC<{ item: TechPlatformItem; isMobile?: boolean }> = ({ item, isMobile = false }) => {
  const layoutClass = isMobile
    ? 'w-full p-3 flex-col text-center rounded-xl hover:-translate-y-0.5'
    : 'w-[270px] p-5 text-left hover:-translate-y-1'
  const iconClass = isMobile ? 'w-10 h-10 mb-2' : 'w-[48px] h-[48px]'
  const titleClass = isMobile ? 'text-sm' : 'text-base'
  const descClass = isMobile ? 'text-xs leading-tight' : 'text-sm'

  return (
    <div
      className={`bg-white rounded-2xl transition-all duration-300 flex items-center gap-4 ${STYLES.shadow} ${layoutClass}`}
      data-aos='flip-up'
    >
      <div className={`flex-shrink-0 ${iconClass}`}>
        <IconMeg className='w-full h-full' />
      </div>
      <div>
        <h3 className={`font-semibold text-[#202225] mb-1 ${titleClass}`}>{item.title}</h3>
        <p className={`leading-normal text-[#5C6169] ${descClass}`}>{item.desc}</p>
      </div>
    </div>
  )
}

const SectionHeader: React.FC = () => (
  <div className='relative z-10 text-center mb-12 md:mb-16 px-4'>
    <div className='flex justify-center mb-3'>
      <span className='inline-block bg-[#FFFDE6] text-[#6B6300] text-[14px] font-normal p-[10px] rounded-full leading-none'>
        Nền tảng
      </span>
    </div>
    <h2 className='text-[40px] font-bold text-[#323232]'>
      Nền tảng <span className='text-primary'>công nghệ</span>
    </h2>
    <p className='text-[16px] text-[#7C7C7C] mt-4 max-w-3xl mx-auto'>
      ETECHS hợp nhất mọi lớp dữ liệu và AI trong cùng một hệ sinh thái:
    </p>
  </div>
)

// =========================================
// 4. MAIN COMPONENT
// =========================================

const TechPlatformSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const centerRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const { paths, centerRadius } = useConnectorPaths(containerRef, centerRef, cardRefs, TECH_PLATFORM_DATA)

  return (
    <section className='relative overflow-visible py-12 sm:py-16 md:py-20 bg-white'>
      <div className='relative mx-auto w-[90%]'>
        <SectionHeader />
        <div className={STYLES.glowEffect} />

        <div ref={containerRef} className={STYLES.glassPanel}>
          <BackgroundCircles centerRadius={centerRadius} />
          <ConnectorLines paths={paths} />

          {/* Logo trung tâm (Desktop Only) */}
          <div
            ref={centerRef}
            className='hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[170px] h-[170px] rounded-full bg-[#86CACA]/20 backdrop-blur-sm items-center justify-center shadow-lg z-10'
          >
            <LogoTechPlatform className='h-[100px] w-auto object-contain' />
          </div>

          {/* Desktop Layout */}
          <div className='hidden lg:block absolute inset-0'>
            {TECH_PLATFORM_DATA.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                className={`absolute ${DESKTOP_POSITIONS[item.position]}`}
              >
                <PlatformCard item={item} />
              </div>
            ))}
          </div>

          {/* Mobile & Tablet Layout */}
          <div className='lg:hidden absolute inset-0 flex items-center justify-center'>
            <div className='grid grid-cols-2 gap-4 w-full max-w-md px-4'>
              {TECH_PLATFORM_DATA.map((item) => (
                <div key={item.id} className='flex justify-center'>
                  <PlatformCard item={item} isMobile={true} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechPlatformSection
