const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    img: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    doors: {
      type: Number,
      required: true,
    },
    cylinders: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    fuel: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
  },
  { timestamps: true }
);

carSchema.index({
  desc: "text",
  model: "text",
  tags: "text",
  desc: "text",
  title: "text",
});

module.exports = mongoose.model("Car", carSchema);
