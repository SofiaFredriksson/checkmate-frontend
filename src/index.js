//constants 
const CUSTOMERAPI = 'http://http://localhost:3000/api/v1/customers'
//fetches 
const getCustomers = () => {
    fetch(CUSTOMERAPI)
    .then(resp =>  resp.json())
}

const formDiv = () => {
    const fDiv = document.createElement('form')
    const bodyDiv = document.querySelector('body')
    fDiv.innerHTML = `
    <input type="text" name="name" value="" placeholder="Enter restaurant name" class="input-text"></input>
        <button></button>
    `
    bodyDiv.appendChild(fDiv)

}

const initialize = () => {
    formDiv()
}

initialize()