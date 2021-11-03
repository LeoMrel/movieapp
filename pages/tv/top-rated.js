import Head from "next/head";
import Navbar from "../../components/Index/Navbar";
import PopularMediaPage from "../../components/Popular/PopularMedia";

const TopRatedShowsPage = ({data, url}) => {
    const title = "Top Rated Shows"
    return (
    <>
    <Head>
        <title>{title} — Not The Movie Database (NTMDB)</title>
    </Head>
    <Navbar />
    <PopularMediaPage json={data} title={title} url={url} />
    </>)
}

export default TopRatedShowsPage

export async function getStaticProps() {
    const url = `${process.env.TOP_RATED_SHOWS}&page=1`
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