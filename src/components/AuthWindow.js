import { GoogleAuthProvider, signInWithPopup, sendSignInLinkToEmail } from "firebase/auth";
import { auth } from '@/components/firebase-config';
import { useEffect, useState, useContext } from "react";
import AppContext from '@/context/AppContext';
import { motion } from 'framer-motion';

export default function AuthWindow() {

    const {setUser,setAuthWindow} = useContext(AppContext)

    const [email, setEmail] = useState('')
    const [error, setError] = useState({})
    const [errorDisplay, setErrorDisplay] = useState('')
    const [emailLink, setEmailLink] = useState(false)

    useEffect(() => {
        if (error.code === 'auth/email-already-in-use') {
            setErrorDisplay('Email already used')
        } else if (error.code === 'auth/user-not-found') {
            setErrorDisplay('User not found')
        } else if (error.code === 'auth/popup-closed-by-user') {
            
        } else {
            setErrorDisplay(error.code)
        }
    }, [error])   

    function emailHandler(e) {
        setEmail(e.target.value)
    }
    // http://localhost:3000/   
    // http://artifexart.net/
    function continueHandler() {
        const actionCodeSettings = { url: 'http://artifexart.net/', handleCodeInApp: true, };
        sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem('emailForSignIn', email);
                console.log('email sent')
                setEmailLink(true)
            })
            .catch((error) => {
                setError({ code: error.code, text: error.message })
            });
    }

    function googleSign() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setUser(user)
                setAuthWindow(false)
            }).catch((error) => {
                setError({ code: error.code, text: error.message })
            });
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="w-screen h-screen fixed inset-0 z-40 bg-zinc-900/90 flex justify-center items-center"
        >
            <div className="w-full h-full absolute inset-0 z-50" onClick={() => { setAuthWindow(false) }}></div>
            <div className='relative w-80 h-[340px] z-50 bg-zinc-800 text-white rounded-xl flex flex-col items-center px-4'
                >
                <h1 className="text-3xl mt-8 tracking-[0.2em] font-gloock">SIGN IN</h1>
                <div className="w-full mt-8">
                    <button onClick={googleSign} className="w-full py-3 bg-zinc-700 rounded-md focus:outline-none"><svg xmlns="http://www.w3.org/2000/svg" className="inline w-4 h-4 mr-3 text-gray-900 fill-current" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                        Continue with Google
                    </button>
                </div>
                <div className="w-full my-6 flex items-center">
                    <div className="flex-grow border-b border-zinc-500"></div>
                    <span className="flex-shrink mx-4 text-sm">OR</span>
                    <div className="flex-grow border-b border-zinc-500"></div>
                </div>

                <div className="w-full ">
                    {!emailLink ? 
                    <div>
                        <input onChange={emailHandler} className="w-full h-10 rounded-lg text-center bg-zinc-700 focus:outline-none focus:border focus:border-zinc-400" type="email" value={email} placeholder="Email" />
                        <button onClick={continueHandler} className="w-full h-10 bg-zinc-700 mt-3 rounded-lg">Continue</button>
                        <p className="my-1 text-center text-sm text-red-500">{errorDisplay}</p> 
                    </div>
                    :
                    <p className="mt-8 text-sm text-center">Please confirm an email we sent you</p>
                    }
                </div>
            </div>
        </motion.div>
    )
}