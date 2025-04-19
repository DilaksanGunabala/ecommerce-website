// add-product.js
const addProductForm = document.getElementById("add-product-form");

if (addProductForm) {
    addProductForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = addProductForm.name.value;
        const description = addProductForm.description.value;
        const price = addProductForm.price.value;
        const image = addProductForm.image.value;

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login to add products.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    description,
                    price,
                    image
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Product added successfully!");
                addProductForm.reset();
            } else {
                alert(data.message || "Failed to add product");
            }
        } catch (err) {
            console.error(err);
            alert("Error adding product");
        }
    });
}
