var express = require('express');
var router = express.Router();
var products = require("../mockData.json/products.json");


module.exports = function () {
	router
		.route('/')
		.get((req, res, next) => {
			res.json(products);
		})
		.post((req, res) => {
			// validate and post new products
		});

	return router;
};
