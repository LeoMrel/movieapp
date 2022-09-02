import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { score } from "../../utils/utils";

const Trending = ({data, shows, movies}) => {
    const [media, setMedia] = useState(data);
    const [clicked, setClicked] = useState("Trending");

    return (
        <>
        <section className="max-h-min relative min-w-screen flex place-content-center">
        <div className="max-w-7xl relative overflow-x-hidden">
        <div className="flex flex-wrap gap-y-3 ml-4 gap-x-2 text-lg font-semibold mt-9">
        <h1 className="font-bold text-xl">What&apos;s Popular</h1>
        <div className="flex max-w-max gap-x-2 justify-center rounded-2xl border border-blue-dark">
        <div className={`rounded-xl px-1 z-10 cursor-pointer
        ${clicked === "Trending" ? 'gradient-bg' : null}`}
        onClick={() => {setMedia(data), setClicked("Trending")}}>
        <h1 className={clicked === "Trending" ? 'gradient-text' : null}>Trending</h1> 
        </div>
        <div className={`rounded-xl z-10 cursor-pointer
        ${clicked === "OnTv" ? 'gradient-bg' : null}`} 
        onClick={() => {setMedia(shows), setClicked("OnTv")}}>  
        <h1 className={clicked === "OnTv" ? 'gradient-text' : null}>On Tv</h1>
        </div>
        <div className={`rounded-xl z-10 cursor-pointer px-1
        ${clicked === "InTheaters" ? 'gradient-bg' : null}`} 
        onClick={() => {setMedia(movies), setClicked("InTheaters")}}>
        <h1 className={clicked === "InTheaters" ? 'gradient-text' : null}>In Theaters</h1>
        </div>
        </div>
        </div>
        <div className="absolute bg-gradient-to-l
        from-white z-10 top-0 right-0 h-full w-1/12 pointer-events-none"/>
        <div className={`flex overflow-x-scroll 
        scrollbar-thin`}>
        {media.results.map(media => {
            const id = encodeURIComponent(`${media.id}-${media.title || media.name}`);
            const isMovie = media.hasOwnProperty("release_date");
            const mediaScore = Math.round(media.vote_average * 10) / 10
            
                return (
                    <div 
                    key={media.id} 
                    className="flex flex-col first:ml-4 my-6 mr-4 min-w-max 
                    transition duration-100 transform hover:scale-110">
                    <Link
                    href={isMovie ? `/movies/${id}` : `/tv/${id}`}>
                    <a>
                    <div className="relative">         
                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL + media.poster_path}`}
                            alt="Poster"
                            className="rounded-2xl"
                            width="150"
                            height="250" />
                            <div className={`rounded-full flex
                            text-white
                            absolute -bottom-1 -left-2 h-12 w-12 
                            place-items-center justify-center bg-gray-800
                            score font-bold ${score(mediaScore)}`}>
                                {mediaScore}
                            </div>
                            </div>
                            <h1 className="min-w-full max-w-min 
                            font-bold hover:text-blue-500 pt-1">{media.title || media.name}</h1>
                            </a>
                            </Link>
                            <p className="text-gray-600">
                                {new Date(media.release_date || media.first_air_date).toDateString().slice(4)}</p>
                    </div>
                );
            })}
            </div>
        </div>
        </section>
        </>
    )
}



export default Trending