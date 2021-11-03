import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import Asset3 from "../../public/Asset 3.svg";
import * as Accordion from "@radix-ui/react-accordion";

const Navbar = () => {
    const [show, setShow] = useState(false)

    const movieNavList = 
        <div className="absolute border rounded-md w-44 py-2
        bg-white hidden text-gray-800 group-hover:block">
            <ul>
            <Link href={'/movies/popular'}><a><li className="hover:bg-gray-100 p-2">Popular</li></a></Link>
            <Link href={'/movies/now-playing'}><a><li className="hover:bg-gray-100 p-2">Now Playing</li></a></Link>
            <Link href={'/movies/upcoming'}><a><li className="hover:bg-gray-100 p-2">Upcoming</li></a></Link>
            <Link href={'/movies/top-rated'}><a><li className="hover:bg-gray-100 p-2">Top Rated</li></a></Link>
            </ul>
        </div>;

    const tvNavList =
        <div className="absolute border rounded-md w-44 py-2
        bg-white hidden text-gray-800 group-hover:block group-click:block">
            <ul>
            <Link href={'/tv/popular'}><a><li className="hover:bg-gray-100 p-2">Popular</li></a></Link>
            <Link href={'/tv/airing-today'}><a><li className="hover:bg-gray-100 p-2">Airing Today</li></a></Link>
            <Link href={'/tv/on-tv'}><a><li className="hover:bg-gray-100 p-2">On Tv</li></a></Link>
            <Link href={'/tv/top-rated'}><a><li className="hover:bg-gray-100 p-2">Top Rated</li></a></Link>
            </ul>
        </div>;


    return (
        <nav className="flex place-content-center min-w-screen h-20
        bg-blue-dark sticky shadow-2xl z-50 top-0 px-4 py-2">
        <div className="container flex justify-between 
        xl:justify-start place-items-center max-w-7xl">
        <a href={"/"} className="mt-2 w-50 min-w-max xl:mr-3">
            <Image
            alt="Home" 
            src={Asset3}
            width="150"
            height="40"/>
        </a>
        <div className="flex list-none gap-9
        text-white font-semibold ml-3 invisible xl:visible">
        <div className="group inline-block relative">
            <h1 className="cursor-pointer">Movies</h1>
            {movieNavList}
        </div>
        <div className="group inline-block relative">
            <h1 className="cursor-pointer">Tv Shows</h1>
            {tvNavList}
        </div>
        <div className="group inline-block relative">
            <h1 className="cursor-pointer">People</h1>
            <div className="absolute border rounded-md w-44 py-2
            bg-white hidden text-gray-800 group-hover:block">
            <Link href={'/people/popular'}><a><ul className="hover:bg-gray-100 p-2">Popular People</ul></a></Link>
            </div>
        </div>
        </div>
        <div 
        className="xl:absolute xl:invisible">
            <div className="cursor-pointer" onClick={() => setShow(true)}>
            <div className="h-0.5 w-7 bg-white rounded-sm"/>
            <div className="h-0.5 w-7 bg-white rounded-sm my-1"/>
            <div className="h-0.5 w-7 bg-white rounded-sm"/>
            </div>
            <div className={show ? `w-full cursor-pointer fixed min-h-screen inset-0 opacity-75 bg-gray-700` : null} 
            onClick={() => setShow(false)} />
            <div className={show ? `w-4/6 md:w-3/6 fixed bg-blue-dark opacity-95 backdrop-filter backdrop-blur-3xl
            top-0 right-0 min-h-screen appear_in` : null}>
            <div>
            <Accordion.Root id="radix-id-0-2" type="single" collapsible
                className={show ? `m-4 mt-8 gap-y-1 text-white font-bold flex flex-col
                 w-full text-xl` : `hidden`}>
                    <Accordion.Item id="radix-id-0-2" value="movies">
                        <Accordion.Trigger aria-controls="radix-id-0-2" id="radix-id-0-2" className="font-semibold">
                            Movies
                        </Accordion.Trigger>
                        <Accordion.Content className="flex flex-col text-base gap-y-2 font-normal mb-3">
                            <Link href="/movies/popular"><a>Popular Movies</a></Link>
                            <Link href="/movies/now-playing"><a>Now Playing</a></Link>
                            <Link href="/movies/upcoming"><a>Upcoming Movies</a></Link>
                            <Link href="/movies/top-rated"><a>Top Rated Movies</a></Link>
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item id="radix-id-0-2" value="tv shows">
                    <Accordion.Trigger aria-controls="radix-id-0-2" id="radix-id-0-2" className="font-semibold">Tv Shows</Accordion.Trigger>
                        <Accordion.Content className="flex flex-col text-base gap-y-2 font-normal mb-3">
                            <Link href="/tv/popular"><a>Popular Shows</a></Link>
                            <Link href="/tv/airing-today"><a>Airing Today</a></Link>
                            <Link href="/tv/on-tv"><a>On Tv</a></Link>
                            <Link href="/tv/top-rated"><a>Top Rated Shows</a></Link>
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item id="radix-id-0-2" value="people">
                    <Accordion.Trigger aria-controls="radix-id-0-2" id="radix-id-0-2" className="font-semibold">People</Accordion.Trigger>
                        <Accordion.Content className="text-base gap-y-3 font-normal ml-2">
                            <Link href="/people/popular"><a>Popular People</a></Link>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion.Root>
            <div className={show ? `text-base text-gray-500 font-semibold m-4 mt-10 flex flex-col gap-y-3` : `hidden`}>
                <h1>All credits to <a className="text-blue-600" target="_blank" rel="noreferrer" href="https://www.themoviedb.org">TMDB</a></h1>
                <h1>Social Media Icons by <a className="text-blue-600" target="_blank" rel="noreferrer" href="https://icons8.com/">Icons8</a></h1>
            </div>
            </div>
            </div>
        </div>
        </div>
        </nav>
    )
}

export default Navbar