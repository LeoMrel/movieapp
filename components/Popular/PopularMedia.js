import { useEffect, useRef, useState } from "react"
import PopularMedia from "./PopularMediaResults";
import useSWR from "swr";
import { fetcher } from "../../utils/utils";

const PopularMediaPage = ({json, title, url}) => {
    const [media, setMedia] = useState(json.results);
    const [shouldFetch, setShouldFetch] = useState(false);
    const count = useRef(1);

    const {data, error} = useSWR(shouldFetch ? `${url}&page=${count.current}` : null, fetcher)
    
    useEffect(() => {
        setShouldFetch(false);
        data && setMedia([...media, ...data]);
    }, [data, media])
   
    const handleLoadMore = () => {
        count.current += 1;
        setShouldFetch(true);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <section className="flex relative min-w-screen min-h-screen place-content-center">
            <div className="container flex gap-x-8 max-w-7xl flex-col py-8 px-6">
                <h1 className="font-bold text-2xl py-3">{title}</h1>
                <div className="grid mt-4 grid-cols-2 sm:grid-cols-3 
                md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
                    {media.map(media => {
                        return(
                            <PopularMedia
                            key={media.id}
                            object={media} />
                        )
                    })}
                </div>
                {json.total_pages > count.current && 
                <button 
                type="button"
                className="bg-blue-500 text-white text-2xl font-bold
                rounded-xl hover:bg-blue-600 transition-colors duration-300
                h-14 w-full my-8 shadow-lg"
                onClick={handleLoadMore}>
                    <h1>Load More</h1>
                </button>}
                </div>
            {count.current > 1 && 
            <button className="h-16 w-16 bg-blue-500 hover:bg-blue-600 rounded-full 
            fixed bottom-10 right-10 max-h-max border
            transition-all appear_in duration-300"
            onClick={scrollToTop}>
                <span className="text-white">↑</span>
            </button>}
        </section>
    )

}

export default PopularMediaPage