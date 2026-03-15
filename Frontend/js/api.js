// Always use relative URL - backend serves the frontend
const API_BASE = "/api";

function getToken() { return localStorage.getItem("token"); }
function getUser()  { const u = localStorage.getItem("user"); return u ? JSON.parse(u) : null; }
function isLoggedIn() { return !!getToken(); }

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login.html";
}

async function apiFetch(endpoint, options = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  try {
    const res  = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: { ...headers, ...(options.headers || {}) },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
  } catch (err) {
    if (err.name === "TypeError" && err.message.includes("fetch")) {
      throw new Error("Cannot connect to server. Make sure backend is running: npm run dev");
    }
    throw err;
  }
}

function showToast(message, type = "success") {
  const ex = document.getElementById("_toast_");
  if (ex) ex.remove();
  const t = document.createElement("div");
  t.id = "_toast_";
  t.textContent = message;
  t.style.cssText = `
    position:fixed;bottom:30px;right:30px;z-index:99999;
    background:${type === "success" ? "#28a745" : "#dc3545"};
    color:white;padding:13px 22px;border-radius:10px;
    font-size:14px;font-weight:600;
    box-shadow:0 4px 20px rgba(0,0,0,0.18);
    animation:fadeUp 0.3s ease;max-width:320px;`;
  const s = document.createElement("style");
  s.textContent = `@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}`;
  document.head.appendChild(s);
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

function showFormError(formId, message) {
  const form = document.getElementById(formId);
  if (!form) return;
  let el = form.querySelector(".api-err");
  if (!el) {
    el = document.createElement("div");
    el.className = "api-err";
    el.style.cssText = "color:#dc3545;background:#fff0f0;border:1px solid #dc3545;padding:10px 14px;border-radius:6px;margin-top:12px;font-size:14px;";
    form.appendChild(el);
  }
  el.textContent = "⚠️ " + message;
  el.style.display = "block";
}

function clearFormError(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  const el = form.querySelector(".api-err");
  if (el) el.style.display = "none";
}

async function updateCartCount() {
  if (!isLoggedIn()) return;
  try {
    const data  = await apiFetch("/cart");
    const count = data.cart.items.reduce((s, i) => s + i.quantity, 0);
    const badge = document.getElementById("cart-count");
    if (badge) badge.textContent = count > 0 ? count : "";
  } catch {}
}
