import PictureCard from '@/components/PictureCard';
import { useState, useEffect } from 'react';
import { db } from '@/components/firebase-config';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import TagsScroll from '@/components/TagsScroll';
import { AnimatePresence } from 'framer-motion';

export default function ImageGrid({ user, slider, onlyLikes }) {

    const gallery = collection(db, "gallery");
    const [images, setImages] = useState([]);
    const [tags, setTags] = useState([])
    const [currentTag, setCurrentTag] = useState('all');

    useEffect(() => {
        if (onlyLikes) {
            if (user) {
                const q = query(gallery, where("likes", "array-contains", user.uid))
                getImagesArray(q)
            }
        } else {
            const q = query(gallery)
            getImagesArray(q)
        }        
    }, [user])

    // set and update tags after pictures
    useEffect(() => {
        // set tags
        const newTags = [];
        images.forEach((item) => {
            item.tags.forEach((item) => {
                if (!newTags.includes(item)) { newTags.push(item); }
            })
        })
        // update and shuffle tags if new tags are there
        if (tags.length !== newTags.length) {
            const shuffledArr = [...newTags].sort(() => Math.random() - 0.5);
            setTags(shuffledArr);
        }
    }, [images])

    function getImagesArray(q) {
        const unsub = onSnapshot(q, (querySnapshot) => {
            const newArray = [];
            querySnapshot.forEach((doc) => {
                newArray.push({ ...doc.data(), id: doc.id, "hasLike": (user ? doc.data().likes.includes(user.uid) : false) });
            });
            setImages(newArray);
        });
    }

    return (
        <div>
            {!onlyLikes &&
                <TagsScroll tags={tags} currentTag={currentTag} setCurrentTag={setCurrentTag} />
            }
            <div          
                className={'px-2 gap-1 grid grid-cols-' + slider}
            >
            <AnimatePresence>
                {images.map((item) => {
                    if (item.tags.includes(currentTag) || (currentTag === 'all')) {
                        return <PictureCard key={item.id} user={user} imageObject={item} setCurrentTag={setCurrentTag} />
                    }
                })
                }
                </AnimatePresence>
            </div>
        </div>
    )
}