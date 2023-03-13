import { useEffect, useContext } from 'react';
import { auth } from '@/components/firebase-config';
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import ImageGrid from '@/components/ImageGrid';
import Head from 'next/head';
import Header from '@/components/Header';
import AppContext from '@/context/AppContext';

export default function Home() {

  const { user, setUser } = useContext(AppContext)
  const { slider, setSlider } = useContext(AppContext)

  useEffect(() => {
    // set auth with email link
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) { email = window.prompt('Please provide your email for confirmation') }
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn');
          setUser(result.user)
        })
        .catch((error) => {
          console.log('error =>', error.code)
        });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Artifex</title>
        <meta name="description" content="AI Art Gallery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="logo.png" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8190924517802964" crossorigin="anonymous"></script>
      </Head>
      <Header />
      <main className='font-inter bg-zinc-800 mb-12'>
        <div className="flex flex-col justify-center items-center pt-20 pb-10">
          <h1 className="text-7xl font-gloock text-prime mb-1 lg:text-8xl tracking-wide">Artifex</h1>
          <p className="text-white opacity-50 ">AI art gallery</p>
          <div className='mt-8'>
            <p className='text-white opacity-50 text-sm text-center'>Columns: {slider[0]}</p>
            <input type="range" min={slider[1]} max={slider[2]} value={slider.length == 0 ? 1 : slider[0]} onChange={(e) => { setSlider([e.target.value, slider[1], slider[2]]) }} />
          </div>
        </div>
        <ImageGrid user={user} slider={slider[0]} />
      </main>
    </>
  )
};