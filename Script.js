const form = document.getElementById("auth-form");
const formTitle = document.getElementById("form-title");
const toggleForm = document.getElementById("toggle-form");
const submitBtn = document.getElementById("submit-btn");
const protectedContent = document.getElementById("protected-content");
const userDisplay = document.getElementById("user-display");
const logoutBtn = document.getElementById("logout-btn");

let isLogin = true;

toggleForm.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? "Login" : "Register";
  submitBtn.textContent = isLogin ? "Login" : "Register";
  toggleForm.textContent = isLogin ? "Register" : "Login";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (isLogin) {
    const stored = JSON.parse(localStorage.getItem(username));
    if (stored && stored.password === btoa(password)) {
      sessionStorage.setItem("authenticatedUser", username);
      showProtectedContent(username);
    } else {
      alert("Invalid credentials.");
    }
  } else {
    if (localStorage.getItem(username)) {
      alert("User already exists.");
    } else {
      localStorage.setItem(username, JSON.stringify({ password: btoa(password) }));
      alert("Registered successfully! Please log in.");
      toggleForm.click();
    }
  }

  form.reset();
});

function showProtectedContent(username) {
  document.getElementById("auth-form").classList.add("hidden");
  protectedContent.classList.remove("hidden");
  userDisplay.textContent = username;
}

logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem("authenticatedUser");
  protectedContent.classList.add("hidden");
  document.getElementById("auth-form").classList.remove("hidden");
});

window.onload = () => {
  const user = sessionStorage.getItem("authenticatedUser");
  if (user) showProtectedContent(user);
};
