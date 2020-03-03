const form = document.getElementsByClassName('Container-form')[0]
const results = document.getElementsByClassName('Results-list')[0]
const sortBy = document.getElementsByClassName('Sortby-submit')[0]
const feedback = document.getElementsByClassName('Results-feedback')[0]

let resultsList = []

const onSearch = async (event) => {
    event.preventDefault()
    const { query: { value: query } } = event.target

    document.getElementsByClassName('Results')[0].removeChild(document.getElementsByClassName('List')[0])
    const ul = document.createElement('ul')
    ul.classList.add('Results-list', 'List')
    document.getElementsByClassName('Results')[0].append(ul)

    try {
        resultsList = await retrieveResults(query)
        
        document.getElementsByClassName('Results')[0].removeChild(document.getElementsByClassName('Results-feedback')[0])
        const p = document.createElement('p')
        p.classList.add('Results-feedback')
        document.getElementsByClassName('Results')[0].append(p)

        showData(resultsList)
        showElement(results)

    } catch (error) {
        if (error instanceof NotFoundError) feedback.textContent = NO_DATA_FOUND
        else if (error instanceof ContentError) feedback.textContent = EMPTY_INPUT
        else feedback.textContent = UNKNOWN_MESSAGE

        showElement(feedback)
    }

}

const onSortBy = async (event) => {
    let filteredResults = []
    event.preventDefault()
    const { value } = event.target

    switch (value) {
        case 'year':
            filteredResults = resultsList.sort((a, b) => { return parseInt(b.year) - parseInt(a.year) })
            break;
        case 'rate':
            filteredResults = resultsList.sort((a, b) => { return parseFloat(b.rating) - parseFloat(a.rating) })
            break;
        default:
            filteredResults = resultsList
    }

    document.getElementsByClassName('Results')[0].removeChild(document.getElementsByClassName('List')[0])
    const ul = document.createElement('ul')
    ul.classList.add('Results-list', 'List')
    document.getElementsByClassName('Results')[0].append(ul)

    showData(filteredResults)
}

form.addEventListener('submit', onSearch)