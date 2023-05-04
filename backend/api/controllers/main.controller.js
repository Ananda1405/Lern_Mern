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
  try{
    
  // if (isEmptyList(providers)) {
  //   providers = [];
  // }

  // var id = req.body.id;
  // if (existsProvider(id)) {
  //   res.status(400);
  //   res.send("Duplicate id not allowed.:(");
  //   id = getUniqueId(); //get new ID
  // }

  var provider = req.body; //get new provider
  
  //Add New Provider to The List
  Provider.create(provider)
      .then(result=>{
        res.status(201);
        res.send(result);
      })
      .catch(error => handleError(res, error));  
    }catch(error){
      handleError(res,error);
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

    Provider.find({'_id':id}).then((result) => {
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
  if (isEmptyList(providers)) {
    res.status(404);
    res.send("List is empty.Cannot Update");
  }
  let id = req.params.id;
  let provider = providers.find((provider) => provider.id == id);
  provider.firstname = req.body.firstname;
  provider.lastname = req.body.lastname;
  provider.position = req.body.position;
  provider.company.company_name = req.body.company.company_name;
  provider.company.address = req.body.company.address;
  provider.company.address2 = req.body.company.address2;
  provider.company.city = req.body.company.city;
  provider.company.state = req.body.company.state;
  provider.company.postal_code = req.body.company.postal_code;
  provider.company.phone = req.body.company.phone;
  provider.company.email = req.body.company.email;
  provider.company.description = req.body.company.description;
  provider.company.tagline = req.body.company.tagline;

  res.status(200);
  res.send(provider);
};

//Delete One
//uri: /api/providers/123
module.exports.deleteOne = function (req, res) {
  if (isEmptyList(providers)) {
    res.status(404);
    res.send("List is empty. Cannot Delete");
  }
  let id = req.params.id;
  let provider = providers.find((provider) => provider.id == id);
  let idx = providers.indexOf(providers.find((provider) => provider.id == id));
  //Remove the element at the index of "idx"
  providers.splice(idx, 1);

  res.status(200);
  res.send(provider);
};

//Delete All
//uri: /api/providers
module.exports.deleteAll = function (req, res) {
  if (isEmptyList(providers)) {
    res.status(404);
    res.send("List is empty.CAnt delete");
  }
  providers = [];
  res.status(200);
  res.send("All Providers Deleted");
};
