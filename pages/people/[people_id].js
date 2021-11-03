import Footer from "../../components/Index/Footer";
import People from "../../components/People/People";
import Navbar from "../../components/Index/Navbar";
import ErrorMessage from "../../components/Error/Error";

const PeoplePage = ({person, acted_in, error}) => {
    if(error) return <ErrorMessage error={error} />

    return (
        <>
        <Navbar />
        <People data={{ person, acted_in }} />
        <Footer />
        </>
    )
}

export default PeoplePage

export async function getStaticProps({params}) {
    const id = params.people_id.split("-")[0];

    const urls = [
        fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=external_ids`),
        fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${process.env.API_KEY}&language=en-US`)
    ];

    const res = await Promise.all(urls);
    
    if(res.some(promise => promise.status === 404 || promise.status === 500)) {
        return {
            props: {
                error: true
            }
        }
    };

    const data = res.map(async result => await result.json())
    const [person, acted_in] = await Promise.all(data)

    return {
        props: {
            person,
            acted_in
        },
        revalidate: 3600
    }
};

export async function getStaticPaths() {
   const res = await fetch(`${process.env.POPULAR_PEOPLE}`);
   const data = await res.json();

   const paths = data.results.map(people => ({
       params: {people_id: `${people.id}`}
   }))


  return {
     paths,
     fallback: "blocking"
 }
};