import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface ITableCellProps extends ComponentProps<'td'> {}

export function TableCell({ className, ...props }: ITableCellProps) {
  return (
    <td
      className={twMerge('px-2.5 py-3 text-sm text-zinc-300', className)}
      {...props}
    />
  )
}
