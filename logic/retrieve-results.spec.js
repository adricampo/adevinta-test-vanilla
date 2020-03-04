describe('logic retrieve-results', () => {

    it('should retrieve a list of movies/series', async () => {
            const query = "dragon ball"
            const data = await retrieveResults(query)
            const movie = data[0]

            expect(movie.title).toBeDefined()
            expect(movie.title.length).toBeGreaterThan(0)

            expect(movie.image).toBeDefined()
            expect(movie.image.length).toBeGreaterThan(0)

            expect(movie.year).toBeDefined()
            expect(movie.year.length).toBeGreaterThan(0) 

            expect(movie.id).toBeDefined()
            expect(movie.id.length).toBeGreaterThan(0)

            expect(movie.description).toBeDefined()
            expect(movie.description.length).toBeGreaterThan(0)

            expect(movie.rating).toBeDefined()
            expect(movie.rating.length).toBeGreaterThan(0)

    })

    it('should throw an error because the input is blank', async() => {
        const blankQuery = ""

        try {
            await retrieveResults(blankQuery)
            throw Error('should not reach this point')
        } catch(error){
            expect(error).toBeInstanceOf(ContentError)
            expect(error.message).toBe('Input is empty or blank')
        }
    })

    it('should throw an error because there are no results for the query written', async() => {
        const wrongQuery = "kcnkjwn"

        try {
            await retrieveResults(wrongQuery)
            throw Error('should not reach this point')
        } catch(error){
            expect(error).toBeInstanceOf(NotFoundError)
            expect(error.message).toBe('Information not found')
        }
    })
})