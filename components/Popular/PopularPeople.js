import Image from "next/image";
import Link from "next/link";
import default_icon from "../../public/default_icon.png"
import PaginationBar from "../Pagination/Pagination";

const Popular = ({data}) => {
    const people = data.results;
    const currentPage = data.page;
    const maxPage = data.total_pages;

    const pages = [];
    for(let i = 1; i <= maxPage; i ++) {
        pages.push(
        <Link 
        key={i}
        href={{pathname:'/people/popular', query:{page:i}}}>
            <a>
            <div className={`
            ${currentPage !== i ? 'font-bold' 
            : 'border border-black w-7 rounded-sm'}
            flex place-content-center place-items-center`}>
            <h4>{i}</h4>
            </div>
            </a>
        </Link>)
    }

    

    return (
        <div className="flex min-w-screen min-h-full justify-center">
            <div className="container flex flex-col max-w-7xl px-8">
            <div className="font-bold text-2xl py-8">
                <h1>Popular People</h1>
            </div>
            <div className="grid gap-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                {people.map(person => {
                    const image = person.profile_path || null;
                    const id = encodeURIComponent(`${person.id}-${person.name}`);
                    return (
                        <div key={person.id} 
                        className="h-full min-w-full pb-3 shadow-2xl border rounded-sm">
                        <Link href={`/people/${id}`}>
                        <a>
                        <div className="flex flex-wrap place-content-center">
                            <Image
                            src={image ? 'https://www.themoviedb.org/t/p/w235_and_h235_face' + image : default_icon}
                            alt={`${person.name} profile image`}
                            className="rounded-sm"
                            height="230"
                            width="230" />
                            </div>
                            </a>
                            </Link>
                            <div className="h-11 px-2 font-bold whitespace-nowrap overflow-hidden
                            overflow-ellipsis max-w-max">
                                <Link href={`/people/${id}`}>
                                <a>
                                {person.name}
                                </a>
                                </Link>
                                <div className="whitespace-nowrap overflow-ellipsis overflow-hidden
                                font-normal text-sm text-gray-500">
                                {person.known_for.map((media, index) => {
                                    const title = media.title || media.name
                                    return title && index < person.known_for.length - 1 ? `${title},` : title}
                                )}
                            </div>
                           </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex justify-center my-5 gap-2 text-sm py-5">
                <PaginationBar 
                    projectPage='people'
                    category='popular'
                    currentPage={currentPage}
                    maxPage={maxPage} />
            </div>
            </div>
        </div>
)
}

export default Popular