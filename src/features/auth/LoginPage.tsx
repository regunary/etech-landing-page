import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import AuthLayout from './components/AuthLayout'
import AuthInput from './components/AuthInput'
import AuthButton from './components/AuthButton'

interface LocationState {
  message?: string
}

interface LoginFormData {
  email: string
  phone: string
  countryCode: string
  password: string
}

interface LoginErrors {
  identifier: string
  password: string
}

interface LoginState {
  activeTab: 'email' | 'phone'
  formData: LoginFormData
  errors: LoginErrors
  rememberMe: boolean
  loading: boolean
}

const INITIAL_FORM_DATA: LoginFormData = {
  email: '',
  phone: '',
  countryCode: '+84',
  password: ''
}

const INITIAL_ERRORS: LoginErrors = {
  identifier: '',
  password: ''
}

const INITIAL_STATE: LoginState = {
  activeTab: 'email',
  formData: INITIAL_FORM_DATA,
  errors: INITIAL_ERRORS,
  rememberMe: false,
  loading: false
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_MIN_LENGTH = 9
const PHONE_MAX_LENGTH = 15
const PASSWORD_MIN_LENGTH = 6

// MOCK mode nếu chưa cấu hình VITE_API_URL
const MOCK_MODE = !import.meta.env.VITE_API_URL

// API contract cho BE:
// POST /api/auth/login
// body: { login_type: 'email'|'phone', email?, phone?, country_code?, password, remember_me }
// 200: { token: string, user: { id: number, ... } }
// 4xx: { message: string }

const mockLoginApi = async (payload: any) => {
  await new Promise((r) => setTimeout(r, 800))
  // Ví dụ mock lỗi:
  // if (payload.password !== '123456') throw new Error('Email/Số điện thoại hoặc mật khẩu không đúng')
  return {
    token: 'mock-login-' + Date.now(),
    user: { id: Math.floor(Math.random() * 100000), email: payload.email }
  }
}

const callLoginApi = async (payload: {
  login_type: 'email' | 'phone'
  email?: string
  phone?: string
  country_code?: string
  password: string
  remember_me: boolean
}) => {
  if (MOCK_MODE) return mockLoginApi(payload)

  const url = `${import.meta.env.VITE_API_URL}/api/auth/login`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload)
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.message || 'Đăng nhập thất bại')
  return data
}

