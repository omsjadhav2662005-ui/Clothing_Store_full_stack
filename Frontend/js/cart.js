document.addEventListener("DOMContentLoaded", () => {
  loadCart();
});

async function loadCart() {
  const container = document.getElementById("cart-items-container");
  const summaryEl = document.getElementById("cart-summary");

  if (!container) return;

  if (!isLoggedIn()) {
    container.innerHTML = `
      <div style="text-align:center;padding:60px;">
        <div style="font-size:60px;">🛒</div>
        <h2 style="margin:16px 0 8px;">Your cart is empty</h2>
        <p style="color:#666;margin-bottom:20px;">Please login to view your cart</p>
        <a href="login.html" style="background:#e53935;color:white;padding:12px 28px;
           border-radius:8px;text-decoration:none;font-weight:600;">Login</a>
      </div>`;
    return;
  }

  try {
    const data = await apiFetch("/cart");
    const cart = data.cart;

    if (!cart.items || cart.items.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:60px;">
          <div style="font-size:60px;">🛒</div>
          <h2 style="margin:16px 0 8px;">Your cart is empty</h2>
          <p style="color:#666;margin-bottom:20px;">Add items to get started</p>
          <a href="homepage.html" style="background:#e53935;color:white;padding:12px 28px;
             border-radius:8px;text-decoration:none;font-weight:600;">Shop Now</a>
        </div>`;
      if (summaryEl) summaryEl.innerHTML = "";
      return;
    }

    // Render cart items
    container.innerHTML = "";
    cart.items.forEach(item => {
      const itemEl = document.createElement("div");
      itemEl.style.cssText = `
        display:flex; align-items:center; gap:16px;
        border:1px solid #eee; border-radius:10px;
        padding:16px; margin-bottom:12px; background:#fff;
      `;
      const img = item.image || `https://placehold.co/80x100?text=Item`;
      itemEl.innerHTML = `
        <img src="${img}" alt="${item.name}"
             style="width:80px;height:100px;object-fit:cover;border-radius:8px;"
             onerror="this.src='https://placehold.co/80x100?text=Item'">
        <div style="flex:1;">
          <h3 style="margin:0 0 4px;font-size:15px;font-weight:600;">${item.name}</h3>
          ${item.size  ? `<p style="margin:2px 0;color:#666;font-size:13px;">Size: ${item.size}</p>` : ""}
          ${item.color ? `<p style="margin:2px 0;color:#666;font-size:13px;">Color: ${item.color}</p>` : ""}
          <p style="margin:6px 0 0;font-size:16px;font-weight:700;color:#e53935;">₹${item.price}</p>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <button onclick="changeQty('${item._id}', ${item.quantity - 1})"
            style="width:30px;height:30px;border:1px solid #ddd;border-radius:6px;
                   background:#f5f5f5;cursor:pointer;font-size:16px;">-</button>
          <span style="font-size:15px;font-weight:600;min-width:20px;text-align:center;">
            ${item.quantity}
          </span>
          <button onclick="changeQty('${item._id}', ${item.quantity + 1})"
            style="width:30px;height:30px;border:1px solid #ddd;border-radius:6px;
                   background:#f5f5f5;cursor:pointer;font-size:16px;">+</button>
        </div>
        <div>
          <p style="font-weight:700;font-size:15px;">₹${item.price * item.quantity}</p>
          <button onclick="removeItem('${item._id}')"
            style="background:none;border:none;color:#e53935;cursor:pointer;
                   font-size:13px;margin-top:6px;">Remove</button>
        </div>
      `;
      container.appendChild(itemEl);
    });

    // Cart summary
    const shipping = cart.totalPrice >= 999 ? 0 : 49;
    const total    = cart.totalPrice + shipping;
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div style="border:1px solid #eee;border-radius:10px;padding:20px;background:#fff;">
          <h3 style="margin:0 0 16px;font-size:18px;">Order Summary</h3>
          <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
            <span>Subtotal</span><span>₹${cart.totalPrice}</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
            <span>Shipping</span>
            <span style="color:${shipping===0?'green':'inherit'}">
              ${shipping === 0 ? "FREE" : "₹" + shipping}
            </span>
          </div>
          <hr style="border:none;border-top:1px solid #eee;margin:12px 0;">
          <div style="display:flex;justify-content:space-between;
                      font-size:18px;font-weight:700;margin-bottom:16px;">
            <span>Total</span><span>₹${total}</span>
          </div>
          <a href="payment.html"
             style="display:block;background:#e53935;color:white;text-align:center;
                    padding:14px;border-radius:8px;text-decoration:none;
                    font-weight:700;font-size:16px;">
            Proceed to Checkout →
          </a>
          <button onclick="clearEntireCart()"
            style="width:100%;margin-top:10px;background:#f5f5f5;border:1px solid #ddd;
                   padding:10px;border-radius:8px;cursor:pointer;color:#666;font-size:14px;">
            Clear Cart
          </button>
        </div>
      `;
    }

  } catch (err) {
    container.innerHTML = `<p style="color:red;text-align:center;">Failed to load cart</p>`;
  }
}

async function changeQty(itemId, newQty) {
  try {
    await apiFetch(`/cart/update/${itemId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity: newQty }),
    });
    loadCart();
    updateCartCount();
  } catch (err) {
    showToast(err.message, "error");
  }
}

async function removeItem(itemId) {
  try {
    await apiFetch(`/cart/remove/${itemId}`, { method: "DELETE" });
    showToast("Item removed");
    loadCart();
    updateCartCount();
  } catch (err) {
    showToast(err.message, "error");
  }
}

async function clearEntireCart() {
  if (!confirm("Clear all items from cart?")) return;
  try {
    await apiFetch("/cart/clear", { method: "DELETE" });
    showToast("Cart cleared");
    loadCart();
    updateCartCount();
  } catch (err) {
    showToast(err.message, "error");
  }
}