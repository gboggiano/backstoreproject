const express = require("express");
//------//
const mongoose = require("mongoose");
//------//
const cors = require("cors");
//------//
const { mongoUri, dbName } = require("./config");
//------//

// ---Middleware---//
const { configureCustomResponses } = require("./controllers/utils");
//---func----/
const createBusinessRouter = require("./routes/business.router");
const createCartsRouter = require("./routes/carts.router");
const createUsersRouter = require("./routes/users.router");

const app = express();

app.use(express.json());

//------//
app.use(cors({ origin: "http://127.0.0.1:5500" }));
//------//
app.use(configureCustomResponses);

//-------//

const main = async () => {
  //-------//
  await mongoose.connect(mongoUri, { dbName });

  //-------//

  //---Routes -----//
  // array de configuraciones
  const routers = [
    { path: "/api/users", createRouter: createUsersRouter },
    { path: "/api/carts", createRouter: createCartsRouter },
    { path: "/api/business", createRouter: createBusinessRouter },
  ];

  for (const { path, createRouter } of routers) {
    app.use(path, await createRouter());
  }

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server up & running on port ${port}`);
  });
};

main();
