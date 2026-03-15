# 🛍️ ClothingStore — Full Stack Fashion E-Commerce

A complete full-stack clothing e-commerce website built with **HTML, CSS, JavaScript** (Frontend) and **Node.js, Express, MongoDB** (Backend).

---

## 📁 Project Structure

```
Clothing_Store_full_stack/
├── Backend/                  ← Node.js + Express + MongoDB API
│   ├── config/
│   │   └── db.js             ← MongoDB connection
│   ├── controllers/          ← Route logic
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── contactController.js
│   │   ├── orderController.js
│   │   └── productController.js
│   ├── middleware/
│   │   └── authMiddleware.js ← JWT authentication
│   ├── models/               ← Mongoose schemas
│   │   ├── Cart.js
│   │   ├── Contact.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/               ← API route definitions
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   ├── seed/
│   │   └── seedProducts.js   ← Database seeder (215 products)
│   ├── .env                  ← Environment variables
│   ├── package.json
│   └── server.js             ← Main server entry point
│
├── Frontend/                 ← HTML/CSS/JS pages
│   ├── images/               ← ⚠️ MUST BE EXTRACTED FROM images.zip
│   ├── js/                   ← Shared JavaScript files
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── cart.js
│   │   ├── contact.js
│   │   ├── navbar.js
│   │   ├── payment.js
│   │   ├── product-detail.js
│   │   ├── products.js
│   │   └── search.js
│   ├── homepage.html
│   ├── login.html
│   ├── signup.html
│   ├── profile.html
│   ├── add to cart.html
│   ├── payment.html
│   ├── product details.html
│   ├── search page.html
│   ├── offers.html
│   ├── contact us.html
│   ├── about us.html
│   ├── [35+ category pages]  ← kurtas, sarees, jeans, etc.
│   └── style.css
│
└── images.zip                ← ⚠️ Product images (extract to Frontend/images/)
```

---

## ⚠️ IMPORTANT — Images Setup

**The `images.zip` file in the root of this repository contains all product images. You MUST extract it before running the project.**

### Step 1 — Download `images.zip`

On the GitHub repo page, click on `images.zip` → click **Download**.

### Step 2 — Extract into the correct folder

Extract the zip so that the `images/` folder is placed **directly inside the `Frontend/` folder**:

```
✅ CORRECT path:
Clothing_Store_full_stack/
└── Frontend/
    └── images/          ← extracted here
        ├── women_kurta1.webp
        ├── women_saree1.avif
        ├── mens_jacket1.avif
        └── ... (400+ image files)

❌ WRONG paths:
Frontend/images/images/  ← double nested (wrong)
images/                  ← in root folder (wrong)
```

> **On Windows:** Right-click `images.zip` → Extract All → browse to your `Frontend/` folder → Extract.
>
> **On Mac:** Double-click `images.zip` to extract, then drag the `images/` folder into `Frontend/`.

### Step 3 — Verify

Your folder should look like:
```
Frontend/
├── images/
│   ├── logo.img.png
│   ├── img1.webp
│   ├── women_kurta1.webp
│   ├── women_saree1.avif
│   └── ... 400+ files
├── homepage.html
├── login.html
└── ...
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | v18+ | https://nodejs.org |
| MongoDB Compass | Latest | https://www.mongodb.com/products/compass |
| Git | Latest | https://git-scm.com |

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/omsjadhav2662005-ui/Clothing_Store_full_stack.git
cd Clothing_Store_full_stack
```

---

### Step 2 — Extract Images ⚠️

Extract `images.zip` into `Frontend/images/` as described in the **Images Setup** section above.

---

### Step 3 — Install Backend Dependencies

```bash
cd Backend
npm install
```

---

### Step 4 — Configure Environment Variables

The `.env` file is already in the `Backend/` folder. Verify it contains:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/cloths_shopping
JWT_SECRET=your_super_secret_jwt_key_change_this
```

> **Note:** Change `JWT_SECRET` to any long random string for security.

---

### Step 5 — Start MongoDB

Open **MongoDB Compass** and connect to:
```
mongodb://localhost:27017
```

Make sure MongoDB is running on your machine. The database `cloths_shopping` will be created automatically.

---

### Step 6 — Seed the Database

This populates the database with **215 products** with all categories and real image names:

```bash
# Make sure you're inside the Backend/ folder
npm run seed
```

Expected output:
```
✅ Connected to MongoDB
🗑️  Cleared existing products
🌱 Seeded 215 products with updated image names
🔌 Done!
```

---

### Step 7 — Start the Server

```bash
npm run dev
```

Expected output:
```
✅ Server running on http://localhost:5000
🌐 Homepage  → http://localhost:5000/homepage.html
🔑 Login     → http://localhost:5000/login.html
📝 Signup    → http://localhost:5000/signup.html
```

---

### Step 8 — Open in Browser

```
http://localhost:5000/homepage.html
```

> ⚠️ **Do NOT open the HTML files by double-clicking them.** Always use `http://localhost:5000/` — the backend serves all frontend files.

