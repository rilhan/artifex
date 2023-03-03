export default function Tag(props) {

    function selectTag(){
        if (props.currTag === props.tagName) {
            props.setCurrTag('all');
        } else {
            props.setCurrTag(props.tagName);
        };
    };

    return (
        <div onClick={selectTag} className={"flex-none lg:hover:bg-white lg:hover:text-gray-700 select-none cursor-pointer bg-gray-700 rounded-md py-1 px-2 mr-2 " + (props.currTag === props.tagName ? "bg-white text-gray-700" : "")}><span>{'#'+ props.tagName}</span></div>
    )
};
