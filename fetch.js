const API_URL = 'http://www.omdbapi.com/?apikey=422350ff&s='
const API_URL2 = 'http://www.omdbapi.com/?apikey=422350ff&i='

function retrieveResults(query) {
    return (async () => {

        if (typeof query !== 'string' || query.trim().length === 0) throw new ContentError(EMPTY_INPUT)

        const result = []
        
        let response = await fetch(`${API_URL}${query}`, { method: 'GET' })

        if (response.status === 404) throw new Error(UNKNOWN_MESSAGE)

        if (response.status === 200) {
            const { Search } = await response.json()
            if (Search === undefined) throw new NotFoundError(NO_DATA_FOUND)

            for (const item of Search) {
                let element = {};
                element.title = item.Title
                element.image = item.Poster
                element.year = item.Year.slice(0,4)
                element.id = item.imdbID;

                const obj = await (async () => {
                    let response2 = await fetch(`${API_URL2}${element.id}`, { method: 'GET' })
                    let el = {}

                    if (response2.status === 200) {
                        const res = await response2.json()
                        const { Plot, imdbRating } = res

                        el.description = Plot
                        el.rating = imdbRating
                    }

                    return el

                })()

                const { description, rating } = obj
                element.description = description
                element.rating = rating
                result.push(element);

            }

            return result
            
        }
        

    })()
}