---

## 🌐 Pages

| Page | URL |
|------|-----|
| Homepage | `http://localhost:5000/homepage.html` |
| Login | `http://localhost:5000/login.html` |
| Sign Up | `http://localhost:5000/signup.html` |
| Profile | `http://localhost:5000/profile.html` |
| Cart | `http://localhost:5000/add to cart.html` |
| Checkout | `http://localhost:5000/payment.html` |
| Search | `http://localhost:5000/search page.html` |
| Offers | `http://localhost:5000/offers.html` |
| Women Kurtas | `http://localhost:5000/kurtas page.html` |
| Women Sarees | `http://localhost:5000/saree page.html` |
| Men Shirts | `http://localhost:5000/shirt men.html` |
| Kids Dresses | `http://localhost:5000/kids dress girl.html` |

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get profile (JWT required) |
| PUT | `/api/auth/profile` | Update profile (JWT required) |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (filter, search, paginate) |
| GET | `/api/products/featured` | Get featured products |
| GET | `/api/products/:id` | Get single product |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get user cart (JWT required) |
| POST | `/api/cart/add` | Add item to cart (JWT required) |
| PUT | `/api/cart/update/:itemId` | Update quantity (JWT required) |
| DELETE | `/api/cart/remove/:itemId` | Remove item (JWT required) |
| DELETE | `/api/cart/clear` | Clear cart (JWT required) |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Place order (JWT required) |
| GET | `/api/orders/my` | Get my orders (JWT required) |
| GET | `/api/orders/:id` | Get order by ID (JWT required) |
| PUT | `/api/orders/:id/cancel` | Cancel order (JWT required) |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |

---

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Bootstrap 5.3
- Google Fonts (Poppins)

### Backend
- Node.js
- Express.js v5
- MongoDB + Mongoose v9
- JSON Web Tokens (JWT)
- bcryptjs (password hashing)

---

## 🗂️ Product Categories

| Section | Categories |
|---------|-----------|
| **Women** | Kurtas, Sarees, Dresses, Tops, Lehengas, Co-ord Sets, Joggers, Trackpants, Sweatshirts, Jackets, Jumpsuits, Duppatas, Shrugs, Tights, Tunics |
| **Men** | Kurta, Sherwani, Nehru Jackets, Jeans, Shirts, T-Shirts, Joggers, Shorts, Trousers, Jackets, Sweatshirts |
| **Kids** | Boys Shirts, Boys T-Shirts, Boys Sweatshirts, Boys Nightwear, Boys Jackets, Girls Dresses, Girls Sweatshirts, Girls Nightwear, Girls Partywear, Kids Sarees, Ethnic Wear |

---

## 🔧 npm Scripts

Run these from inside the `Backend/` folder:

```bash
npm run dev      # Start server with nodemon (auto-restart)
npm start        # Start server without auto-restart
npm run seed     # Seed database with 215 sample products
```

---

## ❗ Troubleshooting

### Images not showing
- Make sure `images.zip` is extracted into `Frontend/images/`
- The path must be `Frontend/images/women_kurta1.webp` etc.
- Re-run `npm run seed` after placing images correctly

### "next is not a function" error
- You are using **Mongoose v7+** which does not pass `next` to async pre-hooks
- Make sure your `Backend/models/User.js` pre-hook looks like:
```js
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});
```

### "Route not found" on all pages
- Your `Backend/server.js` is missing `express.static`
- Make sure it contains:
```js
const path = require("path");
app.use(express.static(path.join(__dirname, "../Frontend")));
```

### Login/Signup not working
- Always open pages via `http://localhost:5000/` — NOT by double-clicking HTML files
- Double-clicking uses `file://` protocol which blocks all API calls

### Port 5000 already in use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill
```

### MongoDB not connecting
- Open MongoDB Compass and make sure it is running
- Default connection: `mongodb://localhost:27017`
- The database `cloths_shopping` is created automatically on first seed

---

## 👤 Author

**Om Jadhav**
- GitHub: [@omsjadhav2662005-ui](https://github.com/omsjadhav2662005-ui)

---

## 📄 License

This project is for educational purposes.
