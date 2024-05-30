const { BusinessDAO } = require("./mongo/business.dao");
const { CartsDAO } = require("./mongo/carts.dao");
const { UserDAO } = require("./mongo/user.dao");

module.exports = {
  Business: BusinessDAO,
  User: UserDAO,
  Carts: CartsDAO,
};
