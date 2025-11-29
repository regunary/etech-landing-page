import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import AuthLayout from './components/AuthLayout'
import AuthInput from './components/AuthInput'
import AuthButton from './components/AuthButton'

// ============================================================================
// TYPES
// ============================================================================
interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  countryCode: string
  password: string
  confirmPassword: string
}

interface RegisterErrors {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  general?: string
}

interface PasswordStrength {
  hasMinLength: boolean
  hasUpperCase: boolean
  hasLowerCase: boolean
  hasNumber: boolean
  hasSpecialChar: boolean
}

type ToastType = 'success' | 'error' | 'info'
type ToastState = { type: ToastType; message: string } | null

// ============================================================================
// CONSTANTS
// ============================================================================
const INITIAL_FORM_DATA: RegisterFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  countryCode: '+84',
  password: '',
  confirmPassword: ''
}

const INITIAL_ERRORS: RegisterErrors = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  general: ''
}

const INITIAL_PASSWORD_STRENGTH: PasswordStrength = {
  hasMinLength: false,
  hasUpperCase: false,
  hasLowerCase: false,
  hasNumber: false,
  hasSpecialChar: false
}

const PASSWORD_REGEX = {
  upperCase: /[A-Z]/,
  lowerCase: /[a-z]/,
  number: /\d/,
  specialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ============================================================================
// API CONFIG - Backend mapping reference
// ============================================================================
/**
 * API Contract:
 *
 * POST /api/auth/register
 *
 * Request body:
 * {
 *   first_name: string,
 *   last_name: string,
 *   email: string,
 *   phone: string,
 *   country_code: string,
 *   password: string
 * }
 *
 * Response success (200):
 * {
 *   token: string,
 *   user: { id: number, ... }
 * }
 *
 * Response error (4xx):
 * {
 *   message: string,
 *   errors: {
 *     first_name?: string | string[],
 *     last_name?: string | string[],
 *     email?: string | string[],
 *     phone?: string | string[],
 *     password?: string | string[]
 *   }
 * }
 */

const MOCK_MODE = !import.meta.env.VITE_API_URL // Tự động bật mock nếu thiếu API URL

// ============================================================================
// UTILS
// ============================================================================
const setAuthTokenSecure = (token: string) => {
  try {
    sessionStorage.setItem('authToken', token)
  } catch {
    /* ignore */
  }
}

const mockRegisterApi = async (payload: any) => {
  // Giả lập độ trễ network
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock validation lỗi (optional - để test UX)
  // if (payload.email === 'test@error.com') {
  //   throw {
  //     message: 'Email đã tồn tại',
  //     fieldErrors: { email: 'Email này đã được đăng ký' }
  //   }
  // }

  return {
    token: 'mock-token-' + Date.now(),
    user: { id: Math.floor(Math.random() * 100000) }
  }
}

const callRegisterApi = async (payload: {
  first_name: string
  last_name: string
  email: string
  phone: string
  country_code: string
  password: string
}) => {
  if (MOCK_MODE) {
    return mockRegisterApi(payload)
  }

  const url = `${import.meta.env.VITE_API_URL}/api/auth/register`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    const apiErrors: Record<string, string> = {}
    if (data?.errors && typeof data.errors === 'object') {
      Object.entries(data.errors as Record<string, string | string[]>).forEach(([k, v]) => {
        apiErrors[k] = Array.isArray(v) ? v[0] : v
      })
    }
    throw { message: data?.message || 'Đăng ký thất bại', fieldErrors: apiErrors }
  }

  return data
}

