import React from 'react'

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'outline'
  loading?: boolean
}

const AuthButton: React.FC<AuthButtonProps> = ({
  children,
  variant = 'primary',
  loading = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'w-full py-3 px-4 rounded-full font-bold text-base transition-all duration-200'
  const variantStyles =
    variant === 'primary'
      ? 'bg-[var(--color-secondary)] text-black hover:shadow-lg disabled:opacity-50'
      : 'border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-primary)] hover:text-white disabled:opacity-50'

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} disabled={loading} {...props}>
      {loading ? 'Đang xử lý...' : children}
    </button>
  )
}

export default AuthButton
