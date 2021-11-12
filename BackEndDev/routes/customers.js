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
		.post(async (req, res) => {
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
				try {
					await db
						.query(
							`INSERT into customer 
						(first_name, last_name, phone, email, customer_notes, address)
						VALUES (
							${newCustomer.first_name},
							${newCustomer.last_name},
							${newCustomer.phone},
							${newCustomer.email},
							${newCustomer.customer_notes},
							${newCustomer.address}
							);`
						)
						.then(res.send('New Customer successfully added'));
				} catch (er) {
					res.status(400).send(er);
				}
			} else {
				console.log('Invalid Customer object');
				res.status(404).send();
			}
		});

	router
		.route('/:id')
		.get(async (req, res, next) => {
			let found = false; // flag for if customer is found
			let result; // holds customer object to return

			try {
				// sql query
				const [rows, fields] = await db.query(
					`SELECT * FROM customer 
					WHERE customer_id == ${Number(req.params.id)};`
				);
				// validation of db result
				if (rows) {
					found = true;
					result = res.json(rows);
				} else {
					// throw error if db returns nothing or errors out
					throw new Error(
						`No Customers with ID ${Number(req.params.id)}`
					);
				}
				// send error status and send error message
			} catch (er) {
				res.status(400).send(er);
			}

			// Array searching through mock JSON data
			// customers.customers.forEach((customer) => {
			// 	if (customer.customer_id === Number(req.params.id)) {
			// 		found = true;
			// 		result = customer;
			// 	}
			// });

			if (found) {
				res.send(result);
			} else {
				console.log(`Customer not found with ID ${req.params.id}`);
				res.status(404).send();
			}
		})
		.put(async (req, res) => {
			let found = false;
			const updatedCustomer = req.body;

			try {
				await db
					.query(
						`UPDATE customer
					SET 
					first_name = ${updatedCustomer.first_name},
					last_name = ${updatedCustomer.last_name},
					phone = ${updatedCustomer.phone},
					email = ${updatedCustomer.email},
					customer_notes = ${updatedCustomer.customer_notes},
					address = ${updatedCustomer.address}
					WHERE customer_id == ${Number(req.params.id)}
					;`
					)
					.then((found = true));
			} catch (er) {
				res.status(400).send(er);
			}

			// Array searching through mock JSON data
			// customers.customers.forEach((customer) => {
			// 	if (customer.customer_id === Number(req.params.id)) {
			// 		found = true;
			// 		targetCustomer = customer;
			// 		customer = updatedCustomer; // this will have to be logic to update the database
			// 	}
			// });

			if (found) {
				res.send('Successfully updated customer');
			} else {
				console.log(`Customer not found with ID ${req.params.id}`);
				res.status(404).send();
			}
		})
		.delete(async (req, res) => {
			let found = false;

			try {
				await db
					.query(
						`DELETE FROM customer
					WHERE customer_id == ${Number(req.params.id)};`
					)
					.then((found = true));
			} catch (er) {
				res.status(400).send(er);
			}

			if (found) {
				res.send(
					`Successfully deleted Customer with ID ${req.params.id}`
				);
			} else {
				console.log(`Customer not found with ID ${req.params.id}`);
				res.status(404).send();
			}
		});

	return router;
};
