import { useState, useEffect, useRef } from "react";
import SearchResults from "../Search/SearchResults";
import { getMostPopular, fetcher } from "../../utils/utils";
import Head from "next/head";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import useSWR from "swr";

const styling = {
    backgroundImage: "url(https://www.themoviedb.org/assets/2/v4/account_pipes/light_blue-a230b623827400e967c6eb7241d88086f2eb9264c0789d0dab15ae6f1df1421a.svg)",
    backgroundPosition: "50% 30%",
};


const Discover = ({json, urls, thereIsError, query}) => {
    const keyword = json.keyword_info && json.keyword_info.name;
    const [discover_movies, discover_shows] = json && [json.discover_movies, json.discover_shows];
    const discoverMap = [
        {name: "Movies", value: discover_movies || 0}, 
        {name: "Tv shows", value: discover_shows || 0}
    ];
    const thereIsData = discover_movies || discover_shows;

    const higher = getMostPopular(discoverMap) || discoverMap;
    const state = higher && higher.map(e => e.state);
    const [results, setResults] = useState(state[0] && state[0].results || discoverMap);
    const isMovie = results && results.every(e => e.hasOwnProperty("release_date") || e.hasOwnProperty("title"))
    const typeOfMedia = isMovie ? 'Movies' : 'Tv Shows';

    const count = useRef(1);
    const movies_url = json && keyword && urls && `${urls.discover_movies_url}&page=${count.current}&with_keywords=${json.keyword_info.id}`;
    const shows_url = json && keyword && urls && `${urls.discover_shows_url}&page=${count.current}&with_keywords=${json.keyword_info.id}`;

    const [shouldFetch, setShouldFetch] = useState(false);
    const {data, error} = useSWR(shouldFetch && isMovie ? movies_url : shouldFetch && !isMovie ? shows_url : null, fetcher);

    useEffect(() => {
        setShouldFetch(false);
        data && results && setResults([...results, ...data])
    }, [data, results])

    const handleChangeResults = () => {
       return thereIsData ? 
       isMovie ? (setResults(discover_shows.results), count.current = 1)
       : (setResults(discover_movies.results), count.current = 1)
       : null;
    }

    const handleLoadMore = () => {
        count.current++;
        setShouldFetch(true);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    return (
        <>
        <Head>
            <title>{query} — Not The Movie Database (NTMDB)</title>
        </Head>
        <section className="min-w-screen min-h-full place-content-center">
        <div className="flex place-content-center flex-col w-full bg-blue-dark">
        <div className="h-20 place-items-center flex  
        justify-center font-semibold text-white text-2xl px-4" 
                    style={styling}>
                        <div className="flex justify-between w-full max-w-7xl">
                        <h1>{keyword || ":/"}</h1>
                        <h1 className="text-gray-400">
                        {thereIsData ? isMovie ? discover_movies.total_results : discover_shows.total_results : null} {thereIsData ? isMovie ? 'movies' : 'tv shows' : null} 
                        </h1>
                        </div>
                    </div>
            <div className="h-14 bg-white place-items-center place-content-center flex w-full border">  
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger id="radix-id-0-1" className="font-semibold">
                        {typeOfMedia} {state[1] && state[1].results.length !== 0 && "▾"}
                    </DropdownMenu.Trigger>
                {state[1] && state[1].results.length !== 0 &&
                    <DropdownMenu.Content className="border bg-white rounded-md w-44 py-2">
                    <DropdownMenu.Item className="cursor-pointer hover:bg-gray-200 p-2 
                    transition-colors duration-300"
                    onClick={handleChangeResults}>
                    {typeOfMedia === 'Movies' ? 'Tv Shows' : 'Movies'}
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>}
                </DropdownMenu.Root>
            </div>
        </div>
        <div className="flex w-full place-content-center mt-5">
            <div className="flex w-full place-content-center gap-x-8 flex-col px-4 max-w-7xl">
                <div className="flex flex-col gap-y-5 mb-8
                whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {thereIsError || higher.every(e => e.length === 0) ? 
                        <div className="font-semibold">
                            <h1>{thereIsError || "There are no results for this keyword..."}</h1>
                        </div>
                    : results && results.map(object => {
                            return (
                                <SearchResults 
                                key={object.id} 
                                object={object}
                                state={results} />
                                )})}
                    </div>
                   {(thereIsData ? isMovie ? discover_movies.total_pages : discover_shows.total_pages : null) > count.current &&
                    <button 
                    type="button"
                    className="bg-blue-500 text-white text-2xl font-bold
                    rounded-xl hover:bg-blue-600 transition-colors duration-300
                    h-14 w-full mb-8 shadow-lg"
                    onClick={handleLoadMore}>
                     <h1>Load More</h1>
                    </button>}
                </div>
            </div>
            {count.current > 1 && 
            <button className="h-16 w-16 bg-blue-500 hover:bg-blue-600 rounded-full 
            fixed bottom-10 right-10 max-h-max border
            transition-all appear_in duration-300"
            onClick={scrollToTop}>
                <span className="text-white">↑</span>
            </button>}
        </section>
        </>
        )
}

export default Discover