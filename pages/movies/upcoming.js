import Navbar from "../../components/Index/Navbar";
import PopularMediaPage from "../../components/Popular/PopularMedia";
import Head from "next/head"


const UpcomingMoviesPage = ({data, url}) => {
    const title = "Upcoming Movies"
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

export default UpcomingMoviesPage;

export async function getStaticProps() {
    const url = `${process.env.UPCOMING_MOVIES}&page=1&region=us`
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