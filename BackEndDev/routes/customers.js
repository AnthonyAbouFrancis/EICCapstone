var express = require('express');
var router = express.Router();
var customers = require("../mockData.json/customers.json")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(customers)
});

module.exports = router;
