import type { AppProps } from 'next/app';
import NavBar from '../components/NavBar';
import '../Cinema-Finder/src/styles/globals.css';
import { UserProvider } from '../../contexts/UserContext';



function MyApp ({ Component, pageProps }: AppProps){
    return ( 
        <UserProvider>
        <>
            <NavBar />
            <Component {...pageProps} />
         
        
        </>
        </UserProvider>
    )
}

export default MyApp;

