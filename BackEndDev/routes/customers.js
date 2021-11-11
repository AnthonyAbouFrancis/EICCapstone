var express = require('express');
var router = express.Router();
var customers = require('../mockData.json/customers.json');

module.exports = function (db) {
	router
		.route('/')
		.get(async (req, res, next) => {
			// validation of user input

			try {
				// sql query
				const [rows, fields] = await db.query(
					'SELECT * FROM customer;'
				);
				// validation of db result
				if (rows) {
					res.json(rows);
				} else {
					// throw error if db returns nothing or errors out
					throw new Error('No Customers');
				}
				// send error status and send error message
			} catch (er) {
				res.status(400).send(er);
			}
		})
		.post((req, res) => {
			console.log(req.body);
			let validCustomer = false;
			const newCustomer = req.body;

			// validate newCustomer data fields (number and types)
			if (
				newCustomer.first_name &&
				typeof newCustomer.first_name === 'string' &&
				newCustomer.last_name &&
				typeof newCustomer.last_name === 'string' &&
				newCustomer.phone &&
				typeof newCustomer.phone === 'number' &&
				newCustomer.email &&
				typeof newCustomer.email === 'string' &&
				newCustomer.customer_notes &&
				typeof newCustomer.customer_notes === 'string' &&
				newCustomer.address &&
				typeof newCustomer.address === 'string'
			) {
				validCustomer = true;
			}

			if (validCustomer) {
				// logic to INSERT this customer into database here
				res.send(newCustomer);
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
