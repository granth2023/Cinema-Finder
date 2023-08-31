import Link from 'next/link';

const NavBar: React.FC = () => {
  return (
    <nav className="mb-4">
      <ul className="flex space-x-4">
        <li><Link href="/"><a className="text-blue-500">Home</a></Link></li>
        <li><Link href="/profile"><a className="text-blue-500">Profile</a></Link></li>
        <li><Link href="/search"><a className="text-blue-500">Search</a></Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
