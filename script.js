const bookContainer = document.getElementById('cardContainer')
const cart = document.getElementById('cart')

function bookLoad() {
    fetch('https://striveschool-api.herokuapp.com/books')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching books')
            }
            return response.json()
        })
        .then(books => {
            books.forEach(book => {
                const card = addCard(book)
                bookContainer.appendChild(card)
            });
        })
        .catch(error => {
            console.error('loading error', error)
        });
}

function addCard (book) {
    const card = document.createElement('div')
    card.classList.add('col-md-3', 'mb-2')

    card.innerHTML = `
    <div class="card">
        <img src="${book.img}" class="card-img-top" alt="${book.title}">
        <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">Price: ${book.price}$</p>
            <button class="btn btn-danger" onclick="removeCard(this)">Remove</button>
            <button class="btn btn-danger" onclick="addCart('${book.title}', ${book.price})">Add to Cart</button>
        </div>
    </div>
    `

    return card
}

function removeCard (btn) {
   const card = btn.closest('.card')
   card.remove()
}

function addCart (title, price) {
    const cartItem = document.createElement('li')
    cartItem.classList.add('list-group-item')
    cartItem.textContent = `${title} - $${price}`

    cart.appendChild(cartItem)
    cartStorage()
}

let cartItems = []

function cartStorage () {
    localStorage.setItem('cart', JSON.stringify(cartItems))
}

document.addEventListener('DOMContentLoaded', bookLoad)
document.addEventListener('DOMContentLoaded', function () {
    const cartStored = JSON.parse(localStorage.getItem('cart'))
    if (cartStored) {
        cartItems = cartStored
    }
})