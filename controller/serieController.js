// serie Controller

const Serie = require("../db/schema/serie");
const db = require("../db/connexion");

async function index(req, res) {
  try {
    const listSeries = await Serie.find();

    if (!listSeries) {
      return res.status(202).send("There is no Series");
    }
    res.status(200).send(listSeries);
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}
async function getBySerieId(req, res) {
  try {
    const serie = await Serie.findById(req.id);

    if (!product) {
      return res.status(202).send("There is no Serie with this Id");
    }
    res.status(200).send(serie);
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}
async function addSerie(req, res) {
  try {
    const serie = new Serie({
      name: req.body.name,
      numberBook: req.body.numberBook,
      picture: req.body.picture,
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
  try {
    if (req.params.id) {
      const serie = await Serie.findByIdAndUpdate(req.params.id, ...req.body);
      if (!serie) {
        return res.status(200).send("There is no Serie with this Id");
      }
      res.status(200).send({ msg: "Serie updated", serie });
    }
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}
async function deleteSerie(req, res) {
  try {
    if (req.params.id) {
      const serie = await Serie.deleteOne({
        _id: req.id,
      });
      if (!serie) {
        return res.status(200).send("There is no Serie with this Id");
      }
      res.status(200).send({ msg: "Serie deleted", product });
    }
  } catch (error) {
    res.status(404).send("This is error: " + error);
  }
}
module.exports = {
  index,
  getBySerieId,
  addSerie,
  updateSerie,
  deleteSerie,
};
