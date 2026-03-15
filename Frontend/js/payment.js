document.addEventListener("DOMContentLoaded", () => {
  if (!isLoggedIn()) {
    showToast("Please login to checkout", "error");
    setTimeout(() => window.location.href = "login.html", 1500);
    return;
  }
  loadOrderSummary();
  setupPaymentForm();
});

async function loadOrderSummary() {
  const el = document.getElementById("order-summary-box");
  if (!el) return;
  try {
    const data = await apiFetch("/cart");
    const cart = data.cart;
    if (!cart.items.length) {
      el.innerHTML = "<p>Your cart is empty. <a href='homepage.html'>Shop Now</a></p>";
      return;
    }
    const shipping = cart.totalPrice >= 999 ? 0 : 49;
    const total    = cart.totalPrice + shipping;

    el.innerHTML = `
      <h3 style="margin:0 0 14px;font-size:17px;font-weight:700;">Order Summary</h3>
      ${cart.items.map(i => `
        <div style="display:flex;justify-content:space-between;
                    font-size:14px;margin-bottom:8px;color:#444;">
          <span>${i.name} ${i.size ? "("+i.size+")" : ""} × ${i.quantity}</span>
          <span>₹${i.price * i.quantity}</span>
        </div>`).join("")}
      <hr style="border:none;border-top:1px solid #eee;margin:12px 0;">
      <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:6px;">
        <span>Shipping</span>
        <span style="color:${shipping===0?'green':'inherit'}">
          ${shipping === 0 ? "FREE" : "₹"+shipping}
        </span>
      </div>
      <div style="display:flex;justify-content:space-between;
                  font-size:18px;font-weight:700;margin-top:8px;">
        <span>Total</span><span style="color:#e53935;">₹${total}</span>
      </div>
    `;
  } catch {}
}

function setupPaymentForm() {
  const form = document.getElementById("payment-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.textContent = "Placing Order...";

    try {
      const data = await apiFetch("/orders", {
        method: "POST",
        body: JSON.stringify({
          shippingAddress: {
            fullName: document.getElementById("full-name").value.trim(),
            phone:    document.getElementById("phone").value.trim(),
            street:   document.getElementById("address").value.trim(),
            city:     document.getElementById("city").value.trim(),
            state:    document.getElementById("state").value.trim(),
            pincode:  document.getElementById("pincode").value.trim(),
          },
          paymentMethod: document.querySelector('input[name="payment"]:checked')?.value || "COD",
        }),
      });

      showToast("🎉 Order placed successfully!");
      localStorage.setItem("lastOrderId", data.order._id);
      setTimeout(() => window.location.href = "homepage.html", 2000);
    } catch (err) {
      showToast(err.message, "error");
      btn.disabled = false;
      btn.textContent = "Place Order";
    }
  });
}