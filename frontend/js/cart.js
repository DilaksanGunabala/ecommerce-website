// cart.js
document.addEventListener("DOMContentLoaded", async () => {
    const cartList = document.getElementById("content");
    const token = localStorage.getItem("token");
    if (!token) return cartList.innerHTML = "Please login to view your cart.";

    try {
        const res = await fetch("http://localhost:5000/api/cart", {
            headers: { Authorization: `Bearer ${token}` }
        });
        const cart = await res.json();
        if (cart.length === 0) return cartList.innerHTML = "Your cart is empty.";
        
        cart.forEach(item => {
            const div = document.createElement("div");
            div.innerHTML = `<p>${item.product.name} - $${item.product.price}</p>`;
            cartList.appendChild(div);
        });
    } catch (err) {
        cartList.innerHTML = "Failed to load cart items.";
    }
});
