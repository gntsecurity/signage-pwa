import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit';
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  type = 'button',
}: ButtonProps) {
  const base =
    'px-4 py-2 rounded text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants: Record<string, string> = {
    primary: 'bg-white text-black hover:bg-gray-200 focus:ring-white',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-500 focus:ring-red-400',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </button>
  );
}
