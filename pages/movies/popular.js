import PopularMediaPage from "../../components/Popular/PopularMedia";
import Head from "next/head";
import Navbar from "../../components/Index/Navbar";

const PopularMoviesPage = ({data, url}) => {
    const title = "Popular Movies"
    
    return (
    <>
    <Head>
        <title>{title} — Not The Movie Database (NTMDB)</title>
    </Head>
    <Navbar />
    <PopularMediaPage json={data} title={title} url={url} />
    </>)
};

export default PopularMoviesPage


export async function getStaticProps(context) {
    const url = `${process.env.MOVIE_POPULAR_URL}&sort_by=popularity.desc&page=1`;
    const res = await fetch(url)
    const data = await res.json();

    return {
        props: {
            data,
            url
        },
        revalidate: 3600
    }
}