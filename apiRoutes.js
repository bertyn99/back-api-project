const express = require("express");
const user = require("./controller/userController");
const verifyToken = require("./services/verifyToken");
const products = require("./controller/productController");
const invoice = require("./controller/factureController");
exports.router = (function () {
  let apiRouter = express.Router();
  // register user
  apiRouter.route("/register").post(user.register);

  // connection user
  apiRouter.route("/login").post(user.logIn);

  // deconnection user
  apiRouter.route("/logout").post(verifyToken, user.logOut);

  /*   // reconnect user
    apiRouter.route("/reconnect").post(verifyToken, lastView, user.reconnectUser); */

  // my info
  apiRouter.route("/user/:id").get(verifyToken, user.myInfo);

  // edit profile
  apiRouter.route("/user/:id/edit").patch(verifyToken, user.updateInfo);

  /*  
   // info user
   apiRouter.route("/info/:id").get(verifyToken, user.infoUser);
   // lost password - client
   apiRouter.route("/lost").post(user.lostPassword);
 
   // lost password - website
   apiRouter.route("/lost/reset").post(user.resetPassword); */

  //products routes
  apiRouter.route("/products").get(products.index);
  apiRouter.route("/products/:id").get(products.getByProductId);
  apiRouter.route("/products/:id/edit").patch(products.updateProduct);
  apiRouter.route("/products/:id/delete").delete(products.deleteProduct);
  apiRouter.route("/products/:id/add").post(products.addProduct);
  //invoices routes
  apiRouter.route("/invoices").get(invoice.index);
  apiRouter.route("/invoices/:id").get(invoice.getInvoiceById);
  apiRouter.route("/invoices/user/:id").get(invoice.getInvoiceByUserId);
  apiRouter.route("/invoices/:id/edit").patch(invoice.updateInvoice);
  apiRouter.route("/invoices/:id/delete").delete(invoice.deleteInvoice);
  apiRouter.route("/invoices/:id/add").post(invoice.addInvoice);

  return apiRouter;
})();
