import {github_logo, gmail_logo, linkedin_logo } from "../../public/icons/icons"

const Footer = () => {
    const footerImage = '/qJxzjUjCpTPvDHldNnlbRC4OqEh.jpg'
    const styling = {
        backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL + footerImage})`,
        backgroundSize: "auto",
        backgroundPosition: "30% 20%",
        boxShadow: "inset 900px 50px 500px -10px rgba(0,0,100,.9)",
    }


    return (
        <footer className="h-max 2xl:fixed left-0 right-0 bottom-0 
        min-w-screen text-white bg-blue-dark place-content-center flex relative">
        <div className="container w-full max-w-7xl flex flex-col place-content-center">
            <div className="justify-self-center flex flex-col">
            <div className="m-4 mt-9 max-w-2xl place-self-start relative font-semibold">
                <h1 className="text-xl">Contact me on</h1>
                <a target="_blank" rel="noreferrer" href="https://github.com/LeoMrel" 
                className="flex max-w-max place-items-center hover:text-blue-400 my-3">
                    <span>{github_logo}</span> Github
                </a>
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/leonardo-morel-8a8334170/"
                className="flex max-w-max place-items-center hover:text-blue-400 my-3">
                    <span>{linkedin_logo}</span> Linkedin
                </a>
                <a target="_blank" rel="noreferrer" href="mailto:leonardomrel0028@gmail.com"
                className="flex max-w-max place-items-center hover:text-blue-400 mt-3">
                    <span>{gmail_logo}</span>&nbsp;Email
                </a>
            </div>
            </div>
            <div className="font-semibold place-content-end
            text-gray-400 m-4 h-full flex flex-col text-sm">
            <h1 className="font-semibold text-lg text-white my-2">Check out this project&apos;s <a href="https://github.com/LeoMrel/TMDB-mockup" target="_blank" rel="noreferrer" className="text-blue-300 hover:text-blue-400">github</a></h1>
            <h1>This is a mockup application based on The Movie DataBase, intended to be just a personal project</h1>
            <h1>All data, images and assets belong to <a className="hover:text-blue-400 text-blue-300" target="_blank" rel="noreferrer" href="https://www.themoviedb.org">The Movie DataBase — (TMDB)</a></h1>
            <h1>Social Media Icons by <a className="hover:text-blue-400 text-blue-300" target="_blank" rel="noreferrer" href="https://icons8.com/">Icons8</a></h1>
            </div>
            </div>
        </footer>
    )
}

export default Footer