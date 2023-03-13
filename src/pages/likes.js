import Head from 'next/head';
import Header from '@/components/Header';
import AppContext from '@/context/AppContext';
import { useState, useContext, useEffect } from 'react';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from '@/components/firebase-config';
import ImageGrid from '@/components/ImageGrid';

export default function Likes() {

  const { user } = useContext(AppContext)
  const { slider, setSlider } = useContext(AppContext)
  const [images, setImages] = useState([])

  useEffect(() => {
    if (user) {
      const gallery = collection(db, "gallery");
      const q = query(gallery, where("likes", "array-contains", user.uid));
      const unsub = onSnapshot(q, (querySnapshot) => {
        const newArray = [];
        querySnapshot.forEach((doc) => {
          newArray.push({ ...doc.data(), id: doc.id, "hasLike": (user ? doc.data().likes.includes(user.uid) : false) });
        });
        setImages(newArray);
      });
    }
  }, [])

  return (
    <>
      <Head>
        <title>Artifex - Likes</title>
        <meta name="description" content="AI Art Gallery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="logo.png" />
      </Head>
      <Header />
      <main className='font-inter bg-zinc-800 mb-12'>
        <div className="flex flex-col justify-center items-center pt-20 pb-10">
          <h1 className="text-7xl font-gloock text-prime mb-1 lg:text-8xl tracking-wide">Likes</h1>
          <div className='mt-8'>
            <p className='text-white opacity-50 text-sm text-center'>Columns: {slider[0]}</p>
            <input type="range" min={slider[1]} max={slider[2]} value={slider.length == 0 ? 1 : slider[0]} onChange={(e) => { setSlider([e.target.value, slider[1], slider[2]]) }} />
          </div>
        </div>
        <ImageGrid user={user} slider={slider[0]} onlyLikes={true} />
      </main>
    </>
  )
}