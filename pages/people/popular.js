import PopularPeople from "../../components/Popular/PopularPeople";
import Head from "next/head";
import Navbar from "../../components/Index/Navbar";
import ErrorMessage from "../../components/Error/Error";

const PeoplePage = ({data, error}) => {
    if(error) return <ErrorMessage />

    return (
    <>
    <Head>
        <title>Popular People — Not The Movie Database (NTMDB)</title>
    </Head>
    <Navbar />
    <PopularPeople data={data} />
    </>)
};

export default PeoplePage


export async function getServerSideProps({query}) {
    const currentPage = query.page || 1;

    const res = await fetch(`${process.env.POPULAR_PEOPLE}&page=${query.page}`);

    if(res.status !== 200) return {props: {error: true}};

    const data = await res.json();

    return {
        props: {
            data
        }
    }
};