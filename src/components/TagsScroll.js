import Tag from "./Tag"

export default function TagsScroll({ tagList, currTag, setCurrTag }) {

    return (
        <div className="scroll-fix flex justify-start items-center ml-2 mb-5 text-prime overflow-hidden overflow-x-scroll ">
            {tagList.map((item, index) => (
                <Tag key={index} tagName={item} currTag={currTag} setCurrTag={setCurrTag} />
            ))}
        </div>
    )
}