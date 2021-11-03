import Details from "../../components/Details/Details";
import Footer from "../../components/Index/Footer";
import Navbar from "../../components/Index/Navbar";
import ErrorMessage from "../../components/Error/Error"

const MoviePage = ({movie, credits, videos, recommendations, error}) => {
    if(error) return <ErrorMessage error={error} />
   
    return (
    <>
    <Navbar />
    <Details data={{ movie, credits, videos, recommendations }} />
    <Footer />
    </>)
}

export default MoviePage

export async function getStaticProps({params}) {
    const id = params.movie_id.split("-")[0];

    const urls = [
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=external_ids%2Ckeywords%2Crelease_dates`),
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`),
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.API_KEY}&language=en-US`),
        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.API_KEY}&language=en-US&page=1`)
    ];
    const res = await Promise.all(urls);

    if(res.some(promise => promise.status === 404 || promise.status === 500)){
        return {
            props: {
                error: true
            }
        }
    };

    const data = res.map(async result => await result.json())
    const [movie, credits, videos, recommendations] = await Promise.all(data);

    return {
        props: {
            movie,
            credits,
            videos,
            recommendations
        },
        revalidate: 3600
    }
};

export async function getStaticPaths() {
    const urls = [];
    for(let i=1; i <= 100; i++) {
        urls.push(fetch(`${process.env.MOVIE_POPULAR_URL}&page=${i}`))
    };

   const res = await Promise.all(urls)
   const data = res.map(async result => await result.json())
   const pages = await Promise.all(data)

    let movies_ids = pages.reduce((pV, cV) => {
        const id = cV.results.map(movie => movie.id)
        pV.push(...id)
        return pV;
    }, [])

    const paths = movies_ids.map(id => ({
       params: {movie_id: `${id}`}
   }))
   
  return {
     paths,
     fallback: "blocking"
 }
};

