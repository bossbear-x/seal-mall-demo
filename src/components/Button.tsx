import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  block?: boolean
  children: ReactNode
}

export function Button({ variant = 'primary', block, className = '', children, ...props }: Props) {
  return <button className={`button button--${variant} ${block ? 'button--block' : ''} ${className}`} {...props}>{children}</button>
}
