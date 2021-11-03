import Head from "next/head";
import Navbar from "../../components/Index/Navbar";
import PopularMediaPage from "../../components/Popular/PopularMedia";

const OnTvPage = ({data, url}) => {
    const title = "Currently Airing Tv Shows"
    return (
    <>
    <Head>
        <title>{title} — Not The Movie Database (NTMDB)</title>
    </Head>
    <Navbar />
    <PopularMediaPage json={data} title={title} url={url} />
    </>)
}

export default OnTvPage

export async function getStaticProps() {
    const url = `${process.env.UPCOMING_SHOWS}&page=1`
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