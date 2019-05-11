console.log('Client side javascript file is loaded!')

//Important point to understanding
// chaining passes the results of the previous method as arguments to the next method.

// fetch is browser based api, not part of javascript

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()  // keeps page from refreshing
    const location = search.value

    messageOne.textContent = 'Loading ....'
    messageTwo.textContent = ''
    
    fetch('http://localhost:3000/weather?address=' + location)
        .then( (response) => {response.json()
        .then( (data) => {
            if (data.error) {
                return messageOne.textContent = data.error
            } 
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
    })
})    
}) 