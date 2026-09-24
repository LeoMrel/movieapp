import Details from "../../components/Details/Details";
import Navbar from "../../components/Index/Navbar";
import Footer from "../../components/Index/Footer";
import ErrorMessage from "../../components/Error/Error";

const TvPage = ({tv, credits, videos, recommendations, error }) => {
    if(error) return <ErrorMessage error={error} />

    return (
        <>
        <Navbar />
        <Details data={{tv, credits, videos, recommendations}} />
        <Footer />
        </>
    )
}

export default TvPage

export async function getStaticProps({params}) {
    const id = params.tv_id.split("-")[0];

    const urls = [
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=external_ids%2Ckeywords`),
        fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`),
        fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.API_KEY}&language=en-US`),
        fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${process.env.API_KEY}&language=en-US&page=1`)
    ];

    const res = await Promise.all(urls) 

    if(res.some(promise => promise.status === 404 || promise.status === 500)){
        return {
            props: {
                error: true
            }
        }
    };

    const data = res.map(async result => await result.json())
    const [tv, credits, videos, recommendations] = await Promise.all(data)
    
    return {
        props: {
            tv,
            credits,
            videos,
            recommendations
        }
    }
};

export async function getStaticPaths() {
    const res = await fetch(`${process.env.TV_POPULAR_URL}&page=1`)
    const data = await res.json()

    const tv_ids = data.results
        .slice(0, 5)
        .map(tv => tv.id)

    const paths = tv_ids.map(id => ({
       params: {tv_id: `${id}`}
   }))

  return {
     paths,
     fallback: "blocking"
 }
};
