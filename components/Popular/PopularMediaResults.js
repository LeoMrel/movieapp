import Link from "next/link";
import Image from "next/image";
import { score } from "../../utils/utils";
import default_movie from "../../public/default_movie.png";

const PopularMedia = ({object}) => {
    const name = object.title || object.name;
    const date = object.release_date || object.first_air_date;
    const image = object.poster_path;
    const userScore = object.vote_average;
    const id = encodeURIComponent(`${object.id}-${name}`)
    const isMovie = object.hasOwnProperty("release_date") || object.hasOwnProperty("original_title");

    return (
        <Link 
       href={isMovie ? `/movies/${id}`
        : `/tv/${id}`}
        key={id}>
        <a 
        className='rounded-md flex-col shadow-xl border bg-white flex'>
        <div className="relative">
        <Image
        className='rounded-t-md'
        src={image ? process.env.NEXT_PUBLIC_IMAGE_URL + image : default_movie}
        alt="Poster"
        width="300"
        height="430"
        />
        <div className={`rounded-full flex text-white absolute 
        -bottom-3 left-2 h-10 w-10 place-items-center justify-center 
        bg-gray-800 score font-bold ${score(userScore)}`}>
            {userScore}
        </div>
        </div>
        <div className='font-bold p-3'>
        <h1 className="hover:text-blue-500 max-w-max pt-1">
            {name}
        </h1>
        <p className={`font-normal text-gray-500`}>
            {date && new Date(date).toDateString().slice(4)}</p>
        </div>
        </a>
        </Link>
        )
}

export default PopularMedia;