import { ComponentProps } from 'react'

interface ITableProps extends ComponentProps<'table'> {}

export function Table(props: ITableProps) {
  return (
    <div className="mt-5 overflow-hidden rounded-lg border border-white/10">
      <table className="w-full" {...props} />
    </div>
  )
}
