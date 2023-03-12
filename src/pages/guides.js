import Head from 'next/head';
import Header from '@/components/Header';

export default function Guides() {

  return (
    <>
      <Head>
        <title>Artifex</title>
        <meta name="description" content="AI Art Gallery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="logo.png" />
      </Head>
      <Header />
      <main className='font-inter bg-zinc-800 mb-12'>        
        <div className="flex flex-col justify-center items-center pt-20 pb-10">
          <h1 className="text-7xl font-gloock text-prime mb-1 lg:text-8xl tracking-wide">Guides</h1> 
          <p className="text-white opacity-50 ">How to setup everything</p>  
          <p className="text-white mt-20 text-2xl">Guides are coming soon</p>       
        </div>
      </main>
    </>
  )
}