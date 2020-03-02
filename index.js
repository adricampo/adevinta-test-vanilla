const form = document.getElementsByClassName('Container-form')[0]
const results = document.getElementsByClassName('Results-list')[0]
const feedback = document.getElementsByClassName('Feedback')[0]

const sortBy = document.getElementsByClassName('Sortby-submit')[0]


let resultsList = []

const onSearch = async (event) => { 
    event.preventDefault()
    const { query: { value: query } } = event.target

    hideElement(results)    
    hideElement(feedback)
 
    try { 
        resultsList = await retrieveResults(query)
        showData(resultsList)
        showElement(results)

    } catch (error) {
        // if (error instanceof NotFoundError) feedback.textContent = NO_DATA_FOUND
        // else if (error instanceof ContentError) feedback.textContent = EMPTY_INPUT
        // else feedback.textContent = UNKNOWN
        console.error(error.message)
        //showElement(feedback)
    }

}

const onSortBy = async (event) => { debugger
    let filteredResults = []
    event.preventDefault()
    const { value } = event.target
    
    switch (value) {
        case 'title': 
            filteredResults = resultsList.sort((a,b)=>{const comp = a.title.toUpperCase() - b.title.toUpperCase(); return comp < 0 }) 
            break;
        case 'rate':
            filteredResults = resultsList.sort((a,b)=> {return parseFloat(b.rating) - parseFloat(a.rating)})   
            break;
        default:
            filteredResults = resultsList
    }
    
   
    debugger
    document.getElementsByClassName('Results')[0]
            .removeChild(document.getElementsByClassName('List')[0])
    const ul = document.createElement('ul')
    ul.classList.add('Results-list', 'List')
    document.getElementsByClassName('Results')[0].append(ul)
    showData(filteredResults)
    showElement(ul)

}

form.addEventListener('submit', onSearch)