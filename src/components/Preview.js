import { db, storage } from '@/components/firebase-config';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { FaHeart } from 'react-icons/fa';
import { MdClose } from 'react-icons/md'
import copy from 'copy-to-clipboard';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { saveAs } from "file-saver";
import { FiDownload } from 'react-icons/fi';
import { ref, getBlob } from 'firebase/storage';
import AppContext from '@/context/AppContext';


export default function Preview({ setPreview, selectedImage, user }) {

  const { setAuthWindow } = useContext(AppContext)
  const [isCopied, setIsCopied] = useState(false)  
  const [isLoaded, setIsLoaded] = useState(false);

  function togglePreview() {
    setPreview(false)
  }

  function getCount(a) {
    try { return a.length } catch { return 0 }
  }

  function copyPrompt() {
    setIsCopied(true)
    copy(selectedImage.prompt);
    setTimeout(() => { setIsCopied(false) }, 2000);
  };

  async function addLike() {
    const docRef = doc(db, "gallery", selectedImage.id);
    if (user) {
      if (selectedImage.hasLike) {
        await updateDoc(docRef, { likes: arrayRemove(user.uid) });
      } else {
        await updateDoc(docRef, { likes: arrayUnion(user.uid) });
      }
    } else {
      setAuthWindow(true)
    }
  };

  function saveImg() {
    getBlob(ref(storage, selectedImage.url))
      .then((blob) => { saveAs(blob, (selectedImage.seed + '.png')) })
  }

  return (
    <div className="w-full min-h-screen fixed inset-0 z-20 bg-zinc-900 bg-opacity-90">
      <div className='absolute w-full h-12' onClick={togglePreview}></div>
      <MdClose className='absolute top-0 left-0 w-12 h-12 text-white z-30 cursor-pointer' onClick={togglePreview} />
      <div className='relative flex top-12 z-20 w-full max-h-[calc(100vh-48px)] overflow-hidden overflow-y-auto md:min-h-screen md:justify-center md:items-center md:top-0'>
        <div className='w-full min-h-screen absolute inset-0 z-30' onClick={togglePreview}></div>
        <div className='z-30 bg-zinc-800 text-white rounded-xl w-full h-full flex flex-col md:flex-row overflow-hidden md:w-9/12'>
          <div className='w-full flex justify-center items-center md:w-1/2 md:p-1'>
            <img src={selectedImage.url} className='rounded-lg' />
          </div>
          {isLoaded && <p>loaded</p>}
          <div className='w-full md:w-1/2'>
            <div className="bg-zinc-700 opacity-70 rounded-lg m-4">
              <div className="px-4 py-5">
                <p>{selectedImage.prompt}</p>
                <div className="flex justify-center items-center gap-4 h-10 mt-5 ">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-1/2 h-full flex justify-center items-center rounded-lg bg-zinc-500 text-sm cursor-pointer"
                    onClick={copyPrompt}>
                    {isCopied ? "Copied!" : "Copy"}
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-1/2 h-full flex justify-center items-center rounded-lg gap-3 bg-zinc-500 cursor-pointer"
                    onClick={addLike}>
                    <div>{getCount(selectedImage.likes)}</div>
                    <div><FaHeart className={'text-2xl ' + (selectedImage.hasLike ? 'text-red-700' : '')} /></div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    className="w-14 h-full flex justify-center items-center rounded-lg bg-zinc-500 cursor-pointer"
                    onClick={saveImg}
                  >
                    <FiDownload />
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="bg-zinc-700 opacity-70 rounded-lg m-4">
              <div className="px-4 py-2 flex">
                {selectedImage.tags.map((tag, index) => (
                  <div key={index} className='ml-1'>#{tag}</div>
                ))}
              </div>
            </div>
            <div className='px-5 pb-24 text-md md:py-2'>
              <div className="flex justify-between items-center mb-1 mt-3">
                <p className="text-sub">Sampler</p>
                <div className="w-44 bg-area text-gray-100 rounded-md text-right"><p className="mr-3">{selectedImage.sampler}</p></div>
              </div>
              <div className="flex justify-between items-center mb-1 mt-3">
                <p className="text-sub">Scale</p>
                <div className="w-12 bg-area text-gray-100 rounded-md text-right"><p className="mr-3">{selectedImage.scale}</p></div>
              </div>
              <div className="flex justify-between items-center mb-1 mt-3">
                <p className="text-sub">Steps</p>
                <div className="w-12 bg-area text-gray-100 rounded-md text-right"><p className="mr-3">{selectedImage.steps}</p></div>
              </div>
              <div className="flex justify-between items-center mb-5 mt-3">
                <p className="text-sub">Seed</p>
                <div className="w-44 bg-area rounded-md text-right"><p className="mr-3">{selectedImage.seed}</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}