var express = require('express');
var router = express.Router();
const mainController = require('../controllers/main.controller');

//HTTP Verbs: POST, GET, PUT, DELETE

//POST /api/providers
router.post('/providers', mainController.create);

//GET /api/providers
router.get('/providers',mainController.readAll);

//GET one /api/providers/123
router.get('/providers/:id',mainController.readOne);

//PUT /api/providers/123
router.put('/providers/:id',mainController.update);

//Delete one provider /api/providers/123
router.delete('/providers/:id',mainController.deleteOne);

//Delete all providers /api/providers
router.delete('/providers',mainController.deleteAll);

module.exports = router;