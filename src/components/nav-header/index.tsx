import MobileNavHeader from './mobile-header/menubar-based'
import DesktopNavHeader from './desktop-header'

interface ContactButtonProps {
  background?: 'semi-transparent' | 'solid'
  color?: 'dark' | 'light'
}

interface NavHeaderProps extends React.HTMLAttributes<HTMLElement> {
  contactButton?: ContactButtonProps
}

export default function NavHeader(props: NavHeaderProps) {
  return (
    <>
      <MobileNavHeader {...props} />
      <DesktopNavHeader {...props} />
    </>
  )
}
