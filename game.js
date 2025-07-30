const games = [ 
  { id: 1, name: "Call of Duty", price: 50000 },
  { id: 2, name: "God of War", price: 30000 },
  { id: 3, name: "Gran Turismo 7", price: 20000 },
  { id: 4, name: "Mortal Kombat", price: 60000 },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id) {
  const game = games.find(g => g.id === id);
  if (game) {
    cart.push(game);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${game.name} added to cart`);
  }
}

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

function renderCartPage() {
  const cartItems = document.getElementById('cart-items');
  const totalAmount = document.getElementById('total-amount');

  if (!cartItems || !totalAmount) return; // Only run if on cart page

  const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.innerHTML = '';
  let total = 0;

  if (savedCart.length === 0) {
    const li = document.createElement('li');
    li.textContent = "Your cart is empty.";
    cartItems.appendChild(li);
  } else {
    savedCart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ₦${item.price.toLocaleString()}`;
      cartItems.appendChild(li);
      total += item.price;
    });
  }

  totalAmount.textContent = total.toLocaleString();
}


// Authentication Logic


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


// Hamburger Menu for Mobile


function toggleMenu() {
  const menu = document.getElementById("nav-menu");
  if (menu) {
    menu.classList.toggle("show");
  }
}



document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();     // Update cart count everywhere
  renderCartPage();      // Only applies on cart.html
  setupAuthentication(); // Only runs if login/signup forms are present
});
