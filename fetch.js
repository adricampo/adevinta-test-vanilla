const API_URL = 'http://www.omdbapi.com/?apikey=422350ff&s='
const API_URL2 = 'http://www.omdbapi.com/?apikey=422350ff&i='
//const API_URL2 = 'http://www.omdbapi.com/?apikey=422350ff&t='

function retrieveResults(query) {
    return (async () => {

        if (typeof query !== 'string' || query.trim().length === 0) throw new ContentError(NOT_INPUT_PROVIDED)

        const result = []
        let response = await fetch(`${API_URL}${query}`, { method: 'GET' })

        if (response.status === 404) throw new NotFoundError(NO_DATA_FOUND)

        if (response.status === 200) {

            const { Search } = await response.json()

            //result.info1.title = Search.map(item => item.Title)
            //result.info1.image = Search.map(item => item.Poster)
            //result.info1.year = Search.map(item => item.Year)

            for (const item of Search) {
                let element = {};
                element.title = item.Title
                element.image = item.Poster
                element.year = item.Year

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

        throw new Error('Unexpected error')

    })()
}

