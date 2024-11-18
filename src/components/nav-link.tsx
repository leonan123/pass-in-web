import { ComponentProps } from 'react'

interface INavLinkProps extends ComponentProps<'a'> {}

export function NavLink({ ...props }: INavLinkProps) {
  return <a {...props} className="text-sm font-medium" />
}
