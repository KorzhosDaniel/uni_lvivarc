exports.main = (req, res) => {
  const Datastore = require("@seald-io/nedb");
  const db = new Datastore({ filename: "lvivarc.json", autoload: true });
  db.find({ table: "arctype" }, (err, docs) => {
    docs.sort((a, b) => {
      return a.id - b.id;
    });
    res.render(path + "/index2", { types: docs });
  });
};

exports.error404 = (req, res) => {
  res.sendFile(path + "404.html");
};

exports.arcObject = (req, res) => {
  objId = parseInt(req.params.id);
  const Datastore = require("@seald-io/nedb");
  const db = new Datastore({ filename: "lvivarc.json", autoload: true });
  db.findOne({ table: "arcobj", id: objId }, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.render(path + "/object", { object: doc });
    }
  });
};

exports.listObjects = (req, res) => {
  ptId = parseInt(req.params.id);
  Datastore = require("@seald-io/nedb");
  db = new Datastore({ filename: "lvivarc.json", autoload: true });
  db.find({ table: "arcobj", type_id: ptId }, (err, docs) => {
    if (docs.length === 0) {
      res.sendFile(path + "error404.html");
    } else {
      db.findOne({ table: "arctype", id: ptId }, (err, doc) => {
        res.render(path + "/objects", { type: doc, objects: docs });
      });
    }
  });
};
