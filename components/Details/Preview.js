import Image from "next/image";
import Link from "next/link";
import default_movie from "../../public/default_movie.png"
import { score } from "../../utils/utils";

const Preview = ({media, crew}) => {

    const styling = {
        backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL + media.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "inset 0 0 0 1000px rgba(0,0,30,.8)",
    };

    const data = media.release_dates && media.release_dates.results.filter(e => e.iso_3166_1 === "US").map(e => e.release_dates[0])
    const info = data && data[0];
    const mediaScore = Math.round(media.vote_average * 10) / 10;
    const runtime = (n) => `${n / 60 ^ 0}`.slice(-2) + "h " + ('0' + n % 60).slice(-2) + "m";

    const date = media.release_date ? new Date(media.release_date) : media.first_air_date ? new Date(media.first_air_date) : null
    const dd = date && String(date.getDate()).padStart(2, '0');
    const mm = date && String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date && date.getFullYear();

    return (
        <section 
        style={styling}
        className="flex flex-col min-h-96 gap-x-9 min-w-screen
        text-center md:text-left pb-10 text-white
        md:flex-row md:max-h-full place-items-center md:place-items-start place-content-center">
        <div className="w-max relative mt-10 md:my-10 container md:ml-4">
        <Image 
        src={media.poster_path ? `${process.env.NEXT_PUBLIC_IMAGE_URL + media.poster_path}` : default_movie} 
        height="460"
        width="300"
        alt="Poster"
        className="rounded-lg"/>
        <div className={`rounded-full flex
        text-white absolute -bottom-1 -right-6 h-20 w-20 
        place-items-center justify-center font-bold bg-gray-800 score
        ${score(mediaScore)}`}>
        {mediaScore}
        </div> 
        </div>
        <div className="container md:mt-14 flex-col flex md:max-w-4xl md:px-4">
        <div className="flex flex-col md:w-10/12 gap-x-1">
        <h1 className="text-2xl font-semibold">{media.title || media.name}</h1>
        {date && <h1 className="text-2xl font-semibold text-gray-400">({date.getFullYear().toString()})</h1>}
        </div>
        <div className="flex tracking-tight flex-col gap-x-1 font-light mt-5">
        <div className="flex justify-center gap-x-2 md:justify-start">
            {info && info.certification && 
            <div className="border border-white rounded-sm px-2 opacity-70">
            <p>{info.certification}
            </p>
            </div>}
            <p>{date && `${mm}/${dd}/${yyyy} (US)`}</p>
            <div>
               {media.runtime !== 0 && media.runtime && <p>• {runtime(media.runtime)}</p>}
               </div>
        </div>
        <div className="flex gap-x-2 md:mt-1 justify-center md:justify-start">
            {media.genres.map(e => {
               return (
                   <p key={e.id}
                   className="flex tracking-tight whitespace-nowrap">
                        • {e.name}
                       </p>
               )
           })}
           </div>
        </div>
        <div className="text-left mx-4 md:mx-0">
        <p className="italic mt-8">{media.tagline && `'${media.tagline}'`}</p>
        <h1 className="text-2xl font-semibold my-1">Overview:</h1>
        <p>{media.overview || "There is no overview available."}</p>
        <div className="mt-5 font-bold grid grid-cols-2 md:grid-cols-3 justify-between gap-4 gap-x-6 max-w-xs whitespace-nowrap md:max-w-full">
        {crew.filter(people => people.job === "Novel" || people.department === "Directing" || people.department === "Production")
        .slice(0, 5)
        .map((people, index)=> {
            const id = encodeURIComponent(`${people.id}-${people.name}`)
            return (
                <div className="max-w-min" key={index}>
                    <Link href={`/people/${id}`}>
                    <a>
                    <h1 className="hover:text-gray-400">{people.name}</h1>
                    </a>
                    </Link>
                    <p className="font-light">{people.job}</p>
                </div>
            )
        })}
        </div>
        </div>
        </div>
        </section>
    )
}

export default Preview