// ============================================================================
// COMPONENT
// ============================================================================
const RegisterPage: React.FC = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<RegisterFormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<RegisterErrors>(INITIAL_ERRORS)
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>(INITIAL_PASSWORD_STRENGTH)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<ToastState>(null)

  const showToast = (message: string, type: ToastType = 'info', duration = 3500) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), duration)
  }

  const validatePasswordStrength = (password: string): PasswordStrength => ({
    hasMinLength: password.length >= 6,
    hasUpperCase: PASSWORD_REGEX.upperCase.test(password),
    hasLowerCase: PASSWORD_REGEX.lowerCase.test(password),
    hasNumber: PASSWORD_REGEX.number.test(password),
    hasSpecialChar: PASSWORD_REGEX.specialChar.test(password)
  })

  const isPasswordValid = (strength: PasswordStrength) => Object.values(strength).every(Boolean)

  const validateForm = (): boolean => {
    const newErrors: RegisterErrors = { ...INITIAL_ERRORS }

    if (!formData.firstName.trim()) newErrors.firstName = 'Vui lòng nhập họ'
    else if (formData.firstName.length > 50) newErrors.firstName = 'Họ không được quá 50 ký tự'

    if (!formData.lastName.trim()) newErrors.lastName = 'Vui lòng nhập tên'
    else if (formData.lastName.length > 50) newErrors.lastName = 'Tên không được quá 50 ký tự'

    if (!formData.email.trim()) newErrors.email = 'Vui lòng nhập email'
    else if (!EMAIL_REGEX.test(formData.email)) newErrors.email = 'Email không hợp lệ'

    if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại'
    else if (formData.phone.length < 9 || formData.phone.length > 15) newErrors.phone = 'Số điện thoại không hợp lệ'

    if (!formData.password) newErrors.password = 'Vui lòng nhập mật khẩu'
    else if (!isPasswordValid(passwordStrength)) newErrors.password = 'Mật khẩu chưa đủ mạnh'

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu'
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Mật khẩu không khớp'

    setErrors(newErrors)
    return !Object.values(newErrors).some(Boolean)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setFormData((p) => ({ ...p, password: newPassword }))
    setPasswordStrength(validatePasswordStrength(newPassword))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors(INITIAL_ERRORS)

    if (!agreeTerms) {
      showToast('Vui lòng đồng ý với các điều khoản', 'error')
      return
    }

    if (!validateForm()) return

    setLoading(true)

    try {
      const payload = {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone,
        country_code: formData.countryCode,
        password: formData.password
      }

      const data = await callRegisterApi(payload)

      if (data?.token) setAuthTokenSecure(data.token)

      const registrationData = {
        email: payload.email,
        phone: payload.phone,
        countryCode: payload.country_code,
        firstName: payload.first_name,
        lastName: payload.last_name,
        userId: data?.user?.id ?? Math.floor(Math.random() * 10000)
      }

      sessionStorage.setItem('pendingRegistration', JSON.stringify(registrationData))

      const successMsg = MOCK_MODE
        ? '✅ Đăng ký thành công (MOCK)! Vui lòng nhập mã xác thực.'
        : 'Đăng ký thành công! Vui lòng nhập mã xác thực.'

      showToast(successMsg, 'success')
      navigate('/xac-thuc-ma', { state: registrationData, replace: true })
    } catch (err: any) {
      const fieldErrors = (err?.fieldErrors || {}) as Record<string, string>
      setErrors({
        ...INITIAL_ERRORS,
        firstName: fieldErrors.first_name || '',
        lastName: fieldErrors.last_name || '',
        email: fieldErrors.email || '',
        phone: fieldErrors.phone || '',
        password: fieldErrors.password || '',
        general: err?.message || 'Có lỗi xảy ra, vui lòng thử lại'
      })
      if (err?.message) showToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const renderPasswordStrength = () => {
    if (!formData.password) return null
    const requirements = [
      { key: 'hasMinLength', label: 'Ít nhất 6 ký tự' },
      { key: 'hasUpperCase', label: 'Chữ in hoa (A-Z)' },
      { key: 'hasLowerCase', label: 'Chữ thường (a-z)' },
      { key: 'hasNumber', label: 'Số (0-9)' },
      { key: 'hasSpecialChar', label: 'Ký tự đặc biệt (!@#$...)' }
    ] as const

    return (
      <div className='mt-2 space-y-1'>
        {requirements.map(({ key, label }) => (
          <div key={key} className='flex items-center gap-2 text-xs'>
            <span className={passwordStrength[key] ? 'text-green-600' : 'text-gray-400'}>
              {passwordStrength[key] ? '✓' : '○'} {label}
            </span>
          </div>
        ))}
      </div>
    )
  }

  const renderPasswordIcon = (show: boolean) => (
    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      {show ? (
        <>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
          />
        </>
      ) : (
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
        />
      )}
    </svg>
  )

  return (
    <AuthLayout
      title='Đăng ký'
      withBlur={true}
      footer={
        <p className='text-center text-sm text-gray-600'>
          Đã có tài khoản?{' '}
          <Link
            to='/dang-nhap'
            className='text-[var(--color-primary)] font-semibold hover:text-[var(--color-secondary)] transition-colors'
          >
            Đăng nhập
          </Link>
        </p>
      }
    >
      {/* Toast */}
      {toast && (
        <div
          role='alert'
          className={`mb-3 rounded-md px-3 py-2 text-sm ${
            toast.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : toast.type === 'error'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}
        >
          {toast.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-3'>
        <div className='grid grid-cols-2 gap-3'>
          <AuthInput
            type='text'
            label='Họ'
            placeholder='Nguyễn'
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            error={errors.firstName}
            required
            maxLength={50}
            className='py-2.5 text-sm'
            disabled={loading}
          />
          <AuthInput
            type='text'
            label='Tên'
            placeholder='Văn A'
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            error={errors.lastName}
            required
            maxLength={50}
            className='py-2.5 text-sm'
            disabled={loading}
          />
        </div>

        <AuthInput
          type='email'
          label='Email'
          placeholder='m@example.com'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          required
          className='py-2.5 text-sm'
          disabled={loading}
        />

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Số điện thoại</label>
          <div className='flex gap-2'>
            <div className='w-20'>
              <PhoneInput
                country='vn'
                value={formData.countryCode.replace('+', '')}
                onChange={(_value: string, country: any) => {
                  setFormData((p) => ({ ...p, countryCode: `+${country.dialCode}` }))
                }}
                enableSearch
                searchPlaceholder='Tìm kiếm'
                preferredCountries={['vn', 'us', 'gb', 'cn', 'jp', 'kr']}
                onlyCountries={['vn', 'us', 'gb', 'cn', 'jp', 'kr', 'th', 'sg', 'my', 'id', 'ph']}
                inputStyle={{
                  width: '100%',
                  height: '42px',
                  fontSize: '14px',
                  border: errors.phone ? '1px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  paddingLeft: '42px'
                }}
                buttonStyle={{
                  border: errors.phone ? '1px solid #ef4444' : '1px solid #d1d5db',
                  borderRight: 'none',
                  borderRadius: '8px 0 0 8px'
                }}
                disableSearchIcon
                countryCodeEditable={false}
                disabled={loading}
              />
            </div>
            <input
              type='tel'
              placeholder='123456789'
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '')
                if (value.length <= 15) setFormData({ ...formData, phone: value })
              }}
              className={`flex-1 px-4 py-2.5 border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm`}
              required
              disabled={loading}
            />
          </div>
          {errors.phone && <p className='mt-1 text-sm text-red-500'>{errors.phone}</p>}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Mật khẩu</label>
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='••••••••'
              value={formData.password}
              onChange={handlePasswordChange}
              className={`w-full px-4 py-2.5 pr-10 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm`}
              required
              disabled={loading}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
              disabled={loading}
            >
              {renderPasswordIcon(showPassword)}
            </button>
          </div>
          {renderPasswordStrength()}
          {errors.password && <p className='mt-1 text-sm text-red-500'>{errors.password}</p>}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Xác nhận mật khẩu</label>
          <div className='relative'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='••••••••'
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={`w-full px-4 py-2.5 pr-10 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm`}
              required
              disabled={loading}
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
              disabled={loading}
            >
              {renderPasswordIcon(showConfirmPassword)}
            </button>
          </div>
          {errors.confirmPassword && <p className='mt-1 text-sm text-red-500'>{errors.confirmPassword}</p>}
        </div>

        <div className='flex items-start gap-2 pt-1 pb-2'>
          <input
            type='checkbox'
            id='terms'
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className='w-4 h-4 mt-0.5 text-[var(--color-primary)] border-gray-300 rounded focus:ring-[var(--color-primary)] cursor-pointer'
            disabled={loading}
          />
          <label htmlFor='terms' className='text-xs text-gray-700 cursor-pointer select-none'>
            Tôi đồng ý với{' '}
            <Link to='/dieu-khoan' className='text-[var(--color-primary)] hover:underline'>
              các điều khoản
            </Link>
          </label>
        </div>

        {errors.general && <p className='text-sm text-red-600'>{errors.general}</p>}

        <AuthButton type='submit' loading={loading} disabled={loading || !agreeTerms} variant='primary'>
          Đăng ký
        </AuthButton>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
