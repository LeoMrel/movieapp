import Discover from "../../components/Discover/DiscoverMedia";
import Navbar from "../../components/Index/Navbar";

const Keywords = ({keyword_info, discover_movies, discover_shows, discover_movies_url, discover_shows_url, queryString, error}) => {
    return (
    <>
    <Navbar />
    <Discover json={{keyword_info, discover_movies, discover_shows}} urls={{discover_movies_url, discover_shows_url}} query={queryString} thereIsError={error} />
    </>)
}

export default Keywords

export async function getServerSideProps({params}) {
    const id = params.keyword_id.split("-")[0];
    const queryString = params.keyword_id.split("-")[1];

    const discover_movies_url = process.env.DISCOVER_MOVIES;
    const discover_shows_url = process.env.DISCOVER_SHOWS;

    const urls = [
        fetch(`https://api.themoviedb.org/3/keyword/${id}?api_key=${process.env.API_KEY}`),
        fetch(`${discover_movies_url}&page=1&with_keywords=${id}`),
        fetch(`${discover_shows_url}&page=1&with_keywords=${id}`)
    ];

    const res = await Promise.all(urls);

    if(res.some(promise => promise.status === 404 || promise.status === 500)){
        return {
            props: {
                error: "There are no results for this keyword..."
            }
        }
    };


    const results = res.map(async result => await result.json());
    const [keyword_info, discover_movies, discover_shows] = await Promise.all(results);

    return {
        props: {
            keyword_info,
            discover_movies,
            discover_shows,
            discover_movies_url,
            discover_shows_url,
            queryString,
        }
    }

}