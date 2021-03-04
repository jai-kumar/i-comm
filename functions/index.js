// import express from 'express';
const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51IMGI5HnVnCynbiruG0z2jrPTU6c0Z5BDVG8kS26SfRw968v7N81dDXgNgStnFAJiQgAjmSIOwZoXcVLi7pY4v4l00VEsDbUHu');
const utility = require('./utility');
// API

// App Config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get('/', (request, response) => response.status(200).send('hello world'));

app.get('/products', async (request, response) => {
  let allProducts = await utility.getAllProducts();
  response.status(200).send({
    products: allProducts || []
  })
});

app.post('/payments/create', async (request, response) => {
  const total = request.query.total;
  console.log('Payment Request Recieved for amount: ', total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd"
  });

  // 201 - okay created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret
  });
});

// Listen
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/i-comm/us-central1/api



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
