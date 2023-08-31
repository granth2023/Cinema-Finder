import Link from 'next/link';

const NavBar: React.FC = () => {
  return (
    <nav className="mb-4">
      <ul className="flex space-x-4">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/profile">Profile</Link></li>
        <li><Link href="/search">Nearby Theaters</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
