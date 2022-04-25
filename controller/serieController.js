// serie Controller

const Serie = require("../db/schema/serie");
const Product = require("../db/schema/product");
const db = require("../db/connexion");

async function index(req, res) {
  try {
    const listSeries = await Serie.find();

    if (!listSeries) {
      return res.status(202).send("There is no Series");
    }
    res.status(200).send({ msg: "list of series", data: listSeries });
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}
async function getSerieById(req, res) {
  try {
    const serie = await Serie.findById(req.params.id);

    if (!serie) {
      return res.status(202).send("There is no Serie with this Id");
    }
    res.status(200).send(serie);
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}
async function addSerie(req, res) {
  if (!req.user.isAdmin)
    return res.status(401).send("Unauthorized to create a Serie");

  try {
    const serie = new Serie({
      name: req.body.name,
      description: req.body.description,
      cover: req.body.cover,
      author: req.body.author,
    });
    if (!serie) {
      return res.status(200).send("There is no Serie with this Id");
    }
    await serie.save();
    res.status(200).send({ msg: "Serie inserted", serie });
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}
async function updateSerie(req, res) {
  if (!req.user.isAdmin)
    return res.status(401).send("Unauthorized to modify a Serie");
  try {
    if (req.params.id) {
      const serie = await Serie.findByIdAndUpdate(req.params.id, {
        ...req.body,
      });

      if (!serie) {
        return res.status(200).send("There is no Serie with this Id");
      }
      res.status(200).send({ msg: "Serie updated", serie });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("This is error: " + error);
  }
}
async function deleteSerie(req, res) {
  if (!req.user.isAdmin)
    return res.status(401).send("Unauthorized to delete a Serie");
  try {
    if (req.params.id) {
      const serie = await Serie.deleteOne({ _id: req.params.id });
      console.log(serie);
      if (!serie) {
        return res.status(200).send("There is no Serie with this Id");
      }
      res.status(200).send({ msg: "Serie deleted", serie });
    }
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}
async function findMangas(req, res) {
  try {
    const mangas = await Product.find({ serie: req.body.name });

    if (!mangas) {
      return res.status(202).send("There is no Mangas in this Serie");
    }
    res.status(200).send(mangas);
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}
module.exports = {
  index,
  getSerieById,
  addSerie,
  updateSerie,
  deleteSerie,
  findMangas,
};
