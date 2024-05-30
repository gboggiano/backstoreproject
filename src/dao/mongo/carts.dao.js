const CartsModel = require("../models/carts.model");

class CartsDAO {
  async getCarts() {
    try {
      const carts = await CartsModel.find();
      return carts.map((u) => u.toObject());
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getCartById(id) {
    try {
      const carts = await CartsModel.findById(id);
      return carts?.toObject() ?? null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async createCart(carts) {
    try {
      const savedCarts = await CartsModel.create(carts);
      return savedCarts.toObject();
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async resolveCart(id, status) {
    try {
      const result = await CartsModel.updateOne(
        { _id: id },
        { $set: { status } }
      );
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

module.exports = { CartsDAO };
