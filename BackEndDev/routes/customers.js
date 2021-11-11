var express = require('express');
var router = express.Router();
var customers = require('../mockData.json/customers.json');

module.exports = function () {
	router
		.route('/')
		.get((req, res, next) => {
			res.json(customers);
		})
		.post((req, res) => {
			console.log(req.body);
			let validCustomer = false;
			const newCustomer = req.body;

			// validate newCustomer data fields (number and types)
			// CURRENTLY NOT WORKING (404 every time)
			if (
				req.body
				// newCustomer.first_name &&
				// typeof newCustomer.first_name === 'string' &&
				// newCustomer.last_name &&
				// typeof newCustomer.last_name === 'string' &&
				// newCustomer.phone &&
				// typeof newCustomer.phone === 'number' &&
				// newCustomer.email &&
				// typeof newCustomer.email === 'string' &&
				// newCustomer.customer_notes &&
				// typeof newCustomer.customer_notes === 'string' &&
				// newCustomer.address &&
				// typeof newCustomer.address === 'string'
			) {
				validCustomer = true;
			}

			if (validCustomer) {
				// logic to INSERT this customer into database here
				res.send(req.body);
				// res.send('New Customer successfully added');
			} else {
				console.log('Invalid Customer object');
				res.status(404).send();
			}
		});

	router
		.route('/:id')
		.get((req, res, next) => {
			let found = false; // flag for if customer is found
			let result; // holds customer object to return

			customers.customers.forEach((customer) => {
				if (customer.customer_id === Number(req.params.id)) {
					found = true;
					result = customer;
				}
			});

			if (found) {
				res.send(result);
			} else {
				console.log(`Customer not found with ID ${req.params.id}`);
				res.status(404).send();
			}
		})
		.put((req, res) => {
			let found = false;
			let targetCustomer;
			const updatedCustomer = req.body;

			customers.customers.forEach((customer) => {
				if (customer.customer_id === Number(req.params.id)) {
					found = true;
					targetCustomer = customer;
					customer = updatedCustomer; // this will have to be logic to update the database
				}
			});

			if (found) {
				res.send('Successfully updated customer');
			} else {
				console.log(`Customer not found with ID ${req.params.id}`);
				res.status(404).send();
			}
		})
		.delete((req, res) => {
			let found = false;
		});

	return router;
};
