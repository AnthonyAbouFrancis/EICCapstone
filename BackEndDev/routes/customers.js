var express = require('express');
var router = express.Router();
var customers = require('../mockData.json/customers.json');

module.exports =  function (db) {
	router
		.route('/')
		.get(async (req, res, next) => {

			// validation of user input

			try {
				// sql query
				const [rows, fields] = await db.query("SELECT * FROM customer;");
				// validation of db result
				if (rows){
					res.json(rows)
				} else {
				// throw error if db returns nothing or errors out
					throw new Error('No Customers');
				}
				// send error status and send error message
			} catch (er) {
				res.status(400).send(er)
			}
			
		})
		.post((req, res) => {
			// validate and post new customer
		});

	router
		.route('/:id')
		.get((req, res, next) => {
			customers.customers.forEach((customer) => { 
				let found=false
				if (customer.customer_id === Number(req.params.id)) {
					res.send(customer);
					found=true
				}
				
			});
			if (!found) {		
			res.status(404).send(); 
			}
		})
		.put((req, res) => {
			// editing customer
		});

	return router;
};
