import Link from "next/link";



const PaginationBar = ({projectPage, category, currentPage, maxPage, query}) => {    
    const pathname = `/${projectPage}/${category}`;

    const pages = [];
    for(let i = 1; i <= maxPage; i ++) {
        pages.push(
        <Link 
        key={i}
        href={query ? {pathname, query:{page: i, query}} : {pathname, query:{page: i}}}>
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
            <div className="flex justify-center my-5 gap-2 text-sm py-5">
            {currentPage > 1 && 
            <Link
            href={query ? {pathname, query:{page: currentPage - 1, query}} : {pathname, query:{page: currentPage - 1}}}>
                <a className="font-bold mx-3">
                ← Previous
                </a>
            </Link>}
            {currentPage >= 7 && pages.map(page => page).slice(0, 1).concat("...") }
            {currentPage < 7 ? pages.map(page => page).slice(0, 7)
            :currentPage >= 7 ? pages.map(page => page).slice(currentPage - 4, currentPage + 3)
            :currentPage >= maxPage - 7 ? pages.map(page => page).slice(maxPage - 7, maxPage)
            :null} 
            {currentPage < maxPage - 4 && "..."} {currentPage >= maxPage - 3 ? pages.map(page => page).slice(maxPage) : pages.map(page => page).slice(maxPage - 1,maxPage)}
            {currentPage < maxPage &&
            <Link 
            href={query ? {pathname, query:{page: currentPage + 1, query}} : {pathname, query:{page: currentPage + 1}}}>
                <a className="font-bold mx-3">
                    Next →
                </a>
            </Link>}
        </div>
    )
}

export default PaginationBar;