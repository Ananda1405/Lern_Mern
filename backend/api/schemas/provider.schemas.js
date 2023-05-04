const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

//Create company schema (Child or sub-document)
const companySchema = new Schema({
    "company_name": {type: String, require: true},
    "address": {type: String, require: true},
    "address2": String,
    "city": {type: String, require: true},
    "state": {type: String, require: true, min:2, max: 2},
    "postal_code": {type: String, require: true, min:5},
    "phone": {type: String, require: true},
    "email": {type: String, require: true, unique: true},
    "description": String,
    "tagline": String
})

//Create provider schema (top-level document)
const providerSchema = new Schema({
        "firstname": {type: String, require: true},
        "lastname": {type: String, require: true},
        "position": String,
        "company": companySchema
})

module.exports = {providerSchema, companySchema}