const saveToken = (token: string, remember: boolean) => {
  try {
    if (remember) localStorage.setItem('authToken', token)
    else sessionStorage.setItem('authToken', token)
  } catch {
    // ignore
  }
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as LocationState

  const [state, setState] = useState<LoginState>(INITIAL_STATE)

  useEffect(() => {
    if (locationState?.message) {
      setTimeout(() => alert(locationState.message), 100)
    }
  }, [locationState])

  const validateEmail = (email: string): string => {
    if (!email.trim()) return 'Vui lòng nhập email'
    if (!EMAIL_REGEX.test(email)) return 'Email không hợp lệ'
    return ''
  }

  const validatePhone = (phone: string): string => {
    if (!phone.trim()) return 'Vui lòng nhập số điện thoại'
    if (phone.length < PHONE_MIN_LENGTH || phone.length > PHONE_MAX_LENGTH) return 'Số điện thoại không hợp lệ'
    return ''
  }

  const validatePassword = (password: string): string => {
    if (!password) return 'Vui lòng nhập mật khẩu'
    if (password.length < PASSWORD_MIN_LENGTH) return `Mật khẩu phải có ít nhất ${PASSWORD_MIN_LENGTH} ký tự`
    return ''
  }

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {
      identifier:
        state.activeTab === 'email' ? validateEmail(state.formData.email) : validatePhone(state.formData.phone),
      password: validatePassword(state.formData.password)
    }
    setState((prev) => ({ ...prev, errors: newErrors }))
    return !Object.values(newErrors).some((e) => e !== '')
  }

  const updateFormData = (updates: Partial<LoginFormData>) => {
    setState((prev) => ({ ...prev, formData: { ...prev.formData, ...updates } }))
  }

  const clearError = (field: keyof LoginErrors) => {
    setState((prev) => ({ ...prev, errors: { ...prev.errors, [field]: '' } }))
  }

  const handleTabChange = (tab: 'email' | 'phone') => {
    setState((prev) => ({ ...prev, activeTab: tab, errors: INITIAL_ERRORS }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setState((prev) => ({ ...prev, loading: true }))
    try {
      const payload = {
        login_type: state.activeTab,
        email: state.activeTab === 'email' ? state.formData.email.trim().toLowerCase() : undefined,
        phone: state.activeTab === 'phone' ? state.formData.phone : undefined,
        country_code: state.activeTab === 'phone' ? state.formData.countryCode : undefined,
        password: state.formData.password,
        remember_me: state.rememberMe
      }

      const data = await callLoginApi(payload)

      if (data?.token) saveToken(data.token, state.rememberMe)
      if (data?.user) {
        const storage = state.rememberMe ? localStorage : sessionStorage
        storage.setItem('user', JSON.stringify(data.user))
      }

      navigate('/')
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        errors: {
          identifier: '',
          password: error?.message || 'Email/Số điện thoại hoặc mật khẩu không đúng'
        },
        loading: false
      }))
    }
  }

  const renderPhoneInput = () => (
    <div className='mb-4'>
      <label className='block text-sm font-medium text-gray-700 mb-2'>Số điện thoại</label>
      <div className='flex gap-2'>
        <div className='w-28'>
          <PhoneInput
            country='vn'
            value={state.formData.countryCode.replace('+', '')}
            onChange={(_value, country: any) => {
              updateFormData({ countryCode: `+${country.dialCode}` })
            }}
            enableSearch={true}
            searchPlaceholder='Tìm kiếm'
            preferredCountries={['vn', 'us', 'gb', 'cn', 'jp', 'kr']}
            onlyCountries={['vn', 'us', 'gb', 'cn', 'jp', 'kr', 'th', 'sg', 'my', 'id', 'ph']}
            containerStyle={{ width: '100%' }}
            inputStyle={{
              width: '100%',
              height: '42px',
              fontSize: '14px',
              border: state.errors.identifier ? '1px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '8px',
              paddingLeft: '48px',
              backgroundColor: 'white'
            }}
            buttonStyle={{
              border: state.errors.identifier ? '1px solid #ef4444' : '1px solid #d1d5db',
              borderRight: 'none',
              borderRadius: '8px 0 0 8px',
              backgroundColor: 'white'
            }}
            dropdownStyle={{
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              marginTop: '2px'
            }}
          />
        </div>

        <div className='flex-1'>
          <input
            type='tel'
            placeholder='123456789'
            value={state.formData.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '')
              if (value.length <= PHONE_MAX_LENGTH) {
                updateFormData({ phone: value })
                clearError('identifier')
              }
            }}
            className={`w-full px-4 py-2.5 border ${
              state.errors.identifier ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all text-sm`}
            required
          />
        </div>
      </div>
      {state.errors.identifier && <p className='mt-1 text-sm text-red-500'>{state.errors.identifier}</p>}
    </div>
  )

  return (
    <AuthLayout
      title='Đăng nhập'
      withBlur={true}
      footer={
        <p className='text-center text-sm text-gray-600'>
          Chưa có tài khoản?{' '}
          <Link
            to='/dang-ky-demo'
            className='text-[var(--color-primary)] font-semibold hover:underline transition-colors'
          >
            Đăng ký
          </Link>
        </p>
      }
    >
      <div className='space-y-4'>
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

        <form onSubmit={handleSubmit} className='space-y-4'>
          {state.activeTab === 'email' ? (
            <AuthInput
              type='email'
              label='Email'
              placeholder='Nhập email'
              value={state.formData.email}
              onChange={(e) => {
                updateFormData({ email: e.target.value })
                clearError('identifier')
              }}
              error={state.errors.identifier}
              required
              className='py-2.5 text-sm'
            />
          ) : (
            renderPhoneInput()
          )}

          <AuthInput
            type='password'
            label='Mật khẩu'
            placeholder='••••••••'
            value={state.formData.password}
            onChange={(e) => {
              updateFormData({ password: e.target.value })
              clearError('password')
            }}
            error={state.errors.password}
            required
            className='py-2.5 text-sm'
          />

          <div className='flex items-center justify-between'>
            <label className='flex items-center cursor-pointer'>
              <input
                type='checkbox'
                checked={state.rememberMe}
                onChange={(e) => setState((prev) => ({ ...prev, rememberMe: e.target.checked }))}
                className='w-4 h-4 text-[var(--color-primary)] border-gray-300 rounded focus:ring-[var(--color-primary)] cursor-pointer'
              />
              <span className='ml-2 text-sm text-gray-700'>Ghi nhớ tôi</span>
            </label>
            <Link to='/quen-mat-khau' className='text-sm text-[var(--color-primary)] hover:underline'>
              Quên mật khẩu?
            </Link>
          </div>

          <AuthButton type='submit' loading={state.loading} variant='primary'>
            Đăng nhập
          </AuthButton>
        </form>
      </div>
    </AuthLayout>
  )
}

export default LoginPage
