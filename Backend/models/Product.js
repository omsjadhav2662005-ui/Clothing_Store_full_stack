const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    originalPrice: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "kurtas",
        "sarees",
        "dresses",
        "tops",
        "joggers",
        "trackpants",
        "sweatshirts",
        "jackets",
        "jumpsuits",
        "lehngas",
        "co-ord-sets",
        "duppatas",
        "shrugs",
        "tights",
        "tunics",
        "kurta-men",
        "sherwani",
        "nehru-jackets",
        "jeans-men",
        "shirt-men",
        "tshirt-men",
        "joggers-men",
        "shorts-men",
        "trousers-men",
        "kids-boys-shirts",
        "kids-boys-tshirts",
        "kids-boys-sweatshirts",
        "kids-boys-nightwear",
        "kids-boys-jackets",
        "kids-girls-dresses",
        "kids-girls-sweatshirts",
        "kids-girls-nightwear",
        "kids-girls-partywear",
        "kids-sarees",
        "kids-ethnic",
      ],
    },
    gender: {
      type: String,
      enum: ["men", "women", "kids", "unisex"],
      default: "women",
    },
    images: [
      {
        type: String,
      },
    ],
    sizes: [
      {
        type: String,
        enum: [
          "XS",
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "Free Size",
          "28",
          "30",
          "32",
          "34",
          "36",
          "38",
          "40",
          "2-3Y",
          "3-4Y",
          "4-5Y",
          "5-6Y",
          "6-7Y",
          "7-8Y",
        ],
      },
    ],
    colors: [String],
    stock: {
      type: Number,
      default: 10,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: String,
        rating: Number,
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// Text index for search
productSchema.index({ name: "text", description: "text", category: "text" });

module.exports = mongoose.model("Product", productSchema);
