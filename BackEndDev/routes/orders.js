var express = require('express');
var router = express.Router();
var orders = require("../mockData.json/orders.json")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(orders)
});

module.exports = router;