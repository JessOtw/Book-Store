// Load books from XML using AJAX
function loadBooks() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "books.xml", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const xml = xhr.responseXML;
            displayBooks(xml);
        }
    };
    xhr.send();
}

// Display books in HTML
function displayBooks(xml) {
    const books = xml.getElementsByTagName("book");
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    for (let i = 0; i < books.length; i++) {
        const title = books[i].getElementsByTagName("title")[0].textContent;
        const author = books[i].getElementsByTagName("author")[0].textContent;
        const price = books[i].getElementsByTagName("price")[0].textContent;
        const bookId = books[i].getAttribute("id");

        const bookItem = document.createElement("div");
        bookItem.className = "book-item";
        bookItem.innerHTML = `
            <strong>${title}</strong> by ${author} - $${price}
            <button onclick="addToCart('${bookId}', '${title}', '${price}')">Add to Cart</button>
        `;
        bookList.appendChild(bookItem);
    }
}

// Search filter for books
function filterBooks() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const books = document.getElementsByClassName("book-item");

    for (let book of books) {
        const text = book.textContent.toLowerCase();
        book.style.display = text.includes(searchInput) ? "block" : "none";
    }
}

// Shopping cart logic
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id, title, price) {
    cart.push({ id, title, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.title} - $${item.price} <button onclick="removeFromCart(${index})">❌</button>`;
        cartList.appendChild(li);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Load books and cart when the page is ready
window.onload = function () {
    loadBooks();
    displayCart();
};
