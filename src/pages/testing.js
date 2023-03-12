import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlineHome, AiOutlineInfoCircle } from 'react-icons/ai'
import { BsBook } from 'react-icons/bs'
import { VscAccount } from 'react-icons/vsc'

export default function Testing() {

    const [menuOpen, setMenuOpen] = useState(false)

    function menuToggle() {
        setMenuOpen(!menuOpen)
    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center text-white relative">
            <div className="w-full h-[100px] fixed inset-0 flex justify-end items-center">
                <button className="p-2 bg-red-300 rounded-lg mr-4" onClick={menuToggle}>BURGER</button>
            </div>
            <AnimatePresence>
                {menuOpen &&
                    <motion.div                  
                        className="absolute w-[70%] h-[70%] mt-[100px] bg-zinc-900"
                    >
                        <div className="w-full h-14 flex items-center gap-2 text-2xl mt-[20%]">
                            <div className="w-1/4 h-full flex items-center pl-5"><AiOutlineHome /></div>
                            <div className="w-3/4 h-full flex items-center">Home</div>
                        </div>
                        <div className="w-full h-14 flex items-center gap-2 text-2xl">
                            <div className="w-1/4 h-full flex items-center pl-5"><BsBook /></div>
                            <div className="w-3/4 h-full flex items-center">Guide</div>
                        </div>
                        <div className="w-full h-14 flex items-center gap-2 text-2xl">
                            <div className="w-1/4 h-full flex items-center pl-5"><AiOutlineInfoCircle /></div>
                            <div className="w-3/4 h-full flex items-center">About</div>
                        </div>
                        <div className="w-full h-14 flex items-center gap-2 text-2xl">
                            <div className="w-1/4 h-full flex items-center pl-5"><MdAccountCircle /></div>
                            <div className="w-3/4 h-full flex items-center">Account</div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        
        
            <div className="fixed bottom-0 left-0 w-full h-20 flex justify-between items-center text-3xl px-12 bg-slate-500">
                <motion.div whileTap={{scale: 0.85}} className="focus:bg-none"><AiOutlineHome /></motion.div>
                <motion.div whileTap={{scale: 0.85}}><BsBook /></motion.div>
                <motion.div whileTap={{scale: 0.85}}><AiOutlineInfoCircle /></motion.div>
                <motion.div whileTap={{scale: 0.85}}><VscAccount /></motion.div>
            </div>

        </div>
    )
}