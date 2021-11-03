import Trending from "../components/Index/MediaSection";
import Hero from "../components/Index/Hero";
import Navbar from "../components/Index/Navbar";
import Footer from "../components/Index/Footer";
import Head from "next/head";


export default function Home({data, shows, movies, image}) {
  return (
  <>
  <Head>
    <title>Not The Movie Database — (NTMDB)</title>
  </Head>
  <Navbar />
  <Hero image={image} />
  <Trending data={data} shows={shows} movies={movies} />
  <Footer />
    </>
  )
}


export async function getStaticProps() {
  const random = Math.floor(Math.random() * (10 - 1) + 1)
  const urls = [
    fetch(`${process.env.TRENDING_URL}&page=${random}`),
    fetch(process.env.ON_TV),
    fetch(process.env.IN_THEATERS),
    fetch(`${process.env.HERO_URL}`)
  ]
  const res = await Promise.all(urls);
  const results = res.map(async (result) => await result.json())
  const [data, shows, movies, hero] = await Promise.all(results);

  const image = hero.results[random].backdrop_path;
  return {
      props: {
          data,
          shows,
          movies,
          image
      },
      revalidate: 1
  }
}