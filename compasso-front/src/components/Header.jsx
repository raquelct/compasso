import { IconGrid, IconFile, IconBook, IconBookmark, IconBag, IconBell } from '../icons.jsx';

const LINKS = [
  { label: 'Início', Icon: IconGrid, href: '#/' },
  { label: 'Meus planos', Icon: IconFile, href: '#/' },
  { label: 'Biblioteca', Icon: IconBook, href: '#/' },
  { label: 'Favoritos', Icon: IconBookmark, href: '#/' },
  { label: 'Lojinha', Icon: IconBag, href: '#/' },
];

export default function Header({ user, active = 'Início' }) {
  return (
    <header className="header">
      <a href="#/" className="brand">
        <div className="brand-mark" />
        <span>COMPASSO</span>
      </a>
      <nav className="topnav">
        {LINKS.map(({ label, Icon, href }) => {
          const on = label === active;
          return (
            <a key={label} href={href} className={'pill' + (on ? ' pill--active' : '')} aria-current={on ? 'page' : undefined}>
              <Icon size={15} />{label}
            </a>
          );
        })}
      </nav>
      <div className="header-actions">
        <button className="icon-btn" aria-label="Notificações">
          <IconBell size={18} />
          <span className="badge-dot">2</span>
        </button>
        <div className="avatar" title={user.name}>{user.initials}</div>
      </div>
    </header>
  );
}
