describe('logic retrieve-results', () => {

    it('should retrieve a list of movies/series', async () => {
            const query = "dragon ball"
            const data = await retrieveResults(query)

            expect.data(data.title).toBeDefined()
            expect.data(data.title.length).toBeGreaterThan(0)
            
            expect.data(data.image).toBeDefined()
            expect.data(data.image.length).toBeGreaterThan(0)

            expect.data(data.year).toBeDefined()
            expect.data(data.year.length).toBeGreaterThan(0)

            expect.data(data.id).toBeDefined()
            expect.data(data.id.length).toBeGreaterThan(0)

            expect.data(data.description).toBeDefined()
            expect.data(data.description.length).toBeGreaterThan(0)

            expect.data(data.rating).toBeDefined()
            expect.data(data.rating.length).toBeGreaterThan(0)

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
        const wrongQuery = ""

        try {
            await retrieveResults(wrongQuery)
            throw Error('should not reach this point')
        } catch(error){
            expect(error).toBeInstanceOf(NotFoundError)
            expect(error.message).toBe('Information not found')
        }
    })
})