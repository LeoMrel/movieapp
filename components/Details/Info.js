import { ig_logo, fb_logo, twitter_logo } from "../../public/icons/icons";
import Link from "next/link"

const Info = ({media}) => {
    const regex = /\B(?=(\d{3})+(?!\d))/g;
    const keywords = media.keywords.keywords || media.keywords.results;
    const ids = media.external_ids;
    const [instagram, twitter, facebook] = ids ? [ids.instagram_id, ids.twitter_id, ids.facebook_id] : null

    return (
        <div className="flex flex-col md:relative 
        md:visible mr-8 order-last px-4 min-h-full font-light">
            <div className="flex flex-col">
            <div className="flex mt-14 mb-2 gap-x-4">
            {instagram && <a target="_blank" rel="noreferrer" href={`${process.env.NEXT_PUBLIC_INSTAGRAM + instagram}`}>{ig_logo}</a>}
            {twitter && <a target="_blank" rel="noreferrer" href={`${process.env.NEXT_PUBLIC_TWITTER + twitter}`}>{twitter_logo}</a>}
            {facebook && <a target="_blank" rel="noreferrer" href={`${process.env.NEXT_PUBLIC_FACEBOOK + facebook}`}>{fb_logo}</a>}
            </div>
                <h1 className="font-bold my-2 text-xl">Info</h1>
                <h3 className="font-bold">Status</h3>
                <p>{media.status}</p>
            {media.spoken_languages.length !== 0 &&
            <>
            <h3 className="font-bold mt-3">Languages</h3>
                {media.spoken_languages.map(lan => {
                    return(
                        <p key={lan.name}>{lan.name}</p>
                    )
                })}
                </>} 
               {media.budget !== 0 && media.budget && //=>Check cause sometimes either budget or revenue will return '0' for some reason ?¿
                <>
                <h3 className="font-bold mt-3">Budget</h3>
                <p>{media.budget.toString().replace(regex, ",")}</p>
                </>}
                {media.revenue !== 0 && media.revenue &&
                <>
                <h3 className="font-bold mt-3">Revenue</h3>
                <p>{media.revenue.toString().replace(regex, ",")}</p>
                </>}
            </div>
        <div className="container mt-8">
        <div className="flex flex-col">
            <h1 className="font-bold">
                Keywords
            </h1>
            <ul className="flex mt-2 mb-6 md:flex-row flex-wrap gap-1 text-sm">
            {keywords.length === 0 ? <p className="md:whitespace-nowrap">No keywords have been added.</p>
            : keywords.map(word => {
                const id = encodeURIComponent(`${word.id}-${word.name}`)

                return (
                    <div key={word.id} className="bg-gray-200 hover:bg-gray-300 whitespace-nowrap">
                        <Link href={`/keywords/${id}`}>
                        <a className="px-1 border
                        border-gray-300 rounded-md">{word.name}</a>
                        </Link>
                    </div>
                )
            }) }
            </ul>
        </div>
        </div>
        </div>
    )
}

export default Info