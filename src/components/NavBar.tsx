import Link from 'next/link';
import { useRouter} from 'next/router';

const NavBar: React.FC = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', 'false');

    router.push('/login');
  }

  return (
    <nav className="mb-4">
      <ul className="flex space-x-4">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/profile">Profile</Link></li>
        <li><Link href="/search">Nearby Theaters</Link></li>
        <li><Link href="/game"> Memory Game</Link></li>
        <li><button onClick={logout} className="text-indigo-600 hover:text-indigo-500">Logout</button></li>
      </ul>
    </nav>
  );
}

export default NavBar;
