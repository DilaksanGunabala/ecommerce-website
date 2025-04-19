// main.js
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll("nav a");
    const token = localStorage.getItem("token");
    const loginLink = document.getElementById("login-link");
    const logoutLink = document.getElementById("logout-link");

    // Highlight active page
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    // Show login/logout
    if (token) {
        if (logoutLink) logoutLink.style.display = "inline-block";
        if (loginLink) loginLink.style.display = "none";
    } else {
        if (loginLink) loginLink.style.display = "inline-block";
        if (logoutLink) logoutLink.style.display = "none";
    }

    // Logout functionality
    if (logoutLink) {
        logoutLink.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("token");
            alert("Logged out");
            window.location.href = "login.html";
        });
    }
});
