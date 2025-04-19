// auth.js

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
  
    // LOGIN
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;
  
        try {
          const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
          });
  
          const data = await res.json();
          if (res.ok) {
            localStorage.setItem("token", data.token);
            alert("Login successful!");
            window.location.href = "index.html";
          } else {
            alert(data.message || "Login failed");
          }
        } catch (err) {
          console.error(err);
          alert("Error logging in");
        }
      });
    }
  
    // REGISTER
    if (registerForm) {
      registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = registerForm.name.value;
        const email = registerForm.email.value;
        const password = registerForm.password.value;
  
        try {
          const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
          });
  
          const data = await res.json();
          if (res.ok) {
            alert("Registration successful! Please login.");
            window.location.href = "login.html";
          } else {
            alert(data.message || "Registration failed");
          }
        } catch (err) {
          console.error(err);
          alert("Error registering");
        }
      });
    }
  });
  