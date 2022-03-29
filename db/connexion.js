//////////////////////////////////////////////////////////////////////////
//                            DATABASE CONNECTION                       //
//////////////////////////////////////////////////////////////////////////

const mongoose = require("mongoose");
const db = require("../config");
mongoose.connect(db.DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let connection = mongoose.connection;

connection.on(
  "error",
  console.error.bind(console, "Erreur lors de la connexion")
);
connection.once("open", () => {
  console.log("Connexion à la base OK");
});

module.exports = connection;
