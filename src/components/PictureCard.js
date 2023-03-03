import { db } from '@/components/firebase-config';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { FaHeart } from "react-icons/fa";

export default function PictureCard(props) {

  function getCount(a) {
    try { return a.length; } catch { return 0; }
  };

  async function addLike() {    
    const docRef = doc(db, "gallery", props.id);
    if (props.likes.includes(props.userId)) {
      await updateDoc(docRef, { likes: arrayRemove(props.userId) });
    } else {
      await updateDoc(docRef, { likes: arrayUnion(props.userId) });
    }       
  };

  function buttonHandle() {
    props.setPreview(true)
    props.setSelectedImage(props.imageObject)
  }

  return (
    <div>
      <div className='relative group'>
        <img src={props.url} onClick={buttonHandle} className='cursor-pointer' />
        <div className='hidden md:block absolute bottom-0 left-0 h-1/5 bg-zinc-800 w-full opacity-0 text-white md:group-hover:opacity-70 md:group-hover:duration-200'>
          <div className={'w-full h-full flex flex-row ' + (props.slider < 4 ? 'text-6xl' : 'text-3xl')}>
            <div className='w-1/2 flex items-center justify-end pr-6'>{getCount(props.likes)}</div>
            <div className='w-1/2 flex items-center justify-start '><FaHeart onClick={addLike} className={'cursor-pointer ' + ((props.likes.includes(props.userId)) ? ' text-red-600' : '')}/></div>
          </div>
        </div>
      </div>               
    </div>
  );
};