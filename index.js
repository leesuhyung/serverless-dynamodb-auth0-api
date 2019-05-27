const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const AWS = require('aws-sdk');

const USERS_TABLE = process.env.USERS_TABLE;
const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDb;

if (IS_OFFLINE === 'true') {
    dynamoDb = new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'accessKeyId', // Change to the following code, have dummy accessKeyId and secretAccessKey, then run it
        secretAccessKey: 'secretAccessKey', // Change to the following code, have dummy accessKeyId and secretAccessKey, then run it
    });
    // console.log(dynamoDb);
} else {
    dynamoDb = new AWS.DynamoDB.DocumentClient();
}

app.use(bodyParser.json({ strict: false }));

app.get('/', (req, res) => {
    res.send('Hello World!')
});

// Get user endpoint
app.get('/users/:userId', (req, res) => {
    const params = {
        TableName: USERS_TABLE,
        Key: {
            userId: req.params.userId,
        }
    };

    dynamoDb.get(params, (error, result) => {
        if (error) {
            console.log(error);
            res.status(400).json({ error: 'Could not get user' });
        }
        if (result.Item) {
            const {userId, name} = result.Item;
            res.json({ userId, name });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    })
});

// Get users endpoint
app.get('/users', (req, res) => {
    const params = {
        TableName: USERS_TABLE,
    };

    dynamoDb.scan(params, (error, result) => {
        if (error) {
            console.log(error);
            res.status(400).json({ error: 'Could not get user' });
        }
        if (result) {
            const {Count, Items, ScannedCount} = result;
            res.json({Count, Items, ScannedCount});
        } else {
            res.status(404).json({ error: "User not found" });
        }
    })
});

// Create User endpoint
app.post('/users', (req, res) => {
    const {userId, name} = req.body;
    if (typeof userId !== 'string') {
        res.status(400).json({error: '"userId" must be a string'});
    } else if (typeof name !== 'string') {
        res.status(400).json({error: '"name" must be a string'});
    }

    const params = {
        TableName: USERS_TABLE,
        Item: {
            userId: userId,
            name: name,
        },
    };

    dynamoDb.put(params, (error) => {
        if (error) {
            console.log(error);
            res.status(400).json({ error: 'Could not create user' });
        }
        res.json({ userId, name });
    });
});

module.exports.handler = serverless(app);
