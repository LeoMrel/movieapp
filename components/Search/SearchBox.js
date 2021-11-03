import { useRouter } from "next/router";
import { useState } from "react"


const SearchBox = () => {
    const [query, setQuery] = useState("");
    const router = useRouter();
    
    const handleSearch = async (e) => {
        await router.push({
            pathname: "/search",
            query: {query: e}
        });
    }
    return (
        <form
        onSubmit={e => {
            e.preventDefault();
            handleSearch(query);
            }} >
            <div className="w-full flex place-content-center">
            <div className="w-11/12 flex relative place-items-center">
            <input
            className="min-w-full h-12 px-5 rounded-3xl shadow-inner "
            type="text"
            placeholder="Search a movie, tv show, person..."
            value={query} 
            onChange={e => setQuery(e.target.value)} />
            <button
            className="absolute right-0 rounded-3xl text-white font-bold
            gradient h-full w-3/12 md:w-2/12"
            type="submit">Search</button>
            </div>
            </div>
        </form>
    )
}

export default SearchBox