import { useState, useEffect } from 'react';
import { db } from '@/pages/firebase-config';
import { collection, onSnapshot, query } from "firebase/firestore";
import Preview from '@/components/Preview';
import ImageGrid from '@/components/ImageGrid';
import TagsScroll from '@/components/TagsScroll';
import { isMobile } from 'react-device-detect';
import Head from 'next/head';

export default function Home() {

  const gallery = collection(db, "gallery");
  const [galleryArray, setGalleryArray] = useState([]);
  const [tagList, setTagList] = useState([])
  const [currTag, setCurrTag] = useState('all');
  const [preview, setPreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [userId, setUserId] = useState(null);
  const [slider, setSlider] = useState(2)

  useEffect(() => {
    const id = document.cookie.slice(7);
    if (id.length === 0) {
      const userId = Math.floor(Math.random() * 1000000000);
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 365);
      document.cookie = "userId=" + userId + "; expires=" + expirationDate.toUTCString() + "; path=/";
    };
    setUserId(id);
    setSlider((isMobile ? 2 : 5));
  }, []);

  useEffect(() => {
    preview ? document.body.style.setProperty('overflow-y', 'hidden', 'important') : document.body.style.setProperty('overflow-y', null)
  }, [preview])

  useEffect(() => {
    if (userId) {
      const q = query(gallery);
      const unsub = onSnapshot(q, (querySnapshot) => {
        const newArray = [];
        let tags = [];
        querySnapshot.forEach((doc) => {
          newArray.push({ ...doc.data(), id: doc.id, "hasLike": doc.data().likes.includes(userId) });
        });
        setGalleryArray(newArray);
      });
    }
  }, [userId])

  useEffect(() => {
    const tags = [];
    //update selected image in preview if something changes
    galleryArray.forEach((item) => {
      if (item.id === selectedImage.id) {
        setSelectedImage(item)
      }
      item.tags.forEach((item) => {
        if (!tags.includes(item)) { tags.push(item); }
      })
    })
    //only update and shuffle tags if new tags are there
    if (tagList.length !== tags.length) {
      const shuffledArr = [...tags].sort(() => Math.random() - 0.5);
      setTagList(shuffledArr);
    }
  }, [galleryArray])

  function toggleSlider(e) {
    setSlider(e.target.value)
  }

  return (
    <>
      <Head>
        <title>Artifex</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className='font-inter bg-zinc-800 min-h-screen w-full'>
        {preview ? <Preview setPreview={setPreview} selectedImage={selectedImage} userId={userId} /> : ''}
        <div className="flex flex-col justify-center items-center pt-20 pb-10">
          <h1 className="text-7xl font-gloock text-prime mb-1 lg:text-8xl">Artifex</h1>
          <p className="text-sub font-semibold">AI generated Art</p>
          <div className='mt-8'>
            <p className='text-sub text-sm text-center'>Columns: {slider}</p>
            <input type="range" min="1" max="8" defaultValue={slider} onChange={toggleSlider} />
          </div>
        </div>
        <TagsScroll tagList={tagList} currTag={currTag} setCurrTag={setCurrTag} />
        <ImageGrid galleryArray={galleryArray} currTag={currTag} setPreview={setPreview} setSelectedImage={setSelectedImage} userId={userId} slider={slider} />
      </main>
    </>
  )
};