import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import AuthLayout from './components/AuthLayout'
import AuthButton from './components/AuthButton'

// ============================================================================
// TYPES
// ============================================================================
interface LocationState {
  email?: string
  phone?: string
  countryCode?: string
  firstName?: string
  lastName?: string
  userId?: number
}

interface VerificationState {
  email: string
  phone: string
  countryCode: string
  activeTab: 'email' | 'phone'
  verificationCode: string[]
  codeSent: boolean
  countdown: number
  loading: boolean
  sendingCode: boolean
  error: string
  successMessage: string
}

// ============================================================================
// CONSTANTS
// ============================================================================
const INITIAL_STATE: VerificationState = {
  email: '',
  phone: '',
  countryCode: '+84',
  activeTab: 'email',
  verificationCode: ['', '', '', '', '', ''],
  codeSent: false,
  countdown: 0,
  loading: false,
  sendingCode: false,
  error: '',
  successMessage: ''
}

const COUNTDOWN_DURATION = 60
const CODE_LENGTH = 6
const DIGIT_REGEX = /^\d$/

// ============================================================================
// API CONFIG - Backend mapping reference
// ============================================================================
/**
 * API Contract (cho BE tham khảo):
 *
 * 1. POST /api/auth/send-verification-code
 *    Request: {
 *      method: 'email' | 'phone',
 *      email?: string,
 *      phone?: string,
 *      country_code?: string
 *    }
 *    Response 200: { message: string }
 *    Response 4xx: { message: string }
 *
 * 2. POST /api/auth/verify-code
 *    Request: {
 *      method: 'email' | 'phone',
 *      email?: string,
 *      phone?: string,
 *      country_code?: string,
 *      code: string
 *    }
 *    Response 200: { token?: string, message: string }
 *    Response 4xx: { message: string }
 */

const MOCK_MODE = !import.meta.env.VITE_API_URL

// ============================================================================
// UTILS - Mock API
// ============================================================================
const mockSendCode = async (payload: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock error case (uncomment to test)
  // if (payload.email === 'error@test.com') {
  //   throw new Error('Email không tồn tại trong hệ thống')
  // }

  return { message: 'Mã xác thực đã được gửi' }
}

const mockVerifyCode = async (payload: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock error case (uncomment to test)
  // if (payload.code !== '123456') {
  //   throw new Error('Mã xác thực không đúng')
  // }

  return {
    token: 'mock-verify-token-' + Date.now(),
    message: 'Xác thực thành công'
  }
}

const callSendCodeApi = async (payload: {
  method: 'email' | 'phone'
  email?: string
  phone?: string
  country_code?: string
}) => {
  if (MOCK_MODE) {
    return mockSendCode(payload)
  }

  const url = `${import.meta.env.VITE_API_URL}/api/auth/send-verification-code`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.message || 'Gửi mã thất bại')

  return data
}

const callVerifyCodeApi = async (payload: {
  method: 'email' | 'phone'
  email?: string
  phone?: string
  country_code?: string
  code: string
}) => {
  if (MOCK_MODE) {
    return mockVerifyCode(payload)
  }

  const url = `${import.meta.env.VITE_API_URL}/api/auth/verify-code`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.message || 'Xác thực thất bại')

  return data
}

