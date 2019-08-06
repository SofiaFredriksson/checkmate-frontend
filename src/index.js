//constants 
const CUSTOMERAPI = 'http://localhost:3000/api/v1/customers'
const customerForm = document.querySelector('.add-customer-form')
const containerDiv = document.querySelector('.container')

//state
let state = {
    customer: {
        name: '',
        due: 0.0
    },
    bill: {
        restaurantName: '',
        total: 0,
        serviceCharge: 0.0
    },
    guests: 1,
}

const displayCust = () => {
   containerDiv.innerHTML = `
   <div class="result-card">
   <p>Thanks ${state.customer.name}</p>
   <p>Hope you enjoyed  your meal at ${state.bill.restaurantName}</p> 
   <p>You owe ${Number((state.customer.due).toFixed(1))} each</p>
   </div>
    `
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
        state.bill.serviceCharge === 0 
        ? 
        state.customer.due = (state.bill.total / state.guests) 
        : 
        state.customer.due = (parseFloat(state.bill.total) + (state.bill.total * (state.bill.serviceCharge / 100))) / state.guests
        displayCust()
        createCustomer(state.customer)
    })

}
//fetches 
const getCustomers = () => {
    fetch(CUSTOMERAPI)
    .then(resp =>  resp.json())
}

const createCustomer = (customer) => {
    return fetch(CUSTOMERAPI, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(customer)
    })

}

const initialize = () => {
    submitFormEventListener()
}

initialize()