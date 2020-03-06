/**
 * Here we have the main part of the application. The functions that activate both events:
 * Event 1: form (DOM class called Container-form, Form)
 * Event 2: select (DOM class called Sortby-submit)
 */

const form = document.getElementsByClassName('Container-form')[0]
const results = document.getElementsByClassName('Results-list')[0]
const sortBy = document.getElementsByClassName('Sortby-submit')[0]
const feedback = document.getElementsByClassName('Results-feedback')[0]

let resultsList = []

/* Function that allows user to search some information from the API through writting a query on the search var */
const onSearch = async (event) => {
    event.preventDefault()
    const { query: { value: query } } = event.target

    document.getElementsByClassName('Results')[0].removeChild(document.getElementsByClassName('List')[0])
    const initialList = document.createElement('ul')
    initialList.classList.add('Results-list', 'List')
    document.getElementsByClassName('Results')[0].append(initialList)

    try {
        resultsList = await retrieveResults(query)
        feedback.textContent = ""
        showData(resultsList)

    } catch (error) {
        if (error instanceof NotFoundError) feedback.textContent = NO_DATA_FOUND
        else if (error instanceof ContentError) feedback.textContent = EMPTY_INPUT
        else feedback.textContent = UNKNOWN_MESSAGE
        
        setTimeout( () => { feedback.textContent = "" }, 3000)
        showElement(feedback)
    }
}

form.addEventListener('submit', onSearch)


/* Function that allows user to sort information using 2 options (year, rate). Results are listed from higher to lower */
const onSortBy = async (event) => {
    event.preventDefault()
    const { value } = event.target

    let filteredResults = []

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
    const initialList = document.createElement('ul')
    initialList.classList.add('Results-list', 'List')
    document.getElementsByClassName('Results')[0].append(initialList)

    showData(filteredResults)
}