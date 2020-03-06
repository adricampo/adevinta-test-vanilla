/**
 * This function allows the user to retrieve some information about the series/movies they want through two different API calls.
 * Information from the movies/series that gives the first API call: title, image, year, id.
 * Information from the movies/series that gives the second API call: description, rating.
 * The output we obtain is a pending promise that it contains an array of objects with the properties retrieved previously.
 * 
 * @param {string} => query, information wrote on the search var by the user
 */

const API_URL_SEARCH = 'https://www.omdbapi.com/?apikey=422350ff&s='
const API_URL_ID = 'https://www.omdbapi.com/?apikey=422350ff&i='

function retrieveResults(query) {
    return (async () => {
        if (typeof query !== 'string' || query.trim().length === 0) throw new ContentError(EMPTY_INPUT)

        const result = []
        let responseSearchCall = await fetch(`${API_URL_SEARCH}${query}`, { method: 'GET' })

        if (responseSearchCall.status === 404) throw new Error(UNKNOWN_MESSAGE)
        
        if (responseSearchCall.status === 200) {
            const { Search } = await responseSearchCall.json()
            if (Search === undefined) throw new NotFoundError(NO_DATA_FOUND)

            for (const item of Search) {
                let mainElement = {}

                mainElement.title = item.Title
                mainElement.image = item.Poster
                mainElement.year = item.Year.slice(0,4)
                mainElement.id = item.imdbID;

                const object = await (async () => {
                    let responseIdCall = await fetch(`${API_URL_ID}${mainElement.id}`, { method: 'GET' })
                    
                    if (responseIdCall.status === 404) throw new Error(UNKNOWN_MESSAGE)

                    let secondaryElement = {}

                    if (responseIdCall.status === 200) {
                        const res = await responseIdCall.json()
                        const { Plot, imdbRating } = res
                        secondaryElement.description = Plot
                        secondaryElement.rating = imdbRating
                    }
                    return secondaryElement
                })()

                const { description, rating } = object

                mainElement.description = description
                mainElement.rating = rating

                result.push(mainElement);
            }
            return result
        }
    })()
}