import Footer from "../Index/Footer"
import Navbar from "../Index/Navbar"
import Head from "next/head"

const ErrorMessage = () => {

    return (
        <>
        <Head>
            <title>Page Not Found — Not The Movie Database (NTMDB)</title>
        </Head>
        <Navbar />
        <div className="h-full pb-96 min-w-screen place-content-center flex">
            <div className="container relative min-h-full max-w-7xl flex flex-col p-8 font-semibold text-2xl">
            <h1>Oops! Seems like there&apos;s been an error with your request...</h1>
            <p className="py-2 text-sm">You tried to request a page that doesn&apos;t exits, if you believe this to be an error please <a target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-600" href={`${process.env.NEXT_PUBLIC_GITHUB}`}>contact me</a>. Else, try going back to the <a className="text-blue-500 hover:text-blue-600" href={"/"}>Home page</a>.</p>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default ErrorMessage