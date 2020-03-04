/**
 * This function allows the user to retrieve some information about the series/movies they want through two different API calls.
 * Information from the movies/series that gives the first API call: title, image, year, id.
 * Information from the movies/series that gives the second API call: description, rating.
 * The output we obtain is a pending promise that it contains an array of objects with the properties retrieved previously.
 * 
 * @param {string} => query, information wrote on the search var by the user
 */

const API_URL = 'https://www.omdbapi.com/?apikey=422350ff&s='
const API_URL2 = 'https://www.omdbapi.com/?apikey=422350ff&i='

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