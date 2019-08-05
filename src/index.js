//constants 
const CUSTOMERAPI = 'http://http://localhost:3000/api/v1/customers'
const customerForm = document.querySelector('.add-customer-form')
const containerDiv = document.querySelector('.container')

//state
let state = {
    customer: {
        name: ''
    },
    bill: {
        restaurantName: '',
        total: 0,
        serviceCharge: 0.0
    },
    guests: 1,
}

const displayCust = () => {
   containerDiv.innerHTML = `<h1>${state.bill.restaurantName}</h1> <h1>${state.customer.name}</h1><h1>${state.bill.serviceCharge === 0 ? (state.bill.total / state.guests) : (parseFloat(state.bill.total) + (state.bill.total * (state.bill.serviceCharge / 100))) / state.guests}</h1>`

}

//eventlisteners
const submitFormEventListener = () => {
    customerForm.addEventListener('submit', event  => {
        event.preventDefault()

        state.customer.name = customerForm.name.value
        state.bill.restaurantName = customerForm.restaurant.value
        state.bill.total = customerForm.total.value
        state.guests = customerForm.guests.value
        state.bill.serviceCharge = customerForm.service.value
        displayCust()
    })

}
//fetches 
const getCustomers = () => {
    fetch(CUSTOMERAPI)
    .then(resp =>  resp.json())
}

const createCustomer = (customer) => {
    fetch(CUSTOMERAPI, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: customer})
    })

}

const initialize = () => {
    submitFormEventListener()
}

initialize()