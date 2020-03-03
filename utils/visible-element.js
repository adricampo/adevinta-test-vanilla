/**
 * Small function to add or remove to the DOM class -> hide. This class has a display none so if it's activated 
 * the element should not be visible.
 * 
 * @param {variable} => element, it is a variable with the information of one DOM element as the results or feedback.
 */

const showElement = (element) => {
    element.classList.remove('hide')
}

const hideElement = (element) => {
    element.classList.add('hide')
}