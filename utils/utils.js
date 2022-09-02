export const getMostPopular = array => {
    try {
    let higher = [];
    
    //Get popularity rates for all objects
    for(let i = 0; i < array.length; i++) {
        let count;
        array[i].value.results.map(x => x.popularity || 0).reduce((a,b) => count = a + b, 0);
        higher.push({name: array[i].name, 
            value: count || 0, 
            length: array[i].value.total_results || 0,
            state: array[i].value}
            );
    }

    return higher.sort((a, b) => a.value - b.value).reverse(); //And sort them from highest to lowest
}
    catch(err) {
        return null
    }
};


export const score = n => { // Simple check to add a className depending on users score
    return !n ? null
        : n <= 5.5 ? "low-score"
            : n >= 7.8 ? "high-score"
                : "mid-score"; 
};

export const fetcher = async url => {
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
};