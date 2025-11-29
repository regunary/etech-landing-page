import React from 'react'
import logoEtechs from '@assets/logo-etechs.svg'
import blurGreen from '@assets/cards/authGreen.svg'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  withBlur?: boolean
  footer?: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, withBlur = false, footer }) => {
  return (
    <div
      className='min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden'
      style={withBlur ? { backgroundColor: '#FFFDE6' } : undefined}
    >
      {withBlur && (
        <img
          src={blurGreen}
          alt=''
          className='absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl pointer-events-none scale-150'
          style={{ filter: 'blur(0px)' }}
        />
      )}

      <div className='w-full max-w-[420px] relative z-10'>
        <div className='flex justify-center mb-6'>
          <img src={logoEtechs} alt='ETECHS' className='h-12' />
        </div>

        <div className='bg-white rounded-2xl shadow-xl p-6'>
          <h2 className='text-4xl font-bold text-center text-gray-900 mb-6'>{title}</h2>
          {children}
        </div>

        {footer && <div className='mt-4'>{footer}</div>}
      </div>
    </div>
  )
}

export default AuthLayout
