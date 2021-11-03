import Navbar from "../../components/Index/Navbar";
import SearchPage from "../../components/Search/SearchPage"

const Search = ({movies, shows, people, keywords, query, nextPageData, typeOfSearch, error}) => {
    return (
        <>
        <Navbar />
        <SearchPage data={{movies, shows, people, keywords}} nextPageData={{nextPageData, typeOfSearch}} queryInfo={query}  error={error} />
        </>
    )
}

export default Search

export async function getServerSideProps({query}) {
    if(!query || !query.query) return {props: {error: "There are no results for your search..."}};
    
    const queryString = query.query;
    const page = 1;

    let typeOfSearch = query.search && query.search[0] || null;
    let nextPageData = null;
    if(query.search && query.page) {
        const res = await fetch(`https://api.themoviedb.org/3/search/${typeOfSearch}?api_key=${process.env.API_KEY}&query=${queryString}&page=${query.page}&language=en-US&include_adult=false`)
        nextPageData = await res.json();
    }

    const urls = [
        fetch(`${process.env.SEARCH_MOVIES}&query=${queryString}&page=${page}`),
        fetch(`${process.env.SEARCH_SHOWS}&query=${queryString}&page=${page}`),
        fetch(`${process.env.SEARCH_PEOPLE}&query=${queryString}&page=${page}`),
        fetch(`${process.env.SEARCH_KEYWORDS}&query=${queryString}&page=${page}`)
    ]
    
    const res = await Promise.all(urls);
    const result = res.map(async results => await results.json());
    const [movies, shows, people, keywords] = await Promise.all(result);

    return {
        props: {
            movies,
            shows,
            people,
            keywords,
            query,
            nextPageData,
            typeOfSearch
        }
    }
}