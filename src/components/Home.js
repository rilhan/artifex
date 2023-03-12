import { useState, useEffect } from "react"
import { isMobile } from 'react-device-detect';
import ImageGrid from '@/components/ImageGrid';
import TagsScroll from '@/components/TagsScroll';
import { db } from '@/components/firebase-config';
import { collection, onSnapshot, query } from "firebase/firestore";

export default function Home({ user }) {

    const gallery = collection(db, "gallery")
    const [galleryArray, setGalleryArray] = useState([])
    const [tagList, setTagList] = useState([])
    const [currTag, setCurrTag] = useState('all')
    const [slider, setSlider] = useState(2)
    const [preview, setPreview] = useState(false)

    useEffect(() => {
        setSlider((isMobile ? 2 : 5));
    }, [])

    useEffect(() => {
        //if (user) {
        const q = query(gallery);
        const unsub = onSnapshot(q, (querySnapshot) => {
            const newArray = [];
            let tags = [];
            querySnapshot.forEach((doc) => {
                newArray.push({ ...doc.data(), id: doc.id, "hasLike": (user ? doc.data().likes.includes(user.uid) : false) });
            });
            setGalleryArray(newArray);
        });
        //}
    }, [user])

    function toggleSlider(e) {
        setSlider(e.target.value)
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center pt-20 pb-10">
                <h1 className="text-7xl font-gloock text-prime mb-1 lg:text-8xl">Artifex</h1>
                <p className="text-sub font-semibold">AI generated Art</p>
                <div className='mt-8'>
                    <p className='text-sub text-sm text-center'>Columns: {slider}</p>
                    <input type="range" min="1" max="8" defaultValue={slider} onChange={toggleSlider} />
                </div>
            </div>
            <TagsScroll tagList={tagList} currTag={currTag} setCurrTag={setCurrTag} />
            <ImageGrid galleryArray={galleryArray} currTag={currTag} setPreview={setPreview} setSelectedImage={setSelectedImage} userId={user} slider={slider} />
        </div>
    )
}