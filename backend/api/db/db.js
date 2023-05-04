const mongoose = require('mongoose');
const {Provider} = require('../models/provider');

//Connection URI to MongoDB
const uri ='mongodb://127.0.0.1:27017/provider_db';

//Make db connection (asychronously)
module.exports = mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( result => {
        console.log('Successful Connection!!')
    })
    .catch(error=> console.log(error));
    
module.exports = Provider;