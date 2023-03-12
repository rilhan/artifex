import { useContext } from "react"
import { useRouter } from 'next/router';
import AppContext from '@/context/AppContext'
import { auth } from '@/components/firebase-config'
import { signOut } from "firebase/auth"

export default function Signout({setAccountPopup}) {

    const { user } = useContext(AppContext)
    const { setUser } = useContext(AppContext)
    const router = useRouter();

    function signOutToggle() {
        signOut(auth).then(() => {
            setUser(null)
            setAccountPopup(false)
            router.push('/');
        })
    }

    function buttonToggle() {
        setAccountPopup(false)
    }

    return (
        <div> 
            <div className='absolute inset-0 z-40' onClick={buttonToggle}></div>
            <div className="w-64 bg-zinc-800 fixed z-50 right-0 top-11 rounded-md flex flex-col items-start border border-zinc-700 text-white divide-y divide-zinc-700">
                <div className="w-full px-4 py-2 bg-zinc-700 bg-opacity-50 ">
                    <div className="flex items-center">
                        <div className="rounded-full w-7 h-7 bg-zinc-600 flex justify-center items-center mr-2">
                            <p>{user.email.slice(0, 1).toUpperCase()}</p>
                        </div>
                        <span className="font-medium truncate">{user.email}</span>
                    </div>
                </div>
                <div className="w-full bg-zinc-600">
                    <div className="w-full h-full cursor-pointer flex justify-center items-center px-4 py-2" onClick={signOutToggle}>
                        Sign out
                    </div>
                </div>
            </div>
        </div>
    )
}