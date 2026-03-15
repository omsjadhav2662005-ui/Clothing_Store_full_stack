document.addEventListener("DOMContentLoaded", async () => {
  const params    = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    document.body.innerHTML = "<p style='text-align:center;padding:40px;'>Product not found</p>";
    return;
  }

  try {
    const data    = await apiFetch(`/products/${productId}`);
    const product = data.product;

    // Fill in details — these IDs must exist in your product details.html
    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const setImg = (id, src) => { const el = document.getElementById(id); if (el) el.src = src; };
    const setHTML = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val; };

    setEl("product-name",  product.name);
    setEl("product-price", `₹${product.price}`);
    setEl("product-desc",  product.description);
    setEl("product-discount", product.discount ? `${product.discount}% OFF` : "");
    setEl("product-original-price", product.originalPrice ? `₹${product.originalPrice}` : "");
    setImg("product-main-image", product.images?.[0] || "https://placehold.co/500x600?text=Product");

    // Sizes
    const sizeContainer = document.getElementById("product-sizes");
    if (sizeContainer && product.sizes?.length) {
      sizeContainer.innerHTML = product.sizes.map(s => `
        <button onclick="selectSize(this, '${s}')"
          style="border:1px solid #ccc;background:#fff;padding:8px 14px;
                 border-radius:6px;cursor:pointer;font-size:14px;margin:4px;">
          ${s}
        </button>`).join("");
    }

    // Colors
    const colorContainer = document.getElementById("product-colors");
    if (colorContainer && product.colors?.length) {
      colorContainer.innerHTML = product.colors.map(c => `
        <button onclick="selectColor(this, '${c}')"
          style="border:1px solid #ccc;background:#fff;padding:8px 14px;
                 border-radius:6px;cursor:pointer;font-size:14px;margin:4px;">
          ${c}
        </button>`).join("");
    }

    // Add to cart button
    const cartBtn = document.getElementById("add-to-cart-btn");
    if (cartBtn) {
      cartBtn.addEventListener("click", () => addToCartDetail(product._id));
    }

  } catch (err) {
    document.body.innerHTML = `<p style='text-align:center;padding:40px;color:red;'>${err.message}</p>`;
  }
});

let selectedSize  = "";
let selectedColor = "";

function selectSize(btn, size) {
  document.querySelectorAll("#product-sizes button").forEach(b => {
    b.style.background = "#fff"; b.style.color = "#333"; b.style.borderColor = "#ccc";
  });
  btn.style.background  = "#e53935";
  btn.style.color       = "white";
  btn.style.borderColor = "#e53935";
  selectedSize = size;
}

function selectColor(btn, color) {
  document.querySelectorAll("#product-colors button").forEach(b => {
    b.style.background = "#fff"; b.style.color = "#333"; b.style.borderColor = "#ccc";
  });
  btn.style.background  = "#e53935";
  btn.style.color       = "white";
  btn.style.borderColor = "#e53935";
  selectedColor = color;
}

async function addToCartDetail(productId) {
  if (!isLoggedIn()) {
    showToast("Please login to add items to cart", "error");
    setTimeout(() => window.location.href = "login.html", 1500);
    return;
  }
  try {
    await apiFetch("/cart/add", {
      method: "POST",
      body: JSON.stringify({
        productId,
        quantity: parseInt(document.getElementById("product-qty")?.value) || 1,
        size:  selectedSize,
        color: selectedColor,
      }),
    });
    showToast("✅ Added to cart!");
    updateCartCount();
  } catch (err) {
    showToast(err.message, "error");
  }
}