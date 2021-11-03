const PersonalInfo = ({data}) => {
    const cast = data.acted_in.cast;
    const crew = data.acted_in.crew;
    const person = data.person;
    const query = ["known_for_department", "gender", "place_of_birth", "deathday", "birthday"];

    let info = [];
    for(let key of query) {
        info.push({ 
        key,
        value : person[key]
    })
};

    return (
        <div className="font-bold mt-6">
        <h1 className="text-xl">Personal Info</h1>
        <div className="mt-4">
            {info.map(e => {
                e.value === 2 ? e.value = "Male" 
                : e.value === 1 ? e.value = "Female"
                : e.value === 0 ? e.value = null
                : e.value;
                return(
                    e.value && 
                    <div key={e.key}>
                        <h1>{e.key.replace(/_/g, " ")}</h1>
                        <p className="font-light mb-4">{e.value}</p>
                        </div>
                )
            })}
        <div>
            <h1>Known Credits</h1>
            <p className="font-light">{cast.length + crew.length}</p>
        </div>
        </div>
        </div>
    )
}


export default PersonalInfo