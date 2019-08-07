//constants 
const CUSTOMERAPI = 'http://localhost:3000/api/v1/customers'
const customerForm = document.querySelector('.add-customer-form')
const containerDiv = document.querySelector('.container')
const BILLAPI = 'http://localhost:3000/api/v1/bills'

const allBillDiv = document.createElement('div')
    allBillDiv.classList.add('all-bill-div')

//state
let state = {
    customer: {
        name: '',
        due: 0.0,
        bill_id: 0
    },
    bill: {
        restaurantName: '',
        total: 0,
        serviceCharge: 0.0
    },
    guests: 1,
}

//displays

const displayCust = () => {
   containerDiv.innerHTML = `
   <div class="result-card">
   <p>Thanks ${state.customer.name}</p>
   <p>Hope you enjoyed  your meal at ${state.bill.restaurantName}</p> 
   <p>You owe ${Number((state.customer.due).toFixed(1))} each</p>
   <button class="back-btn">Another One</button>
   <button class="all-btn">See all bills</button>
   </div>
    `
    backBtnListener()
    allBtnListener()
}

const displayBill = (bill) => {
    const billCard = document.createElement('div')
    billCard.classList.add('bill-card')
    billCard.innerHTML = `
    <p>Bill for: ${bill.restaurant_name}</p>
    <p>Total: ${bill.total_price}</p>
    <p>Service charge: ${bill.service_charge}</p>
    <p>Due each: ${Number((bill.customer.due).toFixed(1))}</p>
    `
    allBillDiv.appendChild(billCard)
}

const displayAllBills = (bills) => {
    containerDiv.innerHTML = ''    
    bills.forEach(displayBill)
    containerDiv.appendChild(allBillDiv)
}

//eventlisteners
const backBtnListener = () => {
   const backBtn = document.querySelector('.back-btn')
    backBtn.addEventListener('click', () => {
        location.reload(true)
    })
}

const allBtnListener = () => {
    const backBtn = document.querySelector('.all-btn')
     backBtn.addEventListener('click', () => {
         getBills().then(displayAllBills)
     })
 }
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
        
        fetch(BILLAPI, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                restaurant_name: state.bill.restaurantName,
                total_price: state.bill.total,
                service_charge: state.bill.serviceCharge
            })
        }).then(resp => resp.json())
        .then(bill => fetch(CUSTOMERAPI, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: state.customer.name,
                due: state.customer.due,
                bill_id: bill.id
            })
        }))
    })  
}

//fetches 
const getBills = () => {
    return fetch(BILLAPI)
    .then(resp => resp.json())
}


//initialize
const initialize = () => {
    submitFormEventListener()
}

initialize()