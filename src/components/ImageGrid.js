import PictureCard from '@/components/PictureCard';

export default function ImageGrid({ galleryArray, currTag, setPreview, setSelectedImage, userId, slider }) {

    return (
        <div className={'grid grid-cols-'+slider}>
            {galleryArray.map((item) => {
                if (item.tags.includes(currTag)) {
                    return <PictureCard key={item.id} 
                                        id={item.id} 
                                        url={item.url} 
                                        likes={item.likes} 
                                        tags={item.tags} 
                                        setPreview={setPreview} 
                                        setSelectedImage={setSelectedImage} 
                                        userId={userId}
                                        imageObject={item}
                                        slider={slider}
                                        />
                } else if (currTag === 'all') {
                    return <PictureCard key={item.id} 
                                        id={item.id} 
                                        url={item.url} 
                                        likes={item.likes} 
                                        tags={item.tags} 
                                        setPreview={setPreview} 
                                        setSelectedImage={setSelectedImage}
                                        userId={userId} 
                                        imageObject={item}  
                                        slider={slider} 
                                        />
                }
            })
            }
        </div>
    )
}

//grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8