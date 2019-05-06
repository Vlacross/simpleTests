

/* Checks the response from the fetch request. Logs error and clears interval on success */
function validatePurchase(res) {
  if(res.type === 'error') {
    return console.log(res)
  }
  else if (res.success) {
    console.log('Level-2 complete')
    return  clearInterval(buttonFactory.levelTwo)
  }
}


/*mockData -- endpoint is ONLY validating the proper propties are present(and spelled correctly) */
let purchasedPro2 = {
  custName: "Ralphy Jones",
  fiscalToken: "$PL0I!G111eLvEnZkQq",
  prodName: "Chapstick BackPack",
  subscription: "monthly",
  uuid: 10405
  
}

const url = "https://simple-merch.herokuapp.com/merch-side-product"


function fetchOne() {
console.log('fetching', url)

  return fetch(url, {
    method: 'post',
    headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
    body: JSON.stringify(purchasedPro2)
    
    })
    .then(res => res.json())
    .then(resj => validatePurchase(resj))
    .catch(err => {
    console.log(err)})
}



/*simulating the search of all checkout buttons and adding company insignia imitating a clone -- when proper length reached, clearInterval and call next action */
function buttonTracker() {

  console.log('level One incomplete')
  foundCheckoutButtons = document.querySelectorAll('.checkout')
  foundCompanyButtons = document.querySelectorAll('.insignia')

  console.log(foundCompanyButtons.length)

  if (foundCompanyButtons.length < 2) {
  foundCheckoutButtons.forEach(button => {
    return !button.classList['insignia'] ?
    button.classList.add('insignia') :
    button
    })
  }
  else {
    console.log('Level-1 complete')
    clearInterval(buttonFactory.levelOne)
    return buttonFactory.levelTwo
  }
}



/*build buttons / mockData for first test */
function buildButton() {
  let checkoutButton = '<button class="checkout">Checkout</button>'
  let button = '<button class="button">button</button>'
  let bunch = `${button} ${button} ${checkoutButton} ${checkoutButton}`

   return $('.body').append(bunch)
}




const buttonFactory = {

  levelOne: setInterval(buttonTracker, 1000),
  levelTwo: setInterval(fetchOne, 5000)

}




$(document).ready(() => {

  buildButton()
  buttonTracker()
});

