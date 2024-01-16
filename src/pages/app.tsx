// pages/_app.tsx
import { UserProvider } from '../../contexts/UserContext';
import NavBar from '../components/NavBar';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp ({ Component, pageProps }: AppProps) {
    return ( 
        <UserProvider>
            <NavBar />
            <Component {...pageProps} />
        </UserProvider>
    )
}

export default MyApp;
