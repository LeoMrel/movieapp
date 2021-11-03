import SearchBox from "../Search/SearchBox";

const Hero = ({image}) => {
    const styling = {
        backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL + image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "inset 0 0 0 1000px rgba(0,0,100,.6)",
        height: "36rem"
    };
    return (
        <section className="flex justify-center min-w-screen bg-blue-900" style={styling}>
            <div className="container place-self-center max-w-7xl">
            <div className="flex flex-col m-auto min-w-full px-4">
            <div className="text-white text-5xl font-bold">
            <h1>Welcome.</h1>
            <h3 className="text-3xl px-5 font-bold my-3">Search any title...</h3>
            </div>
            <SearchBox />
            </div>
            </div>
        </section>
    )
}


export default Hero