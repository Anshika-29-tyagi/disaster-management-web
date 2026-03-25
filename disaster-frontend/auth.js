/* ---------- LOGIN ---------- */
function login() {
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value.trim();
  const role = document.getElementById("loginRole").value;
  const error = document.getElementById("loginError");

  error.style.display = "none";

  if (!user || !pass || !role) {
    error.innerText = "Please fill all the fields";
    error.style.display = "block";
    return;
  }

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    error.innerText = "No account found. Please sign up first";
    error.style.display = "block";
    return;
  }

  if (user === savedUser.username && pass === savedUser.password) {
    window.location.href = "dashboard.html";
  } else {
    error.innerText = "Wrong username or password";
    error.style.display = "block";
  }
}

/* ---------- SIGNUP ---------- */
function signup() {
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

  // ✅ SAVE SIGNUP DATA
  localStorage.setItem(
    "user",
    JSON.stringify({
      username: user,
      email: email,
      password: pass
    })
  );

  // ✅ REDIRECT BACK TO LOGIN
  window.location.href = "index.html";
}