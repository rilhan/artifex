import { motion } from 'framer-motion'

export default function Tag({tagName, currentTag, setCurrentTag}) {

    function selectTag(){
        if (currentTag === tagName) {
            setCurrentTag('all');
        } else {
            setCurrentTag(tagName);
        };
    };

    return (
        <motion.div 
            whileTap={{scale: 0.8}}
            onClick={selectTag} 
            className={"flex-none lg:hover:bg-white lg:hover:text-black select-none cursor-pointer border border-gray-700 rounded-md py-1 px-2 mr-2 " 
                        + (currentTag === tagName ? "bg-white text-black" : "")}><span>{'#'+ tagName}</span>
        </motion.div>
    )
};
