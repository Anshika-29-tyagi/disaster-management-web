/* ---------- LOGIN ---------- */
async function login() {
  const email = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value.trim();
  const role = document.getElementById("loginRole").value;
  const error = document.getElementById("loginError");

  error.style.display = "none";

  if (!email || !pass || !role) {
    error.innerText = "Please fill all the fields";
    error.style.display = "block";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: pass
      })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);

      window.location.href = "dashboard.html";
    } else {
      error.innerText = data.message || "Login failed";
      error.style.display = "block";
    }

  } catch (err) {
    console.error(err);
    error.innerText = "Server error";
    error.style.display = "block";
  }
}


/* ---------- SIGNUP ---------- */
async function signup() {
  const user = document.getElementById("signupUser").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const pass = document.getElementById("signupPass").value.trim();
  const error = document.getElementById("signupError");

  error.style.display = "none";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!user || !email || !pass) {
    error.innerText = "All fields are required";
    error.style.display = "block";
    return;
  }

  if (!emailRegex.test(email)) {
    error.innerText = "Enter a valid email address";
    error.style.display = "block";
    return;
  }

  if (pass.length < 6) {
    error.innerText = "Password must be at least 6 characters";
    error.style.display = "block";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: user,
        email: email,
        password: pass
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Signup successful");
      window.location.href = "index.html";
    } else {
      error.innerText = data.message || "Signup failed";
      error.style.display = "block";
    }

  } catch (err) {
    console.error(err);
    error.innerText = "Server error";
    error.style.display = "block";
  }
}