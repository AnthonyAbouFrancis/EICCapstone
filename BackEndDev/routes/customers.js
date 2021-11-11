var express = require('express');
var router = express.Router();
var customers = require('../mockData.json/customers.json');
const { restart } = require('nodemon');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.json(customers)
// });

// module.exports = router;

module.exports = function () {
	router
		.route('/')
		.get((req, res, next) => {
			res.json(customers);
		})
		.post((req, res) => {
			// validate and post new customer
		});

	router
		.route('/:id')
		.get((req, res, next) => {
			customers.customers.forEach((customer) => {
				if (customer.customer_id === Number(req.params.id)) {
					res.send(customer);
				} else {
					res.status(404).send();
				}
			});
		})
		.put((req, res) => {
			// editing customer
		});

	return router;
};
