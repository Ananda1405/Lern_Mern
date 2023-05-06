var providers = require("../models/providers.models");
const Provider = require("../db/db.js");
const { ObjectId } = require("mongodb");
//Utill functions
//Check if list is empty
function isEmptyList(obj) {
  return ~obj || obj.length == 0 || Object.keys(obj).length == 0;
}

//Handle errors
function handleError(res, error) {
  res.status(200);
  res.send("Something went wrong \n" + error);
}

//Check for existing provider

//CRUD - Create (Post), Read (Get), Update (PUT), Delete

//post
//uri: /api/providers
module.exports.create = function (req, res) {
  // Create Random ID
  try {
    var provider = req.body; //get new provider

    //Add New Provider to The List
    Provider.create(provider)
      .then((result) => {
        res.status(201);
        res.send(result);
      })
      .catch((error) => handleError(res, error));
  } catch (error) {
    handleError(res, error);
  }
};

//GET All
//uri: /api/providers
module.exports.readAll = function (req, res) {
  try {
    Provider.find()
      .then((result) => {
        if (isEmptyList(result)) {
          res.status(400);
          res.send("List is empty. Nothing to Read");
        }
        res.status(200);
        res.send(result);
      })
      .catch((error) => handleError(res, error));
  } catch (error) {
    handleError(res, error);
  }
};

//GET One
//uri: /api/providers/123
module.exports.readOne = function (req, res) {
  try {
    let id = ObjectId(req.params.id);

    Provider.find({ _id: id }).then((result) => {
      if (isEmptyList(result)) {
        res.status(400);
        res.send("List is empty.");
      }
    });
    // let provider = providers.find( provider=> provider.id == id )
    res.status(200);
    res.send(result);
  } catch (error) {
    handleError(res, error);
  }
};

//PUT
//uri: /api/providers/123
module.exports.update = function (req, res) {
  try {
    let id = ObjectId(req.params.id);
    let provider = req.body;
    Provider.findOneAndUpdate({ _id: id }, provider, { new: true })
      .then((result) => {
        if (isEmptyList(result)) {
          res.status(400);
          res.send("List is empty. Nothing to update");
        }

        res.status(200);
        res.send(result);
      })
      .catch((error) => handleError(res, error));
  } catch (error) {
    handleError(res, error);
  }
};

//Delete One
//uri: /api/providers/123
module.exports.deleteOne = function (req, res) {
  try {
    let id = ObjectId(req.params.id);
    Provider.findOneAndDelete({'_id':id})
      .then((result) => {
        if (isEmptyList(result)) {
          res.status(400);
          res.send("List is empty. Cannot Delete");
        }
        res.status(200);
        res.send(result);
      })
      .catch((error) => handleError(res, error));
  } catch (error) {
    handleError(res, error);
  }
};

//Delete All
//uri: /api/providers
module.exports.deleteAll = function (req, res) {
  try {
    Provider.deleteMany({})
      .then((result) => {
        if (result.deletedCount === 0) {
          res.status(400);
          res.send("List is empty. Nothing to delete");
        }
        res.status(200);
        res.send("All Providers Deleted.]n" + result);
      })
      .catch((error) => handleError(res, error));
  } catch (error) {
    handleError(res, error);
  }
};