// ============================================================================
// COMPONENT
// ============================================================================
const VerifyCodePage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const [state, setState] = useState<VerificationState>(INITIAL_STATE)

  // Initialize data from navigation state or session storage
  useEffect(() => {
    const locationState = location.state as LocationState
    const savedData = sessionStorage.getItem('pendingRegistration')

    if (locationState) {
      setState((prev) => ({
        ...prev,
        email: locationState.email || '',
        phone: locationState.phone || '',
        countryCode: locationState.countryCode || '+84'
      }))
    } else if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setState((prev) => ({
          ...prev,
          email: parsed.email || '',
          phone: parsed.phone || '',
          countryCode: parsed.countryCode || '+84'
        }))
      } catch {
        navigate('/dang-ky-demo')
      }
    } else {
      navigate('/dang-ky-demo')
    }
  }, [location.state, navigate])

  // Countdown timer
  useEffect(() => {
    if (state.countdown > 0) {
      const timer = setTimeout(() => {
        setState((prev) => ({ ...prev, countdown: prev.countdown - 1 }))
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [state.countdown])

  // Reset when switching tabs
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      codeSent: false,
      verificationCode: ['', '', '', '', '', ''],
      error: '',
      successMessage: '',
      countdown: 0
    }))
  }, [state.activeTab])

  const handleSendCode = async () => {
    setState((prev) => ({ ...prev, error: '', successMessage: '', sendingCode: true }))

    try {
      const payload = {
        method: state.activeTab,
        email: state.activeTab === 'email' ? state.email : undefined,
        phone: state.activeTab === 'phone' ? state.phone : undefined,
        country_code: state.activeTab === 'phone' ? state.countryCode : undefined
      }

      await callSendCodeApi(payload)

      const destination = state.activeTab === 'email' ? state.email : `${state.countryCode} ${state.phone}`

      setState((prev) => ({
        ...prev,
        codeSent: true,
        countdown: COUNTDOWN_DURATION,
        successMessage: `Mã xác thực đã được gửi đến ${destination}`,
        sendingCode: false
      }))

      setTimeout(() => inputRefs.current[0]?.focus(), 100)
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        error: error.message || 'Có lỗi xảy ra khi gửi mã',
        sendingCode: false
      }))
    }
  }

  const handleInputChange = (index: number, value: string) => {
    if (!state.codeSent) {
      setState((prev) => ({ ...prev, error: 'Vui lòng nhấn "Gửi mã" trước khi nhập mã xác thực' }))
      return
    }

    if (value && !DIGIT_REGEX.test(value)) return

    const newCode = [...state.verificationCode]
    newCode[index] = value

    setState((prev) => ({ ...prev, verificationCode: newCode, error: '' }))

    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!state.codeSent && e.key !== 'Tab') {
      e.preventDefault()
      setState((prev) => ({ ...prev, error: 'Vui lòng nhấn "Gửi mã" trước khi nhập mã xác thực' }))
      return
    }

    if (e.key === 'Backspace' && !state.verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    if (e.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    if (!state.codeSent) {
      e.preventDefault()
      setState((prev) => ({ ...prev, error: 'Vui lòng nhấn "Gửi mã" trước khi nhập mã xác thực' }))
      return
    }

    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH)
    const newCode = pastedData.split('').concat(Array(CODE_LENGTH).fill('')).slice(0, CODE_LENGTH)

    setState((prev) => ({ ...prev, verificationCode: newCode }))

    const lastIndex = Math.min(pastedData.length, CODE_LENGTH - 1)
    inputRefs.current[lastIndex]?.focus()
  }

  const handleInputFocus = (index: number) => {
    if (!state.codeSent) {
      setState((prev) => ({ ...prev, error: 'Vui lòng nhấn "Gửi mã" trước khi nhập mã xác thực' }))
      return
    }
    inputRefs.current[index]?.select()
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()

    setState((prev) => ({ ...prev, error: '', successMessage: '' }))

    if (!state.codeSent) {
      setState((prev) => ({ ...prev, error: 'Vui lòng nhấn "Gửi mã" trước khi xác thực' }))
      return
    }

    const code = state.verificationCode.join('')

    if (!code || code.length < CODE_LENGTH) {
      setState((prev) => ({ ...prev, error: 'Vui lòng nhập đầy đủ 6 số' }))
      return
    }

    setState((prev) => ({ ...prev, loading: true }))

    try {
      const payload = {
        method: state.activeTab,
        email: state.activeTab === 'email' ? state.email : undefined,
        phone: state.activeTab === 'phone' ? state.phone : undefined,
        country_code: state.activeTab === 'phone' ? state.countryCode : undefined,
        code
      }

      const data = await callVerifyCodeApi(payload)

      if (data?.token) {
        sessionStorage.setItem('authToken', data.token)
      }

      sessionStorage.removeItem('pendingRegistration')

      navigate('/dang-nhap', {
        state: { message: 'Đăng ký thành công! Vui lòng đăng nhập.' }
      })
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        error: error.message || 'Mã xác thực không đúng',
        loading: false
      }))
    }
  }

  const handleTabChange = (tab: 'email' | 'phone') => {
    setState((prev) => ({ ...prev, activeTab: tab }))
  }

  const renderCodeInput = (digit: string, index: number, actualIndex: number) => (
    <input
      key={actualIndex}
      ref={(el) => {
        inputRefs.current[actualIndex] = el
      }}
      type='text'
      inputMode='numeric'
      maxLength={1}
      value={digit}
      onChange={(e) => handleInputChange(actualIndex, e.target.value)}
      onKeyDown={(e) => handleKeyDown(actualIndex, e)}
      onPaste={actualIndex === 0 ? handlePaste : undefined}
      onFocus={() => handleInputFocus(actualIndex)}
      disabled={!state.codeSent}
      className={`w-12 h-12 text-center text-xl font-semibold border ${
        state.error ? 'border-red-500' : 'border-gray-300'
      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all ${
        !state.codeSent ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
      }`}
    />
  )

  return (
    <AuthLayout
      title='Nhận mã xác thực'
      withBlur={true}
      footer={
        <p className='text-center text-sm text-gray-600'>
          Đã có tài khoản?{' '}
          <Link to='/dang-nhap' className='text-[var(--color-primary)] font-semibold hover:underline transition-colors'>
            Đăng nhập
          </Link>
        </p>
      }
    >
      <div className='space-y-4'>
        {/* Tabs */}
        <div className='flex gap-2 p-1 bg-gray-100 rounded-lg'>
          <button
            type='button'
            onClick={() => handleTabChange('email')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
              state.activeTab === 'email' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Email
          </button>
          <button
            type='button'
            onClick={() => handleTabChange('phone')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
              state.activeTab === 'phone' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Số điện thoại
          </button>
        </div>

        <form onSubmit={handleVerifyCode} className='space-y-4'>
          {/* Email or Phone Display */}
          {state.activeTab === 'email' ? (
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
              <div className='relative'>
                <input
                  type='email'
                  value={state.email}
                  readOnly
                  className='w-full px-4 py-2.5 pr-24 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm focus:outline-none cursor-not-allowed'
                  placeholder='Nhập email'
                />
                <button
                  type='button'
                  onClick={handleSendCode}
                  disabled={state.sendingCode || state.countdown > 0 || !state.email}
                  className='absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[var(--color-primary)] text-white text-xs font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {state.sendingCode ? 'Đang gửi...' : state.countdown > 0 ? `${state.countdown}s` : 'Gửi mã'}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Số điện thoại</label>
              <div className='relative'>
                <input
                  type='tel'
                  value={`${state.countryCode} ${state.phone}`}
                  readOnly
                  className='w-full px-4 py-2.5 pr-24 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm focus:outline-none cursor-not-allowed'
                  placeholder='Nhập số điện thoại'
                />
                <button
                  type='button'
                  onClick={handleSendCode}
                  disabled={state.sendingCode || state.countdown > 0 || !state.phone}
                  className='absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[var(--color-primary)] text-white text-xs font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {state.sendingCode ? 'Đang gửi...' : state.countdown > 0 ? `${state.countdown}s` : 'Gửi mã'}
                </button>
              </div>
            </div>
          )}

          {/* Success Message */}
          {state.successMessage && (
            <div className='p-3 bg-green-50 border border-green-200 rounded-lg'>
              <p className='text-sm text-green-700'>{state.successMessage}</p>
            </div>
          )}

          {/* Verification Code Input */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Mã xác thực</label>
            <div className='flex justify-center items-center gap-3'>
              <div className='flex gap-2'>
                {state.verificationCode.slice(0, 3).map((digit, index) => renderCodeInput(digit, index, index))}
              </div>
              <div className='w-4 h-0.5 bg-gray-400'></div>
              <div className='flex gap-2'>
                {state.verificationCode.slice(3, 6).map((digit, index) => renderCodeInput(digit, index, index + 3))}
              </div>
            </div>
            {state.error && <p className='mt-2 text-sm text-red-500 text-center'>{state.error}</p>}
          </div>

          {/* Verify Button */}
          <AuthButton
            type='submit'
            loading={state.loading}
            variant='primary'
            disabled={!state.codeSent || state.verificationCode.join('').length !== CODE_LENGTH}
          >
            Xác thực
          </AuthButton>

          {/* Resend Code */}
          <div className='text-center'>
            <button
              type='button'
              onClick={handleSendCode}
              disabled={state.countdown > 0 || state.sendingCode}
              className='text-sm text-[var(--color-primary)] hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline'
            >
              {state.countdown > 0 ? `Gửi lại sau ${state.countdown}s` : 'Không nhận được mã? Gửi lại'}
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default VerifyCodePage
