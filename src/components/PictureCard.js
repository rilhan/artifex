import { db } from '@/components/firebase-config';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useState, useEffect, useContext } from 'react';
import { FaHeart } from "react-icons/fa";
import Preview from '@/components/Preview';
import { motion } from 'framer-motion';
import AppContext from '@/context/AppContext';


export default function PictureCard({ imageObject, user, setCurrentTag }) {
  
  const { setAuthWindow } = useContext(AppContext)
  const [preview, setPreview] = useState(false);

  // disable scroll when preview open
  useEffect(() => {
    preview ? document.body.style.setProperty('overflow-y', 'hidden', 'important') : document.body.style.setProperty('overflow-y', null)
  }, [preview])

  async function addLike() {
    const docRef = doc(db, "gallery", imageObject.id);
    if (user) {
      if (imageObject.likes.includes(user.uid)) {
        await updateDoc(docRef, { likes: arrayRemove(user.uid) });
      } else {
        await updateDoc(docRef, { likes: arrayUnion(user.uid) });
      }
    } else {
      setAuthWindow(true)
    }
  };

  return (
    <div>       
      {preview && <Preview setPreview={setPreview} user={user} selectedImage={imageObject} setCurrentTag={setCurrentTag} /> }           
      <motion.div 
        layout  
        initial={{opacity: 0}}
        animate={{opacity: 1}} 
        exit={{opacity: 0}} 
        transition={{duration:0.2}}     
        className='relative group'
      >       
        <img src={imageObject.url} className=' rounded-lg' alt="ai-generated-art" />        
          <div className='absolute inset-0 bg-zinc-800/40 opacity-0 text-white md:group-hover:opacity-100 md:group-hover:duration-300 cursor-pointer' >
            <div className='absolute inset-0' onClick={() => { setPreview(true) } } ></div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.5 }}
              onClick={addLike}
              className={'absolute right-2 top-2 bg-zinc-800 opacity-100 rounded-md p-2 cursor-pointer z-10 text-xl ' + (imageObject.hasLike ? ' text-red-500 bg-opacity-0 border border-zinc-400' : '')}
            >
              <FaHeart />
            </motion.div>
          </div>              
      </motion.div>       
    </div>
  );
};