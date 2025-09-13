import style from "./navigation-menu.module.css"
import { Link, useLocation } from "react-router"

function NavigationMenu({ className = "", children, ...props }) {
  return (
    <nav className={`${style.navigationMenu} ${className}`} {...props}>
      {children}
    </nav>
  )
}

function NavigationMenuList({ className = "", children, ...props }) {
  return (
    <ul className={`${style.navigationMenuList} ${className}`} {...props}>
      {children}
    </ul>
  )
}

function NavigationMenuItem({ className = "", children, ...props }) {
  return (
    <li className={`${style.navigationMenuItem} ${className}`} {...props}>
      {children}
    </li>
  )
}

function NavigationMenuLink({ className = "", children, to, ...props }) {
  const location = useLocation()
  const isActive = location.pathname === to
  
  return (
    <Link 
      to={to}
      className={`${style.navigationMenuLink} ${isActive ? style.active : ''} ${className}`} 
      {...props}
    >
      {children}
    </Link>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
}