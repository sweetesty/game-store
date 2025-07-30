const games = [ 
  { id: 1, name: "Call of Duty", price: 50 },
  { id: 2, name: "God of War", price: 30 },
  { id: 3, name: "Gran Turismo 7", price: 20 },
  { id: 4, name: "Mortal Kombat", price: 60 },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id) {
  const game = games.find(g => g.id === id);
  if (game) {
    cart.push(game);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  if (!cartItems) return;

  cartItems.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    cartItems.appendChild(li);
  });
}

// Render cart on page load
document.addEventListener('DOMContentLoaded', renderCart);
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');

  if (!cartItems || !cartCount) return;

  cartItems.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    cartItems.appendChild(li);
  });

  // Update the item count
  cartCount.textContent = cart.length;
}
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');

  if (!cartItems || !cartCount) return;

  cartItems.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    cartItems.appendChild(li);
  });

  // Update the item count
  cartCount.textContent = cart.length;
}
