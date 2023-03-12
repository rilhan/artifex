import Head from 'next/head';
import Header from '@/components/Header';
import { signOut } from "firebase/auth";
import { auth } from '@/components/firebase-config';
import AppContext from '@/context/AppContext';
import { useContext } from 'react';
import { useRouter } from 'next/router';

export default function Account() {

    const {user} = useContext(AppContext)
    const {setUser} = useContext(AppContext)
    const router = useRouter();

    console.log(user)

    function logoutHandler() {
        signOut(auth).then(() => {
            setUser(null)
            console.log('logout')
            router.push('/');
        }).catch((error) => {
            console.log(error.code, error.message)
        });
    }    

    return (
        <>
            <Head>
                <title>Artifex</title>
                <meta name="description" content="AI Art Gallery" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="logo.png" />
            </Head>
            <Header />
            <main className='font-inter bg-zinc-800 min-h-screen w-full text-white'>
                <h1>this is account page</h1>                
                <div className='text-black'>                   
                    <button className='block mt-2 p-2 bg-red-300 rounded-md' onClick={logoutHandler}>Logout</button>
                </div>
                <p>user id: {user ? user.uid : ''}</p>
                <p>user email: {user ? user.email : ''}</p>
                <p>verified: {user ? (user.emailVerified ? 'true' : 'false' ) : ''}</p>
            </main>
        </>
    )
}