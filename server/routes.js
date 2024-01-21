const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const math = require('mathjs');
const { MongoClient } = require('mongodb');
//const schema = require('./schema.js');

// Connection URL for your MongoDB database
const url = "mongodb+srv://lakshin2563:nirma123@cluster0.qtmkizi.mongodb.net/?retryWrites=true&w=majority";

// Name of the database
const dbName = 'Lakshin'; // Change this to your database name

router.post('/upload', async (req, res) => {

    const data = req.body;

            const client = new MongoClient(url);

            async function run() {
                try {
                    await client.connect();
                    // console.log("Successfully connected to Atlas");
                    const db = client.db(dbName);
                    // Reference the "people" collection in the specified database
                    const col = db.collection("cluster0");
                    await col.deleteMany({});
                    const result = await col.insertMany(data);
                    // console.log(`${result.insertedCount} documents were inserted`);
                    return res.status(200)

                } catch (err) {
                    console.log(err.stack);
                }
                finally {
                    await client.close();
                }
            }
            
            run().catch(console.dir);

});



router.post('/newquery', async (req, res) => {
    const { querysecond } = req.body;
    console.log("second_query");
    console.log(req.body);
    console.log("haha");
    console.log(req.body.querysecond);

    let requestBodysecond = req.body.querysecond;
    const fieldToQuery = requestBodysecond.Column;
    const valueToQuery = requestBodysecond.Val;

    console.log("bbbb");
    console.log(fieldToQuery);
    console.log(valueToQuery);
    console.log("lak3");

    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();

        // Access a specific database and collection
        const database = client.db(dbName);
        const collection = database.collection("cluster0");

        // Construct the search query
        const searchQuery = {
            [fieldToQuery]: valueToQuery
        };

        // Perform a search query
        const searchResultssecond = await collection.find(searchQuery).toArray();
        console.log("lakshit_second");
        console.log(searchResultssecond);

        // Display the results with values of other columns
        const resultsWithOtherColumns = searchResultssecond.map(result => {
            const otherColumns = Object.entries(result)
                .filter(([key, value]) => key !== fieldToQuery) // Exclude the filtered column
                .map(([key, value]) => `${key}: ${value}`);
            return {
                [fieldToQuery]: result[fieldToQuery],
                otherColumns: otherColumns.join(', ')
            };
        });

        console.log(resultsWithOtherColumns);

        // res.status(200).json(searchResults) //temporary comment
        res.status(200).json(resultsWithOtherColumns);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});








router.post('/query', async (req, res) => {

    const { query } = req.body;
    console.log(req.body)
    console.log("lakshin")
    const requestBody = JSON.parse(req.body.query);
   // const c1=requestBody.Currency;

// This will log the value associated with the "Currency" key

    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        // console.log('Connected to MongoDB Atlas');
        console.log("nirma")
        console.log(requestBody)
        // Access a specific database and collection
        const database = client.db(dbName);
        const collection = database.collection("cluster0");


        // Perform a search query
        //replace {} with valid query
        const searchResults = await collection.find(requestBody).toArray();

        // Output the search results
        // console.log('Search results:');
        // console.log(searchResults);
       // console.log(searchResults)
       console.log("lakshit")
       console.log( searchResults)
        const currencies = searchResults.map(result => result.Currency);
        console.log(currencies); // This will log an array of Currency values

        //res.status(200).json(searchResults) //temporary comment
        res.status(200).json(currencies)
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }

});

module.exports = router;







