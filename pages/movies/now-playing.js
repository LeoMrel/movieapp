import Navbar from "../../components/Index/Navbar";
import PopularMediaPage from "../../components/Popular/PopularMedia";
import Head from "next/head"
const NowPlayingPage = ({data, url}) => {
    const title = "Now Playing Movies"
    return(
        <>
        <Head>
            <title>{title} — Not The Movie Database (NTMDB)</title>
        </Head>
        <Navbar />
        <PopularMediaPage json={data} title={title} url={url} />
        </>
    )
}

export default NowPlayingPage;

export async function getStaticProps() {
    const url = `${process.env.IN_THEATERS}&page=1`
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