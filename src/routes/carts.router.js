const { Router } = require("express");
const {
  getCarts,
  getCartById,
  createCart,
  resolveCart,
} = require("../controllers/carts.controller");

module.exports = async () => {
  const router = Router();

  router.get("/", getCarts);
  router.get("/:id", getCartById);
  router.post("/", createCart);
  router.put("/:id", resolveCart);

  return router;
};
