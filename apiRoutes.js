const express = require("express");
const user = require("./controller/userController");
const verifyToken = require("./services/verifyToken");
const products = require("./controller/productController");
const serie = require("./controller/serieController");
const invoice = require("./controller/invoiceController");
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
  apiRouter
    .route("/products/:id/edit")
    .patch(verifyToken, products.updateProduct);
  apiRouter
    .route("/products/:id/delete")
    .delete(verifyToken, products.deleteProduct);
  apiRouter.route("/products").post(verifyToken, products.addProduct);

  //serie routes
  apiRouter.route("/serie").get(serie.index);
  apiRouter.route("/serie/:id").get(serie.getSerieById);
  apiRouter.route("/serie/:id/edit").patch(verifyToken, serie.updateSerie);
  apiRouter.route("/serie/:id/delete").delete(verifyToken, serie.deleteSerie);
  apiRouter.route("/serie").post(verifyToken, serie.addSerie);

  //invoices routes
  apiRouter.route("/invoices").get(invoice.index);
  apiRouter.route("/invoices/:id").get(invoice.getInvoiceById);
  apiRouter.route("/invoices/user/:id").get(invoice.getInvoiceByUserId);
  apiRouter.route("/invoices/:id/edit").patch(invoice.updateInvoice);
  apiRouter.route("/invoices/:id/delete").delete(invoice.deleteInvoice);
  apiRouter.route("/invoices").post(invoice.addInvoice);

  return apiRouter;
})();
