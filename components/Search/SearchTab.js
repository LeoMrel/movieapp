import { useRouter } from "next/dist/client/router";


//This component gets all the necessary data from 'SearchPage'.
//The user can see the number of results returned from a given search
//When a category is clicked, it defaults it to the first page of results

//When clicked, router.push also gives the server a new query property with
//the category the user is in, which is later used to fetch more data if necessary

const SearchTab = ({e, setResults, typeOfSearch, query}) => {
    const router = useRouter();
    const slug = e.name === "Movies" ? 'movie' : e.name === "Tv shows" ? 'tv' : e.name === "People" ? 'person' : e.name === "Keywords" ? 'keyword' : null
    
    
    return (
        <div type="checkbox" key={e.name}
                        className={`flex  justify-between hover:bg-gray-200 transition-colors duration-300 px-4 py-3
                        cursor-pointer ${typeOfSearch === slug && 
                        'font-semibold bg-blue-500 text-white hover:bg-blue-500'}`}
                        onClick={() => (setResults(e.state), router.push({pathname:`/search/${slug}`, query:{query}}))}>
                        <h1>{e.name}</h1>
                        <p>{e.length}</p>
                        </div>
    )
};

export default SearchTab