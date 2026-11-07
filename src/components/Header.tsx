interface HeaderProps {
  name: string;
  logoUrl: string;
}

export function Header({ name, logoUrl }: HeaderProps) {
  return (
    <header className="header">
      <img className="header-logo" src={logoUrl} alt="" width={40} height={40} />
      <span className="header-title">{name}</span>
    </header>
  );
}
