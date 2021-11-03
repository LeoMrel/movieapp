import Head from "next/head";
import Navbar from "../../components/Index/Navbar";
import PopularMediaPage from "../../components/Popular/PopularMedia";

const PopularShowsPage = ({data, url}) => {
    const title = "Popular Tv Shows"
    return (
    <>
    <Head>
        <title>{title} — Not The Movie Database (NTMDB)</title>
    </Head>
    <Navbar />
    <PopularMediaPage json={data} title={title} url={url} />
    </>)
}

export default PopularShowsPage

export async function getStaticProps() {
    const url = `${process.env.TV_POPULAR_URL}&sort_by=popularity.desc&page=1`
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