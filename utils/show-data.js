/**
 * This function builds the complete unordered list with every item structure inside it. 
 * 
 * @param {array} => data, the output obtained in the function retrieve-results (the pending promise), we saved it in a variable 
 * and later introduced in the function we are now. The input received here is an array that have many objects inside with the
 * properties obtained in the retrieve-results function.
 */

const showData = (data) => { debugger
    const ul = document.getElementsByClassName('Results-list')[0]

    data.forEach(item => { 
        const { title, image, year, description, rating, id } = item

        const link = document.createElement('a')
        link.classList.add('List-link')
        link.href = 'https://www.imdb.com/title/' + id

        const li = document.createElement('li')
        li.classList.add('List-item', 'Item')

        const title_ = document.createElement('h2')
        title_.classList.add('Item-title')
        title_.innerText = title

        const image_ = document.createElement('img')
        image_.classList.add('Item-img')
        image_.src = image

        const description_ = document.createElement('p')
        description_.classList.add('Item-description')
        description_.innerText = description

        const numericals = document.createElement('div')
        numericals.classList.add('Item-numericals')

        const year_ = document.createElement('p')
        year_.classList.add('Item-year')
        year_.innerText = 'Year : ' + year
        
        const rating_ = document.createElement('p')
        rating_.classList.add('Item-rating')
        rating_.innerText = 'Rate : ' + rating

        ul.append(link)
        link.append(li)
        li.append(title_,image_,description_,numericals)
        numericals.append(year_,rating_)

    })

    showElement(results)
}