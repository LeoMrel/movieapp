import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import SearchTab from "./SearchTab";
import { getMostPopular } from "../../utils/utils";
import Head from "next/head";
import PaginationBar from "../Pagination/Pagination";

// This component is probably the 'hardest' to read.
// It is the first time I've dealt with pagination and some sort of search engine ?¿
// so I'll explain in detail what is going on here

const SearchPage = ({data, nextPageData, error, queryInfo}) => {
    const [movies, shows, people, keywords] = data && [data.movies, data.shows, data.people, data.keywords]; 
    //1) First of all, we make a call to the server with the users input (from 'Search Box' component)
    // and recieve the first page of data for every category

    const query = queryInfo && queryInfo.query ? queryInfo.query : null;
    const search = queryInfo && queryInfo.search ? queryInfo.search[0] : null;
     

    const nextData = nextPageData && nextPageData.nextPageData;
    // 7) If the user requests more info from another page in a selected category
    // the server will use that information to fetch the corresponding data
    // and return it in a 'nextPageData' object.
    // This object also contains the 'typeOfSearch' field
    // which we'll use retroactively to keep fetching the data from the correct category

    const dataMap = [
        {name: "Movies", value: movies || 0}, 
        {name: "Tv shows", value: shows || 0}, 
        {name: "People", value: people || 0}, 
        {name:"Keywords", value: keywords || 0}
    ] // 2) Create a map with the objects that will be used on the 'Search Results' tab
     // as well as to determine what category is the most popular (so that it can be displayed in descending order)

    const higher = getMostPopular(dataMap) || dataMap;
    // 3) If the query is not some giberish and there is data associated with it
    // pass it to getMostPopular, which will get and sort the items in dataMap based on popularity score
    // If the query doesn't return any data(which would set all values in dataMap to 0)
    //just default it to dataMap
    const mostPopular = higher && higher.map(e => e.state)[0]
    // 4) Get the state from every object in higher, which is already sorted
    const state = search === "movie" ? movies 
    : search === 'tv' ? shows 
    : search === 'person' ? people 
    : search === 'keyword' ? keywords 
    : mostPopular
    //The above variable serve to preserve the original results
    //This is useful if the user directly types the search (e.g: '/search/tv?query=hugh') in the url
    //or if the user goes to the previous page of results
  
  
    const [results, setResults] = useState(state || dataMap);
    // 5) And finally take the first element (the most popular) from 'state' and display the data

    useEffect(() => {
        nextData ? setResults(nextData) : setResults(state)
    }, [nextData, state]) // 8) Once 'nextData' gets set (or changes) we'll use that data as our new state 
                                            //If there is no 'nextData' (e.g, the user goes to previous page) default it to the 
                                            //corresponding type of results

    const currentPage = results && results.page;
    const maxPage = results && results.total_pages; // stuff for the pagination bar component
    
    let typeOfSearch =  nextPageData.typeOfSearch ? nextPageData.typeOfSearch
    : results === movies ? 'movie'
    : results === shows ? 'tv'
    : results === people ? 'person' 
    : results === keywords ? 'keyword'
    : null // 6) Now that we have the results, it is helpfull to know what category
            // the user is seeing at all times (be it movies, tv shows, people or keywords),
            // this is important because in order to set 'nextPageData' we need 3 key pieces of data
            // first: what query is the user looking for 
            // second: what category is the user requesting the data from (movies, tv shows, people or keywords)
            // and third: what page is the user requesting from said category

    return (
        <>
        <Head>
            <title>{query} — Not The Movie Database (NTMDB)</title>
        </Head>
        <section className="flex min-w-screen min-h-screen place-content-center">
            <div className="container flex gap-x-8 flex-col md:flex-row py-8 px-6">
            <div className="flex flex-col max-h-80 min-w-max mb-4 border shadow-xl rounded-xl">
                <div className="rounded-t-lg bg-blue-dark py-6 pr-36 pl-5">
                <h1 className="font-bold text-white min-w-full">Search Results</h1>
                </div>
                <div className="min-w-full gap-y-2 py-2 flex flex-col">
                {higher.map(e => {
                    return (
                        <SearchTab 
                        key={e.name} 
                        e={e}
                        setResults={setResults}
                        typeOfSearch={typeOfSearch}
                        query={query} />
                    )
                //We pass to the 'Search Results' tab every object inside higher,
                //as well as the setResults function and the data first returned from the server,
                //so that when clicked each category on the tab defaults to the data from the first page of said category
                })}
            </div>
            </div>
            <div className="flex flex-col gap-y-3 whitespace-nowrap overflow-hidden overflow-ellipsis">
            {error || higher.every(e => e.length === 0) ? 
            <div className="font-semibold">
                <h1>{error || "There are no results for your search..."}
                </h1>
                </div>
            : results.results && results.results.map(object => {
               return (
                   <SearchResults 
                   key={object.id} 
                   object={object} />
               )})}
            {maxPage !== 1 &&
                <PaginationBar 
                    projectPage='search'
                    category={typeOfSearch}
                    currentPage={currentPage}
                    maxPage={maxPage}
                    query={query} />
                //Finally, the PaginationBar recieves the necessary info
                //will be used by the server to fetch the requested data
                    }
            </div>
            </div>
        </section>
        </>
    )
}

export default SearchPage