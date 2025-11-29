import React from 'react'

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const AuthInput: React.FC<AuthInputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className='mb-1'>
      {label && <label className='block text-sm  font-bold  mb-2'>{label}</label>}
      <input
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
    </div>
  )
}

export default AuthInput
