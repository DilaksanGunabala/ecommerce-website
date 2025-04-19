// product.js
document.addEventListener("DOMContentLoaded", async () => {
    const productList = document.getElementById("content");
    if (!productList) return;

    try {
        const res = await fetch("http://localhost:5000/api/products");
        const products = await res.json();
        products.forEach(product => {
            const item = document.createElement("div");
            item.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <button onclick="addToCart('${product._id}')">Add to Cart</button>
                <hr/>
            `;
            productList.appendChild(item);
        });
    } catch (err) {
        productList.innerHTML = "Failed to load products.";
    }
});

async function addToCart(productId) {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first.");

    try {
        const res = await fetch("http://localhost:5000/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ productId })
        });
        if (res.ok) alert("Added to cart!");
        else alert("Failed to add to cart");
    } catch (err) {
        alert("Error adding to cart");
    }
}
