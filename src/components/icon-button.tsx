import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface IIconButtonProps extends ComponentProps<'button'> {
  transparent?: boolean
}

export function IconButton({ transparent, ...props }: IIconButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        'rounded-md border border-white/10 bg-white/10 p-1.5 disabled:opacity-50',
        transparent && 'bg-black/20',
      )}
    />
  )
}
