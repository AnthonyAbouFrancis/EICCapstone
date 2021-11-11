const request = require('supertest');
const app = require('./app');

describe('CUSTOMERS', ()=>{

    describe('GET', ()=>{

    // Test 1. Test for getting all customers

    test("respond with a 200 status code", async () =>{
        const response = await request(app).get("/api/customers")
        expect(response.statusCode).toBe(200)
    })

    // Test 2. Test to check that the number of customers returned matches total number in db

    test("respond with valid number of customers", async () =>{
        const response = await request(app).get("/api/customers")
        const numberOfCust = response.body.customers.length;
        expect(numberOfCust).toBe(3)
        
        
    })
    test ("Single customer by id", async () =>{
        const response = await request(app).get("")
    }
        
    //Test 3. Test for getting a singe customer by id
        
    })

    describe('POST',()=>{

    //Test 4. Test for verifying the database contains created user


    })

    describe('PUT',()=>{

    //Test 5. Test for verifying the database contains changed user
    
    
        })

    describe('DELETE',()=>{

    //Test 6. Test for verifying the database doesnt contain deleted user
        
        
        })
            
        
    

})

describe('ORDERS', ()=>{

    describe('GET',()=>{

        //Test 7. Test for getting all orders
        //(a) 200 status code if the order exists in the database (b) Test to check that the number of orders returned matches total number in db


        //Test 8. Test for getting specific order
        //(a) 200 status code if the order exists in the database, (b) conditional statement to see if returned order matches the order
    
    
        })




})