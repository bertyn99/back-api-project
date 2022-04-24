const Bill = require("../db/schema/bill");
const db = require("../db/connexion");

async function index(req, res) {
  try {
    const listInvoice = await Bill.find();

    if (!listInvoice) {
      return res.status(202).send("There is no Invoice");
    }
    res.status(200).send(listInvoice);
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}
async function getInvoiceById(req, res) {
  try {
    const invoice = await Bill.findById(req.id);

    if (!invoice) {
      return res.status(202).send("There is no Invoice with this Id");
    }
    res.status(200).send(invoice);
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}

async function getInvoiceByUserId(req, res) {
  try {
    const invoice = await Bill.find(req.params.id);

    if (!invoice) {
      return res.status(200).send("There is no Invoice with this Id");
    }
    res.status(200).send(invoice);
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}
async function addInvoice(req, res) {
  try {
    const invoice = new Bill({
      idUser: req.body.idUser,
      emissionDate: req.body.emissionDate,
      isPaid: req.body.isPaid,
      paidDate: req.body.paidDate,
      price: req.body.price,
      products: req.body.products,
    });
    if (!invoice) {
      return res.status(200).send("There is no Invoice with this Id");
    }
    await invoice.save();
    res.status(200).send({ msg: "Invoice inserted", invoice });
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}
async function updateInvoice(req, res) {
  try {
    if (req.params.id) {
      const invoice = await Bill.findByIdAndUpdate(req.params.id, ...req.body);
      if (!invoice) {
        return res.status(200).send("There is no Invoice with this Id");
      }
      res.status(200).send({ msg: "Invoice updated", invoice });
    }
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}
async function deleteInvoice(req, res) {
  try {
    if (req.params.id) {
      const invoice = await Bill.deleteOne({
        _id: req.id,
      });
      if (!invoice) {
        return res.status(200).send("There is no Invoice with this Id");
      }
      res.status(200).send({ msg: "Invoice deleted", invoice });
    }
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}
module.exports = {
  index,
  getInvoiceById,
  getInvoiceByUserId,
  addInvoice,
  updateInvoice,
  deleteInvoice,
};
