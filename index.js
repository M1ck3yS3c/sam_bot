const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
//creating an application for express
const app = express();
// include controllers to the main logic to setup the endpoints
const verificationController = require('./controllers/verification.js');
const messageWebhookController = require('./controllers/messageWebhook.js');

//messages are parsed in json format
app.use(bodyParser.json());
//messages can have nested values when extended is set to true
app.use(bodyParser.urlencoded({
    extended: true
}));

//http get calling verificationController
app.get ('/',verificationController);
//http post calling messageWebhookController
app.post('/',messageWebhookController);
app.listen(3000, () => console.log('Webhook server is listening on port 3000'));

