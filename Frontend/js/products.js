// ── CREATE A PRODUCT CARD ──────────────────────────────────
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  const image = (product.images && product.images[0])
    ? product.images[0]
    : `https://placehold.co/400x500?text=${encodeURIComponent(product.name)}`;

  const discountBadge = product.discount > 0
    ? `<div style="position:absolute;top:10px;left:10px;background:#ff4da6;color:white;
                   padding:3px 10px;border-radius:20px;font-size:12px;font-weight:700;">
         ${product.discount}% OFF
       </div>` : "";

  const originalPrice = product.originalPrice
    ? `<span style="text-decoration:line-through;color:#bbb;font-size:12px;margin-left:4px;">
         ₹${product.originalPrice}
       </span>` : "";

  card.innerHTML = `
    <div style="position:relative;overflow:hidden;border-radius:10px 10px 0 0;">
      <img src="${image}" alt="${product.name}"
        style="width:100%;height:260px;object-fit:cover;display:block;transition:transform 0.3s;"
        onmouseover="this.style.transform='scale(1.05)'"
        onmouseout="this.style.transform='scale(1)'"
        onerror="this.src='https://placehold.co/400x260?text=No+Image'">
      ${discountBadge}
    </div>
    <div style="padding:12px;">
      <div class="product-name" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
                                        font-weight:bold;color:#b30059;margin-bottom:6px;">
        ${product.name}
      </div>
      <div class="product-price" style="display:flex;align-items:center;margin-bottom:10px;">
        <span style="font-size:16px;font-weight:700;color:#ff4da6;">₹${product.price}</span>
        ${originalPrice}
      </div>
      <div style="display:flex;gap:8px;">
        <button onclick="addToCartFromCard('${product._id}')"
          style="flex:1;background:#ff4da6;color:white;border:none;padding:8px;
                 border-radius:20px;cursor:pointer;font-size:13px;font-weight:600;
                 transition:background 0.2s;"
          onmouseover="this.style.background='#d63384'"
          onmouseout="this.style.background='#ff4da6'">
          🛒 Add to Cart
        </button>
        <button onclick="viewProduct('${product._id}')"
          style="flex:1;background:white;color:#ff4da6;border:2px solid #ff4da6;padding:8px;
                 border-radius:20px;cursor:pointer;font-size:13px;font-weight:600;
                 transition:all 0.2s;"
          onmouseover="this.style.background='#ff4da6';this.style.color='white'"
          onmouseout="this.style.background='white';this.style.color='#ff4da6'">
          View
        </button>
      </div>
    </div>`;
  return card;
}

// ── LOAD PRODUCTS INTO GRID ────────────────────────────────
async function loadProducts(containerId, params = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Show loading spinner
  container.style.display = "grid";
  container.style.gridTemplateColumns = "repeat(auto-fill, minmax(240px, 1fr))";
  container.style.gap = "20px";
  container.innerHTML = `
    <div style="grid-column:1/-1;text-align:center;padding:60px 20px;">
      <div style="width:44px;height:44px;border:4px solid #ffe6f0;border-top:4px solid #ff4da6;
                  border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 16px;">
      </div>
      <p style="color:#aaa;font-size:15px;">Loading products...</p>
      <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
    </div>`;

  try {
    const query = new URLSearchParams(params).toString();
    const res   = await fetch(`/api/products?${query}`);
    const data  = await res.json();

    container.innerHTML = "";

    if (!data.products || data.products.length === 0) {
      container.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:60px 20px;">
          <div style="font-size:50px;margin-bottom:12px;">😕</div>
          <p style="color:#aaa;font-size:15px;">No products found in this category yet.</p>
        </div>`;
      return;
    }

    data.products.forEach(p => container.appendChild(createProductCard(p)));

  } catch (err) {
    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#e53935;">
        <div style="font-size:50px;margin-bottom:12px;">⚠️</div>
        <p>Could not load products.<br>Make sure the backend is running on port 5000.</p>
      </div>`;
  }
}

// ── LOAD FEATURED (homepage bootstrap cards) ──────────────
async function loadFeaturedProducts(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-danger" role="status"></div>
      <p class="mt-2 text-muted">Loading...</p>
    </div>`;

  try {
    const res  = await fetch("/api/products/featured");
    const data = await res.json();

    container.innerHTML = "";

    if (!data.products || data.products.length === 0) {
      container.innerHTML = `<div class="col-12 text-center text-muted py-4">No featured products found.</div>`;
      return;
    }

    data.products.forEach(p => {
      const img = (p.images && p.images[0])
        ? p.images[0]
        : `https://placehold.co/400x300?text=${encodeURIComponent(p.name)}`;

      const col = document.createElement("div");
      col.className = "col-md-3";
      col.innerHTML = `
        <div class="card product-card h-100" style="cursor:pointer;border-radius:12px;
             overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);border:none;">
          <div style="overflow:hidden;">
            <img src="${img}" class="card-img-top"
              style="height:260px;object-fit:cover;transition:transform 0.3s;"
              onmouseover="this.style.transform='scale(1.05)'"
              onmouseout="this.style.transform='scale(1)'"
              onerror="this.src='https://placehold.co/400x260?text=No+Image'">
          </div>
          <div class="card-body text-start">
            <h6 class="fw-semibold mb-1" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#b30059;">
              ${p.name}
            </h6>
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="fw-bold" style="color:#ff4da6;font-size:16px;">₹${p.price}</span>
              ${p.originalPrice ? `<span class="text-muted text-decoration-line-through small">₹${p.originalPrice}</span>` : ""}
              ${p.discount ? `<span class="badge" style="background:#ff4da6;">${p.discount}% OFF</span>` : ""}
            </div>
            <div class="d-flex gap-2">
              <button onclick="addToCartFromCard('${p._id}')"
                class="btn btn-sm w-100 fw-semibold"
                style="background:#ff4da6;color:white;border-radius:20px;border:none;">
                🛒 Add to Cart
              </button>
              <button onclick="viewProduct('${p._id}')"
                class="btn btn-sm w-100 fw-semibold"
                style="background:white;color:#ff4da6;border:2px solid #ff4da6;border-radius:20px;">
                View
              </button>
            </div>
          </div>
        </div>`;
      container.appendChild(col);
    });

  } catch {
    container.innerHTML = `<div class="col-12 text-center text-danger py-4">Failed to load products.</div>`;
  }
}

// ── NAVIGATE TO PRODUCT DETAIL PAGE ──────────────────────
function viewProduct(productId) {
  window.location.href = `product details.html?id=${productId}`;
}

// ── ADD TO CART FROM PRODUCT CARD ─────────────────────────
async function addToCartFromCard(productId) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login to add items to cart!");
    window.location.href = "login.html";
    return;
  }
  try {
    const res = await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ productId, quantity: 1 })
    });
    const data = await res.json();
    if (res.ok) {
      showToast("✅ Added to cart!");
      updateCartCount();
    } else {
      showToast("⚠️ " + (data.message || "Failed"), "error");
    }
  } catch {
    showToast("⚠️ Cannot connect to server", "error");
  }
}
