import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import PersonalInfo from "./PersonalInfo";
import { useState } from "react";
import default_icon from "../../public/default_icon.png";
import default_movie from "../../public/default_movie.png";
import { ig_logo, twitter_logo, fb_logo } from "../../public/icons/icons";

const People = ({data}) => {

    const [readMore, setReadMore] = useState(false)
    const person = data.person;
    const acted_in = data.acted_in;
    const ids = person.external_ids;
    const [instagram, twitter, facebook] = ids ? [ids.instagram_id, ids.twitter_id, ids.facebook_id] : null

    return (
        <>
        <Head>
            <title>{person.name} — Not The Movie Database (NTMDB)</title>
        </Head>
        <section 
        className="flex flex-col min-h-96 
        min-w-screen text-left pb-10
        md:flex-row md:max-h-full place-items-center md:place-items-start place-content-center">
        <div className="max-w-max mt-10 md:my-10 container overflow-hidden">
        <Image 
        src={person.profile_path ? `${process.env.NEXT_PUBLIC_IMAGE_URL + person.profile_path}` : default_icon} 
        height="460"
        width="300"
        alt="Poster"
        className="rounded-lg"/>
        <div className="invisible absolute md:visible md:relative">
        <div className="flex gap-x-4 my-4">
            {instagram && <a target="_blank" rel="noreferrer" href={`${process.env.NEXT_PUBLIC_INSTAGRAM + instagram}`}>{ig_logo}</a>}
            {twitter && <a target="_blank" rel="noreferrer" href={`${process.env.NEXT_PUBLIC_TWITTER + twitter}`}>{twitter_logo}</a>}
            {facebook && <a target="_blank" rel="noreferrer" href={`${process.env.NEXT_PUBLIC_FACEBOOK + facebook}`}>{fb_logo}</a>}
        </div>
        <PersonalInfo data={{acted_in, person}} />
        </div>
        </div>
        <div className="container flex flex-col px-4 md:max-w-4xl md:my-10">
        <h1 className="text-2xl font-bold text-center md:text-left">{person && person.name}</h1>
        <div className="tracking-tight my-5">
        <h1 className="text-xl font-bold my-1">Biography</h1>
        <div className="whitespace-pre-line text-sm font-semibold">
        {!person.biography ? `There is no biography for ${person.name}.` 
        : person.biography.length < 800 ? person.biography
        :<p>{!readMore ? person.biography.slice(0, 800).concat("...") : person.biography}
        <span className={`hover:text-blue-900 text-blue-600 cursor-pointer max-w-min`}
        onClick={() => setReadMore(!readMore)}>
            {!readMore ? ' read more' : ' read less'}</span>
        </p>}
        </div>
        </div>
        <div className="relative">
        <h1 className="text-xl font-bold my-1">Known for</h1>
        <div className="absolute bg-gradient-to-l
        from-white z-10 top-0 right-0 h-full w-1/12 pointer-events-none"/>
        <div className="flex overflow-x-scroll 
        scrollbar-thin gap-x-2">
        {acted_in.cast.length === 0 ? <p className="font-semibold text-sm">There is no data available.</p>
        :acted_in.cast.slice(0, 20).map(media => {
            const id = encodeURIComponent(`${media.id}-${media.title || media.name}`);
            const isMovie = media.media_type === "movie";

            return(
                <div 
                key={media.id} 
                className="flex flex-col ml-2 my-5 min-w-max 
                transition duration-100 transform hover:scale-110 last:mr-10">
                <Link  href={isMovie ? `/movies/${id}` : `/tv/${id}`}>
                <a>
                <div className="relative">         
                    <Image
                        src={media.poster_path ? `${process.env.NEXT_PUBLIC_IMAGE_URL + media.poster_path}` : default_movie}
                        alt="Poster"
                        className="rounded-2xl"
                        width="150"
                        height="250" />
                        </div>
                        <h1 className="min-w-full max-w-min 
                        font-bold hover:text-blue-600">{media.title || media.name}</h1>
                        </a>
                        </Link>
                    </div>
            )
        })}
        </div>
        </div>
        <div className="mt-5">
                <h1 className="text-xl font-bold">Acting</h1>
                <div className="font-semibold my-5 shadow-lg border rounded-md text-sm flex flex-col">
                    {acted_in.cast
                    .map((media, index) => {
                        const id = encodeURIComponent(`${media.id}-${media.title || media.name}`)
                        const date = media.first_air_date || media.release_date;
                        const isMovie = media.media_type === "movie";

                        return (
                            <div 
                            key={index}
                            className="flex ml-5 gap-x-5 my-4">
                            <p>{new Date(date).getFullYear() || "—"}</p>
                            <p>
                                <span 
                                className="font-semibold hover:text-blue-600 cursor-pointer">
                                    <Link href={isMovie ? `/movies/${id}` : `/tv/${id}`}>
                                    <a>
                                    {media.title || media.name}
                                    </a>
                                    </Link>
                                    </span> 
                                    <span className="text-gray-600"> as</span> 
                                    <span className="font-normal"> {media.character || "—"}</span></p>
                                </div>
                        )
                    })}
                </div>
            {acted_in.crew && 
            <>
            <h1 className="text-xl font-bold">Crew</h1>
            <div className="font-semibold my-5 shadow-lg border rounded-md text-sm flex flex-col">
            {acted_in.crew.map((media, index)=> {
                        const id = encodeURIComponent(`${media.id}-${media.title || media.name}`)
                        const date = media.first_air_date || media.release_date;
                        const isMovie = media.media_type === "movie";
                        
                        return (
                            <div 
                            key={index}
                            className="flex ml-5 gap-x-5 my-4">
                            <p>{new Date(date).getFullYear() || "—"}</p>
                            <p>
                                <span 
                                className="font-semibold hover:text-blue-600 cursor-pointer">
                                    <Link href={isMovie ? `/movies/${id}` : `/tv/${id}`}>
                                    <a>
                                    {media.title || media.name}
                                    </a>
                                    </Link>
                                    </span> 
                                    <span className="text-gray-600"> as</span> 
                                    <span className="font-normal"> {media.job}</span></p>
                                </div>
                        )
                    })}
                    </div>
                    </>}
            </div>
        </div>
        </section>
        </>
    ) 
}


export default People