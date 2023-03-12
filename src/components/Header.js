import { BsFillPersonFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { AiOutlineHome, AiOutlineHeart } from 'react-icons/ai'
import { BsBook } from 'react-icons/bs'
import { VscAccount } from 'react-icons/vsc'
import AppContext from '@/context/AppContext';
import Signout from './Signout'
import AuthWindow from './AuthWindow'

export default function Header() {

    const { user } = useContext(AppContext)
    const { devicePhone } = useContext(AppContext)
    const { authWindow, setAuthWindow } = useContext(AppContext)

    const [accountPopup, setAccountPopup] = useState(false)
    const [page, setPage] = useState({ path: useRouter().asPath, style: ' pt-[2px] border-b-2 border-b-zinc-100' })

    function authToggle() {
        setAuthWindow(true)
    }

    return (
        <div>
            {authWindow && <AuthWindow /> }     
            {accountPopup ? <Signout setAccountPopup={setAccountPopup} devicePhone={devicePhone} /> : ''}
            {devicePhone ?
                <div className="fixed bottom-0 left-0 w-full h-12 flex justify-between items-center text-2xl px-12 bg-zinc-900/80 backdrop-blur text-white z-10">
                    <motion.div whileTap={{ scale: 0.7 }}><Link href='/'><AiOutlineHome /></Link></motion.div>
                    <motion.div whileTap={{ scale: 0.7 }}><Link href='/guides'><BsBook /></Link></motion.div>
                    <motion.div whileTap={{ scale: 0.7 }}><Link href='/likes'><AiOutlineHeart /></Link></motion.div>
                    <motion.div whileTap={{ scale: 0.7 }}><VscAccount onClick={authToggle} /></motion.div>
                </div>
                :
                <header className='mb-14'>
                    <div className='font-inter fixed top-0 w-full bg-zinc-900/80 border-b border-b-zinc-700 h-12 text-white flex justify-between items-center backdrop-blur px-4 z-10'>
                        <Link href='/'><h1 className='text-2xl cursor-pointer font-gloock'>Artifex</h1></Link>
                        <div className='text-sm flex h-full cursor-pointer'>
                            <Link href='/' className={'w-20 flex items-center justify-center md:hover:bg-gray-200 md:hover:text-black' + (page.path === '/' ? page.style : '')}>
                                Home
                            </Link>
                            <Link href='/guides' className={'w-20 flex items-center justify-center md:hover:bg-gray-200 md:hover:text-black' + (page.path === '/guides' ? page.style : '')}>
                                Guides
                            </Link>
                            <Link href='/likes' className={'w-20 flex items-center justify-center md:hover:bg-gray-200 md:hover:text-black' + (page.path === '/likes' ? page.style : '')}>
                                Likes
                            </Link>
                        </div>
                        <div className={'w-14 h-full flex justify-center items-center cursor-pointer ' + (page.path === '/account' ? page.style : '')}>
                            {user != null ?
                                <div className='w-full h-full flex justify-center items-center'>
                                    <div className="h-full flex items-center justify-end">
                                        <button onClick={() => { setAccountPopup(!accountPopup) }} className="h-7 w-7 rounded-full ml-2 text-xs md:text-sm bg-zinc-800 border  border-zinc-700 mr-2 flex items-center justify-center opacity-80 hover:bg-white hover:text-black" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r0:" data-state="closed">
                                            {user.email.slice(0, 1).toUpperCase()}
                                        </button>
                                    </div>
                                </div>
                                :
                                <div className='w-full h-full flex justify-center items-center md:hover:bg-gray-200 md:hover:text-black' onClick={authToggle}><BsFillPersonFill className='text-2xl' /></div>}
                        </div>
                    </div>
                </header>
            }                   
        </div>
    )
}