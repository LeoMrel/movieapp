import Image from "next/image";
import Link from "next/link";
import Head from "next/head"
import Preview from "./Preview";
import Info from "./Info";
import default_icon from "../../public/default_icon.png";
import default_movie from "../../public/default_movie.png";
import { score } from "../../utils/utils";

const Details = ({data}) => {

    const [movie, tv] = data.movie ? [data.movie, null] : [null, data.tv]
    const credits = data.credits;
    const recommendations = data.recommendations;
    const videos = data.videos;
    const metaTitle = movie ? movie.title : tv.name;
    const metaDate = movie && movie.release_date ? new Date(movie.release_date).getFullYear() 
    : tv && tv.first_air_date ? new Date(tv.first_air_date).getFullYear()
    : null
    
    return (
    <>
    <Head>
        <title>{metaTitle} {metaDate && `(${metaDate})`} — Not The Movie Database (NTMDB)</title>
    </Head>
    <Preview media={movie ? movie : tv} crew={credits.crew && credits.crew}/>
    <section className="min-h-full min-w-screen flex place-content-center">
        <div className="max-w-7xl w-full overflow-x-hidden">
        <div className="flex flex-col md:flex-row justify-between">
        <Info media={movie ? movie : tv} />
        <div className="flex flex-col relative overflow-x-hidden">
        <div className="absolute bg-gradient-to-l
        from-white z-10 top-0 right-0 h-full w-1/12 pointer-events-none"/>
        <h1 className="ml-4 text-xl font-bold mt-10">Top cast</h1>
        <div className="flex flex-row overflow-x-scroll 
        scrollbar-thin">
        {credits.cast.length === 0 ? <h1 className="ml-4 mt-8 font-semibold">
            There is no cast avaliable for this {movie ? "movie" : "show"}</h1>
            : credits.cast.slice(0, 10)
            .map(actor => {
                const id = encodeURIComponent(`${actor.id}-${actor.name}`)
            return (
                <div 
                key={actor.order}
                className="first:ml-4 my-6 mr-4 min-w-max
                    transition duration-100 transform hover:scale-110
                    shadow-lg rounded-b-sm">
                <Link href={`/people/${id}`}>
                <a>
                <Image
                src={actor.profile_path ? `${process.env.NEXT_PUBLIC_IMAGE_URL + actor.profile_path}` : default_icon}
                alt="Actor Poster"
                className="rounded-t-xl"
                width="150"
                height="220" 
                />
                <div
                className="min-w-full
                bg-white max-w-min pl-1 font-semibold hover:text-blue-600">
                <p>{actor.name}</p>
                </div>               
                </a>
                </Link>
                <p className="font-light pl-1 min-w-full max-w-min">{actor.character}</p>
                </div>
            )
        })}
        </div>
        <div>
        <h1 className="ml-4 text-xl font-bold mt-10">Media</h1>
        <div className="flex overflow-x-scroll 
        scrollbar-thin">
            {videos.results.length === 0 ?  <h1 className="ml-4 mt-8 font-semibold">
            There are no trailers avaliable for this {movie ? "movie" : "show"}</h1>
            : videos.results.map(trailer => {
                return (
                    <div key={trailer.id}
                    className="first:ml-4 my-6 mr-4 min-w-max
                    transition duration-100 transform hover:scale-110
                    shadow-lg">
                        <iframe
                        width="420"
                        height="280" 
                        src={`${process.env.NEXT_PUBLIC_YOUTUBE + trailer.key}`} />
                    </div>
                )
            })}
            </div>
        </div>
        <h1 className="ml-4 text-xl font-bold mt-10">Recommended</h1>
        <div className="flex overflow-x-scroll
        scrollbar-thin">
        {recommendations.results.length === 0 ? 
        <h1 className="ml-4 my-8 font-semibold">
            There are no recommendations avaliable for this {movie ? "movie" : "show"}</h1>
            : recommendations.results.map(media => {
                const id = encodeURIComponent(`${media.id}-${media.title || media.name}`);
                const mediaScore = Math.round(media.vote_average * 10) / 10;
                
                return (
                    <div 
                    key={media.id}
                    className="first:ml-4 my-6 mr-4 min-w-max
                    transition duration-100 transform hover:scale-105
                    shadow-lg rounded-b-md">
                        <Link href={movie ? `/movies/${id}` : `/tv/${id}`}>
                        <a>
                        <div className="relative">
                        <div className={`rounded-full flex
                            text-white z-10
                            absolute -bottom-1 -rigdht-2 h-12 w-12 
                            place-items-center justify-center bg-gray-800
                            score font-bold ${score(mediaScore)}`}>
                                {mediaScore}
                            </div>
                        <Image 
                        src={media.backdrop_path ? `${process.env.NEXT_PUBLIC_RECOMMENDED + media.backdrop_path}` : default_movie}
                        alt="Actor Poster"
                        className="rounded-xl"
                        width="250"
                        height="150" 
                        />
                        </div>
                    <div 
                    className="min-w-full font-semibold
                    bg-white max-w-min hover:text-blue-600">
                        <p>{media.title || media.name}</p>
                    </div>
                    </a>
                    </Link>
                    </div>
                )
            })}
        </div>
        </div>
        </div>
        </div>
    </section>
    </>
    )
}


export default Details