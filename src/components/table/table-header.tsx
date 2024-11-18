import { ComponentProps } from 'react'

interface ITableHeaderProps extends ComponentProps<'th'> {}

export function TableHeader(props: ITableHeaderProps) {
  return (
    <th className="px-2.5 py-3 text-left text-sm font-semibold" {...props} />
  )
}
