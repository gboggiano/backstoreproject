const { Carts, User, Business } = require("../dao");

const cartsDAO = new Carts();
const userDAO = new User();
const businessDAO = new Business();

module.exports = {
  getCarts: async (_, res) => {
    // res.send({ status: "sucess", payload: "getCarts" });

    const carts = await cartsDAO.getCarts();
    if (!carts) {
      return res.sendError("Something went wrong!");
    }

    res.sendSuccess(carts);
  },

  getCartById: async (req, res) => {
    // res.send({ status: "sucess", payload: "getCartById" });
    const id = req.params.id;
    const carts = await cartsDAO.getCartById(id);
    if (!carts) {
      return carts === false
        ? res.sendError({ message: "Not found!" }, 404)
        : res.sendError({ message: "Something went wrong!" });
    }

    res.sendSuccess(carts);
  },

  createCart: async (req, res) => {
    // res.send({ status: "sucess", payload: "createCart" });
    const { user, business, products } = req.body;
    const userObject = await userDAO.getUserById(user);
    const businessObject = await businessDAO.getBusinessById(business);

    const productsInBusiness = businessObject.products.filter((p) =>
      products.includes(p.id)
    );
    const totalPrice = productsInBusiness.reduce((acc, p) => {
      acc += p.price;
      return acc;
    }, 0);

    const cart = await cartsDAO.createCart({
      number: Date.now(),
      totalPrice,
      products: productsInBusiness,
      status: "pending checkout",
      business,
      user,
    });

    if (!cart) {
      return res.sendError("Something went wrong!");
    }

    const userCarts = userObject.carts || [];
    userCarts.push(cart._id);
    await userDAO.updateUser(user, { carts: userCarts });

    return res.sendSuccess(cart);
  },

  resolveCart: async (_, res) => {
    // res.send({ status: "sucess", payload: "resolveCart" });
  },
};
