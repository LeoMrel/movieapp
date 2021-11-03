import Image from "next/image";
import Link from "next/link";
import default_movie from "../../public/default_movie.png";
import default_icon from "../../public/default_icon.png";

const SearchResults = ({object}) => {
    const name = object.title || object.name;
    const date = object.release_date || object.first_air_date;
    const image = object.poster_path || object.profile_path;
    const knownFor = object.known_for_department;
    const participatedIn = object.known_for;
    const overview = object.overview && object.overview;
    const id = encodeURIComponent(`${object.id}-${name}`)

    const isMovie = object.hasOwnProperty("release_date") || object.hasOwnProperty("original_title");
    const isTvShow = object.hasOwnProperty("first_air_date") || object.hasOwnProperty("original_name");
    const isPeople = object.hasOwnProperty("profile_path");
    const isKeyword = !object.hasOwnProperty("release_date") && !object.hasOwnProperty("first_air_date") && !object.hasOwnProperty("profile_path");

    return (
        <Link 
       href={isMovie ? `/movies/${id}`
        : isTvShow ? `/tv/${id}`
        : isPeople ? `/people/${id}`
        : `/keywords/${id}`}
        key={id}
        passHref>
        <a 
        className={`${isMovie || isTvShow ? 'rounded-xl shadow-xl border bg-white' 
        : 'max-w-max shadow-none'} flex`}>
        <div className={`flex ${isPeople && 'max-h-24'}`}>
        {!isKeyword &&
        <Image 
        className={`${isPeople ? 'rounded-xl' : 'rounded-tl-xl rounded-bl-xl' }`}
        src={ image ? process.env.NEXT_PUBLIC_IMAGE_URL + image
            : isMovie || isTvShow ? default_movie
            : default_icon}
        alt="Poster"
        width={`${isPeople ? 80 : 110}`}
        height="150"
        />}
        </div>
        <div className={`
        ${!overview && "place-content-center"}
        w-full font-bold truncate whitespace-pre-wrap px-4 pt-2 flex flex-col`}>
        <h1 className="hover:text-blue-500 max-w-max">
            {name}
        </h1>
        <p className={`font-normal ${knownFor ? 'text-black ' : 'text-gray-500'}`}>
            {date ? new Date(date).toDateString().slice(4) 
            : knownFor ? `${knownFor} • ` + participatedIn.map(media => media.title || media.name).slice(0, 3)
            : null}</p>
        <div className="px-1 flex">
        {overview && 
        <p className={`${date ? 'pt-8' : 'pt-12'} font-normal italic line-clamp`}>
            {overview}</p>
        }
        </div>
        </div>
        </a>
        </Link>
        )
}

export default SearchResults