const games = [ 
  { id: 1, name: "Call of Duty", price: 50000 },
  { id: 2, name: "God of War", price: 30000 },
  { id: 3, name: "Gran Turismo 7", price: 20000 },
  { id: 4, name: "Mortal Kombat", price: 60000 },
  { id: 5, name:"Grand Auto Theft V", price:45000 },
  { id: 6, name: "Alane Wake II Deluxe Edition", price: 45000 },
  { id: 7, name: "Resident Evil 4-Ps5 ", price: 65000 },
  { id: 8, name: "Assassins Creed Shadows Standard Edition-xbox", price: 40000 },
  { id: 9, name: "Silent Hills 2-Ps5", price: 20000 },
  { id: 10, name: "EA SPORTS College Football 26 - Xbox Series", price: 70000 },
  { id: 11, name: "Dead Rising Deluxe Remaster-Xbox", price: 65000 },
  { id: 12, name: "Alone In The Dark-Ps5", price: 45000 },
  { id: 13, name: "Alone In The Dark-Xbox", price: 45000 },
  { id: 14, name: "Fallout", price: 35000 },
  { id: 15, name: "Red Redemption - xbox", price: 30000 },
  { id: 16, name: "Split Fiction ps5", price: 27500 },
  { id: 17, name: "Star Wars Outlaws", price: 65000 },
  { id: 18, name: "Resident Evil 7-Ps5", price: 65000 },
  { id: 19, name: "Split Fiction-Xbox", price: 27500 },
  { id: 20, name: "Madden NFL 26 - PlayStation 5", price: 60000 },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id) {
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const game = games.find(g => g.id === id);
    if (game) {
      cart.push({ ...game, quantity: 1 });
    }
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`Item added to cart`);
}

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}

function renderCartPage() {
  const cartItems = document.getElementById('cart-items');
  const totalAmount = document.getElementById('total-amount');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (!cartItems || !totalAmount) return;

  cartItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<li>Your cart is empty.</li>';
    if (checkoutBtn) checkoutBtn.style.display = 'none';
  } else {
    cart.forEach((item, index) => {
      total += item.price * item.quantity;

      const li = document.createElement('li');
      li.innerHTML = `
        ${item.name} - ₦${(item.price * item.quantity).toLocaleString()} 
        <div>
          <button onclick="changeQuantity(${index}, -1)">-</button>
          ${item.quantity}
          <button onclick="changeQuantity(${index}, 1)">+</button>
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      `;
      cartItems.appendChild(li);
    });

    if (checkoutBtn) checkoutBtn.style.display = 'block';
  }

  totalAmount.textContent = total.toLocaleString();
}

function changeQuantity(index, amount) {
  cart[index].quantity += amount;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCartPage();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCartPage();
}

function checkout() {
  alert(`Thank you for your purchase! Total: ₦${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}`);
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCartPage();
}

// Authentication
function setupAuthentication() {
  const loginForm = document.querySelector("#login-form");
  const signupForm = document.querySelector("#signup-form");

  if (!loginForm || !signupForm) return;

  const loginBtn = loginForm.querySelector("button");
  const signupBtn = signupForm.querySelector("button");

  signupBtn.addEventListener("click", () => {
    const inputs = signupForm.querySelectorAll("input");
    const [email, password, fullName, username] = [...inputs].map(i => i.value.trim());

    if (email && password && fullName && username) {
      const user = { email, password, fullName, username };
      localStorage.setItem("user", JSON.stringify(user));
      alert("Sign up successful. Please log in.");
      signupForm.style.display = "none";
      loginForm.style.display = "flex";
    } else {
      alert("Please fill in all fields.");
    }
  });

  loginBtn.addEventListener("click", () => {
    const inputs = loginForm.querySelectorAll("input");
    const [loginId, password] = [...inputs].map(i => i.value.trim());
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && (loginId === storedUser.email || loginId === storedUser.username) && password === storedUser.password) {
      alert(`Welcome back, ${storedUser.fullName}!`);
    } else {
      alert("Invalid credentials. Please try again or sign up.");
    }
  });
}

// Mobile Menu
function toggleMenu() {
  const menu = document.getElementById("nav-menu");
  if (menu) {
    menu.classList.toggle("show");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCartPage();
  setupAuthentication();
});
