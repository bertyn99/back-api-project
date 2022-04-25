// product Controller

const Product = require("../db/schema/product");
const Serie = require("../db/schema/serie");
const db = require("../db/connexion");

async function index(req, res) {
  try {
    const listProducts = await Product.find();

    if (!listProducts) {
      return res.status(202).send("There is no Products");
    }
    res.status(200).send(listProducts);
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}
async function getByProductId(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(202).send("There is no Product with this Id");
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}
async function addProduct(req, res) {
  if (!req.user.isAdmin)
    return res.status(401).send("Unauthorized to create a Product");
  try {
    const product = new Product({
      serie: req.body.serie,
      number: req.body.number,
      stock: req.body.stock,
      cover: req.body.cover,
      price: req.body.price,
    });
    if (!product) {
      return res.status(200).send("We cant ad this Product");
    }
    await product.save();
    res.status(200).send({ msg: "Product inserted", product });
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}
async function updateProduct(req, res) {
  if (!req.user.isAdmin)
    return res.status(401).send("Unauthorized to modify a Product");
  try {
    if (req.params.id) {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        ...req.body
      );
      if (!product) {
        return res.status(200).send("There is no Product with this Id");
      }
      res.status(200).send({ msg: "Product updated", product });
    }
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}
async function deleteProduct(req, res) {
  if (!req.user.isAdmin)
    return res.status(401).send("Unauthorized to delete a Product");
  try {
    if (req.params.id) {
      const product = await Product.deleteOne({
        _id: req.id,
      });
      if (!product) {
        return res.status(200).send("There is no Product with this Id");
      }
      res.status(200).send({ msg: "Product deleted", product });
    }
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}
async function findSerie(req, res) {
  try {
    const serie = await Serie.find({ name: req.body.serie });

    if (!serie) {
      return res.status(202).send("There is no Serie with this Name");
    }
    res.status(200).send(serie);
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}
module.exports = {
  index,
  getByProductId,
  addProduct,
  updateProduct,
  deleteProduct,
  findSerie,
};
