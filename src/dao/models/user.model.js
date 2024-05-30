const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carts",
    },
  ],
  password: String,
});

module.exports = mongoose.model("User", schema, "users");
