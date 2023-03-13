import { useEffect, useState } from 'react';
import { db, storage } from '@/components/firebase-config';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import Header from '@/components/Header';

export default function Addpic() {
 
  const [status, setStatus] = useState(false);
  const [file, setFile] = useState({});
  const [fileParams, setFileParams] = useState({
    prompt: "modelshoot style, (extremely detailed CG unity 8k wallpaper), full shot body photo of the most beautiful artwork in the world, medieval armor, professional majestic oil painting by Ed Blinkey, Atey Ghailan, Studio Ghibli, by Jeremy Mann, Greg Manchess, Antonio Moro, trending on ArtStation, trending on CGSociety, Intricate, High Detail, Sharp focus, dramatic, photorealistic painting art by midjourney and greg rutkowski",
    //negative: "canvas frame, cartoon, 3d, ((disfigured)), ((bad art)), ((deformed)),((extra limbs)),((close up)),((b&w)), wierd colors, blurry, (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))), out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck))), Photoshop, video game, ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, mutation, mutated, extra limbs, extra legs, extra arms, disfigured, deformed, cross-eye, body out of frame, blurry, bad art, bad anatomy, 3d render",
    sampler: "DPM++ SDE Karras",
    scale: "7",
    steps: "25"
  });

  useEffect(() => {
    document.getElementById('fileInput').addEventListener('change', (event) => {
      console.log(event.target.files[0].name);
      setFile(event.target.files[0]);    
      setStatus(false);
      setValue({target: {id: "seed", value: event.target.files[0].name.slice(6, -4)}});
    });
  },[])

  function imageSelector(event) {    
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewImage = document.getElementById('previewImage');
      previewImage.src = e.target.result;
      previewImage.style.display = 'block';
    };
    reader.readAsDataURL(file);      
  };

  function setValue(event) {
    const obj = {...fileParams};
    obj[event.target.id] = event.target.value;
    setFileParams(obj);
  };

  function submitImg() {
    const collectionRef = collection(db, "gallery");
    const storageRef = ref(storage, file.name);
    const tagsArray = fileParams.tags.split(",");
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log('File uploaded successfully');
        getDownloadURL(snapshot.ref).then((url) => {
          addDoc(collectionRef, { prompt: fileParams.prompt, 
                                  sampler: fileParams.sampler, 
                                  scale: fileParams.scale,
                                  steps: fileParams.steps,
                                  seed: fileParams.seed, 
                                  likes: [], 
                                  tags: tagsArray,
                                  url: String(url),
                                  imgName: file.name 
                                })
            .then((docRef) => {
              setValue({target: {id: "docId", value: docRef.id}});
              console.log('Doc created successfully');
              setStatus(true);
            });
        });
      })
      .catch((error) => {
        console.error('Error uploading file', error);
      });
  }  

  function testClick() {
    document.getElementById('fileInput').click();
  } 

  return (
    <>
      <Header />
      <main className='font-inter bg-background/80 min-h-screen'>      
        <div className='p-1.5 flex justify-center'>
          <div className="bg-background text-gray-100 rounded-md w-full p-2 mt-2 lg:w-1/3 lg:text-lg">
            <input id="fileInput" className="hidden" type="file" onChange={imageSelector} />
            <div className='flex flex-col justify-center items-center mt-1 p-1 w-full max-h-56 border-dashed border-2 border-gray-400'>
            <img className='w-40 mb-2' id='previewImage'></img>
              <button className='text-lg mb-2 text-white p-2 rounded-lg bg-zinc-700 hover:text-zinc-700 hover:bg-white' onClick={testClick}>Pick file</button>              
            </div>
            <div className="p-1 mt-1">
              <p>Prompt</p>
              <textarea className="resize-none w-full bg-area" rows={10} onChange={setValue} id="prompt" value={fileParams.prompt}></textarea>
              <p className='hidden'>Negative</p>
              <textarea className="hidden resize-none w-full bg-area" rows={11} onChange={setValue} id="negative" value={fileParams.negative}></textarea>
              <p>Tags</p>
              <textarea className="resize-none w-full bg-area" rows={2} onChange={setValue} id="tags"></textarea>
            </div>
            <div className="flex items-center p-1 rounded-t-md mt-2">
              <p className="w-1/4">Sampler</p>
              <input className="w-3/4 pl-2 bg-area" type="text" onChange={setValue} id="sampler" value={fileParams.sampler}/>
            </div>
            <div className="flex items-center p-1 ">
              <p className="w-1/4">Scale</p>
              <input className="w-3/4 pl-2 bg-area" type="number" onChange={setValue} id="scale" value={fileParams.scale}/>
            </div>
            <div className="flex items-center p-1 ">
              <p className="w-1/4">Steps</p>
              <input className="w-3/4 pl-2 bg-area" type="number" onChange={setValue} id="steps" value={fileParams.steps}/>
            </div>
            <div className="flex items-center p-1 rounded-b-md ">
              <p className="w-1/4">Seed</p>
              <input className="w-3/4 pl-2 bg-area" type="number" onChange={setValue} id="seed" value={fileParams.seed}/>
            </div>
            <div className="flex justify-center mt-4 mb-2">
              <button className="text-lg text-white p-2 rounded-lg bg-zinc-700 hover:text-zinc-700 hover:bg-white" onClick={submitImg}>Save image</button>
            </div>
            <div className='flex justify-center text-center text-xl mt-3 mb-4'>
              <p className='ml-1'>{status ? "Image uploaded!" : ""}</p> 
            </div>        
          </div>          
        </div>
      </main>
    </>
  );
};