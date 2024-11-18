import nlwUnitLogo from '../assets/nlw-unit-logo.svg'
import { NavLink } from './nav-link'

export function Header() {
  return (
    <header className="flex items-center gap-5 py-2">
      <img src={nlwUnitLogo} alt="" />

      <nav className="flex items-center gap-5">
        <NavLink href="/">Eventos</NavLink>
        <NavLink href="/">Participantes</NavLink>
      </nav>
    </header>
  )
}
