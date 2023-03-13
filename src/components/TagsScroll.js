import Tag from "./Tag"


export default function TagsScroll({ tags, currentTag, setCurrentTag }) {
    return (
        <div className="scroll-fix flex justify-start items-center ml-2 mb-5 text-white opacity-90 overflow-hidden overflow-x-scroll ">
            {tags.map((item, index) => (
                <Tag key={index} tagName={item} currentTag={currentTag} setCurrentTag={setCurrentTag} />
            ))}
        </div>
    )
}