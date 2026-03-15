document.addEventListener("DOMContentLoaded", () => {

  // ─── SIGNUP FORM ─────────────────────────────────────────
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = signupForm.querySelector("button[type=submit]");
      btn.disabled = true;
      btn.textContent = "Creating Account...";

      try {
        const data = await apiFetch("/auth/signup", {
          method: "POST",
          body: JSON.stringify({
            name:     document.getElementById("signup-name").value.trim(),
            email:    document.getElementById("signup-email").value.trim(),
            password: document.getElementById("signup-password").value,
            phone:    document.getElementById("signup-phone")?.value.trim() || "",
          }),
        });

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        showToast("Account created! Redirecting...");
        setTimeout(() => window.location.href = "homepage.html", 1500);
      } catch (err) {
        showToast(err.message, "error");
        btn.disabled = false;
        btn.textContent = "Sign Up";
      }
    });
  }

  // ─── LOGIN FORM ──────────────────────────────────────────
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = loginForm.querySelector("button[type=submit]");
      btn.disabled = true;
      btn.textContent = "Logging in...";

      try {
        const data = await apiFetch("/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email:    document.getElementById("login-email").value.trim(),
            password: document.getElementById("login-password").value,
          }),
        });

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        showToast("Login successful! Redirecting...");
        setTimeout(() => window.location.href = "homepage.html", 1500);
      } catch (err) {
        showToast(err.message, "error");
        btn.disabled = false;
        btn.textContent = "Login";
      }
    });
  }

});