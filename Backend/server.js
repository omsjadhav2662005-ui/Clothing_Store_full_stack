const express  = require("express");
const dotenv   = require("dotenv");
const cors     = require("cors");
const path     = require("path");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ── CORS ──
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Serve Frontend folder as static files ──
// This MUST come before API routes so .html, .css, images all load
app.use(express.static(path.join(__dirname, "../Frontend")));

// ── API Routes ──
app.use("/api/auth",     require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart",     require("./routes/cartRoutes"));
app.use("/api/orders",   require("./routes/orderRoutes"));
app.use("/api/contact",  require("./routes/contactRoutes"));

// ── Root → serve homepage ──
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/homepage.html"));
});

// ── Fallback: any unknown route → serve homepage ──
app.use((req, res) => {
  // If it's an API call, return 404 JSON
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ message: "API route not found" });
  }
  // Otherwise serve the homepage (lets browser handle routing)
  res.sendFile(path.join(__dirname, "../Frontend/homepage.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`🌐 Homepage  → http://localhost:${PORT}/homepage.html`);
  console.log(`🔑 Login     → http://localhost:${PORT}/login.html`);
  console.log(`📝 Signup    → http://localhost:${PORT}/signup.html\n`);
});
